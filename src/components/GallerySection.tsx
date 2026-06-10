"use client";

const galleryImages = [
  "/images/Кимпаб с курицей.jpeg",
  "/images/Пибимпаб с говядиной.jpeg",
  "/images/Рамен с курицей.jpeg",
  "/images/Том ям с креветкой.jpeg",
  "/images/Онигири с лососем.jpeg",
  "/images/Кимчи.jpeg",
  "/images/Пибимпаб с овощами.jpeg",
  "/images/Кимпаб с лососем.jpeg",
];

const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 px-6 bg-stone-50"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-stone-200/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium uppercase tracking-wider mb-4">
            Галерея
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 tracking-tight mb-8">
            Наши блюда
          </h2>
        </motion.div>

        {/* Grid of Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/10 p-4 rounded-lg shadow-sm hover:shadow-xl overflow-hidden"
            >
              <img
                src={src}
                alt="Блюдо"
                className="w-full h-48 object-cover rounded-md transition-transform duration-500 hover:scale-105"
              />
              <div className="mt-2 text-center text-sm text-stone-500">
                {src.split("/").pop()?.replace(/-/g, " ")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;