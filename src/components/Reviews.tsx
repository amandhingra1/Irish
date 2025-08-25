import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Play, MessageSquare, Camera, Upload, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Reviews() {
  const { reviews, addReview, services } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    service: '',
    reviewType: 'text' as 'text' | 'video',
    videoFile: null as File | null
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.service || !newReview.comment) {
      alert('Please fill in all required fields');
      return;
    }

    const reviewData = {
      customerName: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      serviceId: newReview.service,
      type: newReview.reviewType,
      videoFile: newReview.videoFile
    };

    addReview(reviewData);
    setShowAddReview(false);
    setNewReview({ name: '', rating: 5, comment: '', service: '', reviewType: 'text', videoFile: null });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Filter approved reviews only
  const approvedReviews = reviews.filter(review => review.status === 'approved');

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-600">
              What our customers say about us
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddReview(true)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Add Review
            </button>
            
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {approvedReviews.map((review) => (
            <div key={review.id} className="flex-none w-80 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                {review.videoUrl && (
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-pink-600" />
                    <Play className="w-4 h-4 text-pink-600" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-3">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-4">{review.comment}</p>
              
              {review.videoUrl && (
                <div className="relative bg-gray-100 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <Play className="w-8 h-8 text-pink-600" />
                  <span className="ml-2 text-sm text-gray-600">Watch Video Review</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Your Review</h3>
              
              <div className="space-y-4">
                {/* Review Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Type</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setNewReview({ ...newReview, reviewType: 'text' })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        newReview.reviewType === 'text'
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <MessageSquare className="w-5 h-5 mx-auto mb-1 text-pink-600" />
                      <div className="text-sm font-medium">Text Review</div>
                    </button>
                    <button
                      onClick={() => setNewReview({ ...newReview, reviewType: 'video' })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        newReview.reviewType === 'video'
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <Video className="w-5 h-5 mx-auto mb-1 text-pink-600" />
                      <div className="text-sm font-medium">Video Review</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={newReview.service}
                    onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Video Upload for Video Reviews */}
                {newReview.reviewType === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setNewReview({ ...newReview, videoFile: e.target.files?.[0] || null })}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {newReview.videoFile ? newReview.videoFile.name : 'Click to upload video or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 50MB</p>
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder={newReview.reviewType === 'video' ? 'Add a description for your video review...' : 'Share your experience...'}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddReview(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Submit {newReview.reviewType === 'video' ? 'Video' : 'Text'} Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}