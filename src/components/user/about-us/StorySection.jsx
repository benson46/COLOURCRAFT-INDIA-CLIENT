const StorySection = () => {
  return (
    <section className="bg-cream-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            THE STORY OF OUR <span className="text-coral-500">JOURNEY</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
            A quality printing and promotional products company. Full service
            printing experience at the point when quality truly matters. Taking
            your needs seriously. Bringing your print to life. The write kind of
            solutions.
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              src="/printing-process.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

