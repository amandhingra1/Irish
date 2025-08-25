import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageCircle, Video } from 'lucide-react';

const consultationTypes = [
  {
    id: 'skin',
    name: 'Skin Consultation',
    description: 'Get personalized skincare advice from our experts',
    duration: '30 min',
    price: 500,
    icon: '🧴'
  },
  {
    id: 'hair',
    name: 'Hair Consultation',
    description: 'Professional hair care and styling consultation',
    duration: '30 min',
    price: 500,
    icon: '💇‍♀️'
  },
  {
    id: 'makeup',
    name: 'Makeup Consultation',
    description: 'Learn makeup techniques and product recommendations',
    duration: '45 min',
    price: 750,
    icon: '💄'
  },
  {
    id: 'wellness',
    name: 'Wellness Consultation',
    description: 'Holistic wellness and beauty advice',
    duration: '60 min',
    price: 1000,
    icon: '🧘‍♀️'
  }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM'
];

export default function Consultation() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationMode, setConsultationMode] = useState<'video' | 'phone'>('video');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    concerns: ''
  });

  const whatsappNumber = "+919834828850";

  const handleBookConsultation = () => {
    if (!selectedType || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const consultation = consultationTypes.find(c => c.id === selectedType);
    const message = `Consultation Booking Request:

Type: ${consultation?.name}
Date: ${selectedDate}
Time: ${selectedTime}
Mode: ${consultationMode === 'video' ? 'Video Call' : 'Phone Call'}
Duration: ${consultation?.duration}
Price: ₹${consultation?.price}

Customer Details:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Concerns: ${customerInfo.concerns}

Please confirm this consultation booking.`;

    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form after booking
    setSelectedType('');
    setSelectedDate('');
    setSelectedTime('');
    setCustomerInfo({ name: '', phone: '', concerns: '' });
    alert('Consultation booking request sent! We will contact you shortly to confirm.');
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <section id="consultation-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Professional Beauty & Wellness Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized advice from certified beauty and wellness experts. Book a consultation to discuss your specific needs and get customized treatment recommendations.
          </p>
        </div>

        {/* Consultation Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Advice</h3>
            <p className="text-gray-600">Get personalized recommendations from certified beauty professionals</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Options</h3>
            <p className="text-gray-600">Choose between video calls or phone consultations based on your preference</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenient Timing</h3>
            <p className="text-gray-600">Book consultations at your preferred time with flexible scheduling</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Consultation Types */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Consultation Type</h3>
            <div className="space-y-4">
              {consultationTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedType === type.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-pink-600">₹{type.price}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {type.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation Mode */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Consultation Mode</h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => setConsultationMode('video')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    consultationMode === 'video'
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <Video className="w-6 h-6 mx-auto mb-2 text-pink-600" />
                  <div className="font-medium">Video Call</div>
                  <div className="text-sm text-gray-600">Face-to-face consultation</div>
                </button>
                <button
                  onClick={() => setConsultationMode('phone')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    consultationMode === 'phone'
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <Phone className="w-6 h-6 mx-auto mb-2 text-pink-600" />
                  <div className="font-medium">Phone Call</div>
                  <div className="text-sm text-gray-600">Voice consultation</div>
                </button>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Book Your Consultation</h3>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getTomorrowDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        selectedTime === time
                          ? 'border-pink-500 bg-pink-500 text-white'
                          : 'border-gray-300 hover:border-pink-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Concerns (Optional)
                  </label>
                  <textarea
                    value={customerInfo.concerns}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, concerns: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Tell us about your specific concerns or questions..."
                  />
                </div>
              </div>

              {/* Summary */}
              {selectedType && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div>Type: {consultationTypes.find(c => c.id === selectedType)?.name}</div>
                    <div>Mode: {consultationMode === 'video' ? 'Video Call' : 'Phone Call'}</div>
                    <div>Duration: {consultationTypes.find(c => c.id === selectedType)?.duration}</div>
                    <div className="font-semibold text-pink-600">
                      Price: ₹{consultationTypes.find(c => c.id === selectedType)?.price}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleBookConsultation}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}