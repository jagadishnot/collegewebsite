import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const goToCollege = () => navigate('/college');
  const goToEcommerce = () => navigate('/ecommerce');

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>WELCOME TO NEW WORLD </h1>
      <p>Select an option:</p>
      <button style={buttonStyle} onClick={goToCollege}>🎓 College Registration</button>
      <button style={buttonStyle} onClick={goToEcommerce}>🛒 E-Commerce for College</button>
    </div>
  );
};

const buttonStyle = {
  margin: '20px',
  padding: '15px 30px',
  fontSize: '18px',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default Dashboard;
