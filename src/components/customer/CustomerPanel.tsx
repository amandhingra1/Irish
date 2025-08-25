import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut,
  Clock,
  Star,
  Package,
  Phone,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CustomerPanel: React.FC = () => {
  const { user, logout, services, favorites, addToFavorites, removeFromFavorites, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: MessageSquare },
    { id: 'packages', label: 'My Packages', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-pink-600" />
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={user?.name || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={user?.phone || 'Not provided'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={user?.city || 'Mumbai'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    const success = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (success) {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
    }
  };

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
      
      <div className="space-y-4">
        {[
          {
            id: 1,
            service: 'Classic Facial',
            date: '2024-01-20',
            time: '2:00 PM',
            status: 'Confirmed',
            price: 1200,
            professional: 'Priya Sharma'
          },
          {
            id: 2,
            service: 'Hair Spa Treatment',
            date: '2024-01-18',
            time: '11:00 AM',
            status: 'Completed',
            price: 1500,
            professional: 'Anjali Patel'
          },
          {
            id: 3,
            service: 'Manicure & Pedicure',
            date: '2024-01-15',
            time: '4:00 PM',
            status: 'Completed',
            price: 800,
            professional: 'Sneha Gupta'
          }
        ].map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{booking.service}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {booking.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {booking.time}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {booking.professional}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-pink-600">₹{booking.price}</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              {booking.status === 'Completed' && (
                <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                  Write Review
                </button>
              )}
              <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
      
      {favorites.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No favorite services yet. Start adding services you love!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(service => favorites.includes(service.id)).map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-pink-600 font-semibold">₹{service.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration}
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    Book Now
                  </button>
                  <button 
                    onClick={() => removeFromFavorites(service.id)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
        
        {!showChangePassword ? (
          <button
            onClick={() => setShowChangePassword(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleChangePassword}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAllServices = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">All Services</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-pink-600 font-semibold">₹{service.price}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Clock className="w-4 h-4 mr-1" />
                {service.duration}
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                  Book Now
                </button>
                <button 
                  onClick={() => favorites.includes(service.id) ? removeFromFavorites(service.id) : addToFavorites(service.id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(service.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return renderBookings();
      case 'favorites':
        return renderFavorites();
      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">Your reviews will appear here.</p>
            </div>
          </div>
        );
      case 'packages':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Packages</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">Your custom packages will appear here.</p>
            </div>
          </div>
        );
      case 'settings':
        return renderSettings();
      default:
        return renderProfile();
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
              <span className="text-xl font-bold text-pink-600">Miss Irish</span>
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

export default CustomerPanel;