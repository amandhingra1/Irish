import React from 'react';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TrendingServices() {
  const { services } = useAuth();
  const whatsappNumber = "+919834828850";
  
  const handleBookService = (service: any) => {
    const message = `Hi! I'd like to book ${service.name} for ₹${service.price}. Duration: ${service.duration}`;
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredServices = services.filter(service => service.trending);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trending Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Most popular beauty and wellness services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Trending
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-pink-600">₹{service.price}</div>
                  <button
                    onClick={() => handleBookService(service)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center text-sm"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}