// Product List Page - Shows all the waste materials available for sale
import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Get all products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search for specific products based on filters
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await productAPI.searchProducts(
        searchTerm || null,
        priceRange.min || null,
        priceRange.max || null
      );
      setProducts(response.data);
    } catch (err) {
      setError('Failed to search products. Please try again.');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear search and show all products again
  const handleReset = () => {
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="loading-box">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="main-container content-section">
      <h1 className="text-center margin-bottom-large">Agricultural Waste Materials</h1>

      {/* Search and filter section */}
      <div className="search-box">
        <div className="simple-card">
          <h3 className="card-header margin-bottom-medium">Search & Filter Waste Materials</h3>
          <div className="flex-row gap-medium margin-bottom-medium">
            <input
              type="text"
              placeholder="Search by material name (e.g., rice husk, wheat straw)..."
              className="text-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min Price (₹/kg)"
              className="text-input"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              style={{ maxWidth: '140px' }}
            />
            <input
              type="number"
              placeholder="Max Price (₹/kg)"
              className="text-input"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              style={{ maxWidth: '140px' }}
            />
          </div>
          <div className="flex-row gap-medium">
            <button onClick={handleSearch} className="simple-button green-button">
              Search Materials
            </button>
            <button onClick={handleReset} className="simple-button gray-button">
              Show All
            </button>
          </div>
        </div>
      </div>

      {/* Show error message if something went wrong */}
      {error && (
        <div className="alert-message error-message">
          {error}
        </div>
      )}

      {/* Show products or "no products found" message */}
      {products.length > 0 ? (
        <div className="simple-grid three-columns">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h3>No waste materials found</h3>
          <p className="gray-text">Try adjusting your search criteria or contact us to list new materials</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
