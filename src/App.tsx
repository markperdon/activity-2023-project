import React from 'react';
import SignUp from './Accounts/SignUp';
import './css/App.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  library.add(faCoffee, faUser);
  const handleSignUp = (username: string, password: string, accountType: string) => {
    // Handle sign-up logic (e.g., send data to server)
    console.log('Sign Up:', { username, password, accountType });
  };

  return (
    <div className="App">
      <SignUp onSignUp={handleSignUp} />
    </div>
  );
};

export default App;
