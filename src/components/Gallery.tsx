"use client";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80",
    alt: "Korean barbecue",
    caption: "Tableside galbi",
  },
  {
    src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    alt: "Korean tartare",
    caption: "Seasonal raw bar",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21720e32c4d?auto=format&fit=crop&w=900&q=80",
    alt: "Korean stew",
    caption: "Kimchi jjigae",
  },
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    alt: "Korean banchan",
    caption: "House banchan",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    alt: "Korean dining table",
    caption: "Shared courses",
  },
  {
    src: "https://images.unsplash.com/photo-1555126634-3232701245ce?auto=format&fit=crop&w=900&q=80",
    alt: "Korean plated dish",
    caption: "Modern plating",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    alt: "Korean restaurant interior",
    caption: "Private dining",
  },
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    alt: "Korean fine dining",
    caption: "Evening service",
  },
];

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="bg-stone-950 px-4 py-24 text-stone-50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Gallery
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            A visual journey through Seoul Garden.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-400">
            Rich textures, warm lighting, and Korean culinary craft.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-3">
          {gallery.map((photo, index) => (
            <figure
              key={photo.caption}
              className={`reveal overflow-hidden rounded-3xl border border-white/10 bg-stone-900 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${index === 3 ? "md:col-span-2" : ""} ${
                index === 1 ? "reveal-delay-100" : ""
              } ${index === 2 ? "reveal-delay-200" : ""} ${
                index === 4 ? "reveal-delay-100" : ""
              } ${index === 5 ? "reveal-delay-200" : ""}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-64 w-full object-cover transition duration-700 hover:scale-105 md:h-full"
              />
              <figcaption className="p-4 text-sm text-stone-400">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;