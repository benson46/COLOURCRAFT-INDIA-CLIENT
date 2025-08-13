import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { Helmet } from "react-helmet"
import { StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"
import { MagnifyingGlassIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"
import { dev_user_api } from "../../utils/axios"

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchProduct = async() => {
      try {
        setLoading(true)
        const response = await dev_user_api.get(`product/${id}`)
        if (response.data.success && response.data.product) {
          setProduct(response.data.product)
        } else {
          setError("Product not found")
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  // Dummy data for missing fields
  const mockColors = ["blue", "black", "red", "white"]
  const mockSizes = ["S", "M", "L", "XL"]
  const mockRating = 4.5
  const mockReviewCount = 127
  const mockDiscount = product ? Math.floor(Math.random() * 30) + 5 : 15
  const mockOriginalPrice = product ? Math.round(product.price * (1 + mockDiscount/100)) : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading product...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const getColorClass = (color) => {
    const colorMap = {
      blue: "bg-blue-500",
      black: "bg-black",
      red: "bg-red-500",
      white: "bg-white border-2 border-gray-300",
      gray: "bg-gray-500",
      lightblue: "bg-blue-300",
      purple: "bg-purple-500",
      green: "bg-green-500",
    }
    return colorMap[color] || "bg-gray-400"
  }

  const getStockStatus = () => {
    if (product.stock <= 0) {
      return {
        status: "Out of Stock",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      }
    }
    if (product.stock < 5) {
      return {
        status: `Only ${product.stock} left in stock`,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      }
    }
    return {
      status: "In Stock",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    }
  }

  const stockInfo = getStockStatus()
  const productImages = product.images.length > 0 
    ? product.images 
    : ["/placeholder.svg?height=600&width=600&text=No+Image"]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="w-5 h-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIconSolid className="w-5 h-5 text-yellow-400" />
          </div>
        </div>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)
    }

    return stars
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = () => {
    toast.success("Product added to cart successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    })
  }

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    })
  }

  const mockReviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent quality printing! Very satisfied with the product.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      comment: "Good quality but delivery was a bit delayed.",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      comment: "Outstanding service and product quality. Highly recommended!",
      date: "2024-01-08",
    },
  ]

  return (
    <>
      <Helmet>
        <title>{`${product.title} - Colourcraft India`}</title>
        <meta
          name="description"
          content={product.description || `Buy ${product.title} at best price. High quality printing products from Colourcraft India.`}
        />
      </Helmet>
      
      <div className="min-h-screen bg-cream-50">
        {/* Breadcrumb */}
        <div className="bg-cream-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
              <Link to="/" className="hover:text-red-500 transition-colors whitespace-nowrap">
                Home
              </Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-red-500 transition-colors whitespace-nowrap">
                Shop
              </Link>
              <span>/</span>
              <Link to="/products" className="hover:text-red-500 transition-colors whitespace-nowrap">
                Products
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                <div
                  className={`aspect-square bg-white rounded-lg shadow-lg overflow-hidden cursor-zoom-in ${isZoomed ? "cursor-zoom-out" : ""}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">{renderStars(mockRating)}</div>
                  <span className="text-sm text-gray-600">
                    {mockRating} ({mockReviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  {mockDiscount > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">{formatPrice(mockOriginalPrice)}</span>
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                        {mockDiscount}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockInfo.bgColor} ${stockInfo.color} ${stockInfo.borderColor} border`}
                >
                  {stockInfo.status}
                </div>
              </div>

              {/* Color Selection */}
              {mockColors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">COLOR</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {mockColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${getColorClass(color)} ring-2 ring-offset-2 ring-transparent hover:ring-red-300 transition-all duration-200`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {mockSizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">SIZE</span>
                    <button className="text-sm text-gray-600 hover:text-red-500 transition-colors">SIZE GUIDE</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {mockSizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded-lg font-medium transition-all duration-200 border-gray-300 text-gray-700 hover:border-gray-400`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">QUANTITY</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock} available
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free shipping on orders over ₹500
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    30-day return policy
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Secure payment & fast delivery
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    High-quality printing guaranteed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 overflow-x-auto">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description ||
                      `Experience premium quality printing with our ${product.title}. Crafted with attention to detail and using the finest materials, this product delivers exceptional results for all your printing needs. Perfect for both personal and professional use.`}
                  </p>
                  <h4 className="font-semibold text-gray-900 mt-6 mb-3">Key Highlights:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Premium quality materials</li>
                    <li>Vibrant color reproduction</li>
                    <li>Durable and long-lasting</li>
                    <li>Professional finish</li>
                    <li>Eco-friendly printing process</li>
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Product Specifications</h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category:</dt>
                        <dd className="font-medium text-gray-900">{product.category || "Printing Material"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Material:</dt>
                        <dd className="font-medium text-gray-900">Premium Quality</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Print Type:</dt>
                        <dd className="font-medium text-gray-900">Digital/Offset</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Finish:</dt>
                        <dd className="font-medium text-gray-900">Matte/Glossy</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Available Colors:</dt>
                        <dd className="font-medium text-gray-900">{mockColors.join(", ")}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Available Sizes:</dt>
                        <dd className="font-medium text-gray-900">{mockSizes.join(", ")}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Care Instructions</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Handle with clean, dry hands</li>
                      <li>• Store in a cool, dry place</li>
                      <li>• Avoid direct sunlight</li>
                      <li>• Keep away from moisture</li>
                      <li>• Use protective covering when not in use</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Customer Reviews</h4>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">{renderStars(mockRating)}</div>
                          <span className="ml-2 text-sm text-gray-500">
                            {mockRating} out of 5 ({mockReviewCount} reviews)
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 sm:mt-0 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Write a Review
                      </button>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">{review.name}</h5>
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                              <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Load More Reviews */}
                  <div className="text-center">
                    <button className="text-red-500 hover:text-red-600 font-medium">Load More Reviews</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage