import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GenderSelection = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleNext = () => {
    if (selectedGender) {
      onNext({ ...data, gender: selectedGender });
    }
  };

  const genderOptions = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'other', label: 'Other' }
  ];
  
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

        {/* Gender Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            What's Your Gender?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Select your gender to help us personalize your experience
          </p>

          {/* Gender Options */}
          <div className="space-y-3">
            {genderOptions.map((gender) => (
              <button
                key={gender.id}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                  selectedGender === gender.id
                    ? 'border-green-600 bg-[#E4F8E6] text-green-600'
                    : 'border-gray-200 hover:border-green-600 hover:bg-[#E4F8E6]/50'
                }`}
                onClick={() => setSelectedGender(gender.id)}
              >
                <span className="text-lg font-medium">{gender.label}</span>
                {selectedGender === gender.id && (
                  <div className="h-4 w-4 rounded-full bg-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-colors ${
            selectedGender
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          aria-label="Next step"
          onClick={handleNext}
          disabled={!selectedGender}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default GenderSelection;
