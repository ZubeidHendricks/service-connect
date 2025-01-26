import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const LeadForm = () => {
  const categories = {
    'Digital Services': [
      'AI Agent Development',
      'Web Design',
      'Web Development',
      'Lead Generation',
      'SEO Services',
      'Digital Marketing',
      'Mobile App Development'
    ],
    'Home Services': [
      'Cleaning',
      'Gardening',
      'Painting',
      'Plumbing',
      'Electrical',
      'Moving',
      'Home Improvement'
    ],
    'Professional Services': [
      'Accounting',
      'Legal Services',
      'Business Consulting',
      'Translation',
      'Writing & Content',
      'Virtual Assistant'
    ]
  };

  const budgetRanges = [
    'R500 - R2,000',
    'R2,000 - R5,000',
    'R5,000 - R10,000',
    'R10,000 - R20,000',
    'R20,000 - R50,000',
    'R50,000+'
  ];

  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    budget: '',
    phone: '',
    email: '',
    serviceNeeded: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (formData.category) {
      setSubcategories(categories[formData.category] || []);
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
  }, [formData.category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', {
      to: 'pricklypairstudiosza@gmail.com',
      subject: `New Service Request: ${formData.subcategory}`,
      body: `
        Category: ${formData.category}
        Subcategory: ${formData.subcategory}
        Budget Range: ${formData.budget}
        Phone: ${formData.phone}
        Email: ${formData.email}
        Details: ${formData.serviceNeeded}
      `
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      category: '',
      subcategory: '',
      budget: '',
      phone: '',
      email: '',
      serviceNeeded: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">ServiceConnect</h1>
        <p className="text-gray-600 mt-2">Connect with trusted service providers in minutes</p>
      </div>
      <div>
        {submitted && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded p-3 flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <p className="text-green-600 ml-2">
              Request submitted successfully! A provider will contact you soon.
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Service Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {formData.category && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Service Type
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a service type</option>
                {subcategories.map(subcat => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Budget Range (ZAR)
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select budget range</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Describe Your Needs
            </label>
            <textarea
              name="serviceNeeded"
              value={formData.serviceNeeded}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
              required
              placeholder="Please provide details about the service you need..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;