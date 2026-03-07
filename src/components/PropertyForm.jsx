import React, { useState } from 'react';
import axios from 'axios';

const PropertyForm = ({ property, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    location: property?.location || '',
    price: property?.price || '',
    beds: property?.beds || '',
    baths: property?.baths || '',
    sqft: property?.sqft || '',
    floors: property?.floors || '',
    area: property?.area || '',
    views: property?.views?.join(', ') || '',
    description: property?.description || '',
    type: property?.type || 'Houses',
    ecoFriendly: property?.ecoFriendly || false
  });

  const [newImages, setNewImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState(property?.gallery || []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      alert('Please select only image files (JPEG, PNG, GIF, etc.)');
    }
    
    // Limit to 10 images total (existing + new)
    if (existingImages.length + imageFiles.length > 10) {
      alert('Maximum 10 images allowed total');
      return;
    }
    
    setNewImages([...newImages, ...imageFiles]);
    
    // Create preview URLs
    const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviews]);
  };

  const removeNewImage = (index) => {
    const updatedImages = [...newImages];
    const updatedPreviews = [...imagePreview];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreview[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setNewImages(updatedImages);
    setImagePreview(updatedPreviews);
  };

  const removeExistingImage = (index) => {
    const updatedExisting = [...existingImages];
    updatedExisting.splice(index, 1);
    setExistingImages(updatedExisting);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    if (!property && newImages.length === 0) {
      alert('Please select at least one image');
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      
      // Prepare property data
      const propertyData = {
        ...formData,
        views: formData.views.split(',').map(v => v.trim()).filter(v => v),
        beds: parseInt(formData.beds),
        baths: parseInt(formData.baths),
        floors: parseInt(formData.floors),
        gallery: existingImages // Keep existing images
      };
      
      // Set main image (first image in gallery)
      if (existingImages.length > 0) {
        propertyData.image = existingImages[0];
      }
      
      formDataToSend.append('data', JSON.stringify(propertyData));
      
      // Add new images
      newImages.forEach(image => {
        formDataToSend.append('images', image);
      });
      
      const url = property 
        ? `http://localhost:5000/api/properties/${property._id}`
        : 'http://localhost:5000/api/properties';
      
      const method = property ? 'put' : 'post';
      
      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('✅ Property saved:', response.data);
      onSave(response.data);
      onClose();
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert(error.response?.data?.message || 'Error saving property');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">
              {property ? 'EDIT PROPERTY' : 'ADD NEW PROPERTY'}
            </h2>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={formData.title}
                onChange={handleChange}
                className="col-span-2 px-4 py-3 border rounded"
                required
              />
              
              <input
                type="text"
                name="location"
                placeholder="Location *"
                value={formData.location}
                onChange={handleChange}
                className="col-span-2 px-4 py-3 border rounded"
                required
              />
              
              <input
                type="text"
                name="price"
                placeholder="Price *"
                value={formData.price}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              />
              
              <input
                type="text"
                name="area"
                placeholder="Area *"
                value={formData.area}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              />
              
              <input
                type="number"
                name="beds"
                placeholder="Beds *"
                value={formData.beds}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              />
              
              <input
                type="number"
                name="baths"
                placeholder="Baths *"
                value={formData.baths}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              />
              
              <input
                type="text"
                name="sqft"
                placeholder="Sq Ft *"
                value={formData.sqft}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              />
              
              <input
                type="number"
                name="floors"
                placeholder="Floors *"
                value={formData.floors}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              />
              
              <input
                type="text"
                name="views"
                placeholder="Views (comma separated)"
                value={formData.views}
                onChange={handleChange}
                className="col-span-2 px-4 py-3 border rounded"
              />
              
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="px-4 py-3 border rounded"
                required
              >
                <option value="Houses">Houses</option>
                <option value="Condos">Condos</option>
                <option value="Apartments">Apartments</option>
              </select>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="ecoFriendly"
                  checked={formData.ecoFriendly}
                  onChange={handleChange}
                  className="mr-2"
                  id="ecoFriendly"
                />
                <label htmlFor="ecoFriendly">Eco-Friendly</label>
              </div>
            </div>

            <textarea
              name="description"
              placeholder="Description *"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded"
              required
            ></textarea>

            {/* Image Upload Section */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <label className="block text-sm font-medium mb-2">
                PROPERTY IMAGES {!property && '* (Select at least one)'}
              </label>
              
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded mb-4"
              />
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Existing Images ({existingImages.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                          alt={`Existing ${index + 1}`}
                          className="h-24 w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-black text-white text-xs px-1 rounded">
                            Main
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* New Images Preview */}
              {imagePreview.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">New Images ({imagePreview.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded border-2 border-green-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? 'SAVING...' : (property ? 'UPDATE PROPERTY' : 'SAVE PROPERTY')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border py-3 rounded hover:bg-gray-100"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;