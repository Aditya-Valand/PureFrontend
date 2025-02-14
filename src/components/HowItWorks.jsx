import React from 'react';
import { Search, Scan, ThumbsUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Scan className="w-16 h-16 text-blue-500" />,
      title: "Scan the Barcode",
      description: "Simply scan the barcode of any packaged food or skincare product"
    },
    {
      icon: <Search className="w-16 h-16 text-blue-500" />,
      title: "Get Instant Insights",
      description: "Receive detailed information about benefits, allergens, and ratings"
    },
    {
      icon: <ThumbsUp className="w-16 h-16 text-blue-500" />,
      title: "Make Better Choices",
      description: "Use expert advice and recommendations to choose better products"
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      <div className="w-full px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Get started with these simple steps to make informed decisions about your products
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-8xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-10 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-8">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;