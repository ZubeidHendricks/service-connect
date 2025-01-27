
import React, { useState, useEffect } from 'react';

const ServiceRequestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    address: '',
    details: '',
    timePeriod: '',
    budget: '',
    email: '',
    phone: ''
  });

  const categories = {
    'Digital Services': [
      'Web Development',
      'AI Development',
      'Digital Marketing',
      'Content Writing',
      'SEO Services',
      'Mobile App Development'
    ],
    'Home Services': [
      'Cleaning',
      'Gardening',
      'Plumbing',
      'Electrical',
      'Moving',
      'Painting',
      'Home Repair'
    ],
    'Professional Services': [
      'Legal Services',
      'Accounting',
      'Business Consulting',
      'Translation',
      'IT Support',
      'Virtual Assistant'
    ]
  };

  const getBudgetRanges = (category, subCategory) => {
    if (category === 'Home Services' && subCategory === 'Cleaning') {
      return [
        "R150/hour",
        "R200/hour",
        "R250/hour",
        "R300/hour",
        "R350/hour"
      ];
    }
    return [
      "R500 - R2,000",
      "R2,000 - R5,000",
      "R5,000 - R10,000",
      "R10,000 - R20,000",
      "R20,000 - R50,000",
      "R50,000+"
    ];
  };

  useEffect(() => {
    if (selectedCategory) {
      setSubCategories(categories[selectedCategory] || []);
      setFormData(prev => ({ ...prev, subCategory: '' }));
    }
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      alert('Request submitted successfully!');
      setFormData({
        category: '',
        subCategory: '',
        address: '',
        details: '',
        timePeriod: '',
        budget: '',
        email: '',
        phone: ''
      });
      setSelectedCategory('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-amber-400 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">ServiceConnect</h1>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setFormData(prev => ({ ...prev, category }));
              }}
              className={`p-4 rounded-full border-2 border-black text-lg ${
                selectedCategory === category ? 'bg-amber-400' : 'bg-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {subCategories.map((subCategory) => (
              <button
                key={subCategory}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, subCategory }))}
                className={`p-4 rounded-full border-2 border-black text-lg ${
                  formData.subCategory === subCategory ? 'bg-amber-400' : 'bg-white'
                }`}
              >
                {subCategory}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-2xl mb-2">Address*</label>
            <input
              type="text"
              className="w-full p-4 rounded-full border-2 border-black"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-2xl mb-2">Budget*</label>
            <select
              className="w-full p-4 rounded-full border-2 border-black text-lg"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              required
            >
              <option value="">Select budget range</option>
              {getBudgetRanges(formData.category, formData.subCategory).map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-2xl mb-2">Date and Time*</label>
            <input
              type="datetime-local"
              className="w-full p-4 rounded-full border-2 border-black"
              value={formData.timePeriod}
              onChange={(e) => setFormData({...formData, timePeriod: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-2xl mb-2">Details*</label>
            <textarea
              className="w-full p-4 rounded-2xl border-2 border-black h-32"
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              required
              placeholder="Describe what you need..."
            />
          </div>

          <div>
            <label className="block text-2xl mb-2">Email*</label>
            <input
              type="email"
              className="w-full p-4 rounded-full border-2 border-black"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-2xl mb-2">Phone*</label>
            <input
              type="tel"
              className="w-full p-4 rounded-full border-2 border-black"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              placeholder="(123) 456-7890"
            />
          </div>

          <p className="text-sm text-gray-600">* Required fields</p>

          <button
            type="submit"
            className="w-full p-6 bg-black text-white rounded-full text-xl font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
