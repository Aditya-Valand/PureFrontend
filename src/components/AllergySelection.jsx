import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';

const AllergySelection = ({ onNext, onBack, onSkip, currentStep, totalSteps, data }) => {
  const [selectedAllergies, setSelectedAllergies] = useState(data?.allergies || []);
  const [customAllergy, setCustomAllergy] = useState('');

  const commonAllergies = [
    {
      id: 'peanuts',
      name: 'Peanuts',
      description: 'All peanut-based products'
    },
    {
      id: 'tree_nuts',
      name: 'Tree Nuts',
      description: 'Almonds, cashews, walnuts, etc.'
    },
    {
      id: 'dairy',
      name: 'Dairy',
      description: 'Milk, cheese, and dairy products'
    },
    {
      id: 'eggs',
      name: 'Eggs',
      description: 'Eggs and egg-derived ingredients'
    },
    {
      id: 'soy',
      name: 'Soy',
      description: 'Soybeans and soy-based products'
    },
    {
      id: 'wheat',
      name: 'Wheat',
      description: 'Wheat and gluten-containing grains'
    },
    {
      id: 'shellfish',
      name: 'Shellfish',
      description: 'Shrimp, crab, lobster, etc.'
    },
    {
      id: 'fish',
      name: 'Fish',
      description: 'All types of fish'
    }
  ];

  const handleAllergyToggle = (allergyId) => {
    setSelectedAllergies(prev =>
      prev.includes(allergyId)
        ? prev.filter(id => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  const handleAddCustomAllergy = (e) => {
    e.preventDefault();
    if (customAllergy.trim()) {
      const newAllergyId = `custom_${customAllergy.toLowerCase().replace(/\s+/g, '_')}`;
      if (!selectedAllergies.includes(newAllergyId)) {
        setSelectedAllergies(prev => [...prev, newAllergyId]);
      }
      setCustomAllergy('');
    }
  };

  const removeAllergy = (allergyId) => {
    setSelectedAllergies(prev => prev.filter(id => id !== allergyId));
  };

  const handleNext = () => {
    onNext({ allergies: selectedAllergies });
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

        {/* Allergy Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Any Allergies?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Select your allergies or add custom ones to help us identify unsafe products
          </p>

          {/* Selected Allergies Pills */}
          {selectedAllergies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedAllergies.map(allergyId => {
                const allergy = commonAllergies.find(a => a.id === allergyId);
                return (
                  <div
                    key={allergyId}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{allergy?.name || allergyId.replace('custom_', '')}</span>
                    <button
                      onClick={() => removeAllergy(allergyId)}
                      className="hover:bg-green-200 rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Allergy Input */}
          <form onSubmit={handleAddCustomAllergy} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                placeholder="Type custom allergy..."
                className="flex-grow px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
              />
              <button
                type="submit"
                disabled={!customAllergy.trim()}
                className="p-2 rounded-lg bg-green-600 text-white disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </form>

          {/* Common Allergies */}
          <div className="space-y-3">
            {commonAllergies.map((allergy) => (
              <button
                key={allergy.id}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAllergies.includes(allergy.id)
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                }`}
                onClick={() => handleAllergyToggle(allergy.id)}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{allergy.name}</h3>
                  <p className="text-sm text-gray-500">{allergy.description}</p>
                </div>
              </button>
            ))}
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
    </div>
  );
};

export default AllergySelection;