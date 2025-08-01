const ContactMap = () => {
  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-none">CONTACT</h1>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.558384180833!2d-74.0059728!3d41.1171432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e7e8c6b8b8b1%3A0x1234567890abcdef!2s640%20Chestnut%20Ridge%20Rd%2C%20Spring%20Valley%2C%20NY%2010977!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Printify Location"
          ></iframe>

          {/* Map Overlay */}
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900">Find Us Here</h3>
            <p className="text-sm text-gray-600">Spring Valley, NY</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMap
