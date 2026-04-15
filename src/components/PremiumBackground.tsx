import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function PremiumBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the parallax effect
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="fixed inset-0 bg-white" />;

  return (
    <div className="fixed inset-0 -z-10 bg-white overflow-hidden pointer-events-none">
      {/* Base Layer */}
      <div className="absolute inset-0 bg-white" />

      {/* Primary Blob - Sky Blue */}
      <motion.div
        style={{
          x: springX.get() * 40,
          y: springY.get() * 40,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-sky-200/30 blur-[120px]"
      />

      {/* Secondary Blob - Soft Pink */}
      <motion.div
        style={{
          x: springX.get() * -20,
          y: springY.get() * -60,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-pink-100/40 blur-[120px]"
      />

      {/* Center Blob - White Glow */}
      <motion.div
        style={{
          x: springX.get() * 15,
          y: springY.get() * 15,
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-white blur-[100px] shadow-[0_0_100px_rgba(255,255,255,0.8)]"
      />

      {/* Background Noise/Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
