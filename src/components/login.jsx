import React, {useState} from "react";
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

    try {
      const response = await fetch('http://192.168.1.8:3001/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        console.log('Login successful!');
        Cookies.set('user', username)
        Cookies.set('pass', password)
        history.push('/')
        console.log(Cookies.get('user'));
      } else {
        setError(true)
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={'full-div'}>
      <form className={'card'} onSubmit={handleSubmit}>
      <h2>Login</h2>
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