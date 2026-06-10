"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50"
      style={{ background: "linear-gradient(135deg, #F5F3F0 0%, #F8F9FA 50%, #FDFBF7 100%)" }}
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-8"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D2B48C" />
                <stop offset="50%" stopColor="#C4A37A" />
                <stop offset="100%" stopColor="#B8956A" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" stroke="url(#logoGradient)" strokeWidth="3" strokeDasharray="314" strokeDashoffset="314">
              <animate
                attributeName="strokeDashoffset"
                from="314"
                to="0"
                dur="2s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
            <text x="60" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="600" fill="url(#logoGradient)">ТОККИМ</text>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-stone-600 text-sm uppercase tracking-widest font-medium"
        >
          Корейский стрит-фуд
        </motion.p>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          className="mt-8 mx-auto h-1 bg-stone-200 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #D2B48C, #C4A37A, #B8956A)" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-4 text-stone-400 text-xs uppercase tracking-wide"
        >
          Загрузка меню...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;