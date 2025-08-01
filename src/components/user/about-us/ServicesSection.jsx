const ServicesSection = () => {
  const services = [
    {
      title: "RECYCLED",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions",
    },
    {
      title: "Branding",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions",
    },
    {
      title: "PRINTING",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions",
    },
    {
      title: "PRINTING",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions",
    },
    {
      title: "DESIGN",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions",
    },
    {
      title: "PACKAGING",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions",
    },
  ];

  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            WHAT WE <span className="text-coral-500">DO</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
