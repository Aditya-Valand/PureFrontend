import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const DietSelection = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedDiet, setSelectedDiet] = useState(null);

  // Pre-select diet if data is passed from parent
  useEffect(() => {
    if (data?.diet) {
      setSelectedDiet(data.diet);
    }
  }, [data]);

  // List of diets (can also be passed as a prop for flexibility)
  const diets = [
    {
      id: 'regular',
      name: 'Regular Diet',
      description: 'No specific dietary restrictions',
    },
    {
      id: 'vegetarian',
      name: 'Vegetarian',
      description: 'Plant-based diet, excluding meat and fish',
    },
    {
      id: 'vegan',
      name: 'Vegan',
      description: 'Excludes all animal products',
    },
    {
      id: 'keto',
      name: 'Ketogenic',
      description: 'High-fat, low-carb diet',
    },
    {
      id: 'paleo',
      name: 'Paleo',
      description: 'Based on foods presumed eaten during the Paleolithic era',
    },
    {
      id: 'mediterranean',
      name: 'Mediterranean',
      description: 'Rich in vegetables, fruits, whole grains, and healthy fats',
    },
  ];

  // Handle next button click
  const handleNext = () => {
    if (selectedDiet) {
      onNext({ diet: selectedDiet }); // Pass selected diet to parent
    }
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
          <div className="text-sm text-gray-500 mb-2">
            {currentStep} of {totalSteps}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Diet Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            What's Your Diet?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Select your dietary preference to help us personalize your meal plans
          </p>

          {/* Diet Options */}
          <div className="space-y-3">
            {diets.map((diet) => (
              <button
                key={diet.id}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                  selectedDiet === diet.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDiet(diet.id)}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{diet.name}</h3>
                  <p className="text-sm text-gray-500">{diet.description}</p>
                </div>
                {selectedDiet === diet.id && (
                  <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-colors ${
            selectedDiet
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-200 cursor-not-allowed'
          }`}
          aria-label="Next step"
          disabled={!selectedDiet}
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default DietSelection;