import React, { useState} from 'react';
import { Search, ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';

const ProductCard = ({ product }) => {
  const scoreColor =
    product.score < 50
      ? "text-red-500"
      : product.score < 70
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div
      className="rounded border border-gray-200 hover:shadow-lg p-4"
      data-product-id={product.id}
    >

        <h3 className="text-base font-semibold text-gray-900 truncate w-full">{product.product}</h3>
        <div className="flex items-center mt-1">
        <div className="flex mt-2 space-x-2">
        {["Pros", "Cons", "Allergens"].map((tag, index) => (
            <span
            key={index}
            className={`px-3 py-1 text-xs rounded-full ${
                tag === "Pros"
                ? "bg-green-200 text-green-700"
                : tag === "Cons"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-200 text-yellow-700"
            }`}
            >
            {tag}
            </span>
        ))}
        </div>
        </div>

        <div className='mt-4 flex justify-between items-center'>
            <span className={`block font-bold ${scoreColor} text-xl`}>
                {product.score} / 100
            </span>
            <button className="ml-auto bg-green-700 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                See Details
            </button>
        </div>

    </div>
  );
};


  
  const ProductList = () => {
    const products = [
      {
        id: 1,
        product: "Dairy Milk",
        score: 40,
        scoreText: "Not so good",
        image: "cadbuary.png",
      },
      {
        id: 2,
        product: "Kitkat",
        score: 80,
        scoreText: "So good",
        image: "darkchocolate.jpg",
      },
      {
        id: 3,
        product: "Banana Chips",
        score: 65,
        scoreText: "Good",
        image: "bananachips.jpg",
      },
    ];
  
    return (
      <div className="mt-8 space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };
  

function SearchApp() {


    const Auth = useAuth();

    const [isSearchView, setIsSearchView] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    async function fetchProducts(query) {

        try {
            // const url = `${import.meta.env.VITE_BASE_URL}/process/search?query=${encodeURIComponent(query)}`;
            const url = `http://localhost:3000/process/search?query=${encodeURIComponent(query)}`;

            const response = await fetch(url, {
                'headers': {
                    'Authorization': `Bearer ${Auth.user.token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data.data;

        } catch (error) {
            return []
        }
    }


    const handleSearch = async (query) => {
  
        if (query.length < 3) {
        return;
        }
    
        const results = await fetchProducts(query);
    
        setSearchResults(results);
    
        console.log('Search successful.', results);
    };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };


  const handleUploadPhoto = () => {
    alert('Photo upload functionality will be implemented here');
  };

  return (
    <MobileNavigation>
        <div className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto bg-white shadow-md min-h-screen">
            {!isSearchView ? (
            // Main Search Page
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">Product Search</h1>
                </div>
                <div className="relative">
                <input
                    type="text"
                    className="w-full px-10 py-2 border rounded-lg"
                    placeholder="Search any product"
                    onFocus={() => setIsSearchView(true)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <Camera 
                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                    size={20}
                    onClick={handleUploadPhoto}
                />
                </div>
                <ProductList />
            </div>
            ) : (
            // Search Results Page
            <div className="p-6">
                <h1 className="text-xl font-semibold">Product Search</h1>
                <div className="flex items-center my-6">
                <ArrowLeft 
                    className="mr-2 cursor-pointer" 
                    size={20}
                    onClick={() => {
                    setIsSearchView(false);
                    setSearchQuery('');
                    }}
                />
                    <div className="relative flex-1">
                        <input
                        type="text"
                        className="w-full px-10 py-2 border rounded-lg"
                        placeholder="Search any product"
                        value={searchQuery}
                        onChange={handleSearchInput}
                        autoFocus
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="space-y-2">

                {searchQuery && (
                    <div className="space-y-3 mt-2">
                    {searchResults.length > 0 ? (
                        searchResults.map(product => (
                        <div
                            key={product.slug}
                            onClick={() => navigate('/read/' + product.slug)}
                        >
                            
                            <ProductCard product={product} />
                            
                        </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No products found</p>
                        <button
                            onClick={handleUploadPhoto}
                            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200"
                        >
                            Upload Product Photo
                        </button>
                        </div>
                    )}
                    </div>
                )}
                </div>
            </div>
            )}
        </div>
        </div>
    </MobileNavigation>
  );
}

export default SearchApp;