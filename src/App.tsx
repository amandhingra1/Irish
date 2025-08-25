import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TrendingServices from './components/TrendingServices';
import BestSellers from './components/BestSellers';
import PackageBuilder from './components/PackageBuilder';
import Reviews from './components/Reviews';
import Consultation from './components/Consultation';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import CustomerPanel from './components/customer/CustomerPanel';

const HomePage = () => {
  const [selectedCity, setSelectedCity] = React.useState('Mumbai');
  const [selectedTab, setSelectedTab] = React.useState<'consultation' | 'services'>('consultation');

  return (
    <div className="min-h-screen bg-white">
      <Header
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <Hero />
      
      {selectedTab === 'consultation' ? (
        <Consultation />
      ) : (
        <>
          <TrendingServices />
          <BestSellers />
          <PackageBuilder />
        </>
      )}
      
      <Reviews />
      <Footer />
    </div>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user?.isAdmin ? <Navigate to="/admin" replace /> :
          user && !user.isAdmin ? <Navigate to="/customer" replace /> :
          <HomePage />
        } 
      />
      <Route 
        path="/admin" 
        element={
          user?.isAdmin ? <AdminPanel /> : <Navigate to="/" replace />
        } 
      />
      <Route 
        path="/customer" 
        element={
          user && !user.isAdmin ? <CustomerPanel /> : <Navigate to="/" replace />
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
