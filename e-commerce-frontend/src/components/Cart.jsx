// Cart Page - Shows materials user wants to inquire about and place bulk orders
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load cart items from browser storage when page loads
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, [isAuthenticated, navigate]);

  // Change how much of a material the user wants
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove a material from the cart completely
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate how much the total order will cost
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Send the bulk order to the backend
  const handleCheckout = async () => {
    if (!address.trim()) {
      setError('Please enter a delivery address for bulk shipment');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your inquiry list is empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Prepare order data according to backend OrderDTO structure
      const orderData = {
        customerId: user.id,
        address: address,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await orderAPI.createOrder(orderData);
      
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Bulk order placed successfully! We will contact you for delivery arrangements.');
        // Clear cart
        setCartItems([]);
        localStorage.removeItem('cart');
        setAddress('');
        setTimeout(() => navigate('/orders'), 2000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response?.data?.message) {
        setError(`Failed to place order: ${error.response.data.message}`);
      } else {
        setError('Failed to place order. Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="main-container content-section text-center">
        <h2>Please login to view your inquiry list</h2>
      </div>
    );
  }

  return (
    <div className="main-container content-section">
      <h1 className="margin-bottom-large">Material Inquiry List</h1>

      {/* Success message */}
      {successMessage && (
        <div className="alert-message success-message margin-bottom-medium">
          {successMessage}
          <button 
            onClick={() => setSuccessMessage('')} 
            style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="alert-message error-message margin-bottom-medium">
          {error}
          <button 
            onClick={() => setError('')} 
            style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px' }}
          >
            ×
          </button>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h3>Your inquiry list is empty</h3>
          <p className="gray-text">Add some waste materials to get started!</p>
          <button 
            onClick={() => navigate('/products')} 
            className="simple-button green-button"
          >
            Browse Materials
          </button>
        </div>
      ) : (
        <div className="simple-grid two-columns">
          {/* CART ITEMS */}
          <div className="simple-card">
            <h3 className="card-header">Selected Materials</h3>
            
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="green-text">₹{item.price.toFixed(2)} per kg</p>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="padding-small">{item.quantity} kg</span>
                  <button 
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div>
                  <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                </div>
                
                <button 
                  className="simple-button red-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* CHECKOUT SECTION */}
          <div className="simple-card">
            <h3 className="card-header">Bulk Order Details</h3>
            
            <div className="input-group">
              <label htmlFor="address" className="input-label">Delivery Address / Factory Location</label>
              <textarea
                id="address"
                className="text-input"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your factory/warehouse address for bulk delivery"
                required
              />
            </div>

            <div className="margin-bottom-medium">
              <h4>Order Summary</h4>
              <div className="flex-row flex-between">
                <span>Materials ({cartItems.length}):</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex-row flex-between">
                <span>Bulk Delivery:</span>
                <span>Included</span>
              </div>
              <hr />
              <div className="flex-row flex-between">
                <strong>Total: ₹{calculateTotal().toFixed(2)}</strong>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="simple-button green-button full-width"
              disabled={loading}
            >
              {loading ? 'Placing Bulk Order...' : 'Place Bulk Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
