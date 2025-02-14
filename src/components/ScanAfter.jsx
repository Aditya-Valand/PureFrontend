import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Leaf, AlertCircle, Info } from 'lucide-react';

function ScanAfter({ analysisData }) {
  const [activeSection, setActiveSection] = useState(null);
  const [showSuccess, setShowSuccess] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Add healthier alternatives data

  if (!analysisData) {
    return null;
  }

  const alternatives = generateAlternatives(analysisData.product_details?.product_category);

  // Auto-scroll functionality for alternatives
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % alternatives.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [alternatives.length]);

  // Simulating the JSON data response
  const productData = {
    title: "Blended Chocolate Nutritional Analysis",
    description: "Detailed analysis of blended chocolate product, including nutritional information, ingredients, potential benefits and harms, and a health quality score.",
    product_details: {
      ingredients: "Cocoa Butter (42%), Cocoa Solids (31%), Sugar, Milk solids, Nature Identical Flavouring Substances, Emulsifiers (442, 476)",
      additives: [
        {
          additive_name: "Emulsifiers (442, 476)",
          description: "These are common food additives used to stabilize the mixture."
        }
      ],
      nutritional_information: {
        energy_kcal: 598,
        protein_g: 7.6,
        carbohydrates_g: 40.7,
        total_sugars_g: 24.4,
        added_sugars_g: 23.3,
        total_fat_g: 47.4,
        saturated_fat_g: 32.1,
        trans_fat_g: 0.1,
        cholesterol_mg: 4.4,
        sodium_mg: 18,
        fibres_g: 0
      },
      product_category: "chocolate"
    },
    analysis_report: {
      health_quality_score: "55",
      health_quality_rating: "Fair",
      dietary_compatibility: [
        {
          group: "Lactose intolerant",
          status: "avoid",
          recommendation: "Contains milk; may not be suitable for those with lactose intolerance."
        },
        {
          group: "Diabetics",
          status: "caution",
          recommendation: "High in sugar; consume in moderation and monitor blood sugar levels."
        },
        {
          group: "People with nut allergies",
          status: "caution",
          recommendation: "May contain tree nuts. Avoid if you have a severe nut allergy."
        },
        {
          group: "People with soy allergies",
          status: "caution",
          recommendation: "May contain soy. Avoid if you have a soy allergy."
        }
      ],
      allergens: ["Milk", "Tree Nuts", "Soy"],
      potential_side_effects: [
        "May cause digestive upset in some individuals due to high fat content and added sugars.",
        "May cause weight gain if consumed regularly in excess."
      ],
      benefits: [
        "Provides energy",
        "Cocoa flavanols may offer antioxidant benefits"
      ],
      advices: [
        "Consume in moderation due to high sugar and fat content",
        "Pair with a balanced meal to minimize its impact on blood sugar levels",
        "Consider portion control"
      ]
    }
  };

  const sections = {
    ingredients: {
      title: 'Ingredients & Additives',
      content: [analysisData.product_details?.ingredients],
      additives: analysisData.product_details?.additives,
      bgColor: 'bg-amber-50'
    },
    nutrition: {
      title: 'Nutritional Information',
      content: analysisData.product_details?.nutritional_information,
      bgColor: 'bg-green-50'
    },
    benefits: {
      title: 'Benefits',
      content: analysisData.analysis_report?.benefits,
      bgColor: 'bg-blue-50'
    },
    sideEffects: {
      title: 'Potential Side Effects',
      content: analysisData.analysis_report?.potential_side_effects,
      bgColor: 'bg-red-50'
    },
    allergens: {
      title: 'Allergens',
      content: analysisData.analysis_report?.allergens,
      bgColor: 'bg-yellow-50'
    },
    dietary: {
      title: 'Dietary Compatibility',
      content: analysisData.analysis_report?.dietary_compatibility,
      bgColor: 'bg-purple-50'
    },
    advice: {
      title: 'Advice',
      content: analysisData.analysis_report?.advices,
      bgColor: 'bg-teal-50'
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'avoid':
        return 'text-red-600';
      case 'caution':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const renderNutritionalTable = (nutrition) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Nutrient</th>
            <th className="px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(nutrition).map(([key, value]) => (
            <tr key={key} className="border-t">
              <td className="px-4 py-2 capitalize">{key.replace(/_/g, ' ')}</td>
              <td className="px-4 py-2 text-right">
                {value}
                {key.includes('_g') ? 'g' : key.includes('_mg') ? 'mg' : key.includes('_kcal') ? 'kcal' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % alternatives.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + alternatives.length) % alternatives.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out animate-fade-in-down">
          <div className="flex items-center gap-2">
            <Leaf size={20} />
            <span>Product analysis found successfully!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <span className="font-semibold text-gray-800">Pure Insight</span>
        </div>
      </header>

      {/* Product Title and Description */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-2xl font-bold text-gray-800">{analysisData.title}</h1>
            <p className="text-gray-600 mt-2">{analysisData.description}</p>
          </div>
        </div>
      </div>

      {/* Health Score */}
      <section className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-24 h-24 transform -rotate-90">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="3"
                    strokeDasharray={`${analysisData.analysis_report?.health_quality_score}, 100`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
                  {analysisData.analysis_report?.health_quality_score}/100
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Health Quality Score</h2>
                <p className="text-gray-600">{analysisData.analysis_report?.health_quality_rating}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="p-4 space-y-4">
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="transition-all duration-300">
            <button
              onClick={() => handleSectionClick(key)}
              className={`w-full text-left p-4 rounded-lg shadow-sm transition-all duration-300 ${section.bgColor} hover:shadow-md`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{section.title}</h2>
                {activeSection === key ? <X size={20} /> : <ChevronRight size={20} />}
              </div>
            </button>
            
            {activeSection === key && (
              <div className="mt-2 p-4 bg-white rounded-lg shadow-md animate-fade-in">
                {key === 'nutrition' ? (
                  renderNutritionalTable(section.content)
                ) : key === 'dietary' ? (
                  <div className="space-y-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getStatusColor(item.status)}`}>
                            {item.group}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'avoid' ? 'bg-red-100 text-red-800' :
                            item.status === 'caution' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-600">{item.recommendation}</p>
                      </div>
                    ))}
                  </div>
                ) : key === 'ingredients' ? (
                  <div>
                    <p className="mb-4">{section.content}</p>
                    <h3 className="font-semibold mb-2">Additives:</h3>
                    {section.additives.map((additive, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-medium">{additive.additive_name}</p>
                        <p className="text-gray-600">{additive.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Healthier Alternatives section */}
      <section className="p-4 bg-white shadow-sm mt-4">
        <h2 className="text-xl font-bold mb-4">Healthier Alternatives</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {alternatives.map((alt, index) => (
                <div key={index} className="w-full flex-shrink-0 p-2">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <img
                      src={alt.image}
                      alt={alt.name}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-semibold text-lg">{alt.name}</h3>
                    <p className="text-gray-600 mb-2">{alt.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${alt.rating}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">{alt.rating}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {alternatives.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                currentSlide === index ? 'bg-green-500 w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}


function generateAlternatives(category) {
  // Add more categories and alternatives as needed
  const alternativesByCategory = {
    chocolate: [
      {
        name: 'Dark Chocolate',
        image: '/api/placeholder/300/200',
        rating: 85,
        description: 'Higher cocoa content, less sugar'
      },
      {
        name: 'Sugar-Free Chocolate',
        image: '/api/placeholder/300/200',
        rating: 75,
        description: 'No added sugars, suitable for diabetics'
      },
      {
        name: 'Vegan Chocolate',
        image: '/api/placeholder/300/200',
        rating: 80,
        description: 'Dairy-free, plant-based alternative'
      }
    ],
    // Add more categories here
  };

  return alternativesByCategory[category] || [];
}
export default ScanAfter;