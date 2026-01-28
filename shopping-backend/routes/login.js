const express = require('express');
const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileHelper');

const router = express.Router();
const filePath = path.join(__dirname, '../data/userlist.json');

router.post('/', async (req, res) => {
  try {
    const users = await readJSON(filePath);
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({ success: false, message: '로그인 실패' });

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '로그인 실패' });
  }
});

module.exports = router;
