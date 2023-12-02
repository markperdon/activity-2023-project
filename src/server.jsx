const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = '2023@project'; // Replace with a strong and unique secret key

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
});

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  stmt.run(username, hashedPassword, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error registering user' });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  });
  stmt.finalize();
});

// Login and get an authentication token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  stmt.get(username, async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error during login' });
    }

    if (row) {
      const passwordMatch = await bcrypt.compare(password, row.password);

      if (passwordMatch) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
      }
    }

    return res.status(401).json({ error: 'Invalid username or password' });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
