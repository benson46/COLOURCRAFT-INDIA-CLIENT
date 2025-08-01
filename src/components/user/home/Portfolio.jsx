import { useState } from "react";

const Portfolio = () => {
  const portfolioItems = [
    {
      name: "BUSINESS CARD",
      arrow: "↗",
      description: "Business cards make a memorable impression.",
    },
    {
      name: "MULTICOLOR CUP",
      arrow: "↗",
      description: "Custom printed cups for brand visibility.",
    },
    {
      name: "STREET BILLBOARD",
      arrow: "↗",
      description: "Massive visibility for your brand.",
    },
    {
      name: "THREE BOXES",
      arrow: "↗",
      description: "Creative packaging in a set of three.",
    },
    {
      name: "POUCH PACKAGING",
      arrow: "↗",
      description: "Modern, flexible pouch solutions.",
    },
    {
      name: "MAGAZINE & BOOK",
      arrow: "↗",
      description: "Elegant printing for publications.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Portfolio List */}
          <div className="space-y-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="relative">
                <div
                  onClick={() => handleClick(index)}
                  className="flex items-center justify-between py-4 border-b border-gray-200 hover:border-coral-500 transition-colors cursor-pointer group"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-coral-500 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl text-gray-400 group-hover:text-coral-500 transition-colors">
                    {item.arrow}
                  </span>
                </div>

                {activeIndex === index && (
                  <div className="bg-white border border-coral-100 shadow-md rounded-xl p-4 mt-2 text-gray-600 transition-all">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Portfolio Image */}
          <div className="relative">
            <img
              src="/business-card.jpg"
              alt="Street billboard and road"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
