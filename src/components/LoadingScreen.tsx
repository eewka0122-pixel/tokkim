"use client";

import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Минимальное время показа лоадера 1.5 секунды, чтобы анимация успела отыграть
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500); // Ждем завершения анимации исчезновения
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5F1E6] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Вращающийся логотип */}
        <div className="animate-[spin_3s_linear_infinite]">
          <img 
            src="/images/logo_symbol.png" // Убедись, что файл с логотипом лежит здесь
            alt="Loading..." 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        {/* Можно добавить легкое свечение под ним, если захочешь */}
        <div className="mt-8 w-12 h-0.5 bg-[#5D6D5A]/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#5D6D5A] animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;