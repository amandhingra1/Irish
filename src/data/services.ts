export const allServices = [
  // Women Services
  {
    id: '1',
    name: 'Classic Facial',
    description: 'Deep cleansing facial with natural ingredients',
    price: 1200,
    duration: '60 min',
    image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Facial',
    gender: 'women' as const,
    trending: true,
    bestSeller: false
  },
  {
    id: '2',
    name: 'Hair Spa Treatment',
    description: 'Nourishing hair treatment for healthy, shiny hair',
    price: 1500,
    duration: '90 min',
    image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hair Care',
    gender: 'women' as const,
    trending: true,
    bestSeller: false
  },
  {
    id: '3',
    name: 'Manicure & Pedicure',
    description: 'Complete nail care with gel polish',
    price: 800,
    duration: '45 min',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Nail Care',
    gender: 'both' as const,
    trending: true,
    bestSeller: false
  },
  {
    id: '4',
    name: 'Full Body Massage',
    description: 'Relaxing therapeutic massage',
    price: 2000,
    duration: '75 min',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Massage',
    gender: 'both' as const,
    trending: true,
    bestSeller: false
  },
  {
    id: '5',
    name: 'Bridal Makeup Package',
    description: 'Complete bridal makeover with hair styling',
    price: 8000,
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Makeup',
    gender: 'women' as const,
    trending: false,
    bestSeller: true
  },
  {
    id: '6',
    name: 'Eyebrow Threading & Tinting',
    description: 'Perfect eyebrow shaping and tinting',
    price: 400,
    duration: '20 min',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beauty',
    gender: 'women' as const,
    trending: false,
    bestSeller: true
  },
  {
    id: '7',
    name: 'Anti-Aging Facial',
    description: 'Advanced anti-aging treatment',
    price: 2500,
    duration: '90 min',
    image: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Facial',
    gender: 'women' as const,
    trending: false,
    bestSeller: true
  },
  {
    id: '8',
    name: 'Hair Color & Highlights',
    description: 'Professional hair coloring service',
    price: 3500,
    duration: '2 hours',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hair Care',
    gender: 'women' as const,
    trending: false,
    bestSeller: true
  },

  // Men Services
  {
    id: '9',
    name: 'Beard Grooming & Styling',
    description: 'Professional beard trim and styling',
    price: 600,
    duration: '30 min',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Grooming',
    gender: 'men' as const,
    trending: true,
    bestSeller: true
  },
  {
    id: '10',
    name: 'Men\'s Haircut & Styling',
    description: 'Modern haircut with professional styling',
    price: 800,
    duration: '45 min',
    image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hair Care',
    gender: 'men' as const,
    trending: true,
    bestSeller: false
  },
  {
    id: '11',
    name: 'Men\'s Facial Treatment',
    description: 'Deep cleansing facial for men',
    price: 1000,
    duration: '50 min',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Facial',
    gender: 'men' as const,
    trending: false,
    bestSeller: true
  },
  {
    id: '12',
    name: 'Men\'s Body Massage',
    description: 'Therapeutic massage for men',
    price: 1800,
    duration: '60 min',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Massage',
    gender: 'men' as const,
    trending: false,
    bestSeller: true
  },
  {
    id: '13',
    name: 'Men\'s Manicure',
    description: 'Professional nail care for men',
    price: 500,
    duration: '30 min',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Nail Care',
    gender: 'men' as const,
    trending: false,
    bestSeller: false
  },
  {
    id: '14',
    name: 'Head Massage & Hair Treatment',
    description: 'Relaxing head massage with hair treatment',
    price: 700,
    duration: '40 min',
    image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hair Care',
    gender: 'men' as const,
    trending: true,
    bestSeller: false
  }
];

export const getTrendingServices = (gender: 'men' | 'women') => {
  return allServices.filter(service => 
    service.trending && (service.gender === gender || service.gender === 'both')
  );
};

export const getBestSellerServices = (gender: 'men' | 'women') => {
  return allServices.filter(service => 
    service.bestSeller && (service.gender === gender || service.gender === 'both')
  );
};