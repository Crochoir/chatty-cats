import React, {useState, useEffect} from "react";
import Cookies from "cookies-js";
import { useHistory } from 'react-router-dom';
import '../LoginStyles.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform authentication logic here, such as sending a request to your backend API
    // You can use libraries like axios to make HTTP requests

    try {
      const response = await fetch('http://192.168.1.8:3001/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        // Authentication successful, handle the next steps (e.g., redirect the user)
        console.log('Login successful!');
        Cookies.set('user', username)
        Cookies.set('pass', password)
        history.push('/')
        console.log(Cookies.get('user'));
      } else {
        // Authentication failed, handle the error
        setError(true)
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <br />
        <a href='/register'>not a user? sign up</a>
      </form>
      {error && (
        <div className="error-popup">
          <p>Incorrect username or password. Please try again.</p>
          <button onClick={() => setError(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Login;