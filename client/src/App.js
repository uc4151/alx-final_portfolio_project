import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import CreateBlog from './components/blog/CreateBlog';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;