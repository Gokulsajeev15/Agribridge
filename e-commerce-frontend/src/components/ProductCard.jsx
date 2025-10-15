// Product Card - Shows individual waste material with add to cart option
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Add this material to the user's inquiry list
  const addToCart = () => {
    if (!isAuthenticated()) {
      setMessage('Please login to add items to inquiry list');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setMessage('Material added to inquiry list!');
    setMessageType('success');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="product-card">
      {/* Show message if there's any feedback */}
      {message && (
        <div className={`alert-message ${messageType === 'success' ? 'success-message' : 'error-message'}`} style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          zIndex: 10,
          fontSize: '12px',
          padding: '8px'
        }}>
          {message}
        </div>
      )}
      
      {/* Image placeholder for the waste material */}
      <div className="product-image-box">
        <span style={{ fontSize: '2rem', color: '#4caf50' }}>●</span>
      </div>
      
      <div className="product-info">
        {/* Name of the waste material */}
        <h3 className="product-title">{product.name}</h3>
        
        {/* Description of what it can be used for */}
        <p className="product-description">{product.description}</p>
        
        {/* Price per kilogram */}
        <div className="product-price">
          ₹{product.price?.toFixed(2)}/kg
        </div>
        
        {/* Who is selling this material */}
        {product.seller && (
          <p className="gray-text">
            Supplier: {product.seller.name}
          </p>
        )}
        
        {/* Button to add to inquiry list */}
        <div className="product-buttons">
          <button 
            onClick={addToCart}
            className="simple-button green-button full-width"
          >
            Add to Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
