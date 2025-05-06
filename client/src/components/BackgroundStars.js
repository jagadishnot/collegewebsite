import React, { useEffect } from 'react';
import './BackgroundStars.css'; // We'll add the CSS next

const BackgroundStars = () => {
  useEffect(() => {
    const container = document.body;
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
      container.appendChild(star);
    }

    // Cleanup on component unmount
    return () => {
      const stars = document.querySelectorAll('.star');
      stars.forEach((star) => star.remove());
    };
  }, []);

  return null;
};

export default BackgroundStars;
