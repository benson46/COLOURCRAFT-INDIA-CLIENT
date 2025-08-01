const PrioritySection = () => {
  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              WHERE WE BELIEVE YOU ARE A{" "}
              <span className="text-coral-500">PRIORITY.</span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              A quality printing and promotional products company. Full service
              printing experience at the point when quality truly matters.
              Taking your needs seriously. Bringing your print to life. The
              write kind of solutions
            </p>

            {/* Decorative arrow */}
            <div className="relative">
              {/* <svg
                className="absolute -left-16 top-8 w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg> */}

              <button className="bg-coral-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-coral-600 transition-colors shadow-lg">
                Contact With Us Now
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/about-priority-sign.png"
              alt="Yellow SU sign"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrioritySection;
