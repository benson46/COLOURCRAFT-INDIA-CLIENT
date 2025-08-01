import { useState } from "react"

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "DESCRIPTION" },
    { id: "delivery", label: "DELIVERY" },
    { id: "reviews", label: "REVIEWS" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "description" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                "This is a high-quality product made with premium materials. Perfect for everyday use and designed to last. Our attention to detail ensures you get the best value for your money."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Premium quality materials</li>
                  <li>• Comfortable fit</li>
                  <li>• Durable construction</li>
                  <li>• Easy care instructions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Material: 100% Cotton</li>
                  <li>• Weight: 180 GSM</li>
                  <li>• Care: Machine washable</li>
                  <li>• Origin: Made in USA</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Standard Delivery</h4>
                <p className="text-gray-600">5-7 business days • Free on orders over $50</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Express Delivery</h4>
                <p className="text-gray-600">2-3 business days • $9.99</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Next Day Delivery</h4>
                <p className="text-gray-600">Order before 2 PM • $19.99</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Return Policy</h4>
              <p className="text-gray-600">
                30-day return policy. Items must be in original condition with tags attached.
              </p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">{product.reviews || "4.5"} out of 5</span>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">
                  Great quality and fast shipping! The design is exactly as shown and the material feels premium.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Mike R.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">
                  Love the design! Fits perfectly and the colors are vibrant. Would definitely order again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
