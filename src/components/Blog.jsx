


import React, { useState } from 'react';
import { Heart, MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-102">
      <div className="relative h-64 sm:h-80">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button 
            onClick={() => setLiked(!liked)}
            className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
          >
            <Heart className={`w-5 h-5 sm:w-7 sm:h-7 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <button className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-110">
            <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className={`p-6 sm:p-8 bg-gradient-to-br from-${recipe.color} to-${recipe.gradientTo}`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">{recipe.title}</h3>
        <p className="text-white/90 mb-6 text-base sm:text-lg">{recipe.description}</p>
        
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="flex items-center justify-center w-full bg-white/20 text-white py-3 rounded-xl hover:bg-white/30 transition-all duration-300 text-base sm:text-lg font-medium"
        >
          <span>Ingredients</span>
          <ChevronDown className={`ml-2 w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 ${showIngredients ? 'rotate-180' : ''}`} />
        </button>

        <div className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${showIngredients ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/10 rounded-xl p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              {recipe.ingredientImages?.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt={recipe.ingredients[index]} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <ul className="list-none space-y-2 sm:space-y-3 text-white text-base sm:text-lg">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const healthyRecipes = [
  {
    title: "Blueberry, Spinach and Pineapple Smoothie",
    description: "A nutrient-packed smoothie perfect for breakfast or post-workout.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800",
    color: "yellow-400",
    gradientTo: "yellow-500",
    ingredientImages: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400",
      "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=400",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400"
    ],
    ingredients: [
      "2 cups baby spinach",
      "1 cup blueberries",
      "1 cup pineapple chunks",
      "1 banana",
      "1 tbsp chia seeds",
      "1 cup almond milk",
      "1 tbsp honey"
    ]
  },
  {
    title: "Quinoa Buddha Bowl",
    description: "A protein-rich bowl filled with colorful vegetables and healthy fats.",
    image: "src/assets/quino.jpg",
    color: "green-500",
    gradientTo: "emerald-600",
    ingredientImages: [
      "src/assets/ingrequino.jpg",
      "src/assets/chickpeas.jpeg",
      "src/assets/avocado.jpeg",
      "src/assets/cherryTomato.jpeg"
    ],
    ingredients: [
      "1 cup quinoa",
      "2 cups mixed greens",
      "1 avocado",
      "1 cup cherry tomatoes",
      "1 cup chickpeas",
      "2 tbsp olive oil",
      "Lemon juice to taste"
    ]
  },
  {
    title: "Spinach & Lentil Soup",
    description: "A hearty, nutrient-dense soup that's great for immunity.",
    image: "src/assets/letinSoup.jpg",
    color: "blue-500",
    gradientTo: "blue-600",
    ingredientImages: [
      "src/assets/lentils.jpeg",
      "src/assets/spinach.jpeg",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400",
      "src/assets/carrot.webp"
    ],
    ingredients: [
      "½ cup red lentils (washed)",
      "1 cup spinach (chopped)",
      "1 small carrot (diced)",
      "½ onion (chopped)",
      "2 cloves garlic (minced)",
      "1 small tomato (chopped)",
      "3 cups vegetable broth (or water)"
    ]
  },
  {
    title: "Overnight Chia Pudding",
    description: "A protein and fiber-rich breakfast that's both healthy and delicious.",
    image: "src/assets/chiapudding.webp",
    color: "purple-500",
    gradientTo: "purple-600",
    ingredientImages: [
      "src/assets/chiaseed.jpeg",
      "src/assets/maplesyrup.jpeg",
      "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=400",
      "src/assets/vanilaextract.jpg"
    ],
    ingredients: [
      "1/4 cup chia seeds",
      "1 cup almond milk",
      "1 tbsp maple syrup",
      "1/2 tsp vanilla extract",
      "Fresh berries for topping",
      "Sliced almonds",
      "Coconut flakes"
    ]
  },
  {
    title: "Baked Salmon with Roasted Vegetables",
    description: "A heart-healthy dinner rich in omega-3 fatty acids and vegetables.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800",
    color: "red-400",
    gradientTo: "red-500",
    ingredientImages: [
      "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=400",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400",
      "src/assets/sweetpotato.jpeg",
      "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=400"
    ],
    ingredients: [
      "2 salmon fillets",
      "2 cups broccoli florets",
      "2 cups sweet potato chunks",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "Fresh herbs",
      "Lemon wedges"
    ]
  }
];

const skincareRecipes = [
  {
    title: "Honey & Oatmeal Face Mask",
    description: "A gentle exfoliating mask that helps soothe and moisturize skin.",
    image: "src/assets/oatmealFacemask.jpg",
    color: "rose-400",
    gradientTo: "rose-500",
    ingredientImages: [
      "src/assets/oats.avif",
      "src/assets/maplesyrup.jpeg",
      "src/assets/yogurt.jpeg",
      "src/assets/lavenderoil.jpeg"
    ],
    ingredients: [
      "1/2 cup ground oatmeal",
      "1/4 cup honey",
      "1/4 cup plain yogurt",
      "Few drops of lavender essential oil"
    ]
  },
  {
    title: "Coconut & Coffee Body Scrub ",
    description: "Removes dead skin, boosts circulation, and deeply hydrates.",
    image: "src/assets/coconutscrub.jpeg",
    color: "purple-500",
    gradientTo: "purple-500",
    ingredientImages: [
      "src/assets/coffee.jpeg",
      "src/assets/coconutoil.avif",
      "src/assets/brownsugar.webp",
      "src/assets/vanilaextract.jpg"
    ],
    ingredients: [
      "1 cup ground coffee",
      "1/2 cup coconut oil",
      "1/2 cup brown sugar",
      "1 tsp vanilla extract"
    ]
  },
  {
    title: "Avocado & Aloe Face Mask",
    description: "A hydrating mask perfect for dry or mature skin.",
    image: "src/assets/avocadomask.jpg",
    color: "green-400",
    gradientTo: "green-500",
    ingredientImages: [
      "src/assets/avocado.jpeg",
      "src/assets/aloe.webp",
      "src/assets/maplesyrup.jpeg",
      "src/assets/vitamine.avif"
    ],
    ingredients: [
      "1 ripe avocado",
      "2 tbsp aloe vera gel",
      "1 tbsp honey",
      "5 drops vitamin E oil"
    ]
  },
  {
    title: "Cucumber & Mint Toner",
    description: "A refreshing toner that helps balance skin's pH and reduce inflammation.",
    image: "src/assets/cucumbertoner.webp",
    color: "emerald-400",
    gradientTo: "emerald-500",
    ingredientImages: [
      "src/assets/cucumber.jpeg",
      "src/assets/hazel.webp",
      "src/assets/mint.jpeg",
      "src/assets/rosewater.webp"
    ],
    ingredients: [
      "1 cucumber, juiced",
      "1/4 cup witch hazel",
      "10 mint leaves",
      "2 tbsp rose water"
    ]
  },
  {
    title: "Clay & Charcoal Face Mask",
    description: "A deep cleansing mask that helps remove impurities and excess oil.",
    image: "src/assets/charcolmask.jpg",
    color: "slate-600",
    gradientTo: "slate-700",
    ingredientImages: [
      "src/assets/bentoniteclay.webp",
      "src/assets/vinegar.jpg",
      "src/assets/charcoal.jpeg",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400"
    ],
    ingredients: [
      "2 tbsp bentonite clay",
      "1 tsp activated charcoal",
      "Apple cider vinegar",
      "3 drops tea tree oil"
    ]
  }
];

function App() {
  const [activeHealthyIndex, setActiveHealthyIndex] = useState(0);
  const [activeSkincareIndex, setActiveSkincareIndex] = useState(0);

  const slideRecipe = (section, direction) => {
    if (section === 'healthy') {
      setActiveHealthyIndex((prev) => 
        direction === 'next' 
          ? (prev + 1) % healthyRecipes.length 
          : (prev - 1 + healthyRecipes.length) % healthyRecipes.length
      );
    } else {
      setActiveSkincareIndex((prev) => 
        direction === 'next' 
          ? (prev + 1) % skincareRecipes.length 
          : (prev - 1 + skincareRecipes.length) % skincareRecipes.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 sm:mb-16 text-center font-display">
          Healthy Living Blog
        </h1>

        <section className="mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center relative">
            <span className="relative inline-block">
              Healthy Recipes
              <div className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-50 group-hover:scale-x-100 transition-transform duration-300"></div>
            </span>
          </h2>

          {/* Recipe Navigation Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {healthyRecipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveHealthyIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeHealthyIndex 
                    ? 'bg-yellow-400 w-8' 
                    : 'bg-gray-300 hover:bg-yellow-300'
                }`}
                aria-label={`Go to recipe ${index + 1}`}
              />
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 sm:-translate-x-16">
              <button 
                onClick={() => slideRecipe('healthy', 'prev')}
                className="p-2 sm:p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </button>
            </div>
            
            <div className="flex justify-center px-4 sm:px-0">
              <RecipeCard recipe={healthyRecipes[activeHealthyIndex]} />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 sm:translate-x-16">
              <button 
                onClick={() => slideRecipe('healthy', 'next')}
                className="p-2 sm:p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center relative">
            <span className="relative inline-block">
              Homemade Skincare Recipes
              <div className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-pink-400 transform scale-x-50 group-hover:scale-x-100 transition-transform duration-300"></div>
            </span>
          </h2>

          {/* Recipe Navigation Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {skincareRecipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSkincareIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeSkincareIndex 
                    ? 'bg-rose-400 w-8' 
                    : 'bg-gray-300 hover:bg-rose-300'
                }`}
                aria-label={`Go to skincare recipe ${index + 1}`}
              />
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 sm:-translate-x-16">
              <button 
                onClick={() => slideRecipe('skincare', 'prev')}
                className="p-2 sm:p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </button>
            </div>

            <div className="flex justify-center px-4 sm:px-0">
              <RecipeCard recipe={skincareRecipes[activeSkincareIndex]} />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 sm:translate-x-16">
              <button 
                onClick={() => slideRecipe('skincare', 'next')}
                className="p-2 sm:p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;