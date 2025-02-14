import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-green-50">
      {/* Full width background container */}
      <div className="w-full min-h-screen flex items-center">
        {/* Content container with maximum width for larger screens */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Know What You Consume – Scan, Learn, and Choose Better
              </h1>
              
              <p className="text-lg xl:text-xl text-gray-600">
                Get instant insights into the benefits, disadvantages, allergens, and ratings of packaged food and skincare products.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                  Scan a Product
                  <svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="text-blue-600 px-8 py-4 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                  Explore Features
                </button>
              </div>
            </div>

            {/* Right Content - Placeholder for Image/Illustration */}
            <div className="w-full aspect-square md:aspect-auto md:h-[600px] bg-white rounded-lg shadow-lg">
              {/* Add your product screenshot or illustration here */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-colors">
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;