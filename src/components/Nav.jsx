import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'cookies-js';

const Nav = () => {
  const logOut = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      Cookies.expire('user');
      Cookies.expire('pass');
      window.location.href = '/';
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li className="login-tab">
          {Cookies.get('user') ? (
            <div className="logout-tab" onClick={logOut}>
              Logout
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
