import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AgeSelection = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedAge, setSelectedAge] = useState(data?.age || 18);
  const scrollContainerRef = useRef(null);

  // Generate ages from 15 to 100
  const ages = Array.from({ length: 86 }, (_, i) => i + 15);
  const itemHeight = 60; // pixels

  useEffect(() => {
    if (scrollContainerRef.current) {
      const initialScrollPosition = (selectedAge - 15) * itemHeight;
      scrollContainerRef.current.scrollTop = initialScrollPosition;
    }
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newAge = ages[index];
    if (newAge !== selectedAge) {
      setSelectedAge(newAge);
    }
  };

  const handleNext = () => {
    onNext({ ...data, age: selectedAge });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Navigation Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 transition-colors"
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

      {/* Age Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          What's Your Age?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Pick your age and let's start the journey through generations!
        </p>

        {/* Age Picker */}
        <div className="relative h-[180px] mx-auto">
          {/* Highlight for selected item */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[60px] bg-[#E4F8E6] rounded-lg pointer-events-none flex items-center justify-center text-xl font-semibold text-green-600">
            {selectedAge}
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
            {ages.map((age) => (
              <div
                key={age}
                className="h-[60px] flex items-center justify-center text-xl cursor-pointer transition-all"
                style={{ scrollSnapAlign: 'center' }}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const targetScroll = (age - 15) * itemHeight;
                    scrollContainerRef.current.scrollTo({
                      top: targetScroll,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {age}
              </div>
            ))}
            {/* Padding to center the selected item */}
            <div className="h-[60px]" />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto hover:bg-green-700 transition-colors"
        aria-label="Next step"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default AgeSelection;