"use client";

import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/images/Кимпаб с курицей.jpeg", alt: "Кимпаб с курицей" },
  { src: "/images/Пибимпаб с говядиной.jpeg", alt: "Пибимпаб с говядиной" },
  { src: "/images/Рамен с курицей.jpeg", alt: "Рамен с курицей" },
  { src: "/images/Том ям с креветкой.jpeg", alt: "Том ям с креветкой" },
  { src: "/images/Онигири с лососем.jpeg", alt: "Онигири с лососем" },
  { src: "/images/Кимчи.jpeg", alt: "Кимчи" },
  { src: "/images/Пибимпаб с овощами.jpeg", alt: "Пибимпаб с овощами" },
  { src: "/images/Кимпаб с лососем.jpeg", alt: "Кимпаб с лососем" },
  { src: "/images/Пибимпаб с креветкой.jpeg", alt: "Пибимпаб с креветкой" },
  { src: "/images/Морковка по корейски.jpeg", alt: "Морковка по корейски" },
  { src: "/images/Салат с грибами моэр.jpeg", alt: "Салат с грибами моэр" },
  { src: "/images/Онигири с крабом.jpeg", alt: "Онигири с крабом" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Галерея
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            Визуальный путешествие
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Каждое фото рассказывает историю о нашем внимании к деталям
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="break-inside relative mb-6 overflow-hidden rounded-3xl cursor-pointer group reveal"
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-[#F5F1E6] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-[#F5F1E6] hover:text-[#D4B98F] transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;