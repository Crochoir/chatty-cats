import React, {useState, useEffect} from "react";
import Cookies from "cookies-js";
import { useHistory } from 'react-router-dom';
import '../LoginStyles.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform authentication logic here, such as sending a request to your backend API
    // You can use libraries like axios to make HTTP requests
    
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        // Authentication successful, handle the next steps (e.g., redirect the user)
        console.log('Registration Successful!');
        history.push('/')
      } else {
        // Authentication failed, handle the error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;