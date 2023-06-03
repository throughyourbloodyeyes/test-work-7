import React, { useState } from 'react';
import './FastFoodKiosk.css';


interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const FastFoodKiosk: React.FC = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const generateId = (): string => {
    return Math.random().toString(36);
  };

  const addItemToOrder = (item: string, price: number) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.name === item);

    if (itemIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[itemIndex].quantity++;
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { id: generateId(), name: item, quantity: 1, price }]);
    }
  };

  const removeItemFromOrder = (itemId: string) => {
    const updatedOrder = order.filter((orderItem) => orderItem.id !== itemId);
    setOrder(updatedOrder);
  };

  const getTotalPrice = (): number => {
    return order.reduce((total, item) => total + item.quantity * item.price, 0);
  };


  return (
    <div className="container">
      <div className="order-details">
        <h2>Order Details</h2>
        {order.length === 0 && <p>No items in the order.</p>}
        {order.length > 0 && (
        <div>
    <p>Order items:</p>
    <ul>
      {order.map((item) => (
        <li className='list' key={item.id}>
          {item.name} ({item.quantity}) - {item.price * item.quantity} KGS
          <button className="remove-button" onClick={() => removeItemFromOrder(item.id)}>Remove</button>
        </li>
      ))}
      </ul>
    </div>
)}
        <p className="total-price">Total price: {getTotalPrice()} KGS</p>
      </div>
      <div className="add-items">
        <h2>Add items</h2>
        <button className='buttonItem' onClick={() => addItemToOrder('Hamburger', 80)}>Hamburger <span className='buttonItemSpan'>80 KGS</span></button>
        <button className='buttonItem' onClick={() => addItemToOrder('Fries', 45)}>Fries <span className='buttonItemSpan'>45 KGS</span></button>
        <button className='buttonItem' onClick={() => addItemToOrder('Coca Cola', 30)}>Coca Cola <span className='buttonItemSpan'>30 KGS</span></button>
        <button className='buttonItem' onClick={() => addItemToOrder('Ice Cream', 60)}>Ice Cream <span className='buttonItemSpan'>60 KGS</span></button>
        <button className='buttonItem' onClick={() => addItemToOrder('Coffee', 70)}>Coffee <span className='buttonItemSpan'>70 KGS</span></button>
        <button className='buttonItem' onClick={() => addItemToOrder('Cheeseburger', 90)}>Cheeseburger <span className='buttonItemSpan'>90 KGS</span></button>
      </div>
    </div>
  );
};

export default FastFoodKiosk;


