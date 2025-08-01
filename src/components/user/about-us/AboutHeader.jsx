const AboutHeader = () => {
  return (
    <section className="bg-cream-50 py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          {/* Main ABOUT US heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-none mb-8">
            ABOUT
          </h1>

          {/* T-shirt image positioned within the text */}
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-none">
              US
            </h1>
            {/* T-shirt image overlay */}
            {/* <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-24 h-24 md:w-32 md:h-32">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="Printed t-shirt"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
