import React from 'react';
import './Placements.css';

const students = [
  {
    name: "Lionel Messi",
    photo: "https://tse4.mm.bing.net/th?id=OIP.Fcqpva83i8opAyj5RQw-lwHaE8&pid=Api&P=0&h=180",
    company: "Tata Consultancy Services (TCS)",
    position: "Software Engineer",
    package: "₹6.5 LPA"
  },
  {
    name: "Cristiano Ronaldo",
    photo: "http://getwallpapers.com/wallpaper/full/0/a/5/312939.jpg",
    company: "Infosys",
    position: "Systems Analyst",
    package: "₹5.2 LPA"
  },
  {
    name: "ishowspeed",
    photo: "https://wallpapers.com/images/hd/ishowspeed-mddc5768lnf2i1yk.jpg",
    company: "Amazon",
    position: "Cloud Support Associate",
    package: "₹12.4 LPA"
  },
  {
    name: "vijay",
    photo: "https://tse3.mm.bing.net/th?id=OIP.EqdL-9pz_cdbxoRIetk61wHaHa&pid=Api&P=0&h=180",
    company: "Wipro",
    position: "HR Manager",
    package: "₹8.5 LPA"
  },
  {
    name: "AJITH",
    photo: "https://tse3.mm.bing.net/th?id=OIP.iZCtUay3EjF01y-ZcbRIrAHaJ4&pid=Api&P=0&h=180",
    company: "Capgemini",
    position: "Business Analyst",
    package: "₹7 LPA"
  },
  {
    name: "Suriya",
    photo: "https://tse1.mm.bing.net/th?id=OIP.PYcpPQ4vzJE0CYTOKgFUXgHaFj&pid=Api&P=0&h=180",
    company: "Cognizant",
    position: "Software Developer",
    package: "₹9 LPA"
  }
];

const companies = [
  { name: "TCS", logo: "https://tse1.mm.bing.net/th?id=OIP.ia06qoSPgY3Ngyr_PH_eTAHaBw&pid=Api&rs=1&c=1&qlt=95&w=439&h=103" },
  { name: "Infosys", logo: "https://tse2.mm.bing.net/th?id=OIP.YRny3hcvyrb8aD3NjKs7DgHaE8&pid=Api&P=0&h=180" },
  { name: "Wipro", logo: "https://tse4.mm.bing.net/th?id=OIP.YjODjDA0O2rDqD_LQUzKDgHaEK&pid=Api&P=0&h=180" },
  { name: "Amazon", logo: "https://tse4.mm.bing.net/th?id=OIP.LDZgPmlACxpcxBhPd2Ij4QHaEJ&pid=Api&P=0&h=180" },
  { name: "Capgemini", logo: "https://tse2.mm.bing.net/th?id=OIP.-qsHehf9bna9qR0ScEFP7gHaDA&pid=Api&P=0&h=180" },
  { name: "Cognizant", logo: "https://tse4.mm.bing.net/th?id=OIP.cu4eSa20CWvBzOA2dsN3vAHaEK&pid=Api&P=0&h=180" },
  { name: "Byju's", logo: "https://tse3.mm.bing.net/th?id=OIP.B-fc9mviIgp8Y3IvuEXguwHaEK&pid=Api&P=0&h=180" }
];

const Placements = () => {
  return (
    <div className="placement-container">
      <h1 className="placement-title">🎓 Placement Highlights</h1>
      <p className="placement-subtitle">
        At JRP College, we provide our students with the best opportunities for their career growth. Our dedicated placement cell
        works tirelessly to help students land jobs with top companies, ensuring success right after graduation.
      </p>

      <div className="highlights">
        <div className="highlight-box">🌐 200+ Companies Visited</div>
        <div className="highlight-box">💼 ₹18 LPA Highest Package</div>
        <div className="highlight-box">🎯 92% Placement Rate</div>
      </div>

      <h2 className="section-title">✨ Success Stories</h2>
      <div className="students-grid">
        {students.map((student, index) => (
          <div className="student-card" key={index}>
            <img src={student.photo} alt={student.name} className="student-photo" />
            <h3>{student.name}</h3>
            <p><strong>Company:</strong> {student.company}</p>
            <p><strong>Role:</strong> {student.position}</p>
            <p><strong>Package:</strong> {student.package}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">🏢 Our Recruiters</h2>
      <div className="companies-logos">
        <div className="logo-marquee">
          {companies.map((company, index) => (
            <img key={index} src={company.logo} alt={company.name} className="company-logo" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Placements;
