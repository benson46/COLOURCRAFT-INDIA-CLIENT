import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  StarIcon 
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { dev_user_api } from "../../utils/axios";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 12;
  const navigate = useNavigate();
  
  const user = localStorage.getItem("user") || null;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await dev_user_api.get("/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const categoryTitles = products
      .map((product) => product.category?.title)
      .filter(Boolean);
    return ["All", ...new Set(categoryTitles)];
  }, [products]);

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (product.stock <= 0) return;
    // Add to cart logic would go here
    console.log("Added to cart:", product);
  };

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    return sum / ratings.length;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.title === selectedCategory;

      let matchesPrice = true;
      if (priceRange !== "All") {
        const price = product.price;
        switch (priceRange) {
          case "0-1000":
            matchesPrice = price <= 1000;
            break;
          case "1000-2000":
            matchesPrice = price > 1000 && price <= 2000;
            break;
          case "2000+":
            matchesPrice = price > 2000;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return calculateAverageRating(b.ratings) - calculateAverageRating(a.ratings);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Product Card Component
  const ProductCard = ({ product }) => {
    const avgRating = calculateAverageRating(product.ratings);
    const isFavorite = favorites.includes(product._id);
    const isOutOfStock = product.stock <= 0;
    
    return (
      <div 
        className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 cursor-pointer"
        onClick={(e) => {
          // Only navigate if not clicking on buttons
          if (!e.target.closest('button')) {
            navigate(`/product/${product._id}`);
          }
        }}
      >
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product._id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors"
        >
          <HeartIcon className={`w-5 h-5 ${isFavorite ? 'text-gray-900 fill-current' : 'text-gray-400'}`} />
        </button>
        
        {/* Out of stock badge */}
        {isOutOfStock && (
          <div className="absolute top-3 left-3 z-10 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full">
            Out of Stock
          </div>
        )}
        
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <div className="relative h-full">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'opacity-70' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Quick add to cart */}
          {!isOutOfStock && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 font-medium py-2 px-6 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-semibold mb-1 group-hover:text-gray-700 transition-colors line-clamp-1 ${isOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>
                {product.title}
              </h3>
              <p className={`text-sm mb-3 line-clamp-2 min-h-[40px] ${isOutOfStock ? 'text-gray-400' : 'text-gray-500'}`}>
                {product.description}
              </p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                avgRating >= star 
                  ? <SolidStarIcon key={star} className={`w-4 h-4 ${isOutOfStock ? 'text-amber-300' : 'text-amber-500'}`} />
                  : <StarIcon key={star} className={`w-4 h-4 ${isOutOfStock ? 'text-amber-300' : 'text-amber-500'}`} />
              ))}
            </div>
            <span className={`text-sm ml-2 ${isOutOfStock ? 'text-gray-400' : 'text-gray-500'}`}>
              ({product.ratings?.length || 0})
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <p className={`text-xl font-bold ${isOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            
            {/* Add to Cart Button */}
            {isOutOfStock ? (
              <span className="text-sm font-medium text-gray-400">
                Unavailable
              </span>
            ) : (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimalist Hero Header */}
      <div className="py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Discover Our Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium custom printing solutions for every need
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Search and Filter Bar */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="relative flex-1 max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Filters */}
            <div className="lg:w-80 border-r border-gray-200">
              <div className="p-6 space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    {["All", "0-1000", "1000-2000", "2000+"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setPriceRange(range)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          priceRange === range
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {range === "All"
                          ? "All Prices"
                          : range === "2000+"
                            ? "₹2000+"
                            : `₹${range}`}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Results Count */}
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-900 font-medium">
                    {filteredProducts.length} products found
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCategory !== "All" && `Category: ${selectedCategory}`}
                    {priceRange !== "All" && ` • Price: ${priceRange === "2000+" ? "₹2000+" : `₹${priceRange}`}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="border-t border-gray-200 px-6 py-6">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Previous
                        </button>

                        <div className="hidden md:flex items-center space-x-1">
                          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                  currentPage === pageNum
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                          {totalPages > 5 && currentPage < totalPages - 2 && (
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                currentPage === totalPages
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {totalPages}
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-300 mb-4">
                    <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No products found
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    We couldn't find any products matching your filters. Try adjusting your search criteria.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setPriceRange("All");
                    }}
                    className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;