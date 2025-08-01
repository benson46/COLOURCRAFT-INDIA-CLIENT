const Products = () => {
  const products = [
    {
      name: "Banana Way T-Shirt",
      price: "$24.00",
      image: "/banana-way-tshirt.webp",
    },
    {
      name: "Wannabe Mattisse",
      price: "$24.00",
      image: "/banana-way-tshirt.webp",
    },
    {
      name: "Milky Way T-Shirt",
      price: "$24.00",
      image: "/banana-way-tshirt.webp",
    },
    {
      name: "Milky Way T-Shirt Black",
      price: "$24.00",
      image: "/banana-way-tshirt.webp",
    },
  ];

  return (
    <section className="bg-cream-50 py-20 pb-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            EXPLORE OUR <span className="text-coral-500">PRODUCTS</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 font-medium">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diagonal banners */}
      <div className="absolute  bottom-0 left-0 right-0 h-30 overflow-hidden">
        <div className="absolute inset-0 transform -skew-y-2">
          <div className="bg-coral-400 h-5 flex items-center">
            <div className="animate-scroll-slow flex items-center space-x-8 text-gray-900 font-bold text-lg whitespace-nowrap">
              <span>🎨 OUR PORTFOLIO</span>
              <span>🚀 OUR PORTFOLIO</span>
              <span>🔥 OUR PORTFOLIO</span>
              <span>🎨 OUR PORTFOLIO</span>
              <span>🚀 OUR PORTFOLIO</span>
              <span>🔥 OUR PORTFOLIO</span>
            </div>
          </div>
          <div className="bg-yellow-400 h-16 flex items-center mt-2">
            <div className="animate-scroll-reverse flex items-center space-x-8 text-gray-900 font-bold text-lg whitespace-nowrap">
              <span>💫 OUR PORTFOLIO</span>
              <span>🎯 OUR PORTFOLIO</span>
              <span>⭐ OUR PORTFOLIO</span>
              <span>💫 OUR PORTFOLIO</span>
              <span>🎯 OUR PORTFOLIO</span>
              <span>⭐ OUR PORTFOLIO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
