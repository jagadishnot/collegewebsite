import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

// Set base URL for backend API
axios.defaults.baseURL = 'https://collegewebsite-2-53qa.onrender.com'; // Change this if your backend is hosted elsewhere

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      console.log(`Sending request to ${endpoint} with payload:`, payload);

      const res = await axios.post(endpoint, payload);

      if (isLogin) {
        // If login is successful, store token and go to dashboard
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        }
      } else {
        // After signup, do NOT log the user in automatically
        alert('Signup successful! Please log in.');
        setIsLogin(true); // Switch to login mode
        setFormData({ name: '', email: '', password: '' }); // Clear the form
      }
    } catch (err) {
      console.error('Error during signup/login:', err);
      alert(err.response?.data?.msg || err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="toggle-mode">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: 'pointer', color: '#00ffe1', marginLeft: '6px' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
