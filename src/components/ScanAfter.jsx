import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function ScanAfter() {
  const [activeSection, setActiveSection] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sections = {
    benefits: {
      title: 'Benefits',
      content: [
        'Rich in calcium and protein',
        'Good source of vitamin D',
        'Promotes bone health',
        'Supports muscle growth'
      ],
      bgColor: 'bg-green-100'
    },
    disadvantages: {
      title: 'Disadvantages',
      content: [
        'High in saturated fat',
        'Contains lactose',
        'Environmental impact',
        'Calorie dense'
      ],
      bgColor: 'bg-red-100'
    },
    allergens: {
      title: 'Allergens',
      content: [
        'Contains lactose',
        'Milk protein (casein)',
        'May contain traces of soy'
      ],
      bgColor: 'bg-yellow-100'
    },
    dietary: {
      title: 'Dietary Compatibility',
      content: [
        'Not suitable for vegans',
        'Not suitable for lactose intolerant',
        'Suitable for vegetarians'
      ],
      bgColor: 'bg-blue-100'
    },
    advice: {
      title: 'Advice',
      content: [
        'Store in refrigerator',
        'Consume within 7 days',
        'Shake well before use'
      ],
      bgColor: 'bg-purple-100'
    }
  };

  const alternatives = [
    {
      name: 'Almond Milk',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300',
      rating: 85
    },
    {
      name: 'Oat Milk',
      image: 'https://images.unsplash.com/photo-1571211905393-6de67ff8fb61?auto=format&fit=crop&w=300',
      rating: 90
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % alternatives.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSectionClick = (section) => {
  setActiveSection(activeSection === section ? null : section);
};


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % alternatives.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + alternatives.length) % alternatives.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=100"
            alt="Pure Insight Logo"
            className="w-8 h-8"
          />
          <span className="font-semibold text-gray-800">Pure Insight</span>
        </div>
        <button className="p-2">
          <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </button>
      </header>

      {/* Product Info - Modified Layout */}
      <section className="p-4">
        <h1 className="text-xl font-bold mb-4">Dairy Milk</h1>
        <div className="flex gap-4 items-start">
          {/* Rating Section */}
          <div className="w-1/2">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="3"
                    strokeDasharray="60, 100"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                  60/100
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-600">Fair</span>
            </div>
          </div>
          {/* Product Image */}
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400"
              alt="Dairy Milk"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Sections */}
      {activeSection === null ? (
        <section className="p-4 grid gap-4">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => handleSectionClick(key)}
              className={`${section.bgColor} p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}
            >
              <h2 className="font-semibold">{section.title}</h2>
            </button>
          ))}
        </section>
      ) : (
        <section className="p-4">
          <div className={`${sections[activeSection].bgColor} p-4 rounded-lg shadow-md relative animate-fadeIn`}>
            <button
              onClick={() => setActiveSection(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm"
            >
              <X size={20} />
            </button>
            <h2 className="font-semibold mb-4">{sections[activeSection].title}</h2>
            <ul className="space-y-2">
              {sections[activeSection].content.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Healthier Alternatives with Auto-Slide */}
      <section className="p-4">
        <h2 className="text-lg font-semibold mb-4">Healthier Alternatives</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {alternatives.map((alt, index) => (
                <div key={index} className="w-full flex-shrink-0 p-2">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <img
                      src={alt.image}
                      alt={alt.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-semibold">{alt.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
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
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default ScanAfter;