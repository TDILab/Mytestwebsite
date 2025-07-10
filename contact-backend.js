// Express.js + Nodemailer backend for GoDaddy SMTP
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Allow CORS only from your production domain
app.use(cors({
  origin: 'https://roboeyewizard.in',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  let transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net', // GoDaddy SMTP host
    port: 465, // 465 for SSL, 587 for TLS
    secure: true, // true for 465, false for 587
    auth: {
      user: 'info@roboeyewizard.in',
      pass: 'Seventeen@#847' // Replace with your GoDaddy email password
    }
  });

  try {
    await transporter.sendMail({
      from: 'info@roboeyewizard.in',
      to: 'info@roboeyewizard.in',
      subject: `Contact Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
