"use client";

import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PopularDishes from "@/components/PopularDishes";
import MenuSection from "@/components/MenuSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [navStyle, setNavStyle] = useState({
    color: "rgb(255, 255, 255)",
    shadow: "0 2px 8px rgba(0,0,0,0.5)",
    btnBg: "rgba(255, 255, 255, 0.1)",
    btnBorder: "rgba(255, 255, 255, 0.2)"
  });

  const scrollState = useRef({ targetY: 0, currentY: 0, isScrolling: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseOffset({ x: (e.clientX / window.innerWidth) - 0.5, y: (e.clientY / window.innerHeight) - 0.5 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const r = Math.round(255 - (255 - 58) * scrollProgress);
    const g = Math.round(255 - (255 - 49) * scrollProgress);
    const b = Math.round(255 - (255 - 36) * scrollProgress);
    setNavStyle({
      color: `rgb(${r}, ${g}, ${b})`,
      shadow: scrollProgress < 0.5 ? "0 2px 8px rgba(0,0,0,0.5)" : "none",
      btnBg: `rgba(${255 - (255 - 212) * scrollProgress}, ${255 - (255 - 185) * scrollProgress}, ${255 - (255 - 143) * scrollProgress}, ${0.1 + scrollProgress * 0.1})`,
      btnBorder: `rgba(${255 - (255 - 212) * scrollProgress}, ${255 - (255 - 185) * scrollProgress}, ${255 - (255 - 143) * scrollProgress}, ${0.2 + scrollProgress * 0.1})`
    });
  }, [scrollProgress]);

  const updateScroll = () => {
    const state = scrollState.current;
    state.currentY += (state.targetY - state.currentY) * 0.08;
    window.scrollTo(0, state.currentY);

    const startFade = window.innerHeight * 0.70;
    const endFade = window.innerHeight * 0.90;
    let progress = state.currentY > startFade ? Math.min((state.currentY - startFade) / (endFade - startFade), 1) : 0;
    setScrollProgress(progress);

    const sections = ["module-about", "module-promos", "module-menu", "module-contacts"];
    let current = "";
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && element.getBoundingClientRect().top <= window.innerHeight / 2) current = section;
    }
    setActiveSection(current);

    if (Math.abs(state.targetY - state.currentY) > 0.5) requestAnimationFrame(updateScroll);
    else state.isScrolling = false;
  };

  useEffect(() => {
    if (loading) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollState.current.targetY = Math.max(0, Math.min(scrollState.current.targetY + e.deltaY * 0.55, document.documentElement.scrollHeight - window.innerHeight));
      if (!scrollState.current.isScrolling) { scrollState.current.isScrolling = true; requestAnimationFrame(updateScroll); }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [loading]);

  const scrollToSection = (id: string) => {
    const element = id === "top" ? { getBoundingClientRect: () => ({ top: -window.scrollY }) } : document.getElementById(id);
    if (element) {
      scrollState.current.targetY = element.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : 96);
      if (!scrollState.current.isScrolling) { scrollState.current.isScrolling = true; requestAnimationFrame(updateScroll); }
    }
  };

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-promos", label: "Акции и скидки" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
  ];

  return (
    <main className="min-h-screen text-[#3A3124]">
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col items-start pointer-events-auto">
          <div className="relative flex items-center h-20 md:h-24 cursor-pointer" onClick={() => scrollToSection("top")}>
            <img src="/images/logo (4).png" alt="ТОККИМ" className="h-full w-auto object-contain drop-shadow-md" style={{ opacity: scrollProgress }} />
            <img src="/images/logo (4).png" alt="ТОККИМ" className="absolute top-0 left-0 h-full w-auto object-contain drop-shadow-md brightness-0 invert" style={{ opacity: 1 - scrollProgress }} />
          </div>
          <div className="flex flex-col items-start gap-1.5 mt-2 pl-1">
            {navLinks.map((link, idx) => (
              <button key={idx} onClick={() => scrollToSection(link.id)} className={`text-left font-bold text-sm md:text-base uppercase tracking-wider px-2 py-0.5 rounded-sm ${activeSection === link.id ? "border border-[#3A3124]" : "border border-transparent"}`} style={{ color: navStyle.color, textShadow: navStyle.shadow }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative w-full min-h-screen">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0"><source src="/hero.mp4" type="video/mp4" /></video>
        <div className="relative z-10 w-full h-full"><HeroSection /></div>
      </div>

      <div id="module-about" style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
        <div className="relative bg-[#F5F1E6]/60">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5F1E6] to-transparent pointer-events-none" />
          <AboutSection />
          <PopularDishes />
        </div>
      </div>

      <div id="module-menu" style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
        <div className="relative bg-[#F5F1E6]/60"><div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5F1E6] to-transparent" /><MenuSection /></div>
      </div>
      
      <div id="module-contacts" className="bg-[#F5F1E6] pt-10 pb-10"><ReservationSection /><Footer /></div>
    </main>
  );
};

export default Index;