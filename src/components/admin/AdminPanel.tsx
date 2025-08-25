import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  Package, 
  Star, 
  MessageSquare, 
  BarChart3, 
  Calendar,
  LogOut,
  Home,
  Edit,
  Trash2,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Upload,
  Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { 
    user, 
    logout, 
    services, 
    addService, 
    updateService, 
    deleteService,
    reviews,
    updateReviewStatus,
    siteContent,
    updateSiteContent
  } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingService, setEditingService] = useState<any>(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    gender: 'both',
    trending: false,
    bestSeller: false
  });
  const [editingContent, setEditingContent] = useState({
    headerTitle: siteContent.header.title,
    headerSubtitle: siteContent.header.subtitle,
    footerDescription: siteContent.footer.description,
    footerEmail: siteContent.footer.email
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'content', label: 'Content', icon: Edit },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleAddService = () => {
    if (!newService.name || !newService.price || !newService.duration || !newService.category) {
      alert('Please fill in all required fields');
      return;
    }

    const serviceData = {
      ...newService,
      price: parseInt(newService.price),
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
      setEditingService(null);
    } else {
      addService(serviceData);
    }

    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      gender: 'both',
      trending: false,
      bestSeller: false
    });
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration,
      category: service.category,
      gender: service.gender,
      trending: service.trending || false,
      bestSeller: service.bestSeller || false
    });
  };

  const handleUpdateContent = () => {
    const updatedContent = {
      header: {
        title: editingContent.headerTitle,
        subtitle: editingContent.headerSubtitle
      },
      footer: {
        description: editingContent.footerDescription,
        email: editingContent.footerEmail
      }
    };
    updateSiteContent(updatedContent);
  };
  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">856</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">4.8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Package className="w-6 h-6 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-semibold text-gray-900">{services.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Customer {i}</p>
                  <p className="text-sm text-gray-600">Facial Treatment</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">₹1,200</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h3>
          <div className="space-y-3">
            {services.slice(0, 5).map((service, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-900">{service.name}</span>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 10} bookings</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
      </div>
      
      {/* Add/Edit Service Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingService ? 'Edit Service' : 'Add New Service'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 60 min)"
            value={newService.duration}
            onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <select
            value={newService.category}
            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            <option value="Facial">Facial</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Nail Care">Nail Care</option>
            <option value="Massage">Massage</option>
            <option value="Makeup">Makeup</option>
            <option value="Grooming">Grooming</option>
            <option value="Beauty">Beauty</option>
          </select>
          <select
            value={newService.gender}
            onChange={(e) => setNewService({ ...newService, gender: e.target.value as any })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="both">Both</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newService.trending}
              onChange={(e) => setNewService({ ...newService, trending: e.target.checked })}
              className="mr-2"
            />
            Trending Service
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newService.bestSeller}
              onChange={(e) => setNewService({ ...newService, bestSeller: e.target.checked })}
              className="mr-2"
            />
            Best Seller
          </label>
        </div>
        <div className="flex space-x-3 mt-4">
          <button 
            onClick={handleAddService}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {editingService ? 'Update Service' : 'Add Service'}
          </button>
          {editingService && (
            <button
              onClick={() => {
                setEditingService(null);
                setNewService({ name: '', description: '', price: '', duration: '', category: '', gender: 'both', trending: false, bestSeller: false });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{service.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{service.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-1">
                    {service.trending && <span className="px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded-full">Trending</span>}
                    {service.bestSeller && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Best Seller</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditService(service)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteService(service.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', city: 'Mumbai', bookings: 12 },
              { name: 'Anjali Patel', email: 'anjali@example.com', phone: '+91 98765 43211', city: 'Delhi', bookings: 8 },
              { name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 98765 43212', city: 'Bangalore', bookings: 15 },
              { name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 98765 43213', city: 'Chennai', bookings: 5 },
            ].map((customer, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.city}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.bookings}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-900">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  const renderReviews = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reviews Management</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => {
              const service = services.find(s => s.id === review.serviceId);
              return (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service?.name || 'Unknown Service'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-1">({review.rating})</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    review.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {review.type === 'video' ? 'Video' : 'Text'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    review.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    review.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Eye className="w-4 h-4" />
                  </button>
                  {review.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => updateReviewStatus(review.id, 'approved')}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateReviewStatus(review.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Total Bookings</h3>
          <p className="text-2xl font-bold text-blue-900">856</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">Pending</h3>
          <p className="text-2xl font-bold text-yellow-900">23</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Confirmed</h3>
          <p className="text-2xl font-bold text-green-900">45</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-800">Completed</h3>
          <p className="text-2xl font-bold text-gray-900">788</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { id: 'BK001', customer: 'Priya Sharma', service: 'Classic Facial', datetime: '2024-01-20 2:00 PM', amount: 1200, status: 'Confirmed' },
              { id: 'BK002', customer: 'Anjali Patel', service: 'Hair Spa + Manicure', datetime: '2024-01-20 11:00 AM', amount: 1900, status: 'Pending' },
              { id: 'BK003', customer: 'Sneha Gupta', service: 'Bridal Makeup Package', datetime: '2024-01-21 9:00 AM', amount: 8000, status: 'Confirmed' },
              { id: 'BK004', customer: 'Rahul Kumar', service: 'Beard Grooming', datetime: '2024-01-19 4:00 PM', amount: 600, status: 'Completed' },
            ].map((booking, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.datetime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{booking.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 mr-3">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Header Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Header Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Headline</label>
              <input
                type="text"
                value={editingContent.headerTitle}
                onChange={(e) => setEditingContent({ ...editingContent, headerTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                rows={3}
                value={editingContent.headerSubtitle}
                onChange={(e) => setEditingContent({ ...editingContent, headerSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button 
              onClick={handleUpdateContent}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Update Header
            </button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
              <textarea
                rows={3}
                value={editingContent.footerDescription}
                onChange={(e) => setEditingContent({ ...editingContent, footerDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                value={editingContent.footerEmail}
                onChange={(e) => setEditingContent({ ...editingContent, footerEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button 
              onClick={handleUpdateContent}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Update Footer
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h3>
          <div className="space-y-3">
            {['Facial', 'Hair Care', 'Nail Care', 'Massage', 'Makeup', 'Grooming'].map((category, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{category}</span>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>
        </div>

        {/* Cities Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Cities</h3>
          <div className="space-y-3">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'].map((city, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{city}</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center">
              <Plus className="w-4 h-4 mr-2" />
              Add City
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications for new bookings</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-approve Reviews</h4>
              <p className="text-sm text-gray-600">Automatically approve 5-star reviews</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
              <p className="text-sm text-gray-600">Put website in maintenance mode</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return renderServices();
      case 'customers':
        return renderCustomers();
      case 'reviews':
        return renderReviews();
      case 'bookings':
        return renderBookings();
      case 'content':
        return renderContentManagement();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/public/miss irish logo.jpg" 
                alt="Miss Irish" 
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
                }}
              />
              <span className="text-xl font-bold text-pink-600">Miss Irish Admin</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-pink-100 text-pink-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;