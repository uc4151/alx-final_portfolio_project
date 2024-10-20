import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../../api'; // Import the Axios instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 

    try {
      // Use the Axios instance to make the POST request
      const response = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); 
      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials. Please try again.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;