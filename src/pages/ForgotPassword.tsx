import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { authService } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import DNABackground from '../components/DNABackground';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast.success('Reset link sent to your email (check console)');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <DNABackground />
      <Toaster position="top-center" />
      
      {/* Cinematic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-blue/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-soft-pink/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <Link 
        to="/login" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group font-bold text-sm tracking-tight"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        BACK TO LOGIN
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="space-y-8 bg-white/5 border-white/10" hover={false}>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Reset Password</h1>
            <p className="text-gray-400 text-sm font-medium">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <button
                disabled={loading}
                className="w-full py-3 bg-sky-blue text-white font-semibold rounded-2xl hover:bg-sky-blue/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-sky-blue/20"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-white/5 text-sky-blue border border-sky-blue/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Send className="w-8 h-8" />
              </div>
              <p className="text-gray-400 font-medium">Check your inbox for instructions on how to reset your password.</p>
              <Link to="/login" className="inline-block text-sky-blue font-semibold hover:underline">
                Return to login
              </Link>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
