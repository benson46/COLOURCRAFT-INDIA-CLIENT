import { StarIcon } from '@heroicons/react/20/solid';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "ABRAHAM",
      title: "CEO AT COCOPY",
      quote:
        "Transforming splendid thoughts into splendid marks. Full service printing experience at the point when quality truly matters. 🤩",
      image: "/testamonicals-user-1.jpeg",
      rating: 5,
    },
    {
      id: 2,
      name: "SARAH JOHNSON",
      title: "MARKETING DIRECTOR",
      quote:
        "Printify exceeded our expectations with their attention to detail and quick turnaround. Our marketing materials have never looked better!",
      image: "/testamonicals-user-1.jpeg",
      rating: 5,
    },
    {
      id: 3,
      name: "MICHAEL CHEN",
      title: "STARTUP FOUNDER",
      quote:
        "From business cards to packaging, Printify has been our go-to printing partner. Their quality and service are unmatched in the industry.",
      image: "/testamonicals-user-1.jpeg",
      rating: 3,
    },
    {
      id: 4,
      name: "EMILY RODRIGUEZ",
      title: "CREATIVE AGENCY OWNER",
      quote:
        "Working with Printify feels like having an extension of our team. They understand our vision and deliver exceptional results every time.",
      image: "/testamonicals-user-1.jpeg",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-cream-50 via-white to-cream-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            WHAT OUR <span className="text-coral-500">CLIENTS SAY</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our clients say about their experience with Printify — their words, not ours.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 relative"
            >
              {/* Floating Badge */}
              <div className="absolute -top-6 left-6 bg-coral-100 text-coral-600 text-xs font-bold py-1 px-3 rounded-full shadow-sm uppercase tracking-wide">
                Rated {testimonial.rating}/5
              </div>

              {/* Avatar & Info */}
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-coral-500"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed italic mb-6">
                "{testimonial.quote}"
              </p>

              {/* Stars using Heroicons */}
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
