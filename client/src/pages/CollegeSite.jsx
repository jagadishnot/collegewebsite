import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeSite.css';

const CollegeSite = () => {
  const navigate = useNavigate();

  return (
    <div className="college-container">
      <div className="overlay">
        <h1 className="heading">Welcome to JRP College</h1>
        <p className="subheading">Explore our courses, campus, and apply now!</p>

        {/* About Section */}
        <section className="info-section animate-slide">
          <h2>About JRP College</h2>
          <p>
            🏛️ Established in 1995, JRP College is a premier institution committed to excellence in education and holistic development.
            With a sprawling green campus, cutting-edge facilities, and a legacy of academic success, we shape the leaders of tomorrow.
          </p>
          <p>
            🎯 Our mission is to empower students through a learner-centric approach, promote research and innovation, and contribute to nation-building.
          </p>
        </section>

        {/* Courses Section */}
        <section className="info-section animate-fade">
          <h2>Courses Offered</h2>
          <ul className="course-list">
            <li>🎓 Bachelor of Technology (B.Tech)</li>
            <li>🔬 Bachelor of Science (B.Sc)</li>
            <li>📊 Bachelor of Commerce (B.Com)</li>
            <li>💼 Bachelor of Business Administration (BBA)</li>
            <li>💊 Bachelor of Pharmacy (B.Pharm)</li>
          </ul>
        </section>

        {/* Campus Life Section */}
        <section className="info-section animate-slide">
          <h2>Campus Life</h2>
          <p>🌟 Vibrant student clubs, tech and cultural fests, modern hostels, a central library, sports facilities, and more!</p>
        </section>

        {/* Facilities Section */}
        <section className="info-section animate-fade">
          <h2>Our Facilities</h2>
          <ul className="course-list">
            <li>🧪 Advanced Labs & Research Centers</li>
            <li>🏀 Sports Complex & Gymnasium</li>
            <li>🍽️ Hygienic Cafeteria & Dining</li>
            <li>🌐 High-Speed Wi-Fi Campus</li>
            <li>📚 E-Library Access</li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="button-group">
          <button onClick={() => navigate('/college/form')}>Apply Now 📝</button>
          <button onClick={() => navigate('/college/placements')}>Placements 💼</button>
          <button onClick={() => navigate('/college/course-details')}>Course Details 📚</button>
          <button onClick={() => navigate('/college/contact')}>Contact 📞</button>
        </div>
      </div>
    </div>
  );
};

export default CollegeSite;
