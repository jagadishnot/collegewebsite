const express = require('express');
const router = express.Router();
const CollegeForm = require('../models/CollegeForm');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const sendMail = require('../utils/sendMail'); // make sure this file exists and exports sendMail()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Form submission route
router.post(
  '/submit',
  authMiddleware,
  upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        dob,
        gender,
        age,
        course,
        address,
        neetMarks,
        entranceMarks,
        twelfthMarks,
        fatherName,
        motherName,
        fatherPhone,
        motherPhone,
      } = req.body;

      const certificate = req.files['certificate'] ? req.files['certificate'][0].filename : null;
      const photo = req.files['photo'] ? req.files['photo'][0].filename : null;

      // Validate eligibility
      if (course === 'MBBS' && neetMarks < 400) {
        return res.status(400).json({ message: 'Not eligible for MBBS' });
      }

      if (course === 'B.Tech' && entranceMarks < 50) {
        return res.status(400).json({ message: 'Not eligible for B.Tech' });
      }

      const newForm = new CollegeForm({
        userId: req.user.userId,
        fullName,
        email,
        phone,
        dob,
        gender,
        age,
        course,
        address,
        neetMarks,
        entranceMarks,
        twelfthMarks,
        fatherName,
        motherName,
        fatherPhone,
        motherPhone,
        certificate,
        photo,
      });

      const savedForm = await newForm.save();

      // ✅ Send confirmation email
      await sendMail(savedForm.email, savedForm.fullName);

      res.status(201).json({ message: 'College form submitted successfully!' });
    } catch (error) {
      console.error('Error submitting college form:', error);
      res.status(500).json({ message: 'Server error while submitting form.' });
    }
  }
);

module.exports = router;
