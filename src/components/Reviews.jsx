import React from 'react';
import { Star, User } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Thompson",
      role: "Health Enthusiast",
      rating: 5,
      content: "This app has completely changed how I shop for skincare products. The allergen detection feature is a lifesaver!"
    },
    {
      name: "David Chen",
      role: "Nutrition Coach",
      rating: 5,
      content: "As a nutrition coach, I recommend this app to all my clients. The detailed insights are incredibly valuable."
    },
    {
      name: "Emily Rodriguez",
      role: "Conscious Consumer",
      rating: 5,
      content: "The expert Q&A feature has helped me make informed decisions about my family's food choices."
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full bg-white py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join thousands of satisfied users who make healthier choices every day
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-3xl p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white p-3 rounded-full mr-4">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{review.name}</h3>
                  <p className="text-gray-600">{review.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;