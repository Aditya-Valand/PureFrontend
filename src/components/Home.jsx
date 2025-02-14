import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import homeimg from '../assets/home.webp'
import scannerimg from '../assets/scanner.png'
import influencer from '../assets/influencer.png'
import noads from '../assets/no-ads.png'
import cream from '../assets/cream.jpg'
import bournvita from '../assets/bournvita.jpg'
import logo from '../assets/logo.png'
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';
import Reviews from './Reviews';
import PricingPlans from './PricingPlans';

const Home = () => {
  return (
    
    <div>
      <Navbar/>
      <HeroSection/>
      <HowItWorks/>
      <WhyChooseUs/>
      

      {/* Check Ingredients Section */}
      <section id="check-ingredients" className="max-w-screen-xl mx-auto pb-20 px-6 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
              Check ingredients in three simple steps
            </h2>
            <ul className="space-y-6">
              {/* Step 1 */}
              <li className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-[#99b182] text-[#3d5e31] rounded-full font-bold text-lg shrink-0">
                  1
                </div>
                <p className="text-gray-700 text-base md:text-lg">Scan the product barcode.</p>
              </li>
              {/* Step 2 */}
              <li className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-[#99b182] text-[#3d5e31] rounded-full font-bold text-lg shrink-0">
                  2
                </div>
                <p className="text-gray-700 text-base md:text-lg">See the ingredients and their ratings.</p>
              </li>
              {/* Step 3 */}
              <li className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-[#99b182] text-[#3d5e31] rounded-full font-bold text-lg shrink-0">
                  3
                </div>
                <p className="text-gray-700 text-base md:text-lg">Discover cleaner and healthier product alternatives.</p>
              </li>
            </ul>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center relative">
            <img src={scannerimg} alt="Check Ingredients" className="rounded-lg w-[90%] h-auto" />
          </div>
        </div>
      </section>

      {/* Independence Section */}
      <section id="independence" className="max-w-screen-xl mx-auto py-20 bg-white-py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            100% Independent & No External Influence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* No Influence */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-[#cce2c5] rounded-full p-4 mb-4">
                <img src={influencer} alt="No Influence Icon" className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-semibold text-[#3d5e31] mb-2">No Influence</h3>
              <p className="text-gray-700">
                Brand involvement is strictly prohibited from influencing our content, ensuring unadulterated, unbiased
                opinions.
              </p>
            </div>

            {/* No Ads */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-[#cce2c5] rounded-full p-4 mb-4">
                <img src={noads} alt="No Ads Icon" className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-semibold text-[#3d5e31] mb-2">No Ads</h3>
              <p className="text-gray-700">
                Our website proudly remains ad-free, providing an uninterrupted experience for our users, allowing them to
                focus on valuable content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cosmetics Quality Section */}
      {/* <section id="cosmetics-quality" className="max-w-screen-xl py-20 mx-auto px-6">
        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Also, check the quality of your <span className="italic">cosmetics</span>!
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Cosmetic products often contain hidden risks, such as endocrine disruptors, carcinogens, allergens, or irritants.
              With PureInsight, you can uncover the health effects of your personal care items and make safer choices for your well-being.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative">
              <img 
                src={cream} 
                alt="Cosmetic Product" 
                className="rounded-lg max-w-full h-auto relative z-[1]" 
                />
            </div>
          </div>
        </div>
      </section> */}

      {/* Foods Quality Section */}
      <section id="foods-quality" className="max-w-screen-xl mx-auto py-20 px-6">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img 
              src={bournvita}
              alt="Foods Product" 
              className="rounded-lg w-full md:w-96 h-auto" 
              />
          </div>

          <div className="text-center md:text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Evaluate the quality of your <span className="italic">foods</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Make informed choices with confidence! Our innovative scanner <strong>PureInsight</strong> quickly decodes labels to reveal the truth about your purchase, guiding you towards healthier options.
            </p>
          </div>
        </div>
      </section>
        <Reviews/>

     <PricingPlans/>

     <Footer/>
     </div>
);
};
// Utility Icon Component for Check Icons
const CheckIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 13l4 4L19 7" 
    />
  </svg>
);

export default Home;