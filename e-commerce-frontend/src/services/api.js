// API SERVICE - Handles all backend communication
// ==============================================
// This file centralizes all API calls to your Spring Boot backend
// Base URL points to your backend server (default: localhost:8080)

import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors (like 401 unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 🔐 AUTHENTICATION API CALLS
export const authAPI = {
  // Register new customer
  // POST /auth/register
  // Body: { name: string, email: string, password: string }
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  // POST /auth/login  
  // Body: { email: string, password: string }
  // Returns: { token: string, user: object }
  login: (credentials) => api.post('/auth/login', credentials),
};

// 🛍️ PRODUCT API CALLS
export const productAPI = {
  // Get all products (PUBLIC - no auth needed)
  // GET /product/all
  getAllProducts: () => api.get('/product/all'),
  
  // Search products with filters
  // GET /product/search?name=&minPrice=&maxPrice=
  searchProducts: (name, minPrice, maxPrice) => {
    const params = new URLSearchParams();
    if (name && name.trim()) params.append('name', name.trim());
    if (minPrice && minPrice !== '') params.append('minPrice', minPrice);
    if (maxPrice && maxPrice !== '') params.append('maxPrice', maxPrice);
    
    const queryString = params.toString();
    return api.get(`/product/search${queryString ? '?' + queryString : ''}`);
  },
  
  // Add new product (requires auth)
  // POST /product/add
  // Body: { name: string, description: string, price: number, sellerId: number }
  addProduct: (productData) => api.post('/product/add', productData),
  
  // Update product (requires auth)
  // PUT /product/update/{id}
  updateProduct: (id, productData) => api.put(`/product/update/${id}`, productData),
  
  // Delete product (requires auth)
  // DELETE /product/delete/{id}
  deleteProduct: (id) => api.delete(`/product/delete/${id}`),
};

// 📦 ORDER API CALLS
export const orderAPI = {
  // Get all orders (requires auth)
  // GET /orders/all
  getAllOrders: () => api.get('/orders/all'),
  
  // Create new order (requires auth)
  // POST /orders/add
  // Body: { customerId: number, address: string, items: [{ productId: number, quantity: number, price: number }] }
  createOrder: (orderData) => api.post('/orders/add', orderData),
  
  // Cancel order (requires auth)
  // PUT /orders/{id}/cancel
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
  
  // Update order status (requires auth)
  // PUT /orders/{id}/status?value=
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status?value=${status}`),
};

// 👤 CUSTOMER API CALLS
export const customerAPI = {
  // Get all customers (requires auth)
  // GET /customer/all
  getAllCustomers: () => api.get('/customer/all'),
  
  // Add customer (requires auth)
  // POST /customer/add
  addCustomer: (customerData) => api.post('/customer/add', customerData),
  
  // Update customer (requires auth)
  // PUT /customer/update/{id}
  updateCustomer: (id, customerData) => api.put(`/customer/update/${id}`, customerData),
  
  // Delete customer (requires auth)
  // DELETE /customer/delete/{id}
  deleteCustomer: (id) => api.delete(`/customer/delete/${id}`),
};

export default api;
