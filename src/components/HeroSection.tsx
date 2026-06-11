"use client";
import { ArrowDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero min-h-screen flex items-center justify-center bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1555396279-76fa6242a621?auto=format&fit=crop&w=2200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
    }}>
      {/* Glassmorphism overlay for content */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center">
        {/* Russian logo */}
        <img
          src="/images/Logo.pdf"
          alt="Логотип ТОККИМ"
          className="w-16 h-16 mb-6 object-contain"
        />

        {/* Main title */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-[#3A3124] mb-4">
          ТОККИМ
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl opacity-90 text-[#6B5E48]">
          Корейский стрит-фуд нового поколения
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 reveal-delay-100">
          <Button
            size="lg"
            className="group px-10 py-5 rounded-full bg-[#D4B98F] text-[#3A3124] font-semibold text-base hover:bg-[#C1A67D] transition-all duration-300 shadow-2xl shadow-black/20"
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
          >
            Посмотреть меню
            <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group px-10 py-5 rounded-full border-[#D4B98F] text-[#D4B98F] font-semibold text-base hover:bg-[#D4B98F]/20 transition-all duration-300 backdrop-blur"
            onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Заказать доставку
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;