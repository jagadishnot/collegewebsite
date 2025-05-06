import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('order'));
    if (orderData) {
      setOrder(orderData);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const confirmOrder = () => {
    Swal.fire({
      icon: 'success',
      title: '✅ Order Confirmed!',
      text: 'Your order has been placed with Cash on Delivery.',
      confirmButtonText: 'Okay',
    }).then(() => {
      localStorage.removeItem('order');
      navigate('/');
    });
  };

  if (!order) return null;

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🧾 Order Summary</h2>
      <ul>
        {order.cart.map((item) => (
          <li key={item._id}>
            {item.name} x {item.quantity} — ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <hr />
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p><strong>Payment Method:</strong> Cash on Delivery</p>
      <button onClick={confirmOrder} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
        Confirm Order
      </button>
    </div>
  );
};

export default PaymentPage;
