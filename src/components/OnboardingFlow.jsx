import React, { useState } from 'react';
import AgeSelection from './AgeSelection';
import AllergySelection from './AllergySelection'; // Changed to default import
import  GoalSelection  from './GoalSelection';
import HeightSelection from './HeightSelection';
import ActivityLevel from './ActivityLevel';
import DietSelection from './DietSelection';

const steps = [
  {
    id: 1,
    title: "Age Selection",
    component: AgeSelection,
    isSkippable: false
  },
  {
    id: 2,
    title: "Height Selection",
    component: HeightSelection,
    isSkippable: false
  },
  {
    id: 3,
    title: "Activity Selection",
    component: ActivityLevel,
    isSkippable: true
  },
  {
    id: 4,
    title: "Diet Selection",
    component: DietSelection,
    isSkippable: true
  },
  {
    id: 5,
    title: "Primary Goal",
    component: GoalSelection,
    isSkippable: true
  },
  {
    id: 6,
    title: "Allergies",
    component: AllergySelection,
    isSkippable: true
  }
];

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [skippedSteps, setSkippedSteps] = useState([]);

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      // Find the previous non-skipped step
      let prevStep = currentStep - 1;
      while (prevStep >= 0 && skippedSteps.includes(prevStep)) {
        prevStep--;
      }
      if (prevStep >= 0) {
        setCurrentStep(prevStep);
      }
    }
  };

  const handleSkip = () => {
    if (steps[currentStep].isSkippable) {
      setSkippedSteps(prev => [...prev, currentStep]);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handleComplete = () => {
    // Filter out any undefined values from skipped steps
    const finalData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined)
    );
    
    console.log('Completed Onboarding:', finalData);
    console.log('Skipped Steps:', skippedSteps);
    // Here you would typically send the data to your backend
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
          currentStep={currentStep + 1}
          totalSteps={steps.length}
          data={formData}
        />
      </div>
    </div>
  );
};

export default OnboardingFlow;