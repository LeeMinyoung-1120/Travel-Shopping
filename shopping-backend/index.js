const express = require('express');
const app = express();
const PORT = 3001;

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Post Method 만들기 (return 값)
app.post('/api/order', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

