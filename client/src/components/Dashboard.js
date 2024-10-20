import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <Link to="/create-blog">Create a Blog Post</Link>
      <Link to="/my-posts">My Blog Posts</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;