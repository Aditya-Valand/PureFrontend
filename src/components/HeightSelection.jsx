import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeightSelection = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedHeight, setSelectedHeight] = useState(170); // Default height in cm
  const scrollContainerRef = useRef(null);

  // Ensure heights is always an array
  const heights = Array.isArray(data) ? data : Array.from({ length: 81 }, (_, i) => i + 140);
  const itemHeight = 60; // pixels

  useEffect(() => {
    if (scrollContainerRef.current) {
      const initialScrollPosition = (selectedHeight - heights[0]) * itemHeight;
      scrollContainerRef.current.scrollTop = initialScrollPosition;
    }
  }, [selectedHeight, heights]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newHeight = heights[index];
    if (newHeight !== selectedHeight) {
      setSelectedHeight(newHeight);
    }
  };

  // Convert cm to feet and inches for display
  const cmToFeetInches = (cm) => {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return `${feet}'${remainingInches}"`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
            onClick={onBack}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onSkip}
          >
            Skip
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">{currentStep} of {totalSteps}</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Height Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            What's Your Height?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Select your height to help us personalize your experience
          </p>

          {/* Height Picker */}
          <div className="relative h-[180px] mx-auto">
            {/* Highlight for selected item */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[60px] bg-[#E4F8E6] rounded-lg pointer-events-none flex items-center justify-center text-xl font-semibold text-green-600">
              {selectedHeight} cm ({cmToFeetInches(selectedHeight)})
            </div>

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

            {/* Scrollable container */}
            <div
              ref={scrollContainerRef}
              className="h-full overflow-auto scrollbar-hide"
              onScroll={handleScroll}
              style={{
                scrollSnapType: 'y mandatory',
                scrollBehavior: 'smooth',
              }}
            >
              {/* Padding to center the selected item */}
              <div className="h-[60px]" />
              {heights.map((height) => (
                <div
                  key={height}
                  className="h-[60px] flex items-center justify-center text-xl cursor-pointer transition-all"
                  style={{ scrollSnapAlign: 'center' }}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const targetScroll = (height - heights[0]) * itemHeight;
                      scrollContainerRef.current.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth',
                      });
                    }
                  }}
                >
                  {height}
                </div>
              ))}
              {/* Padding to center the selected item */}
              <div className="h-[60px]" />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto hover:bg-green-700 transition-colors"
          aria-label="Next step"
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default HeightSelection;