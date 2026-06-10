"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "The service felt ceremonial without being stiff. Every course had a story, and the galbi was unforgettable.",
    name: "Min-ji Park",
    role: "Michelin Guide Editor",
  },
  {
    quote:
      "Seoul Garden balances luxury and warmth beautifully. It feels like a private dinner in the heart of Seoul.",
    name: "Daniel Kim",
    role: "Food Critic",
  },
  {
    quote:
      "The atmosphere, banchan, and tableside grilling made our anniversary feel truly special.",
    name: "Elena Rossi",
    role: "Guest",
  },
];

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="bg-stone-900 px-4 py-24 text-stone-50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Reviews
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Praised for atmosphere, craft, and hospitality.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              className={`reveal rounded-3xl border border-white/10 bg-stone-950/60 p-8 ${
                index === 1 ? "reveal-delay-100" : ""
              } ${index === 2 ? "reveal-delay-200" : ""}`}
            >
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-5 w-5 fill-amber-200 text-amber-200"
                  />
                ))}
              </div>

              <blockquote className="text-lg leading-8 text-stone-200">
                “{review.quote}”
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-500" />
                <div>
                  <p className="font-semibold text-stone-50">{review.name}</p>
                  <p className="text-sm text-stone-400">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;