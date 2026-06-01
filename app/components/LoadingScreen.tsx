"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for reduced-motion preference on client only
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setPrefersReducedMotion(prefersReduced);
  }, []);

  // Animation cycle for traversing text
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % 10; // 10 letters in MOTORMEDIC
        if (next === 0) {
          // Start glow effect when reaching the end
          setShowGlow(true);
          setTimeout(() => setShowGlow(false), 800);
        }
        return next;
      });
    }, 500); // Change active letter every 500ms

    return () => clearInterval(interval);
  }, [mounted, prefersReducedMotion]);

  if (!mounted) return null;

  const motormedic = "MOTORMEDIC";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0">
        {/* Red glow layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: prefersReducedMotion ? 0.3 : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0.1) 30%, transparent 70%)",
          }}
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
      </div>

      {/* Content container */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 md:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Logo with shine effect */}
        <motion.div
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: "easeOut",
          }}
        >
          <img
            src="/navbar/LOGO PNG.png"
            alt="MotorMedic Logo"
            className="w-full h-full object-contain"
          />

          {/* Shine overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: "100%",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          />
        </motion.div>

        {/* Animated MOTORMEDIC Text with Traversing Red Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="flex justify-center gap-0.5 sm:gap-1"
        >
          {motormedic.split("").map((letter, index) => {
            const isActive = index === activeIndex;
            const textColor = isActive ? "#dc2626" : "#ffffff";

            return (
              <motion.span
                key={index}
                className="font-display font-bold text-lg sm:text-2xl md:text-3xl tracking-wider inline-block"
                animate={{
                  color: textColor,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  textShadow:
                    isActive && showGlow
                      ? "0 0 20px rgba(220, 38, 38, 0.8)"
                      : showGlow && index === motormedic.length - 1
                      ? "0 0 20px rgba(255, 255, 255, 0.6)"
                      : "0 0 0px rgba(255, 255, 255, 0)",
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Loading indicator dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 rounded-full bg-red-600"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: dot * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <p className="text-sm sm:text-base tracking-[0.15em] uppercase font-semibold">
            <span className="text-white/70">Preparing Your</span>
            <br />
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Workshop Experience
            </span>
          </p>
        </motion.div>

        {/* Progress bar with glow */}
        <motion.div
          className="w-48 sm:w-64 h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.2,
            ease: "easeOut",
            delay: 0.6,
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
            animate={{
              width: ["0%", "100%"],
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 2.5,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"
        animate={{
          opacity: prefersReducedMotion ? 0.3 : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
