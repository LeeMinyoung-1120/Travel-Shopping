const express = require('express');
const app = express();
const PORT = 3001;

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// data (test_user, cart items)
// 테스트용 유저
let users = [
  {
    userId: 1,
    name: 'test_user1',
    email: 'test1@test.com',
    password: '1234'
  },
  {
    userId: 2,
    name: 'test_user2',
    email: 'test2@test.com',
    password: 'test1234'
  }
];

// 장바구니 데이터
let carts = {
  1: [
    {
      itemId: 1,
      name: '필리핀',
      price: 700000,
      option: '기본 옵션',
      quantity: 1,
      imageUrl: '/images/보홀.jpg'
    }
  ],
  2: [
    {
      itemId: 2,
      name: '중국',
      price: 500000,
      option: '기본 옵션',
      quantity: 1,
      imageUrl: '/images/상하이.jpg'
    }
  ],
  3:[
    {
      itemId: 3,
      name: '스위스',
      price: 800000,
      option: '기본 옵션',
      quantity: 1,
      imageUrl: '/images/스위스.jpg'
    }
  ]
};


app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// 회원가입 API는 테스트용 유저로 생략
// 로그인 API
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // 유저 찾기
    const user = users.find(u => u.email === email && u.password === password);

    //Http 상태 401: 인증 실패
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '이메일 또는 비밀번호가 올바르지 않습니다.' 
      });
    }

    // Http 상태 200: 로그인 성공
    res.status(200).json({
      success: true,
      message: '로그인 성공',
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email
      },
      accessToken: `token_${user.userId}_${Date.now()}` // 간단한 토큰
    });
  } 
  // Http 500: 서버 에러
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '로그인에 실패했습니다.' 
    });
  }
});

// 장바구니 조회 API
app.get('/api/cart', (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const userCart = carts[userId] || [];

    // Http 상태 200: 장바구니 조회 성공
    res.status(200).json({
      success: true,
      items: userCart.map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        option: item.option,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        imageUrl: item.imageUrl
      }))
    });
  } catch (error) {
    // Http 500: 서버 에러
    res.status(500).json({ 
      success: false, 
      message: '서버와 연결할 수 없습니다.' 
    });
  }
});

// 장바구니 수정 API
app.patch('/api/cart/:itemId', (req, res) => {
  try {
    const userId = req.body.userId || 1;
    const itemId = parseInt(req.params.itemId);
    const { quantity, option } = req.body;

    // 장바구니 또는 상품이 없는 경우 빈 장바구니 생성
    if (!carts[userId]) {
      carts[userId] = [];
    }

    // Http 404: itemId 없음 (이미 삭제된 상품)
    const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: '이미 삭제된 상품입니다.' 
      });
    }

    // 수량 또는 옵션 수정
    if (quantity !== undefined) {
      carts[userId][itemIndex].quantity = quantity;
    }
    if (option !== undefined) {
      carts[userId][itemIndex].option = option;
    }

    // Http 상태 200: 장바구니 수정 성공
    res.status(200).json({
      success: true,
      message: '장바구니가 수정되었습니다.',
      item: carts[userId][itemIndex]
    });
  } 
  // Http 500: 서버 에러
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '서버와 연결할 수 없습니다.' 
    });
  }
});

// 장바구니 삭제 API
app.delete('/api/cart/:itemId', (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const itemId = parseInt(req.params.itemId);


    if (!carts[userId]) {
      carts[userId] = [];
    }

    const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);

    // http 상태 404: itemId 없음 (이미 삭제된 상품)
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: '이미 삭제된 상품입니다.' 
      });
    }

    carts[userId].splice(itemIndex, 1);

    res.status(200).json({
      success: true,
      message: '상품이 삭제되었습니다.'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '서버와 연결할 수 없습니다.' 
    });
  }
});

// 주문 API
app.post('/api/order', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

