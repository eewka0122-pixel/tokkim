"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage =
  "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=2200&q=80";

const highlights = [
  "Omakase-style Korean tasting menus",
  "Private dining rooms",
  "Han River-inspired hospitality",
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-stone-950 px-4 py-20 text-stone-50 sm:px-6 lg:px-8">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-br from-stone-950/95 via-stone-950/70 to-stone-950/35" />
      <div className="absolute left-10 top-24 z-10 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 z-10 h-96 w-96 rounded-full bg-red-950/30 blur-3xl" />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-center gap-8">
        <div className="reveal inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-200/10 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur">
          <Sparkles className="h-4 w-4 text-amber-200" />
          Seoul fine dining, reimagined
        </div>

        <div className="reveal reveal-delay-100 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-200">
            Contemporary Korean Cuisine
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight tracking-tight text-stone-50 sm:text-6xl lg:text-8xl">
            Seoul Garden
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            A luxurious Korean restaurant experience blending royal court
            traditions, seasonal ingredients, and modern tableside service.
          </p>
        </div>

        <div className="reveal reveal-delay-200 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-full bg-amber-200 px-8 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100"
          >
            <a href="#reservation">Reserve a table</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-stone-700 px-8 py-6 text-base font-semibold text-stone-100 hover:bg-stone-800 hover:text-white"
          >
            <a href="#menu">
              Explore menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="reveal reveal-delay-300 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
            >
              <p className="text-sm text-stone-300">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-stone-400 sm:block">
        <span className="float block h-10 w-6 rounded-full border border-stone-600 border-t-stone-200" />
      </div>
    </section>
  );
};

export default HeroSection;