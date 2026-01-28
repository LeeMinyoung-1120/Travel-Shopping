const express = require('express');
const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileHelper');

const router = express.Router();
const filePath = path.join(__dirname, '../data/userlist.json');

router.post('/', async (req, res) => {
  const { userId, name, email, password } = req.body;
  if (!userId || !name || !email || !password) {
    return res.status(400).json({ success: false, message: '필수 값이 누락되었습니다.' });
  }

  try {
    const users = await readJSON(filePath);
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ success: false, message: '이미 등록된 사용자입니다.' });
    }

    users.push({ userId, name, email, password });
    await writeJSON(filePath, users);

    res.status(200).json({ success: true, message: '회원가입 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '회원가입 실패' });
  }
});

module.exports = router;
