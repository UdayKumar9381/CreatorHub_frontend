import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-pink-100 to-white" />
      
      {/* Floating Bubbles Animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-40 h-40 bg-pink-300 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-60 h-60 bg-blue-300 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-72 h-72 bg-white opacity-20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
