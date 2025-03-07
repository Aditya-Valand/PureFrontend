import React from 'react';
import { useState , useEffect } from 'react';
import { CheckCircle, Clock, MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const WhyChooseUs = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const features = [
    {
      icon: <CheckCircle className="w-16 h-16" />,
      title: "Benefits & Disadvantages",
      description: "Discover the pros and cons of every product with our detailed analysis.",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      hoverColor: "hover:bg-green-100"
    },
    {
      icon: <Clock className="w-16 h-16" />,
      title: "Allergen Detection",
      description: "Identify allergens and avoid harmful ingredients with our smart detection system.",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      hoverColor: "hover:bg-yellow-100"
    },
    {
      icon: <MessageCircle className="w-16 h-16" />,
      title: "Expert Q&A",
      description: "Get personalized answers from nutritionists and skincare experts.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      hoverColor: "hover:bg-blue-100"
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-26 md:py-32">
      {isMobile && (
        <div className="sticky top-0 z-10 bg-transperent backdrop-blur-lg shadow-sm px-6 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100 mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
      <div className="max-w-8xl my-5 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Us?</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-10 rounded-3xl ${feature.bgColor} ${feature.hoverColor} 
                transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
            >
              <div className="flex flex-col h-full">
                <div className={`mb-8 ${feature.iconColor} 
                  transform transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;