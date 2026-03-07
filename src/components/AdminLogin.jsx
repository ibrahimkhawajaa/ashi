import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('ashi');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting login with:', { username, password });
      
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        onLogin(response.data.admin);
      }
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Make sure backend is running on port 5000');
      } else if (err.response) {
        setError(err.response.data.message || 'Invalid credentials');
      } else if (err.request) {
        setError('No response from server. Check if backend is running');
      } else {
        setError('Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  // Test backend connection
  const testConnection = async () => {
    try {
      await axios.get('http://localhost:5000/api/properties');
      alert('✅ Backend is connected!');
    } catch (err) {
      alert('❌ Cannot connect to backend. Make sure server is running on port 5000');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md w-full shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-light mb-2">ADMIN LOGIN</h2>
          <p className="text-xs text-gray-400">ASHI REALTY</p>
        </div>
        
        {/* Test Connection Button */}
        <button
          onClick={testConnection}
          className="w-full mb-4 px-4 py-2 bg-green-600 text-white text-xs font-light hover:bg-green-700 transition"
        >
          TEST BACKEND CONNECTION
        </button>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 tracking-wider">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-gray-900 text-base"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1 tracking-wider">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-gray-900 text-base"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 text-sm font-light hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>Default: ashi / admin123</p>
          <p className="mt-1">Make sure backend is running on port 5000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;