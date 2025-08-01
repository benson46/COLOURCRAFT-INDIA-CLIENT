const SplitSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content (on left for lg) */}
          <div className="space-y-8 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              WHY CHOOSE <span className="text-coral-500">PRINTIFY</span>?
            </h2>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality Materials</h3>
                  <p className="text-gray-600">
                    We use only the finest papers, inks, and materials to ensure your prints look professional and last
                    longer.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Turnaround Times</h3>
                  <p className="text-gray-600">
                    Our efficient processes and dedicated team ensure your projects are completed quickly without
                    compromising quality.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Design Support</h3>
                  <p className="text-gray-600">
                    Our experienced design team is here to help bring your vision to life with professional guidance and
                    creative expertise.
                  </p>
                </div>
              </div>
            </div>

            <button className="bg-coral-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-coral-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More About Us
            </button>
          </div>

          {/* Image (on right for lg) */}
          <div className="relative lg:order-2">
            <div className="aspect-square bg-gradient-to-br from-coral-100 to-yellow-100 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Professional printing equipment"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-coral-500 rounded-full opacity-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
