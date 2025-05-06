import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Payment.css';

const Payment = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem('pendingOrder');
    if (!storedOrder) {
      navigate('/'); // Redirect to homepage if no pending order
    } else {
      setOrder(JSON.parse(storedOrder));
    }
  }, [navigate]);

  const confirmOrder = async () => {
    try {
      // Here you can send the order to your backend for processing, if needed.
      // await axios.post('/api/confirm-order', order);

      Swal.fire({
        title: '✅ Order Confirmed!',
        text: 'Your order has been successfully placed.',
        icon: 'success',
        confirmButtonText: 'Go to Home',
      }).then(() => {
        localStorage.removeItem('pendingOrder'); // Clear order data from localStorage
        navigate('/'); // Redirect to home page
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'There was a problem confirming your order. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div className="payment-container">
      {order ? (
        <div className="order-summary">
          <h2>🧾 Order Summary</h2>
          <div className="order-details">
            {order.products.map((item, index) => (
              <div key={index} className="order-item">
                <p>{item.name} x {item.quantity} = ₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="total-amount">
              <strong>Total Amount: ₹{order.totalAmount}</strong>
            </div>
            <div className="payment-method">
              <p><strong>Payment Method:</strong> Cash on Delivery</p>
            </div>
          </div>

          <button className="confirm-button" onClick={confirmOrder}>
            Confirm Order
          </button>
        </div>
      ) : (
        <div className="loading">
          <p>Loading your order...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
