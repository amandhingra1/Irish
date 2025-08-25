import React from 'react';
import { MessageCircle, Calendar, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { siteContent } = useAuth();
  const whatsappNumber = "+919834828850";
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}`, '_blank');
  };

  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {siteContent.header.title.split(' ').slice(0, 2).join(' ')}
              <span className="text-pink-600 block">{siteContent.header.title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {siteContent.header.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Now on WhatsApp
              </button>
              <button 
                onClick={() => {
                  const consultationSection = document.getElementById('consultation-section');
                  if (consultationSection) {
                    consultationSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>4.8/5 Rating</span>
              </div>
              <div>50,000+ Happy Customers</div>
              <div>500+ Expert Professionals</div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Beauty Services"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Premium Quality</div>
                  <div className="text-sm text-gray-600">Certified Professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}