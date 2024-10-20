import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Intelvibez Blog</h1>
      <p>Your go-to platform for insightful blogs.</p>
      <p>
        Sign up to create your own blog posts or log in to explore the content.
      </p>
      <div className="home-buttons">
        <Link to="/signup" className="btn">Sign Up</Link>
        <Link to="/login" className="btn">Log In</Link>
      </div>
      <div>
        <Link to="/blogs">Explore Blogs</Link>
      </div>
    </div>
  );
};

export default Home;