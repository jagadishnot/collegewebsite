import React from 'react';
import './CourseDetails.css';

const CourseDetails = () => {
  const courses = [
    {
      name: "Bachelor of Technology (B.Tech)",
      duration: "4 Years",
      branches: ["Computer Science (CSE)", "Electronics & Communication (ECE)", "Mechanical (ME)", "Civil Engineering"],
      eligibility: "10+2 with Physics, Chemistry, and Mathematics. Entrance exam (JEE/State level) required.",
      fees: "₹85,000 per year",
      overview: "B.Tech equips students with core engineering skills across multiple disciplines.",
      career: "Software Engineer, Robotics Developer, Civil Engineer",
      special: [
        "Modern labs & industry-standard tools",
        "Internships in top tech & core companies",
        "AI, ML, IoT, and Robotics workshops"
      ]
    },
    {
      name: "Bachelor of Science (B.Sc)",
      duration: "3 Years",
      eligibility: "10+2 with Science stream (PCM/PCB)",
      fees: "₹50,000 per year",
      overview: "A degree in Physics, Chemistry, Biology, or Mathematics focused on research and practical skills.",
      career: "Lab Technician, Research Assistant, Analyst",
      special: [
        "Research-oriented curriculum",
        "Field studies & laboratory exposure",
        "Seminars by scientists"
      ]
    },
    {
      name: "Bachelor of Commerce (B.Com)",
      duration: "3 Years",
      eligibility: "10+2 in any stream with minimum 50%",
      fees: "₹40,000 per year",
      overview: "Focuses on accounting, finance, and commerce foundations.",
      career: "Accountant, Tax Consultant, Financial Analyst",
      special: [
        "Hands-on finance labs",
        "Training in Tally, QuickBooks",
        "Taxation & stock market exposure"
      ]
    },
    {
      name: "Bachelor of Business Administration (BBA)",
      duration: "3 Years",
      eligibility: "10+2 in any stream with minimum 50%",
      fees: "₹60,000 per year",
      overview: "Grooms students in business operations, leadership, and entrepreneurship.",
      career: "Business Manager, HR Executive, Entrepreneur",
      special: [
        "Simulated business scenarios",
        "Corporate guest lectures",
        "Startup & Innovation lab"
      ]
    },
    {
      name: "Bachelor of Pharmacy (B.Pharm)",
      duration: "4 Years",
      eligibility: "10+2 with Physics, Chemistry, and Biology/Maths",
      fees: "₹75,000 per year",
      overview: "Training in pharma sciences, clinical practices, and drug formulation.",
      career: "Pharmacist, R&D Officer, Drug Inspector",
      special: [
        "PCI-approved program",
        "Clinical & industrial exposure",
        "Modern pharmaceutical labs"
      ]
    },
    {
      name: "Bachelor of Arts (BA)",
      duration: "3 Years",
      eligibility: "10+2 in any stream",
      fees: "₹30,000 per year",
      overview: "Covers humanities subjects like English, History, Political Science, and Psychology.",
      career: "Civil Services, Journalist, Psychologist",
      special: [
        "Debate clubs and writing workshops",
        "Seminars on politics and sociology",
        "Field research & presentations"
      ]
    },
    {
      name: "Bachelor of Computer Applications (BCA)",
      duration: "3 Years",
      eligibility: "10+2 with Mathematics or Computer Applications",
      fees: "₹55,000 per year",
      overview: "Focused on software development, databases, and programming languages.",
      career: "Software Developer, Web Developer, IT Support",
      special: [
        "Coding bootcamps",
        "App and web project training",
        "Hackathons and coding contests"
      ]
    },
    {
      name: "Bachelor of Design (B.Des)",
      duration: "4 Years",
      eligibility: "10+2 in any stream + Design Aptitude Test (DAT)",
      fees: "₹95,000 per year",
      overview: "Creative degree in fashion, product, interior, or graphic design.",
      career: "Fashion Designer, UX Designer, Animator",
      special: [
        "Hands-on design studios",
        "Portfolio building workshops",
        "Fashion & product exhibitions"
      ]
    },
    {
      name: "Bachelor of Hotel Management (BHM)",
      duration: "4 Years",
      eligibility: "10+2 in any stream with English",
      fees: "₹70,000 per year",
      overview: "Focuses on hospitality, tourism, culinary arts, and hotel operations.",
      career: "Hotel Manager, Chef, Event Coordinator",
      special: [
        "Live kitchen training",
        "Internships in 5-star hotels",
        "Event management modules"
      ]
    },
    {
      name: "Bachelor of Physiotherapy (BPT)",
      duration: "4.5 Years (includes internship)",
      eligibility: "10+2 with Physics, Chemistry, and Biology",
      fees: "₹80,000 per year",
      overview: "Prepares students for rehabilitation therapy and movement sciences.",
      career: "Physiotherapist, Rehab Specialist, Sports Therapist",
      special: [
        "Clinical postings & hospital exposure",
        "Sports injury and neuro rehab training",
        "Therapeutic equipment workshops"
      ]
    }
  ];

  return (
    <div className="course-details-container">
      <h1 className="title">📚 Course Details</h1>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card zoom-in">
            <h2>{course.name}</h2>
            {course.branches && (
              <p><strong>Specializations:</strong> {course.branches.join(', ')}</p>
            )}
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Eligibility:</strong> {course.eligibility}</p>
            <p><strong>Fees:</strong> {course.fees}</p>
            <p><strong>Overview:</strong> {course.overview}</p>
            <p><strong>Career Prospects:</strong> {course.career}</p>
            <p><strong>Special Features:</strong></p>
            <ul>
              {course.special.map((point, i) => (
                <li key={i}>✅ {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
