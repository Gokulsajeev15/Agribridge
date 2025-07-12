// Navigation Bar - The menu at the top of every page
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="top-navbar">
      <div className="main-container">
        <div className="navbar-content">
          {/* Website logo and name */}
          <Link to="/" className="website-logo">
            <img 
              src="/LOGO.png" 
              alt="AgriBridge Logo" 
              style={{ height: '40px', width: 'auto' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.textContent = '🌾 AgriBridge';
              }}
            />
            <span>AgriBridge</span>
          </Link>

          {/* Menu links */}
          <ul className="navigation-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Waste Materials</Link></li>
            
            {/* Show different links if user is logged in */}
            {isAuthenticated() ? (
              <>
                <li><Link to="/cart">Inquiry List</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>
                  <span className="gray-text">Welcome, {user?.name}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="simple-button white-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              /* Show login/register if not logged in */
              <>
                <li><Link to="/login" className="simple-button white-button">Login</Link></li>
                <li><Link to="/register" className="simple-button green-button">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
