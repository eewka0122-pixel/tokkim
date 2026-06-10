"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dishes = [
  {
    title: "Galbi Jjim",
    description:
      "Braised short ribs with pear, aged soy, chestnut, and aromatic herbs.",
    price: "₩68,000",
    tag: "Chef's Signature",
    image:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Yukhoe Tartare",
    description:
      "Hand-cut hanwoo beef with Korean pear, sesame, egg yolk, and gochujang oil.",
    price: "₩54,000",
    tag: "Raw Bar",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Jjigae Flight",
    description:
      "Doenjang, kimchi, and seafood stews served tableside with seasonal banchan.",
    price: "₩42,000",
    tag: "Sharing",
    image:
      "https://images.unsplash.com/photo-1563245372-f21720e32c4d?auto=format&fit=crop&w=900&q=80",
  },
];

const SignatureDishes = () => {
  return (
    <section
      id="signature"
      className="bg-stone-950 px-4 py-24 text-stone-50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Signature Dishes
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Dishes crafted with ceremony and precision.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-400">
            Each plate reflects the depth of Korean culinary heritage, from
            royal court recipes to modern interpretations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dishes.map((dish, index) => (
            <Card
              key={dish.title}
              className={`reveal overflow-hidden rounded-3xl border-stone-800 bg-stone-900/80 text-stone-50 shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-2 hover:border-amber-200/40 ${
                index === 1 ? "reveal-delay-100" : ""
              } ${index === 2 ? "reveal-delay-200" : ""}`}
            >
              <img
                src={dish.image}
                alt={dish.title}
                className="h-56 w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>
                    <h3 className="text-xl font-semibold text-stone-50">
                      {dish.title}
                    </h3>
                  </CardTitle>
                  <span className="whitespace-nowrap rounded-full bg-amber-200/10 px-3 py-1 text-sm text-amber-100">
                    {dish.price}
                  </span>
                </div>
                <CardDescription className="mt-2 text-stone-400">
                  {dish.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-stone-300">
                  {dish.tag}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;