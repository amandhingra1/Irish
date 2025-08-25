import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { allServices } from '../data/services';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'customer' | 'admin') => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  // Services management
  services: any[];
  addService: (service: any) => void;
  updateService: (id: string, service: any) => void;
  deleteService: (id: string) => void;
  // Reviews management
  reviews: any[];
  addReview: (review: any) => void;
  updateReviewStatus: (id: string, status: 'approved' | 'rejected') => void;
  // Favorites management
  favorites: string[];
  addToFavorites: (serviceId: string) => void;
  removeFromFavorites: (serviceId: string) => void;
  // Content management
  siteContent: any;
  updateSiteContent: (content: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState(allServices);
  const [reviews, setReviews] = useState([
    {
      id: '1',
      customerName: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing service! The beautician was very professional and the facial left my skin glowing. Highly recommend Miss Irish!',
      date: '2024-01-15',
      serviceId: '1',
      status: 'approved',
      type: 'text'
    },
    {
      id: '2',
      customerName: 'Rahul Kumar',
      rating: 5,
      comment: 'Great beard grooming service. Very convenient to have it done at home. Will definitely book again.',
      date: '2024-01-12',
      serviceId: '9',
      status: 'approved',
      type: 'text'
    },
    {
      id: '3',
      customerName: 'Anjali Patel',
      rating: 4,
      comment: 'Loved the hair spa treatment. My hair feels so much healthier now. The staff was punctual and courteous.',
      date: '2024-01-10',
      serviceId: '2',
      videoUrl: 'https://example.com/video1',
      status: 'approved',
      type: 'video'
    }
  ]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [siteContent, setSiteContent] = useState({
    header: {
      title: 'Beauty & Wellness At Your Doorstep',
      subtitle: 'Professional beauty services delivered to your home. Book trusted experts for salon-quality treatments in the comfort of your space.'
    },
    footer: {
      description: 'Professional beauty and wellness services delivered to your doorstep. Experience salon-quality treatments in the comfort of your home.',
      email: 'info@missirish.com'
    }
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('missirish_user');
    const storedFavorites = localStorage.getItem('missirish_favorites');
    const storedServices = localStorage.getItem('missirish_services');
    const storedReviews = localStorage.getItem('missirish_reviews');
    const storedContent = localStorage.getItem('missirish_content');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
    if (storedContent) {
      setSiteContent(JSON.parse(storedContent));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'customer' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Admin login
      if (userType === 'admin' && email === 'admin@missirish.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@missirish.com',
          phone: '+919834828850',
          city: 'Mumbai',
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('missirish_user', JSON.stringify(adminUser));
        setIsLoading(false);
        return true;
      }
      
      // Customer login (for demo purposes, accept any email/password combination)
      if (userType === 'customer' && email && password) {
        const customerUser: User = {
          id: `customer-${Date.now()}`,
          name: email.split('@')[0],
          email,
          phone: '',
          city: 'Mumbai',
          isAdmin: false
        };
        setUser(customerUser);
        localStorage.setItem('missirish_user', JSON.stringify(customerUser));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // In a real app, this would validate the current password against the backend
    // For demo purposes, we'll just simulate success
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success('Password changed successfully!');
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('missirish_user');
  };

  // Services management
  const addService = (service: any) => {
    const newService = { ...service, id: Date.now().toString() };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('missirish_services', JSON.stringify(updatedServices));
    toast.success('Service added successfully!');
  };

  const updateService = (id: string, updatedService: any) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, ...updatedService } : service
    );
    setServices(updatedServices);
    localStorage.setItem('missirish_services', JSON.stringify(updatedServices));
    toast.success('Service updated successfully!');
  };

  const deleteService = (id: string) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
    localStorage.setItem('missirish_services', JSON.stringify(updatedServices));
    toast.success('Service deleted successfully!');
  };

  // Reviews management
  const addReview = (review: any) => {
    const newReview = { 
      ...review, 
      id: Date.now().toString(), 
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('missirish_reviews', JSON.stringify(updatedReviews));
    toast.success('Review submitted successfully! It will be visible after approval.');
  };

  const updateReviewStatus = (id: string, status: 'approved' | 'rejected') => {
    const updatedReviews = reviews.map(review => 
      review.id === id ? { ...review, status } : review
    );
    setReviews(updatedReviews);
    localStorage.setItem('missirish_reviews', JSON.stringify(updatedReviews));
    toast.success(`Review ${status} successfully!`);
  };

  // Favorites management
  const addToFavorites = (serviceId: string) => {
    if (!favorites.includes(serviceId)) {
      const updatedFavorites = [...favorites, serviceId];
      setFavorites(updatedFavorites);
      localStorage.setItem('missirish_favorites', JSON.stringify(updatedFavorites));
      toast.success('Added to favorites!');
    }
  };

  const removeFromFavorites = (serviceId: string) => {
    const updatedFavorites = favorites.filter(id => id !== serviceId);
    setFavorites(updatedFavorites);
    localStorage.setItem('missirish_favorites', JSON.stringify(updatedFavorites));
    toast.success('Removed from favorites!');
  };

  // Content management
  const updateSiteContent = (content: any) => {
    setSiteContent(content);
    localStorage.setItem('missirish_content', JSON.stringify(content));
    toast.success('Content updated successfully!');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      changePassword,
      logout, 
      isLoading,
      services,
      addService,
      updateService,
      deleteService,
      reviews,
      addReview,
      updateReviewStatus,
      favorites,
      addToFavorites,
      removeFromFavorites,
      siteContent,
      updateSiteContent
    }}>
      {children}
    </AuthContext.Provider>
  );
};