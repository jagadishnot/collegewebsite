import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Ecommerce.css';

const Ecommerce = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalContent, setModalContent] = useState(null);

  // Use the environment variable for the backend API URL
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/ecommerce/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const decreaseQuantity = (productId) => {
    const existing = cart.find((item) => item._id === productId);
    if (existing.quantity === 1) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Cart is empty!',
        text: 'Please add some items before placing an order.',
      });
    }

    const userId = 'test-user-id'; // Replace with actual user ID
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const products = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    try {
      await axios.post(`${baseURL}/api/ecommerce/order`, {
        userId,
        products,
        totalAmount,
      });

      const orderDetails = cart.map(item => `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`).join('\n');

      setCart([]);

      Swal.fire({
        title: '🧾 Order Summary',
        html: `
          <p>${orderDetails.replace(/\n/g, '<br>')}</p>
          <hr />
          <p><strong>Total:</strong> ₹${totalAmount}</p>
          <p><strong>Payment Method:</strong> Cash on Delivery</p>
          <hr />
          <p style="color: green; font-weight: bold;">✅ Order Confirmed!</p>
        `,
        icon: 'success',
        confirmButtonText: 'Done',
        width: 500,
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'There was a problem placing your order.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  const openModal = (type) => {
    if (type === 'support') {
      setModalContent(
        <div className="modal-content">
          <h3>📞 Support</h3>
          <p>Email: support@collegecart.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Chat: Available 9 AM – 6 PM</p>
          <button onClick={closeModal}>Close</button>
        </div>
      );
    } else if (type === 'profile') {
      setModalContent(
        <div className="modal-content">
          <h3>👤 Profile Login</h3>
          <p><strong>User:</strong> Guest</p>
          <button>Login</button>
          <button>Register</button>
          <br /><br />
          <button onClick={closeModal}>Close</button>
        </div>
      );
    }
  };

  const closeModal = () => setModalContent(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="starry-bg">
      <div className="ecommerce-container">
        <h2>COLLEGE STORE 🏫🛒</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="top-right-buttons">
            <button className="top-button" onClick={() => openModal('support')}><span>🛠 Support</span></button>
            <button className="top-button" onClick={() => openModal('profile')}><span>👤 Profile</span></button>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                )}
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p><b>₹{product.price}</b></p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <div className="cart-section">
          <h3>🛍️ Cart</h3>
          {cart.length === 0 && <p>No items in cart.</p>}
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              {item.name} x {item.quantity} — ₹{item.price * item.quantity}
              <div>
                <button onClick={() => decreaseQuantity(item._id)}>➖</button>
                <button onClick={() => removeFromCart(item._id)}>❌ Remove</button>
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="cart-total">
              <strong>Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong><br />
              <button onClick={placeOrder}>Place Order</button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ecommerce;
