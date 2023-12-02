const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userHandler = require('./src/api/userHandler');
const app = express();
const PORT = 5000;
const SECRET_KEY = '2023@project'; // Replace with a strong and unique secret key

app.use(cors());
app.use(express.json());
const users = [];
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, accountType TEXT)');
});

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password, accountType } = req.body;

  if (!username || !password || !accountType) {
    return res.status(400).json({ error: 'Username, password and account Type are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare('INSERT INTO users (username, password, accountType) VALUES (?, ?, ?)');
  stmt.run(username, hashedPassword, accountType, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error registering user' });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  });
  stmt.finalize();
});

// Login and get an authentication token
app.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  stmt.get(userName, async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error during login' });
    }

    if (row) {
      const passwordMatch = await bcrypt.compare(password, row.password);

      if (passwordMatch) {
        const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token,
            username: row.username,
            accounttype: row.accountType });
      }
    }

    return res.status(401).json({ error: 'Invalid username or password' });
  });
  stmt.finalize();
});

app.get('/users/all', async  (req, res) => {
  try {
    const users = await userHandler.getUsers();
    console.log(users)
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete user endpoint
app.delete('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    await userHandler.deleteUser(userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
