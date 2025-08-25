import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = "+919834828850";
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/public/miss irish logo.jpg" 
                alt="Miss Irish" 
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
                }}
              />
              <span className="text-xl font-bold text-pink-400">Miss Irish</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional beauty and wellness services delivered to your doorstep. Experience salon-quality treatments in the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-pink-400" />
                <span>{whatsappNumber}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-pink-400" />
                <span>info@missirish.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-pink-400 mt-1" />
                <span>Available in Mumbai, Delhi, Bangalore, Chennai, Kolkata, Pune</span>
              </div>
            </div>
            
            <button
              onClick={handleWhatsAppClick}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Miss Irish. All rights reserved. | Professional Beauty Services at Your Doorstep</p>
        </div>
      </div>
    </footer>
  );
}