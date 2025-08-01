const Hero = () => {
  return (
    <section className="bg-cream-50 relative overflow-hidden">
      {/* Circular badge */}
      <div className="absolute top-20 right-8 md:top-32 md:right-16">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-coral-500 flex items-center justify-center transform rotate-12">
          <img
            src="/Logo.jpg"
            alt="COLOURCRAFT"
            className="h-25 w-auto rounded-full shadow-md"
          />
          {/* <div className="text-center">
            <div className="text-coral-500 text-xs md:text-sm font-bold">CREATIVITY</div>
            <div className="text-coral-500 text-xs md:text-sm font-bold">EXPLORE</div>
          </div> */}
        </div>
      </div>

      {/* Main hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-none">
            COLOURCRAFT INDIA
          </h1>
        </div>
      </div>

      {/* Scrolling banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 py-4 overflow-hidden">
        <div className="flex animate-scroll">
          <div className="flex items-center space-x-8 text-gray-900 font-bold text-lg whitespace-nowrap">
            <span>📝 GET A FREE QUOTE</span>
            <span>💬 GET A FREE QUOTE</span>
            <span>📚 GET A FREE QUOTE</span>
            <span>📝 GET A FREE QUOTE</span>
            <span>💬 GET A FREE QUOTE</span>
            <span>📚 GET A FREE QUOTE</span>
            <span>📝 GET A FREE QUOTE</span>
            <span>💬 GET A FREE QUOTE</span>
            <span>📚 GET A FREE QUOTE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
