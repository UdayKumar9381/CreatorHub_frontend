import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-sky-blue flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">CreatorHub</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-sm font-black text-gray-400 hover:text-white transition-colors">FEATURES</Link>
            <Link to="/pricing" className="text-sm font-black text-gray-400 hover:text-white transition-colors">PRICING</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              to="/login" 
              className="text-sm font-semibold text-gray-400 hover:text-sky-blue transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="px-5 py-2.5 rounded-full bg-sky-blue text-white text-sm font-bold shadow-lg shadow-sky-blue/20 hover:bg-sky-blue/90 hover:scale-105 active:scale-95 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
