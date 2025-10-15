// Home Page - The main landing page when people visit our website
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Big welcome section at the top */}
      <section className="hero" style={{
        background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center'
      }}>
        <div className="main-container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Welcome to AgriBridge
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
            Transforming Agricultural Waste into Industrial Raw Materials - Connecting Farmers to Industries
          </p>
          <div className="flex-row flex-center gap-medium">
            <Link to="/products" className="simple-button green-button" style={{ fontSize: '1.2rem' }}>
              Browse Waste Products
            </Link>
            {!isAuthenticated() && (
              <Link to="/register" className="simple-button white-button" style={{ fontSize: '1.2rem', background: 'rgba(255,255,255,0.1)', borderColor: 'white', color: 'white' }}>
                Join Our Network
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section className="content-section">
        <div className="main-container">
          <h2 className="text-center margin-bottom-large">Why Choose AgriBridge for Agricultural Waste?</h2>
          
          <div className="simple-grid three-columns">
            <div className="simple-card text-center">
              <h3 className="card-header">Sustainable Solutions</h3>
              <p className="card-text">
                Convert agricultural waste into valuable industrial raw materials. 
                Reduce environmental impact while creating revenue streams.
              </p>
            </div>

            <div className="simple-card text-center">
              <h3 className="card-header">Industrial Supply</h3>
              <p className="card-text">
                Direct supply of rice husks, wheat straw, coconut coir, and other 
                agricultural waste to manufacturing industries.
              </p>
            </div>

            <div className="simple-card text-center">
              <h3 className="card-header">Fair Pricing</h3>
              <p className="card-text">
                Farmers get fair compensation for their waste materials while 
                industries get cost-effective raw materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="content-section" style={{ background: '#f8f9fa' }}>
        <div className="main-container">
          <h2 className="text-center margin-bottom-large">How Agricultural Waste Trading Works</h2>
          
          <div className="simple-grid four-columns">
            <div className="text-center">
              <div style={{ 
                background: '#2d5016', 
                color: 'white', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <h4>List Waste Materials</h4>
              <p>Farmers list their agricultural waste like rice husks, straw, coconut shells, etc.</p>
            </div>

            <div className="text-center">
              <div style={{ 
                background: '#2d5016', 
                color: 'white', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <h4>Industries Browse</h4>
              <p>Manufacturing industries find suitable raw materials for their production needs.</p>
            </div>

            <div className="text-center">
              <div style={{ 
                background: '#2d5016', 
                color: 'white', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <h4>Place Bulk Orders</h4>
              <p>Industries place bulk orders with delivery specifications and payment terms.</p>
            </div>

            <div className="text-center">
              <div style={{ 
                background: '#2d5016', 
                color: 'white', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                4
              </div>
              <h4>Sustainable Trade</h4>
              <p>Waste is transformed into valuable resources, benefiting both farmers and industries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="content-section">
        <div className="main-container text-center">
          <h2 className="margin-bottom-medium">Ready to Start Trading Agricultural Waste?</h2>
          <p className="margin-bottom-large" style={{ fontSize: '1.2rem' }}>
            Join our network of farmers and industries creating sustainable value from agricultural waste.
          </p>
          
          {isAuthenticated() ? (
            <Link to="/products" className="simple-button green-button" style={{ fontSize: '1.2rem' }}>
              Browse Waste Materials
            </Link>
          ) : (
            <div className="flex-row flex-center gap-medium">
              <Link to="/register" className="simple-button green-button" style={{ fontSize: '1.2rem' }}>
                Join as Farmer/Industry
              </Link>
              <Link to="/login" className="simple-button white-button" style={{ fontSize: '1.2rem' }}>
                Login
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
