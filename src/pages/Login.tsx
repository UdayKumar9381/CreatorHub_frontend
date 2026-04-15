import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { authService } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import Loader from '../components/Loader';
import DNABackground from '../components/DNABackground';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem('token', res.data.access_token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader />
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <DNABackground />
      <Toaster position="top-center" />
      
      {/* Cinematic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-blue/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-soft-pink/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />


      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group font-bold text-sm tracking-tight"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        BACK TO UNIVERSE
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="space-y-8 bg-white/5 border-white/10" hover={false}>
          <div className="text-center space-y-4">
             <div className="w-12 h-12 bg-sky-blue rounded-2xl flex items-center justify-center shadow-2xl shadow-sky-blue/30 mx-auto">
                <Sparkles className="text-white w-6 h-6" />
             </div>
            <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">IdeaFlow</h1>
            <p className="text-gray-400 font-medium">Log in to manage your brilliance.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Access Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-sky-blue/50 outline-none transition-all text-white font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Secret Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-sky-blue/50 outline-none transition-all text-white font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" title="Click to reset your password" className="text-xs text-sky-blue hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="w-full py-3 bg-sky-blue text-white font-semibold rounded-2xl hover:bg-sky-blue/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-sky-blue/20"
            >
              <LogIn className="w-5 h-5" />
              Sign In
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-blue font-black hover:text-white transition-colors">
              Initialize Account
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
