import React, { useState } from 'react';
import { Menu, X, Upload, QrCode, User, Tag, Bot, Grid } from 'lucide-react';
import fabbutton from "../assets/fabbutton.svg"
import profile from "../assets/profile.svg"
import price from "../assets/price.svg"
import chat from "../assets/chat.svg"
import feature from "../assets/feature.png"
import logo from "../assets/logo.png"
import ImageCapture from './ImageCapture';
import ScanAfter from './scanAfter';

const MobileNavigation = () => {
  const [isFabMenuOpen, setFabMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [showImageCapture, setShowImageCapture] = useState(false);
  const [captureMode, setCaptureMode] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  


  const navItems = [
    { icon: <User className="w-6 h-6" />, label: 'Profile' },
    { icon: <Tag className="w-6 h-6" />, label: 'Features' },
    { icon: <Bot className="w-6 h-6 hidden " />, label: 'AI Chat' },
    { icon: <Bot className="w-6 h-6 hidden " />, label: 'AI Chat' },
    { icon: <Bot className="w-6 h-6" />, label: 'AI Chat' },
    { icon: <Grid className="w-6 h-6" />, label: 'More' }
  ];
  
  const fabOptions = [
    {
      icon: <QrCode className="w-10 h-10" />,
      label: 'Scan QR Code',
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

  const handleCloseImageCapture = () => {
    if (!analysisData) {
      setShowImageCapture(false);
      setCaptureMode(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 rounded-lg bg-white shadow-lg space-y-1 focus:outline-none"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white/80 backdrop-blur-lg transform transition-transform duration-300 z-40 shadow-lg ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center p-8 mt-8 space-y-6">
          <img src={logo} alt="Logo" className="h-14 w-auto mb-4" />
          {['Plans', 'Services', 'Blogs', 'About Us', 'InsightBuddy'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-blue-400 transition"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {(isSidebarOpen || isFabMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
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
        className="fixed left-1/2 -translate-x-1/2 bottom-1 z-50 p-4 hover:shadow-green-500/30 transition-transform duration-300 hover:scale-105"
      >
        <img src={fabbutton} alt="fabbutton" className="w-16 h-16" />
      </button>

      <ImageCapture
  isOpen={showImageCapture}
  onClose={handleCloseImageCapture}
  mode={captureMode}
  // Add these lines
  onAnalysisComplete={(data) => {
    setAnalysisData(data);
    setShowImageCapture(false);
  }}
/>
{/* Add ScanAfter component */}
{analysisData && <ScanAfter analysisData={analysisData} />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg py-4 px-6 rounded-t-3xl border-t border-gray-200/50 shadow-lg">
        <div className="flex justify-between items-center">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="relative flex flex-col items-center group"
              onClick={() => setActiveNavItem(index)}
            >
              {item.icon}
              <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-500 to-green-600 rounded-full transition-all duration-300 ${activeNavItem === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;