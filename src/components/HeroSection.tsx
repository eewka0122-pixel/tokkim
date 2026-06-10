"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=2200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/95 via-stone-50/70 to-stone-100/40" />
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-stone-200/50 blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full bg-white/80 border border-stone-200 px-6 py-3 mb-8 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium text-stone-700 uppercase tracking-wider">Новое меню 2024</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-stone-900 tracking-tight leading-[1.05] mb-6"
          >
            ТОККИМ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-stone-600 font-medium uppercase tracking-widest mb-12 max-w-2xl mx-auto"
          >
            Корейский стрит-фуд
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group w-full sm:w-auto px-10 py-4 rounded-full bg-stone-900 text-stone-50 font-medium text-base hover:bg-stone-700 transition-all duration-300 shadow-lg shadow-stone-900/20"
            >
              <a href="#menu">Посмотреть меню</a>
              <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto px-10 py-4 rounded-full border-stone-300 bg-white/80 text-stone-700 font-medium text-base hover:bg-stone-100 hover:border-stone-400 transition-all duration-300 backdrop-blur-sm"
            >
              <a href="#order">Заказать доставку</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="mt-16 flex items-center justify-center gap-12 text-sm text-stone-50"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Свежие ингредиенты</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Приготовлено на глазах</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Доставка за 30 мин</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-stone-400"
          >
            <ArrowDown className="h-6 w-6" />
            <span className="text-xs uppercase tracking-wider">Прокрутите вниз</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;