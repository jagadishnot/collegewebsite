import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import CollegeSite from './pages/CollegeSite';
import CollegeForm from './pages/CollegeForm';
import Ecommerce from './pages/Ecommerce';
import Placements from './pages/Placements';
import CourseDetails from './pages/CourseDetails';
import Contact from './pages/Contact';

import './App.css';

import BackgroundStars from './components/BackgroundStars'; // Background effect

function App() {
  return (
    <div className="App">
      <BackgroundStars /> {/* 👈 Animated star background always visible */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/college" element={<CollegeSite />} />
          <Route path="/college/form" element={<CollegeForm />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/college/placements" element={<Placements />} />
          <Route path="/college/course-details" element={<CourseDetails />} />
    
          <Route path="/college/contact" element={<Contact />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
