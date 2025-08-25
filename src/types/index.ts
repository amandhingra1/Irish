export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: string;
  gender: 'men' | 'women' | 'both';
  trending?: boolean;
  bestSeller?: boolean;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  videoUrl?: string;
  date: string;
  serviceId: string;
}

export interface City {
  id: string;
  name: string;
  available: boolean;
}

export interface Package {
  id: string;
  name: string;
  services: string[];
  totalPrice: number;
  discountedPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isAdmin?: boolean;
}