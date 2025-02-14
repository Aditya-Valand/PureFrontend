import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ActivityLevel = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedActivity, setSelectedActivity] = useState(data?.activityLevel || null);

  const activityOptions = [
    {
      id: 1,
      title: "Little or No Activity",
      description: "Mostly sitting through the day (eg. Desk Job, Bank Teller)",
      icon: "🧑‍💻"
    },
    {
      id: 2,
      title: "Lightly Active",
      description: "Mostly standing through the day (eg. Sales Associate, Teacher)",
      icon: "🧍"
    },
    {
      id: 3,
      title: "Moderately Active",
      description: "Mostly walking or doing physical activities (eg. Tour Guide, Waiter)",
      icon: "🚶"
    },
    {
      id: 4,
      title: "Very Active",
      description: "Mostly doing heavy physical activities (eg. Gym Instructor, Construction Worker)",
      icon: "💪"
    }
  ];

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activityId);
  };

  const handleNext = () => {
    if (selectedActivity && onNext) {
      onNext({ ...data, activity: activityOptions[selectedActivity-1].title.toLowerCase() });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
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
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">{currentStep} of {totalSteps}</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How active are you?
          </h2>
          <p className="text-gray-500 text-sm">
            Based on your lifestyle, we can assess your daily calorie requirements.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {activityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleActivitySelect(option.id)}
              className={`w-full p-4 rounded-lg border transition-all duration-200 
                ${selectedActivity === option.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-200 hover:bg-green-50/50'
                }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl" role="img" aria-label={option.title}>
                  {option.icon}
                </span>
                <div className="text-left">
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto
            transition-opacity ${!selectedActivity ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
          disabled={!selectedActivity}
          aria-label="Next step"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ActivityLevel;