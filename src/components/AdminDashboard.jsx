import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm';
import InquiriesList from './InquiriesList';

const AdminDashboard = ({ admin, onLogout }) => {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api';
  const token = localStorage.getItem('adminToken');

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [propsRes, inquiriesRes] = await Promise.all([
        axios.get(`${API_URL}/properties`),
        axios.get(`${API_URL}/inquiries`, axiosConfig)
      ]);
      setProperties(propsRes.data);
      setInquiries(inquiriesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`${API_URL}/properties/${id}`, axiosConfig);
        setProperties(properties.filter(p => p._id !== id));
      } catch (err) {
        alert('Error deleting property');
      }
    }
  };

  const handleSaveProperty = async (propertyData) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(propertyData));
      
      if (propertyData.newImages) {
        propertyData.newImages.forEach(image => {
          formData.append('images', image);
        });
      }

      if (selectedProperty) {
        const response = await axios.put(
          `${API_URL}/properties/${selectedProperty._id}`,
          formData,
          axiosConfig
        );
        setProperties(properties.map(p => 
          p._id === selectedProperty._id ? response.data : p
        ));
      } else {
        const response = await axios.post(`${API_URL}/properties`, formData, axiosConfig);
        setProperties([response.data, ...properties]);
      }
      setShowForm(false);
      setSelectedProperty(null);
    } catch (err) {
      alert('Error saving property');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-light">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light">ADMIN DASHBOARD</h1>
          <p className="text-sm text-gray-400">Welcome, {admin.username}</p>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 border border-gray-200 text-sm hover:bg-gray-900 hover:text-white transition"
        >
          LOGOUT
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 px-6">
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-6 py-3 text-sm font-light border-b-2 transition ${
            activeTab === 'properties' 
              ? 'border-gray-900 text-gray-900' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          PROPERTIES ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-6 py-3 text-sm font-light border-b-2 transition ${
            activeTab === 'inquiries' 
              ? 'border-gray-900 text-gray-900' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          INQUIRIES ({inquiries.length})
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'properties' ? (
          <>
            <button
              onClick={() => {
                setSelectedProperty(null);
                setShowForm(true);
              }}
              className="mb-6 px-6 py-3 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition"
            >
              + ADD NEW PROPERTY
            </button>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <div key={property._id} className="bg-white border border-gray-200">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`http://localhost:5000${property.image}`} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-light text-lg mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{property.location}</p>
                    <p className="text-lg font-light mb-3">{property.price}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowForm(true);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-200 text-xs hover:bg-gray-900 hover:text-white transition"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="flex-1 px-3 py-2 border border-red-200 text-red-600 text-xs hover:bg-red-600 hover:text-white transition"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <InquiriesList 
            inquiries={inquiries}
            onUpdate={fetchData}
            token={token}
          />
        )}
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={selectedProperty}
          onSave={handleSaveProperty}
          onClose={() => {
            setShowForm(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;