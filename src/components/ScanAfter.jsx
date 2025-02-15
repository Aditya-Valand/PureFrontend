import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Leaf, AlertCircle, Info, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ScanAfter({ analysisData }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showSuccess, setShowSuccess] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const Auth = useAuth();

  // Initialize deep analysis
  const initializeAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
  
    // Check if user is authenticated
    if (!Auth.user || !Auth.user.token) {
      setAnalysisError('Please log in to perform analysis');
      setIsAnalyzing(false);
      return;
    }
  
    try {
      const requestData = {
        slug: analysisData.slug,
      };
  
      // Make the backend request
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Auth.user.token}`,
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log('Response Data:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to initialize analysis');
      }
  
      if (data.data.session) {
        // Redirect to the desired frontend URL
        const frontendBaseUrl = `${window.location.origin}`; // Dynamically gets the current frontend base URL
        const redirectUrl = `${frontendBaseUrl}/chat/history/${data.data.session}`;
        
        console.log('Redirecting to:', redirectUrl);
        window.location.href = redirectUrl; // Perform the redirection
      } else {
        throw new Error('No session data received');
      }
  
    } catch (error) {
      console.error('Analysis initialization failed:', error);
      setAnalysisError(error.message || 'Failed to start analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Early return with loading state if no data
  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <p>Waiting for product data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate alternatives based on product category
  const alternatives = analysisData.product_details?.product_category
    ? generateAlternatives(analysisData.product_details.product_category)
    : [];

  // Auto-scroll functionality for alternatives
  useEffect(() => {
    const timer = setInterval(() => {
      if (alternatives.length > 1) {
        setCurrentSlide((prev) => (prev + 1) % alternatives.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [alternatives.length]);

  // Hide success message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const sections = {
    ingredients: {
      title: 'Ingredients & Additives',
      icon: <Info className="w-5 h-5" />,
      content: analysisData.product_details?.ingredients,
      additives: analysisData.product_details?.additives || [],
      bgColor: 'bg-amber-50'
    },
    nutrition: {
      title: 'Nutritional Information',
      icon: <Info className="w-5 h-5" />,
      content: analysisData.product_details?.nutritional_information,
      bgColor: 'bg-green-50'
    },
    benefits: {
      title: 'Benefits',
      icon: <Leaf className="w-5 h-5" />,
      content: analysisData.analysis_report?.benefits || [],
      bgColor: 'bg-blue-50'
    },
    sideEffects: {
      title: 'Potential Side Effects',
      icon: <AlertCircle className="w-5 h-5" />,
      content: analysisData.analysis_report?.potential_side_effects || [],
      bgColor: 'bg-red-50'
    },
    allergens: {
      title: 'Allergens',
      icon: <AlertCircle className="w-5 h-5" />,
      content: analysisData.analysis_report?.allergens || [],
      bgColor: 'bg-yellow-50'
    },
    dietary: {
      title: 'Dietary Compatibility',
      icon: <Info className="w-5 h-5" />,
      content: analysisData.analysis_report?.dietary_compatibility || [],
      bgColor: 'bg-purple-50'
    },
    advice: {
      title: 'Advice',
      icon: <Info className="w-5 h-5" />,
      content: analysisData.analysis_report?.advices || [],
      bgColor: 'bg-teal-50'
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      avoid: 'text-red-600',
      caution: 'text-yellow-600',
      safe: 'text-green-600'
    };
    return colors[status] || colors.safe;
  };

  const renderContent = (section, key) => {
    if (key === 'nutrition' && section.content) {
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(section.content).map(([nutrient, value]) => (
                <tr key={nutrient} className="border-b">
                  <td className="py-2 px-4 capitalize">{nutrient.replace(/_/g, ' ')}</td>
                  <td className="py-2 px-4 text-right">
                    {value}
                    {nutrient.includes('_g') ? 'g' : 
                     nutrient.includes('_mg') ? 'mg' : 
                     nutrient.includes('_kcal') ? 'kcal' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (key === 'dietary' && Array.isArray(section.content)) {
      return (
        <div className="space-y-4">
          {section.content.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-semibold ${getStatusColor(item.status)}`}>
                  {item.group}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'avoid' ? 'bg-red-100 text-red-800' :
                  item.status === 'caution' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-gray-600">{item.recommendation}</p>
            </div>
          ))}
        </div>
      );
    }

    if (key === 'ingredients') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{section.content}</p>
          {section.additives.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Additives:</h3>
              <div className="space-y-2">
                {section.additives.map((additive, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="font-medium">{additive.additive_name}</p>
                    <p className="text-gray-600 text-sm">{additive.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return Array.isArray(section.content) ? (
      <ul className="space-y-2">
        {section.content.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>{section.content}</p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

<button
        onClick={initializeAnalysis}
        disabled={isAnalyzing}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Search className="w-6 h-6" />
        )}
      </button>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            <span>Analysis completed successfully!</span>
          </div>
        </div>
      )}

      {analysisError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{analysisError}</span>
            <button 
              onClick={() => setAnalysisError(null)}
              className="ml-2 hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="font-semibold text-xl text-gray-800">Product Analysis</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{analysisData.title}</h1>
          <p className="text-gray-600">{analysisData.description}</p>
        </div>

        {/* Health Score */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={analysisData.analysis_report?.health_quality_score >= 70 ? '#22c55e' : 
                         analysisData.analysis_report?.health_quality_score >= 40 ? '#eab308' : '#ef4444'}
                  strokeWidth="3"
                  strokeDasharray={`${analysisData.analysis_report?.health_quality_score}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                {analysisData.analysis_report?.health_quality_score}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Health Quality Score</h2>
              <p className="text-lg text-gray-600">{analysisData.analysis_report?.health_quality_rating}</p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-4">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key}>
              <button
                onClick={() => setActiveSection(activeSection === key ? null : key)}
                className={`w-full text-left p-4 rounded-lg shadow-sm transition-all duration-300 ${section.bgColor} hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <h2 className="font-semibold text-lg">{section.title}</h2>
                  </div>
                  {activeSection === key ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </button>
              
              {activeSection === key && (
                <div className="mt-2 p-4 bg-white rounded-lg shadow-md animate-fade-in">
                  {renderContent(section, key)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Alternatives Section */}
        {alternatives.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mt-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Healthier Alternatives</h2>
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {alternatives.map((alt, index) => (
                      <div key={index} className="w-full flex-shrink-0 p-2">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                          <img
                            src={alt.image}
                            alt={alt.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-semibold text-lg mb-2">{alt.name}</h3>
                          <p className="text-gray-600 mb-4">{alt.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${alt.rating}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{alt.rating}/100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {alternatives.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + alternatives.length) % alternatives.length)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % alternatives.length)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              {alternatives.length > 1 && (
                <div className="flex justify-center mt-4">
                  {alternatives.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                        currentSlide === index ? 'bg-green-500 w-4' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                  </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper function to generate alternatives based on product category
function generateAlternatives(category) {
  const alternativesByCategory = {
    chocolate: [
      {
        name: 'Dark Chocolate (70% Cocoa)',
        image: '/api/placeholder/400/300',
        rating: 85,
        description: 'Rich in antioxidants with less sugar. Contains higher cocoa content for enhanced health benefits.'
      },
      {
        name: 'Sugar-Free Chocolate',
        image: '/api/placeholder/400/300',
        rating: 75,
        description: 'Sweetened with natural alternatives, perfect for those monitoring sugar intake.'
      },
      {
        name: 'Organic Raw Cacao',
        image: '/api/placeholder/400/300',
        rating: 90,
        description: 'Pure, unprocessed cacao with maximum nutritional benefits and no additives.'
      }
    ],
    snacks: [
      {
        name: 'Mixed Nuts',
        image: '/api/placeholder/400/300',
        rating: 90,
        description: 'Natural, protein-rich snack with healthy fats and minerals.'
      },
      {
        name: 'Dried Fruit Mix',
        image: '/api/placeholder/400/300',
        rating: 80,
        description: 'Natural sweetness with fiber and vitamins, no added sugars.'
      }
    ],
    beverages: [
      {
        name: 'Green Tea',
        image: '/api/placeholder/400/300',
        rating: 95,
        description: 'Rich in antioxidants with natural caffeine and zero calories.'
      },
      {
        name: 'Coconut Water',
        image: '/api/placeholder/400/300',
        rating: 85,
        description: 'Natural electrolytes and minerals with low sugar content.'
      }
    ],
    dairy: [
      {
        name: 'Greek Yogurt',
        image: '/api/placeholder/400/300',
        rating: 88,
        description: 'High protein, probiotic-rich alternative with less sugar.'
      },
      {
        name: 'Almond Milk',
        image: '/api/placeholder/400/300',
        rating: 82,
        description: 'Plant-based alternative rich in vitamin E and low in calories.'
      }
    ]
  };

  return alternativesByCategory[category] || [];
}

// Helper function to format nutrition values
function formatNutritionValue(value, unit) {
  if (typeof value !== 'number') return value;
  
  if (unit === 'g' || unit === 'mg') {
    return `${value.toFixed(1)}${unit}`;
  }
  if (unit === 'kcal') {
    return `${Math.round(value)} ${unit}`;
  }
  if (unit === '%') {
    return `${value.toFixed(1)}%`;
  }
  return value.toString();
}

// Utility function to calculate health score color
function getHealthScoreColor(score) {
  if (score >= 80) return '#22c55e'; // green
  if (score >= 60) return '#84cc16'; // lime
  if (score >= 40) return '#eab308'; // yellow
  if (score >= 20) return '#f97316'; // orange
  return '#ef4444'; // red
}

// Add custom animations
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: { duration: 0.3 }
};

// CSS classes for animations
const animationClasses = {
  fadeIn: 'transition-opacity duration-300',
  slideIn: 'transition-all duration-300 transform',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse'
};

export default ScanAfter;