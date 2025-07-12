// Orders Page - Shows all the bulk orders user has placed
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Get all orders when page loads
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders();
      console.log('Orders data from backend:', response.data); // Debug log
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel an order if user changes their mind
  const handleCancelOrder = async (orderId) => {
    // Check if orderId is valid
    if (!orderId || orderId === 'undefined') {
      setError('Invalid order ID. Unable to cancel order.');
      return;
    }

    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancelingOrderId(orderId); // Show loading state for this specific order
      setError(''); // Clear any previous errors
      setSuccessMessage(''); // Clear any previous success messages
      
      await orderAPI.cancelOrder(orderId);
      setSuccessMessage('Order cancelled successfully!');
      fetchOrders(); // Refresh the list to show updated status
    } catch (error) {
      console.error('Error cancelling order:', error);
      if (error.response?.status === 404) {
        setError('Order not found. It may have already been cancelled or completed.');
      } else if (error.response?.status === 401) {
        setError('You are not authorized to cancel this order. Please login again.');
      } else if (error.response?.data?.message) {
        setError(`Failed to cancel order: ${error.response.data.message}`);
      } else {
        setError('Failed to cancel order. Please check your internet connection and try again.');
      }
    } finally {
      setCancelingOrderId(null); // Remove loading state
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="main-container content-section text-center">
        <h2>Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-box">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="main-container content-section">
      <h1 className="margin-bottom-large">My Orders</h1>

      {/* Success message - shows when order is cancelled successfully */}
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

      {/* Error message - shows when something goes wrong */}
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

      {orders.length === 0 ? (
        <div className="text-center">
          <h3>No orders found</h3>
          <p className="gray-text">You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="simple-button green-button"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="simple-grid two-columns">
          {orders.map((order) => (
            <div key={order.orderId} className="simple-card">
              <div className="flex-row flex-between align-center margin-bottom-small">
                <h3 className="card-header">Order #{order.orderId}</h3>
                <span className={`
                  ${order.status === 'COMPLETED' ? 'green-text' : 
                    order.status === 'CANCELLED' ? 'red-text' : 
                    'blue-text'}
                `}>
                  {order.status || 'PENDING'}
                </span>
              </div>
              
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Total Amount:</strong> ₹{order.total?.toFixed(2) || 'N/A'}</p>
              
              {/* List of materials in this order */}
              {order.items && order.items.length > 0 && (
                <div className="margin-top-medium">
                  <h4>Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex-row flex-between padding-small" style={{
                      borderBottom: '1px solid #eee'
                    }}>
                      <span>{item.productName || `Product ID: ${item.productId}`}</span>
                      <span>Qty: {item.quantity} × ₹{item.price?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Cancel button (only show if order can be cancelled) */}
              {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                <div className="margin-top-medium">
                  <button 
                    onClick={() => handleCancelOrder(order.orderId)}
                    disabled={cancelingOrderId === order.orderId}
                    className={`simple-button red-button ${cancelingOrderId === order.orderId ? 'disabled-button' : ''}`}
                  >
                    {cancelingOrderId === order.orderId ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
