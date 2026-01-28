const express = require('express');
const router = express.Router();

// 테스트 장바구니 데이터
let carts = {
  1: [
    { itemId: 1, name: '필리핀', price: 700000, option: '기본 옵션', quantity: 1, imageUrl: '/images/보홀.jpg' }
  ],
  2: [
    { itemId: 2, name: '중국', price: 500000, option: '기본 옵션', quantity: 1, imageUrl: '/images/상하이.jpg' }
  ],
  3: [
    { itemId: 3, name: '스위스', price: 800000, option: '기본 옵션', quantity: 1, imageUrl: '/images/스위스.jpg' }
  ]
};

// 장바구니 조회
router.get('/', (req, res) => {
  const userId = req.query.userId || 1;
  const userCart = carts[userId] || [];
  res.status(200).json({
    success: true,
    items: userCart.map(item => ({
      ...item,
      totalPrice: item.price * item.quantity
    }))
  });
});

// 장바구니 수정
router.patch('/:itemId', (req, res) => {
  const userId = req.body.userId || 1;
  const itemId = parseInt(req.params.itemId);
  const { quantity, option } = req.body;

  if (!carts[userId]) carts[userId] = [];
  const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);
  if (itemIndex === -1) return res.status(404).json({ success: false, message: '상품 없음' });

  if (quantity !== undefined) carts[userId][itemIndex].quantity = quantity;
  if (option !== undefined) carts[userId][itemIndex].option = option;

  res.status(200).json({ success: true, item: carts[userId][itemIndex] });
});

// 장바구니 삭제
router.delete('/:itemId', (req, res) => {
  const userId = req.query.userId || 1;
  const itemId = parseInt(req.params.itemId);

  if (!carts[userId]) carts[userId] = [];
  const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);
  if (itemIndex === -1) return res.status(404).json({ success: false, message: '상품 없음' });

  carts[userId].splice(itemIndex, 1);
  res.status(200).json({ success: true });
});

module.exports = router;
