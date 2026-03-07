import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InquiriesList = ({ inquiries, onUpdate, token }) => {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
  });

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:5000/api/inquiries/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        setLoading(true);
        await axios.delete(
          `http://localhost:5000/api/inquiries/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onUpdate();
      } catch (err) {
        console.error('Error deleting inquiry:', err);
        alert('Error deleting inquiry');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No inquiries yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-6 flex space-x-2">
        {['all', 'new', 'contacted', 'closed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-light border transition ${
              filter === status
                ? 'bg-gray-900 text-white border-gray-900'
                : 'border-gray-200 hover:bg-gray-100'
            }`}
          >
            {status.toUpperCase()} ({status === 'all' ? inquiries.length : inquiries.filter(i => i.status === status).length})
          </button>
        ))}
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">PROPERTY</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">CONTACT</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">NAME/EMAIL</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">MESSAGE</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">DATE</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">STATUS</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 font-light">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map(inquiry => (
                <tr key={inquiry._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{inquiry.propertyTitle}</div>
                    <div className="text-xs text-gray-400">ID: {inquiry.propertyId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <a href={`tel:${inquiry.phoneNumber}`} className="text-blue-600 hover:underline">
                        {inquiry.phoneNumber}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{inquiry.name || '-'}</div>
                    {inquiry.email && (
                      <div className="text-xs text-gray-400">
                        <a href={`mailto:${inquiry.email}`} className="hover:underline">
                          {inquiry.email}
                        </a>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm max-w-xs truncate" title={inquiry.message}>
                      {inquiry.message || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatDate(inquiry.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                      disabled={loading}
                      className={`px-2 py-1 text-xs border border-gray-200 focus:outline-none rounded ${getStatusBadgeClass(inquiry.status)}`}
                    >
                      <option value="new">NEW</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="closed">CLOSED</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteInquiry(inquiry._id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 text-xs disabled:opacity-50"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-400">
        Showing {filteredInquiries.length} of {inquiries.length} inquiries
      </div>
    </div>
  );
};

export default InquiriesList;