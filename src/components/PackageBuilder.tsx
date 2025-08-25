import React, { useState } from 'react';
import { Plus, Minus, Package, Check } from 'lucide-react';
import { Service } from '../types';

const availableServices: Service[] = [
  {
    id: '1',
    name: 'Classic Facial',
    description: 'Deep cleansing facial',
    price: 1200,
    duration: '60 min',
    image: '',
    category: 'Facial',
    gender: 'both'
  },
  {
    id: '2',
    name: 'Hair Spa',
    description: 'Nourishing hair treatment',
    price: 1500,
    duration: '90 min',
    image: '',
    category: 'Hair Care',
    gender: 'both'
  },
  {
    id: '3',
    name: 'Manicure',
    description: 'Complete nail care',
    price: 400,
    duration: '30 min',
    image: '',
    category: 'Nail Care',
    gender: 'both'
  },
  {
    id: '4',
    name: 'Pedicure',
    description: 'Foot care treatment',
    price: 500,
    duration: '45 min',
    image: '',
    category: 'Nail Care',
    gender: 'both'
  },
  {
    id: '5',
    name: 'Body Massage',
    description: 'Relaxing massage',
    price: 2000,
    duration: '75 min',
    image: '',
    category: 'Massage',
    gender: 'both'
  },
  {
    id: '6',
    name: 'Eyebrow Threading',
    description: 'Perfect eyebrow shaping',
    price: 200,
    duration: '15 min',
    image: '',
    category: 'Beauty',
    gender: 'both'
  }
];

export default function PackageBuilder() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [packageName, setPackageName] = useState('');
  const whatsappNumber = "+919834828850";

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = availableServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const getDiscountedPrice = () => {
    const total = getTotalPrice();
    const discount = selectedServices.length >= 3 ? 0.15 : selectedServices.length >= 2 ? 0.1 : 0;
    return Math.round(total * (1 - discount));
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = availableServices.find(s => s.id === serviceId);
      const duration = parseInt(service?.duration || '0');
      return total + duration;
    }, 0);
  };

  const handleBookPackage = () => {
    if (selectedServices.length === 0) return;
    
    const serviceNames = selectedServices.map(id => 
      availableServices.find(s => s.id === id)?.name
    ).join(', ');
    
    const message = `Hi! I'd like to book a custom package: ${packageName || 'Custom Package'}
Services: ${serviceNames}
Total Duration: ${getTotalDuration()} minutes
Original Price: ₹${getTotalPrice()}
Discounted Price: ₹${getDiscountedPrice()}`;
    
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Make Your Own Package
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a custom package by selecting multiple services and save more
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Name (Optional)
              </label>
              <input
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="e.g., My Relaxation Package"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {availableServices.map((service) => (
                <div
                  key={service.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedServices.includes(service.id)
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedServices.includes(service.id)
                        ? 'border-pink-500 bg-pink-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedServices.includes(service.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{service.duration}</span>
                    <span className="font-semibold text-pink-600">₹{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-pink-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Package Summary</h3>
              </div>

              {selectedServices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Select services to create your package
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedServices.map((serviceId) => {
                      const service = availableServices.find(s => s.id === serviceId);
                      return (
                        <div key={serviceId} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{service?.name}</div>
                            <div className="text-sm text-gray-500">{service?.duration}</div>
                          </div>
                          <div className="text-pink-600 font-semibold">₹{service?.price}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Total Duration:</span>
                      <span className="font-semibold">{getTotalDuration()} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span className="line-through text-gray-500">₹{getTotalPrice()}</span>
                    </div>
                    {selectedServices.length >= 2 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-{selectedServices.length >= 3 ? '15%' : '10%'}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-pink-600 border-t pt-2">
                      <span>Final Price:</span>
                      <span>₹{getDiscountedPrice()}</span>
                    </div>
                  </div>

                  {selectedServices.length >= 2 && (
                    <div className="bg-green-100 text-green-800 p-3 rounded-lg mt-4 text-sm">
                      🎉 You're saving ₹{getTotalPrice() - getDiscountedPrice()} with this package!
                    </div>
                  )}

                  <button
                    onClick={handleBookPackage}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors mt-6"
                  >
                    Book Package
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}