import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '0',
      period: '/month',
      description: 'Perfect for getting started',
      buttonText: 'Get Started',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Basic Analytics Dashboard',
        'Up to 100 Scans/month',
        'Community Support',
        'Basic Product Information'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '149',
      period: '/month',
      description: 'Most popular choice',
      buttonText: 'Choose Premium',
      icon: Sparkles,
      gradient: 'from-violet-500 to-purple-500',
      featured: true,
      features: [
        'Advanced Analytics',
        'Unlimited Scans',
        'Priority Support 24/7',
        'Detailed Product Analysis'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: '299',
      period: '/month',
      description: 'For large organizations',
      buttonText: 'Contact Sales',
      icon: Zap,
      gradient: 'from-rose-500 to-pink-500',
      features: [
        'Custom Analytics',
        'Dedicated Account Manager',
        'API Access',
        'Custom Integration Support'
      ]
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple Pricing</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-3xl transition-all duration-500 cursor-pointer 
                ${selectedPlan === plan.id ? 'transform hover:-translate-y-2' : 'hover:-translate-y-1'}`}
            >
              {/* Card with gradient border effect */}
              <div className={`relative p-[2px] rounded-3xl transition-all duration-300 
                ${selectedPlan === plan.id 
                  ? `bg-gradient-to-b ${plan.gradient}` 
                  : 'bg-white hover:bg-gradient-to-b hover:from-gray-100 hover:to-white'
                }`}
              >
                <div className="bg-white rounded-3xl p-8 h-full">
                  {/* Icon and Name */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">₹</span>
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${
                          selectedPlan === plan.id 
                            ? `text-${plan.gradient.split('-')[3]}` 
                            : 'text-gray-400'
                        }`} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 
                      ${selectedPlan === plan.id
                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>

              {/* Popular Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white 
                    px-6 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;