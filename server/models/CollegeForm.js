const mongoose = require('mongoose');

const phoneValidator = {
  validator: function (v) {
    return /^\d{10}$/.test(v);
  },
  message: 'Please enter a valid 10-digit phone number',
};

const collegeFormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, validate: phoneValidator },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },

  course: { type: String, required: true },
  address: { type: String, required: true },

  neetMarks: { type: String },        // Optional based on course
  entranceMarks: { type: String },    // Optional based on course
  twelfthMarks: { type: String },     // Optional based on course

  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherPhone: { type: String, required: true, validate: phoneValidator },
  motherPhone: { type: String, required: true, validate: phoneValidator },

  certificate: { type: String }, // File path
  photo: { type: String },       // File path

  createdAt: { type: Date, default: Date.now },
});

// Custom validation for required marks based on course
collegeFormSchema.pre('validate', function (next) {
  if (this.course.toLowerCase() === 'mbbs' && !this.neetMarks) {
    this.invalidate('neetMarks', 'NEET marks are required for MBBS');
  } else if (this.course.toLowerCase() === 'b.tech' && !this.entranceMarks) {
    this.invalidate('entranceMarks', 'Entrance marks are required for B.Tech');
  } else if (
    this.course.toLowerCase() !== 'mbbs' &&
    this.course.toLowerCase() !== 'b.tech' &&
    !this.twelfthMarks
  ) {
    this.invalidate('twelfthMarks', '12th marks are required for this course');
  }

  next();
});

module.exports = mongoose.model('CollegeForm', collegeFormSchema);
