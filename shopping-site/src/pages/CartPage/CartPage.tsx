import React from 'react';
import { useCart } from '../../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>예약하기</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              <div>
                <h3>{item.name}</h3>
                <p>옵션: {item.options}</p>
                <p>가격: {item.price.toLocaleString()}원</p>
                <p>인원: 
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  명
                </p>
                <p>합계: {(item.price * item.quantity).toLocaleString()}원</p>
                <button onClick={() => removeItem(item.id)}>제거</button>
              </div>
            </div>
          ))}

          <div style={{ border: '1px solid #ccc', paddingTop: '20px', marginTop: '20px' ,padding: '10px', margin: '10px 0',}}>
            <h3>결제 정보</h3>
            <h4 style={{borderTop: '1px solid #ccc'}}>주문 금액</h4>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name} ({item.options})</span>
                <span>{(item.price * item.quantity).toLocaleString()}원</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '10px'}}>
              <span>총 결제 금액:</span>
              <span>{total.toLocaleString()}원</span>
            </div>
            <button style={{ marginTop: '10px', padding: '10px 20px' }}>결제하기</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;