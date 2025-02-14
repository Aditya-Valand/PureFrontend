import React from 'react';

const ScanAfter = ({ data }) => {
  if (!data) return <p>No data available</p>;

  const { title, description, product_details, analysis_report } = data;

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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg space-y-6">
      {/* Title and Description */}
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* Ingredients Section */}
      {product_details && (
        <div>
          <h2 className="text-xl font-semibold">Ingredients & Additives</h2>
          <p>{product_details.ingredients}</p>
          {product_details.additives && (
            <>
              <h3 className="mt-4 font-medium">Additives:</h3>
              {product_details.additives.map((additive, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{additive.additive_name}</p>
                  <p className="text-gray-600">{additive.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Nutritional Information Section */}
      {product_details.nutritional_information && (
        <div>
          <h2 className="text-xl font-semibold">Nutritional Information</h2>
          {renderNutritionalTable(product_details.nutritional_information)}
        </div>
      )}

      {/* Health Quality Score */}
      {analysis_report && (
        <>
          <div className="flex items-center gap-4 mt-6">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
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
                  strokeDasharray={`${analysis_report.health_quality_score},100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
                {analysis_report.health_quality_score}/100
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Health Quality Score</h3>
              <p>{analysis_report.health_quality_rating}</p>
            </div>
          </div>

          {/* Benefits */}
          {analysis_report.benefits && (
            <>
              <h2 className="text-xl font-semibold mt-6">Benefits</h2>
              <ul className="list-disc pl-5">
                {analysis_report.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </>
          )}

          {/* Potential Side Effects */}
          {analysis_report.potential_side_effects && (
            <>
              <h2 className="text-xl font-semibold mt-6">Potential Side Effects</h2>
              <ul className="list-disc pl-5">
                {analysis_report.potential_side_effects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </>
          )}

          {/* Allergens */}
          {analysis_report.allergens && (
            <>
              <h2 className="text-xl font-semibold mt-6">Allergens</h2>
              <ul className="list-disc pl-5">
                {analysis_report.allergens.map((allergen, index) => (
                  <li key={index}>{allergen}</li>
                ))}
              </ul>
            </>
          )}

          {/* Dietary Compatibility */}
          {analysis_report.dietary_compatibility && (
            <>
              <h2 className="text-xl font-semibold mt-6">Dietary Compatibility</h2>
              {analysis_report.dietary_compatibility.map((item, index) => (
                <div key={index} className={`border-b pb-4 last:border-none`}>
                  <span
                    className={`font-semibold ${
                      item.status === 'avoid'
                        ? 'text-red-600'
                        : item.status === 'caution'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {item.group}
                  </span>{' '}
                  - {item.recommendation}
                </div>
              ))}
            </>
          )}

          {/* Advice */}
          {analysis_report.advices && (
            <>
              <h2 className="text-xl font-semibold mt-6">Advice</h2>
              <ul className="list-disc pl-5">
                {analysis_report.advices.map((advice, index) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScanAfter;
