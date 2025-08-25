import React, { useState } from 'react';
import { MapPin, User, Menu, X, Phone, Mail, Clock, Shield } from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedTab: 'consultation' | 'services';
  onTabChange: (tab: 'consultation' | 'services') => void;
}

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'];

export default function Header({ selectedCity, onCityChange, selectedTab, onTabChange }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const whatsappNumber = "+919834828850";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}`, '_blank');
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-pink-600 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                <span>{whatsappNumber}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span>info@missirish.com</span>
              </div>
              <div className="hidden md:flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Available 24/7</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span>100% Safe & Hygienic</span>
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs font-medium transition-colors"
              >
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/public/miss irish logo.jpg" 
              alt="Miss Irish" 
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
              }}
            />
            <span className="ml-2 text-xl font-bold text-pink-600">Miss Irish</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {selectedCity}
              </button>
              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tab Toggle */}
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => onTabChange('consultation')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === 'consultation'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Consultation
              </button>
              <button
                onClick={() => onTabChange('services')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === 'services'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Services
              </button>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-pink-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
              >
                <User className="w-4 h-4 mr-1" />
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onTabChange('consultation')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                      selectedTab === 'consultation'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Consultation
                  </button>
                  <button
                    onClick={() => onTabChange('services')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                      selectedTab === 'services'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Services
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => user ? logout() : setIsLoginModalOpen(true)}
                className="w-full text-left py-2 text-gray-700 hover:text-pink-600"
              >
                {user ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    </header>
    </>
  );
}