import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Layout, 
  Zap, 
  Github, 
  Twitter, 
  Linkedin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { GlassSpiral } from '../components/GlassSpiral';
import { Navbar } from '../components/Navbar';

export default function Landing() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-20 px-6 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          {/* Left Content */}
          <div className="text-left space-y-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 text-sky-blue text-sm font-black border border-white/10"
            >
              <Sparkles className="w-4 h-4" />
              DIGITAL FRONTIER 3.0
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]"
            >
              DISCOVER <br />
              <span className="text-sky-blue">THE FUTURE.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-400 leading-relaxed font-medium"
            >
              Beyond project management. CreatorHub is a sentient workspace that blends motion, depth, and AI to tell your story in a whole new way.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6 pt-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup"
                  className="px-10 py-4 bg-sky-blue text-white rounded-full font-black text-lg shadow-2xl shadow-sky-blue/20 hover:scale-105 active:scale-95 transition-all text-center"
                >
                  EXPLORE IN 3D →
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white/60 font-bold">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   LIVE SYSTEM ACTIVE
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Content (The Cinematic Spiral) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1.5 }}
            className="relative h-[800px] hidden lg:block"
          >
            <GlassSpiral />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white">The Art of Interaction</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience project management that goes beyond flat design.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <GlassCard className="h-full space-y-4 bg-white/5 border-sky-blue/20 hover:shadow-xl hover:shadow-sky-blue/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-sky-blue/10 flex items-center justify-center">
                  <Sparkles className="text-sky-blue w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Idea Generator</h3>
                <p className="text-gray-400 leading-relaxed">
                  Never stare at a blank page again. Our AI analyzes your intent and generates high-impact project concepts instantly.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div variants={item} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <GlassCard className="h-full space-y-4 bg-white/5 border-soft-pink/20 hover:shadow-xl hover:shadow-soft-pink/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-soft-pink/10 flex items-center justify-center">
                  <Layout className="text-soft-pink w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Tracking Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">
                  A minimalist, Apple-style board that keeps your tasks visually organized without the clutter of traditional tools.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div variants={item} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <GlassCard className="h-full space-y-4 bg-white/5 border-apple-green/20 hover:shadow-xl hover:shadow-apple-green/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-apple-green/10 flex items-center justify-center">
                  <Zap className="text-apple-green w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Clean Workflow</h3>
                <p className="text-gray-400 leading-relaxed">
                  Optimized for speed. Keyboard shortcuts, smooth transitions, and a focus-first UI that disappears when you're in the flow.
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] p-4 bg-white/5 shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="aspect-[16/10] bg-[#0a0a0a] relative overflow-hidden flex flex-col p-8">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-blue flex items-center justify-center">
                    <Sparkles className="text-white w-4 h-4" />
                  </div>
                  <div className="h-4 w-24 bg-white/10 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5" />
                  <div className="w-8 h-8 rounded-full bg-white/5" />
                </div>
              </div>

              {/* Mock Dashboard Body */}
              <div className="flex-1 grid grid-cols-3 gap-6">
                {/* Mock Sidebar */}
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ delay: 0.1 * i }}
                      className="h-16 rounded-2xl bg-white/5 border border-white/5 cursor-pointer" 
                    />
                  ))}
                </div>

                {/* Mock Main Feed */}
                <div className="col-span-2 space-y-4 relative">
                  {/* Floating AI Idea Animation */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-12 right-0 px-4 py-2 bg-sky-blue text-white rounded-2xl text-[10px] font-bold shadow-xl border border-white/20 flex items-center gap-2 z-20"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Thinking...
                  </motion.div>

                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ delay: 0.2 * i }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className={`w-10 h-10 rounded-xl ${i === 1 ? 'bg-sky-blue/20' : 'bg-soft-pink/20'} flex items-center justify-center`}>
                        {i === 1 ? <Sparkles className="text-sky-blue w-5 h-5" /> : <Layout className="text-soft-pink w-5 h-5" />}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/2 bg-white/10 rounded-full" />
                        <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-white/10" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Glow */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-sky-blue/10 blur-[100px] rounded-full" 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-soft-pink/10 blur-[100px] rounded-full" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-sky-blue flex items-center justify-center shadow-lg">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CreatorHub</span>
            </Link>
            <p className="text-gray-400 max-w-xs font-medium">Building the future of creative project management, one idea at a time.</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-xl hover:text-sky-blue transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-xl hover:text-sky-blue transition-all"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-xl hover:text-sky-blue transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-white">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm font-medium">
              <li><Link to="/features" className="hover:text-sky-blue transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-sky-blue transition-colors">Pricing</Link></li>
              <li><Link to="/changelog" className="hover:text-sky-blue transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm font-medium">
              <li><Link to="/privacy" className="hover:text-sky-blue transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-sky-blue transition-colors">Terms</Link></li>
              <li><Link to="/security" className="hover:text-sky-blue transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 text-center text-sm text-gray-500 font-medium">
          © 2026 CreatorHub Platform. Built with passion.
        </div>
      </footer>
    </div>
  );
}
