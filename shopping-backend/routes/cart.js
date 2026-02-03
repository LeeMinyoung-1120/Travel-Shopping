const express = require('express');
const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileHelper');

const router = express.Router();
const filePath = path.join(__dirname, '../data/cart.json');

// 장바구니 조회
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || '1';
    const carts = await readJSON(filePath);
    const userCart = carts[userId] || [];
    
    // Http 200: 각 아이템에 총 가격 추가
    res.status(200).json({
      success: true,
      items: userCart.map(item => ({
        ...item,
        totalPrice: item.price * item.quantity
      }))
    });
  } 
  // Http 500: 서버 에러
  catch (error) {
    res.status(500).json({ success: false, message: '장바구니 조회 실패' });
  }
});

// 장바구니 추가
router.post('/', async (req, res) => {
  try {
    const { userId, itemId, name, price, option, quantity, imageUrl } = req.body;
    // 필수 값 확인 (유저 id, 유저 명, 아이템 id, 가격)
    if (!userId || !itemId || !name || !price) {
      // Http 400: 필수 값 누락
      return res.status(400).json({ success: false, message: '필수 값이 누락되었습니다.' });
    }

    const carts = await readJSON(filePath);
    
    // 해당 유저의 장바구니가 없으면 생성
    if (!carts[userId]) {
      carts[userId] = [];
    }

    // 이미 존재하는 상품인지 확인
    const existItemIndex = carts[userId].findIndex(item => item.itemId === itemId);
    if (existItemIndex !== -1) {
      // 이미 존재하면 수량 증가
      carts[userId][existItemIndex].quantity += quantity || 1;
    } else {
      // 새 상품 추가
      carts[userId].push({
        itemId,
        userId,
        name,
        price,
        option: option || '기본 옵션',
        quantity: quantity || 1,
        imageUrl: imageUrl || ''
      });
    }

    // 저장 후 응답 전송
    await writeJSON(filePath, carts);
    res.status(200).json({ success: true, message: '장바구니에 추가되었습니다.' });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: '장바구니 추가 실패' });
  }
});

// 장바구니 수정
router.patch('/:itemId', async (req, res) => {
  try {
    const userId = req.body.userId || '1';
    const itemId = parseInt(req.params.itemId);
    const { quantity, option } = req.body;

    const carts = await readJSON(filePath);

    // 해당 유저의 장바구니가 없으면 생성
    if (!carts[userId]) carts[userId] = [];
    
    const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);
    // itemId가 없으면 Http :404 응답
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: '상품 없음' });
    }

    // 수량 및 옵션 수정
    if (quantity !== undefined) carts[userId][itemIndex].quantity = quantity;
    if (option !== undefined) carts[userId][itemIndex].option = option;

    await writeJSON(filePath, carts);
    // Http 200: 수정된 아이템 정보 응답
    res.status(200).json({ success: true, item: carts[userId][itemIndex] });
  } 
  // Http 500: 서버 에러
  catch (error) {
    res.status(500).json({ success: false, message: '장바구니 수정 실패' });
  }
});

// 장바구니 삭제
router.delete('/:itemId', async (req, res) => {
  try {
    const userId = req.query.userId || '1';
    const itemId = parseInt(req.params.itemId);

    const carts = await readJSON(filePath);
    
    // 해당 유저의 장바구니가 없으면 생성
    if (!carts[userId]) carts[userId] = [];
    
    // itemId가 없으면 Http :404 응답
    const itemIndex = carts[userId].findIndex(item => item.itemId === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: '상품 없음' });
    }

    // 아이템 삭제
    carts[userId].splice(itemIndex, 1);
    
    // http 200: 삭제 성공
    await writeJSON(filePath, carts);
    res.status(200).json({ success: true });
  } 
  // Http 500: 서버 에러
  catch (error) {
    res.status(500).json({ success: false, message: '장바구니 삭제 실패' });
  }
});

module.exports = router;