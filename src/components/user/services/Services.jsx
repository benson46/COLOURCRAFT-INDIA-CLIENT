const Services = () => {
  const services = [
    {
      id: 1,
      title: "RECYCLED",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions. A quality printing and promotional products company. Full service printing experience at the point when quality truly matters.",
      image: "/service-recycled.png",
      imageAlt: "Reusable garbage bag packaging",
    },
    {
      id: 2,
      title: "BRANDING",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions. A quality printing and promotional products company. Full service printing experience at the point when quality truly matters.",
      image: "/service-branding.png",
      imageAlt: "Brand design materials and color palettes",
    },
    {
      id: 3,
      title: "PRINTING",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions. A quality printing and promotional products company. Full service printing experience at the point when quality truly matters.",
      image: "/service-printing.png",
      imageAlt: "Colorful printed notebooks and materials",
    },
    {
      id: 4,
      title: "BOOKLET",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions. A quality printing and promotional products company. Full service printing experience at the point when quality truly matters.",
      image: "/service-booklet.png",
      imageAlt: "Printed booklets and publications",
    },
    {
      id: 5,
      title: "DESIGN",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions. A quality printing and promotional products company. Full service printing experience at the point when quality truly matters.",
      image: "/service-design.png",
      imageAlt: "Colorful basketball court design",
    },
    {
      id: 6,
      title: "PACKAGING",
      description:
        "Taking your needs seriously. Bringing your print to life. The write kind of solutions. A quality printing and promotional products company. Full service printing experience at the point when quality truly matters.",
      image: "/service-packaging.png",
      imageAlt: "Boxed water packaging design",
    },
  ]

  return (
    <section id="services" className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8">SERVICES</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive printing solutions tailored to meet your unique business needs and creative vision
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-4 h-4 bg-coral-500 rounded-full mr-4"></div>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900">{service.title}</h3>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>

                <div className="relative">
                  {/* Decorative arrow */}
                  <svg
                    className="absolute -left-16 top-8 w-16 h-16 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>

                  <button className="bg-coral-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-coral-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="aspect-square bg-white rounded-2xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
                  <img
                    src={service.image || "/placeholder.svg?height=500&width=500"}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-coral-500 rounded-full opacity-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full opacity-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
