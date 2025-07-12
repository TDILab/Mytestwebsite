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

// Global visitor counter (simple file-based)
const fs = require('fs');
const COUNTER_FILE = 'visitor-count.txt';

app.get('/visitor-count', (req, res) => {
  let count = 0;
  try {
    if (fs.existsSync(COUNTER_FILE)) {
      count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8')) || 0;
    }
  } catch (e) {}
  res.json({ count });
});

app.post('/visitor-count', (req, res) => {
  let count = 0;
  try {
    if (fs.existsSync(COUNTER_FILE)) {
      count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8')) || 0;
    }
  } catch (e) {}
  count++;
  fs.writeFileSync(COUNTER_FILE, count.toString());
  res.json({ count });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
