import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">📞 Contact Us</h1>

      <div className="contact-info">
        <p><strong>Email:</strong> info@jrpcollege.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Admissions:</strong> +91 90123 45678</p>
        <p><strong>Campus Address:</strong> JRP College, Knowledge Park, Sector 10, Hyderabad, India</p>
        <p><strong>Office Hours:</strong> Mon - Sat | 9:00 AM - 6:00 PM</p>
      </div>

      <div className="helpline-scroll">
        <span>📞 Helpline 24x7: +91 98765 43210 • +91 90123 45678 • 📧 info@jrpcollege.com • </span>
      </div>

      <div className="map-box">
        <iframe
          title="JRP College Location"
          src="https://maps.google.com/maps?q=hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
