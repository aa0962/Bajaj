// api.js
const express = require('express');
const router = express.Router();

// Mock data for user
const user = {
  user_id: 'aryan_headooo_01011999',
  email: 'aryan@srm.edu.in',
  roll_number: 'SRM123456',
};

// GET endpoint
router.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
router.post('/bfhl', (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input format' });
  }

  const numbers = [];
  const alphabets = [];
  let highestAlphabet = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (highestAlphabet < item) {
        highestAlphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: user.user_id,
    email: user.email,
    roll_number: user.roll_number,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : []
  });
});

module.exports = router;
