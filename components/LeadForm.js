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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedBody = `\nNew Service Request\n\nCategory: ${formData.category}\nService Type: ${formData.subcategory}\nBudget Range: ${formData.budget}\n\nContact Details:\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nDetails:\n${formData.serviceNeeded}`;

    window.location.href = `mailto:pricklypairstudiosza@gmail.com?subject=New Service Request: ${formData.subcategory}&body=${encodeURIComponent(formattedBody)}`;
    
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
    <div className="w-full max-w-xl mx-auto">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800">ServiceConnect</h1>
          <p className="text-gray-500 mt-2 text-sm">Connect with trusted service providers in minutes</p>
        </div>
        
        {submitted && (
          <div className="mb-6 bg-green-50/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-green-700 ml-2 text-sm font-medium">
              Request sent successfully
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Service Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-600"
                required
              >
                <option value="">Select category</option>
                {Object.keys(categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {formData.category && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Service Type
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-600"
                  required
                >
                  <option value="">Select type</option>
                  {subcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Budget Range (ZAR)
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            >
              <option value="">Select budget</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-600"
                required
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-600"
                required
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Project Details
            </label>
            <textarea
              name="serviceNeeded"
              value={formData.serviceNeeded}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-600 h-32"
              required
              placeholder="Tell us about your project needs..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;