import { useNavigate } from "react-router";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-cream-50 py-20">
      {/* Circular badge */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full max-w-4xl mx-auto px-5">
            <img
              src="/printed-boxes.webp"
              alt="Colorful printed materials and boxes"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              NEW WAY TO PRINT YOUR PROJECTS WITH{" "}
              <span className="text-coral-500">BEST</span> RESULTS
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              A quality printing and promotional products company. Full service
              printing experience at the point when quality truly matters.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="cursor-pointer bg-coral-500 text-black px-8 py-4 rounded-full font-semibold text-lg 
                 transition-all duration-200 ease-in-out 
                 shadow-lg 
                 hover:bg-coral-600 hover:scale-105 
                 active:scale-95"
            >
              Contact With Us Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
