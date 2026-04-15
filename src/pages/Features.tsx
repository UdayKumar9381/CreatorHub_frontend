import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { GlassCard } from '../components/GlassCard';
import { Sparkles, Layout, Zap, Shield, Cpu, Github } from 'lucide-react';

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter"
            >
              Industry Standard <br />
              <span className="text-sky-blue">Features.</span>
            </motion.h1>
            <p className="text-xl text-gray-400 font-medium">
              Every tool you need to transform a spark of an idea into a global project. Built for the modern creator.
            </p>
          </div>

          {/* Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <Cpu />, title: "AI Core", desc: "Sentient idea processing that understands context, not just keywords." },
              { icon: <Layout />, title: "Dynamic Views", desc: "Switch between 3D workspace, kanban, and list views instantly." },
              { icon: <Shield />, title: "Bank-Grade Security", desc: "Your ideas are encrypted end-to-end with zero-knowledge protocols." },
              { icon: <Zap />, title: "Instant Sync", desc: "Real-time collaboration across all devices without a single millisecond of lag." },
              { icon: <Sparkles />, title: "Visual Flow", desc: "A cinematic interface that makes project management feel like a game." },
              { icon: <Github />, title: "Dev Integration", desc: "Deep hooks for your existing workflow and version control systems." }
            ].map((feature, i) => (
              <motion.div key={i} variants={item}>
                <GlassCard className="h-full space-y-4 bg-white/5 border-white/10 hover:border-sky-blue/30 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-sky-blue/10 flex items-center justify-center text-sky-blue">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 CreatorHub Platform. Built for the future.
      </footer>
    </div>
  );
}
