import React, { useState, useEffect } from 'react';
import { Menu, X, Upload, QrCode, User, Tag, Bot, Grid,Bell,Search, ChevronRight } from 'lucide-react';
import fabbutton from "../assets/fabbutton.svg"
import profile from "../assets/profile.svg"
import price from "../assets/price.svg"
import chat from "../assets/chat.svg"
import feature from "../assets/feature.png"
import logo from "../assets/logo.png"
import { io } from 'socket.io-client';
import ImageCapture from './ImageCapture';
import ScanAfter from './ScanAfter';
import { useNavigate } from 'react-router-dom';
import health from "../assets/health.jpeg"
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MobileNavigation = ({ children }) => {
  const navigate = useNavigate();
  const Auth = useAuth();
  // const location = useLocation();
  const [isFabMenuOpen, setFabMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [showImageCapture, setShowImageCapture] = useState(false);
  const [captureMode, setCaptureMode] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  useEffect(() => {
    fetchRecentScans();
  }, [Auth.user?.token]);
  
  const fetchRecentScans = async () => {
    if (!Auth.user?.token) {
      console.error("No authentication token available");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/analysis/recent-scans`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Auth.user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent scans');
      }
      
      const data = await response.json();
      setRecentScans(data || []);
    } catch (err) {
      console.error('Error fetching recent scans:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  



  const navItems = [
    { icon: <User className="w-6 h-6" />, label: 'Profile', path: '/profile' },
    { icon: <Tag className="w-6 h-6" />, label: 'Features',path:'/plans' },
    { icon: <Bot className="w-6 h-6 hidden " />, label: 'AI Chat' },
    { icon: <Bot className="w-6 h-6 hidden " />, label: 'AI Chat' },
    { icon: <Bot className="w-6 h-6" />, label: 'chatbot',path: '/insightbuddy' },
    { icon: <Grid className="w-6 h-6" />, label: 'More',path: '/feature' }
  ];
  
  const fabOptions = [
    {
      icon: <QrCode className="w-10 h-10" />,
      label: 'Scan Product',
      onClick: () => {
        setFabMenuOpen(false);
        setShowImageCapture(true);
        setCaptureMode('scan');
      }
    },
    {
      icon: <Upload className="w-10 h-10" />,
      label: 'Upload Photo',
      onClick: () => {
        setFabMenuOpen(false);
        setShowImageCapture(true);
        setCaptureMode('upload');
      }
    }
  ];
  const handleNewScan = async (scanData) => {
    if (!Auth.user?.token) {
      console.error("No authentication token available");
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/analysis/new-scan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Auth.user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scanData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save scan');
      }
      
      // Refresh the recent scans after adding a new one
      fetchRecentScans();
    } catch (err) {
      console.error('Error saving new scan:', err);
    }
  };
  const handleCloseImageCapture = () => {
    if (!analysisData) {
      setShowImageCapture(false);
      setCaptureMode(null);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };
  const handleSignOut = async () => {
    try {
      // Call your backend signout route
      // await axios.post('/signout');
      
      // Clear any local storage or state related to user authentication
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    // Clear any other auth-related items you might have stored
    
    // If you're using cookies, you might want to clear them too
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
      navigate('/account');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-slate-50">
    {/* Top Greeting Section with improved styling */}
    <div className={`fixed top-0 left-0 right-0 z-40 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'} transition-all duration-300`}>
      <div className="px-6 py-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Hey {Auth.user.name } <span className="text-yellow-400">👋</span>
            </div>
            <div className="mt-1 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent leading-tight max-w-[250px]">
              Know Your Products. Choose Better.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Search Bar */}
    <div className="pt-24 px-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input 
          type="text" 
          className="w-full py-3 pl-10 pr-4 bg-white border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm" 
          placeholder="Search products or ingredients..." 
        />
      </div>
    </div>

    {/* Feature Card Section */}
    <div className="mt-6 px-6">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-500 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/6168efee0c2ef4c9c0af3fdb/6192bb03ce9b2b3ccc978bbc_texture-noise.png')] opacity-5"></div>
        <div className="relative p-6 flex items-center">
          <div className="flex-1">
            <h2 className="text-white font-bold text-xl mb-2">
              Smart Food  Analysis
            </h2>
            <p className="text-indigo-100 text-sm mb-5 font-medium">
              Get instant insights on nutrition, allergens and ratings.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-medium text-sm hover:shadow-lg transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20 w-auto ">
              Choose Plan <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="w-32 h-32 relative">
            <div className="absolute w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 shadow-xl">
                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={health}
                    alt="Healthy food" 
                    className="w-full h-full object-cover mix-blend-luminosity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 px-6">
      <div className="relative overflow-hidden rounded-2xl">
         <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-400 to-blue-500 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/6168efee0c2ef4c9c0af3fdb/6192bb03ce9b2b3ccc978bbc_texture-noise.png')] opacity-5"></div>
        <div className="relative p-6 flex items-center">
          <div className="flex-1">
            <h2 className="text-white font-bold text-xl mb-2">
            Smart Skincare Analysis
            </h2>
            <p className="text-indigo-100 text-sm mb-5 font-medium">
            Analyze ingredients, compatibility and effectiveness.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-medium text-sm hover:shadow-lg transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20 w-auto ">
            Explore Features<ChevronRight className="w-4 h-4 " />
            </button>
          </div>
          <div className="w-32 h-32 relative">
            <div className="absolute w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 shadow-xl">
                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={health}
                    alt="Skincare products" 
                    className="w-full h-full object-cover mix-blend-luminosity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Trending Products */}
    <div className="mt-8 px-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-gray-900">Trending Products</h2>
        <button className="text-sm text-indigo-600 font-medium">See All</button>
      </div>

      <div className="overflow-x-auto pb-4 -mx-6 px-6">
        <div className="flex gap-4 w-max">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden hover:shadow-md transition-all">
              <div className="w-full h-32 bg-gray-100 relative">
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  4.8 ★
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900 mb-1">Product {item}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  Great Choice
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
{/* Recent Scans Section */}
{/* // In your MobileNavigation.jsx */}
{/* // Keep only one Recent Scans section */}
<div className="mt-6 px-6 mb-24">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-900">Recent Scans</h2>
          <button 
            className="text-sm text-indigo-600 font-medium"
            onClick={fetchRecentScans}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 mb-4 text-center">
            Error: {error}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <div className="col-span-2 text-center py-8 text-gray-500">
              Loading recent scans...
            </div>
          ) : recentScans && recentScans.length > 0 ? (
            recentScans.map((scan) => (
              <div 
                key={scan.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden hover:shadow-md transition-all"
                onClick={() => navigate(`/analysis/${scan.id}`)}
              >
                <div className="w-full h-24 bg-gray-100 relative">
                  <div className={`absolute top-2 right-2 ${
                    scan.score >= 70 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  } text-xs font-medium px-2 py-0.5 rounded-full`}>
                    {scan.status}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-900 mb-1 truncate">{scan.product}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-between">
                    <span>{scan.timeAgo}</span>
                    <span className={`${
                      scan.score >= 70 ? 'text-green-500' : 'text-yellow-500'
                    } font-medium`}>
                      {scan.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              No recent scans. Scan a product to get started!
            </div>
          )}
        </div>
      </div>

{/* // Remove the second Recent Scans section completely */}


    
      
      {/* Recent Scans Section */}
      {/* <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Scans</h2>
          <button className="text-sm text-blue-500 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition">
              <div className="w-full h-24 bg-gray-100 rounded-lg mb-2"></div>
              <div className="text-sm font-medium text-gray-800">Product {item}</div>
              <div className="text-xs text-gray-500">Scanned 2h ago</div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Hamburger Menu Button */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl transform transition-transform duration-300 z-50 shadow-xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="pt-12 pb-6 px-6 border-b border-gray-100 relative">
            <img src={logo} alt="Logo" className="h-10 w-auto mb-6" />
          </div>
          <div className="flex-1 py-6">
          {[
    { name: 'Premium Plans', path: '/plans' },
    { name: 'InsightBuddy', path: '/insightbuddy' },
    { name: 'Blogs', path: '/feature' },
    { name: 'About Us', path: '/AboutUs' },
    { name: 'Help & Support', path: '/plans' }
  ].map((item, index) => (
              <a
                key={item.name}
                href={item.path}
                className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
          <div className="py-6 px-6 border-t border-gray-100">
            <button className="w-full py-3 rounded-lg border border-gray-200 text-gray-700 font-medium" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(isSidebarOpen || isFabMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            setSidebarOpen(false);
            setFabMenuOpen(false);
          }}
        />
      )}

      {/* FAB Menu */}
      <div className={`fixed inset-0 z-50 ${isFabMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-36 flex items-center justify-center gap-24">
          {fabOptions.map((option) => (
            <button
              key={option.label}
              className="glass-button bg-white p-4 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 relative"
              onClick={option.onClick}
            >
              {option.icon}
              <span className="absolute -top-8 text-white text-sm font-medium whitespace-nowrap">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      

      {/* FAB Button - Adjusted positioning */}
      <button
        onClick={() => setFabMenuOpen(!isFabMenuOpen)}
        className={`fixed left-1/2 -translate-x-1/2 bottom-1 z-50 p-4 hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <img src={fabbutton} alt="fabbutton" className="w-16 h-16" />
      </button>

      <ImageCapture
  isOpen={showImageCapture}
  onClose={handleCloseImageCapture}
  mode={captureMode}
  onAnalysisComplete={(data) => {
    setAnalysisData(data.data);
    setShowImageCapture(false);
    
    // Emit the new scan to the server if socket is connected
    handleNewScan(data.data);}}
/>

      {/* Add ScanAfter component */}
      {analysisData && <ScanAfter analysisData={analysisData} />}
      
      <div className='pb-20'>
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg py-4 px-6 rounded-t-3xl border-t border-gray-200/50 shadow-lg">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              className="relative flex flex-col items-center group"
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-500 to-green-600 rounded-full transition-all duration-300 ${location.pathname === item.path ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
            </button>
          ))}
        </div>
      </nav>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MobileNavigation;