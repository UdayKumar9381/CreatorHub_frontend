import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { authService } from '../services/api';
import { GlassCard } from '../components/GlassCard';
import DNABackground from '../components/DNABackground';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    setLoading(true);
    try {
      await authService.resetPassword({ token, new_password: password });
      setDone(true);
      toast.success('Password updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Reset failed');
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="space-y-8 bg-white/5 border-white/10" hover={false}>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Set New Password</h1>
            <p className="text-gray-400 text-sm font-medium">Choose a strong password for your account.</p>
          </div>

          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Initial Secret</label>
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

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Verify Secret</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-sky-blue/50 outline-none transition-all text-white font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-3 bg-sky-blue text-white font-semibold rounded-2xl hover:bg-sky-blue/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-sky-blue/20"
              >
                {loading ? 'Updating...' : 'Update Password'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-white/5 text-apple-green border border-apple-green/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-apple-green/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="text-gray-400 font-medium">Your password has been successfully reset. You can now log in with your new password.</p>
              <Link to="/login" className="inline-block text-sky-blue font-semibold hover:underline">
                Sign in to your account
              </Link>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
