"use client";

import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setComplete(true);
          }, 500);
          return 100;
        }
        // Simulate random progress increment
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (complete) {
      onComplete();
    }
  }, [complete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50"
         style={{ background: "linear-gradient(135deg, #F5F3F0 0%, #F8F9FA 50%, #FDFBF7 100%)" }}
         aria-label="Loading"
         role="status"
    >
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pulse-rotate"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D2B48C" />
                <stop offset="50%" stopColor="#C4A37A" />
                <stop offset="100%" stopColor="#B8956A" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" stroke="url(#logoGradient)" strokeWidth="3" strokeDasharray="314" strokeDashoffset="314" />
            <text x="60" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="600" fill="url(#logoGradient)">ТОККИМ</text>
          </svg>
        </div>

        <p className="text-stone-600 text-sm uppercase tracking-widest font-medium reveal reveal-delay-100">
          Корейский стрит-фуд
        </p>

        <div className="relative w-80 h-2 bg-stone-200 rounded-full overflow-hidden reveal reveal-delay-200">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
            style={{ width: `${progress}%` }}
            transition="width 0.1s ease-out"
          ></div>
        </div>

        <p className="text-stone-400 text-xs uppercase tracking-wide reveal reveal-delay-300">
          Загрузка меню...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;