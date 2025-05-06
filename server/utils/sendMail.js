const nodemailer = require('nodemailer');

const sendMail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jagadishgow67@gmail.com',         // your Gmail address
      pass: 'gmgvqalekisasqfg',             // your App Password (no spaces!)
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject: 'College Form Submitted Successfully!',
    html: `<h2>Hello ${name},</h2>
           <p>We’ve received your college form. Thank you for registering!</p>
           <p>We’ll review your application and get back to you soon.</p>
           <br>
           <p>Best regards,<br>College Admissions Team</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
