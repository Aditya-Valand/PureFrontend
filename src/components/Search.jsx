import React, { useState} from 'react';
import { Search, ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';

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
            </div>
            ) : (
            // Search Results Page
            <div className="p-6">
                <div className="flex items-center mb-6">
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
                            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        >
                            <img src={product.image} alt={product.product} className="w-16 h-16 object-cover rounded" />
                            <div className="ml-4">
                            <h3 className="font-medium">{product.product}</h3>
                            <div className="flex items-center mt-1">
                                <span className={`font-bold ${
                                product.score < 50 ? 'text-red-500' : 
                                product.score < 70 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                {product.score}
                                </span>
                                <span className="text-gray-500">/100</span>
                                <span className="ml-2 text-sm text-gray-600">- {product.score}</span>
                            </div>
                            </div>
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