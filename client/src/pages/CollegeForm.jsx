import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CollegeForm.css';

const CollegeForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    age: '',
    course: '',
    address: '',
    neetMarks: '',
    entranceMarks: '',
    twelfthMarks: '',
    fatherName: '',
    motherName: '',
    fatherPhone: '',
    motherPhone: '',
    certificate: null,
    photo: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setForm(prev => ({ ...prev, age: age.toString() }));
  };

  useEffect(() => {
    if (form.dob) {
      calculateAge(form.dob);
    }
  }, [form.dob]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateEligibility = () => {
    const { course, neetMarks, entranceMarks, twelfthMarks } = form;
    if (course === 'MBBS') {
      return parseInt(neetMarks) >= 400;
    } else if (course === 'B.Tech') {
      return parseInt(entranceMarks) >= 70;
    } else {
      return parseInt(twelfthMarks) >= 400;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validateEligibility()) {
      setError('You are not eligible for the selected course based on your marks.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val !== null && val !== '') {
          formData.append(key, val);
        }
      });

      const token = localStorage.getItem('token');
      console.log('Submitting with token:', token);

      const res = await axios.post('https://collegewebsite-2-53qa.onrender.com', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Form submitted successfully!');
      setForm({
        fullName: '', email: '', phone: '', dob: '', gender: '', age: '', course: '',
        address: '', neetMarks: '', entranceMarks: '', twelfthMarks: '',
        fatherName: '', motherName: '', fatherPhone: '', motherPhone: '',
        certificate: null, photo: null,
      });
    } catch (err) {
      console.error('Submission error:', err);
      setError(err?.response?.data?.message || err.message || 'Error submitting form.');
    }
  };

  return (
    <div className="college-form-container">
      <h2>🏫 College Registration Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number (enter 10 digit)" value={form.phone} onChange={handleChange} required />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
        {form.age && <p className="age">Age: {form.age} years</p>}

        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

        <select name="course" value={form.course} onChange={handleChange} required>
          <option value="">Select Course</option>
          <option value="MBBS">MBBS</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.Com">B.Com</option>
          <option value="B.Sc">B.Sc</option>
        </select>

        {form.course === 'MBBS' && (
          <input name="neetMarks" placeholder="NEET Marks" value={form.neetMarks} onChange={handleChange} required />
        )}
        {form.course === 'B.Tech' && (
          <input name="entranceMarks" placeholder="Entrance Marks" value={form.entranceMarks} onChange={handleChange} required />
        )}
        {form.course && form.course !== 'MBBS' && form.course !== 'B.Tech' && (
          <input name="twelfthMarks" placeholder="12th Marks" value={form.twelfthMarks} onChange={handleChange} required />
        )}

        <input name="fatherName" placeholder="Father's Name" value={form.fatherName} onChange={handleChange} required />
        <input name="motherName" placeholder="Mother's Name" value={form.motherName} onChange={handleChange} required />
        <input name="fatherPhone" placeholder="Father's Phone (enter 10 digit)" value={form.fatherPhone} onChange={handleChange} required />
        <input name="motherPhone" placeholder="Mother's Phone (enter 10 digit)" value={form.motherPhone} onChange={handleChange} required />

        <label>Certificate</label>
        <input type="file" name="certificate" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} required />
        <label>Photo</label>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CollegeForm;
