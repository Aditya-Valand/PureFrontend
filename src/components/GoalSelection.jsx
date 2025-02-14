import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Scale, Heart, Leaf, Brain, BatteryCharging, Apple } from 'lucide-react';

const GoalSelection = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedGoal, setSelectedGoal] = useState(data?.goals || null); // Use data prop
  //const [currentStep] = useState(4); Remove this line. The currentStep and totalSteps are coming from parent component via props
  //const totalSteps = 5; Remove this line. The currentStep and totalSteps are coming from parent component via props

  const goals = [
    {
      id: 1,
      name: 'Weight Management',
      description: 'Find products that align with your weight goals',
      icon: Scale
    },
    {
      id: 2,
      name: 'Heart Health',
      description: 'Focus on cardiovascular-friendly products',
      icon: Heart
    },
    {
      id: 3,
      name: 'Allergy Awareness',
      description: 'Easily identify allergens and safe products',
      icon: Leaf
    },
    {
      id: 4,
      name: 'Nutrition Optimization',
      description: 'Maximize nutritional value in your choices',
      icon: Apple
    },
    {
      id: 5,
      name: 'Energy & Performance',
      description: 'Find products that enhance your daily energy',
      icon: BatteryCharging
    },
    {
      id: 6,
      name: 'Brain Health',
      description: 'Focus on products supporting cognitive function',
      icon: Brain
    }
  ];

  const handleNext = () => {
    onNext({ ...data, goals: goals[selectedGoal-1].name }); // pass the data to the next component
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
          <button onClick={onSkip} className="text-gray-500 hover:text-gray-700 transition-colors">Skip</button>
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

        {/* Goal Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            What's Your Primary Goal?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Select your main health goal to help us provide relevant product insights
          </p>

          {/* Goal Options */}
          <div className="space-y-3">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <button
                  key={goal.id}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center ${selectedGoal === goal.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                    }`}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${selectedGoal === goal.id ? 'bg-green-600' : 'bg-gray-100'
                    }`}>
                    <Icon className={`h-5 w-5 ${selectedGoal === goal.id ? 'text-white' : 'text-gray-600'
                      }`} />
                  </div>
                  <div className="ml-4 flex-grow text-left">
                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-500">{goal.description}</p>
                  </div>
                  {selectedGoal === goal.id && (
                    <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-colors ${selectedGoal
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-200 cursor-not-allowed'
            }`}
          aria-label="Next step"
          disabled={!selectedGoal}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default GoalSelection;