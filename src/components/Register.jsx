import React, {useState } from "react";
import { useHistory } from 'react-router-dom';
import '../LoginStyles.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const IP = process.env.REACT_APP_IP;

  const history = useHistory();

  const handleChange = (e) => {
    const newPassword = e.target.value; 
    setPassword(newPassword)

    const isValid = validatePassword(newPassword)
    setValidPassword(isValid)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validPassword) {
      return;
    }
    try {
      let user = username.toLowerCase()
      const response = await fetch('http://71.66.253.91:4001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: password }), 
      });

      if (response.ok) {
        //console.log('Registration Successful!');
        history.push('/')
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  return (
    <div className={'full-div'}>
      <form className={'card'}onSubmit={handleSubmit}>
      <h2>Register</h2>
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
            onChange={handleChange}
          />
          {!validPassword && <p>Password must meet crteria</p>}
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
