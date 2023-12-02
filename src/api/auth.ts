import axios from 'axios';

export const onSignUp = async (username: string, password: string, accountType: string): Promise<void> => {
  try {
    // Call the server API to register the user using Axios
    await axios.post('http://localhost:5000/register', { username, password, accountType });
    console.log('User successfully registered!');
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
