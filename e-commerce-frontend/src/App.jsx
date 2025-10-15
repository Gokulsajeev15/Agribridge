// Main App - This is where everything starts!
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// All our pages and components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';

function App() {
  return (
    // AuthProvider gives login/logout powers to the whole app
    <AuthProvider>
      <Router>
        <div className="App">

          <Navbar />
          
          {/* Different pages for different URLs */}
          <main>
            <Routes>
              {/* Anyone can visit these pages */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              
              {/* You need to be logged in for these pages */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={
                <div className="container section text-center">
                  <h2>My Profile</h2>
                  <p>Profile page coming soon...</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
