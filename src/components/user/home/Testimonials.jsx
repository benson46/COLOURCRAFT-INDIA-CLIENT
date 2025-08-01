const Testimonials = () => {
  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            WHAT OUR <span className="text-coral-500">CLIENT SAYING</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content */}
            <div className="bg-white rounded-2xl p-8 shadow-lg relative">
              {/* Circular badge */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-2 border-coral-500 bg-white flex items-center justify-center">
                <img
                  src="/testamonicals-user-1.jpeg"
                  alt="COLOURCRAFT"
                  className="h-auto w-auto rounded-full shadow-md"
                />

                {/* <div className="text-center">
                  <div className="text-coral-500 text-xs font-bold">CREATIVITY</div>
                  <div className="text-coral-500 text-xs font-bold">EXPLORE</div>
                </div> */}
              </div>

              {/* Quote marks */}
              <div className="flex space-x-2 mb-6">
                <div className="w-12 h-12 bg-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">"</span>
                </div>
                <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">"</span>
                </div>
              </div>

              {/* Author */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">ABRAHAM -</h3>
                <p className="text-gray-600">CEO AT COCOPY</p>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed italic">
                Transforming splendid thoughts into splendid marks. Full service
                printing experience at the point when quality truly matters. 🤩
              </p>
            </div>

            {/* Author Image
            <div className="relative">
              <div className="relative">
                <img
                  src="/testimonial-person.png"
                  alt="Abraham - CEO at COCOPY"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                 Decorative circles
                <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-gray-300 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gray-300 rounded-full"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
