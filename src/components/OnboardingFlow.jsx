import React, { useState, useEffect } from 'react';
import AgeSelection from './AgeSelection';
import AllergySelection from './AllergySelection.jsx';
import GoalSelection from './GoalSelection.jsx';
import HeightSelection from './HeightSelection.jsx';
import ActivityLevel from './ActivityLevel.jsx';
import DietSelection from './DietSelection.jsx';
import WeightSelection from './WeightSelection.jsx';
import GenderSelection from './GenderSelection.jsx';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const steps = [
  
  {
    id: 0,
    title: "Allergies",
    component: AllergySelection,
    isSkippable: true
  },
  {
    id: 1,
    title: "Age Selection",
    component: AgeSelection,
    isSkippable: false
  },
  {
    id: 2,
    title: "Gender Selection",
    component: GenderSelection,
    isSkippable: false
  },
  {
    id: 3,
    title: "Height Selection",
    component: HeightSelection,
    isSkippable: false
  },
  {
    id:4,
    title: "Weight Selection",
    component: WeightSelection,
    isSkippable: false
  },
  {
    id: 5,
    title: "Activity Selection",
    component: ActivityLevel,
    isSkippable: true
  },
  {
    id: 6,
    title: "Diet Selection",
    component: DietSelection,
    isSkippable: true
  },
  {
    id: 7,
    title: "Primary Goal",
    component: GoalSelection,
    isSkippable: true
  },
];



const OnboardingFlow = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activity: '',
    diet: '',
    goals: '',
    allergies: '',
  });

  useEffect(() => {
    if (!steps || steps.length === 0 || currentStep < 0 || currentStep >= steps.length) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [currentStep]);

  const handleComplete = async () => {
    try {
      const token = Cookies.get('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        {
          userProfile: formData
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message);
    }
  };

  // First, import useAuth at the top

// In your OnboardingFlow component, update the handleNext function:
const handleNext = async (stepData) => {
  try {
    const token = Cookies.get('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const updatedFormData = {
      ...formData,
      ...stepData
    };
    setFormData(updatedFormData);

    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/profile`,
      {
        userProfile: updatedFormData
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 200) {
      if (currentStep === steps.length - 1) {
        completeOnboarding();  // Mark onboarding as complete
        navigate('/');         // Navigate to home
      } else {
        setCurrentStep((prev) => prev + 1);  // Go to next step if not on last step
      }
    }
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
  }
};

  const handleBack = () => {
    if (currentStep > 0) {
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

  if (!isValid) {
    return <div>Invalid step configuration</div>;
  }

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