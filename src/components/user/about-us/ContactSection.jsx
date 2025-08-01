import { useState } from "react";

const ContactSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="bg-cream-50 py-20 relative overflow-hidden">
      {/* Large CONTACT text */}
      <div className="absolute top-0 left-0 right-0 text-center">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 opacity-20">
          CONTACT
        </h2>
      </div>

      {/* Scrolling banner */}
      <div className="absolute top-1/3 left-0 right-0 bg-yellow-400 py-4 overflow-hidden transform -rotate-1">
        <div className="flex animate-scroll">
          <div className="flex items-center space-x-8 text-gray-900 font-bold text-lg whitespace-nowrap">
            <span>📝 GET A FREE QUOTE</span>
            <span>💬 GET A FREE QUOTE</span>
            <span>📚 GET A FREE QUOTE</span>
            <span>📝 GET A FREE QUOTE</span>
            <span>💬 GET A FREE QUOTE</span>
            <span>📚 GET A FREE QUOTE</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32">
        {/* Newsletter Section */}
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            <span className="text-coral-500">SUBSCRIBE</span> OUR NEWSLETTER
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-coral-500 text-gray-700"
              required
            />
            <button
              type="submit"
              className="bg-coral-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-coral-600 transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Decorative arrow */}
        <div className="absolute bottom-0 right-8">
          <svg
            className="w-24 h-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
