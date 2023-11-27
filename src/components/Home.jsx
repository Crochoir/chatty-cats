import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.jsx'

const Home = () => {
  return (
    <div>
      <Nav />
      <main>
        <h1>Welcome to My Website</h1>
        <p>
          This is a simple chat app, enjoy!
        </p>
      </main>
    </div>
  );
};

export default Home;
