import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { GlassCard } from '../components/GlassCard';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      desc: "For individual creators starting their journey.",
      features: ["3 Projects", "Basic AI Generation", "Community Support", "7-Day History"]
    },
    {
      name: "Pro",
      price: "$19",
      popular: true,
      desc: "For professional builders shipping fast.",
      features: ["Unlimited Projects", "Advanced AI Studio", "Priority Support", "Infinite History", "Custom Domains"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For teams requiring ultimate control.",
      features: ["SSO & SAML", "Dedicated Manager", "On-premise AI", "Custom Integrations", "SLA Guarantee"]
    }
  ];

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
              Simple <br />
              <span className="text-sky-blue">Pricing.</span>
            </motion.h1>
            <p className="text-xl text-gray-400 font-medium">
              Choose the plan that fits your ambition. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className={`h-full relative overflow-hidden flex flex-col space-y-6 border-white/10 ${tier.popular ? 'border-sky-blue/50 shadow-2xl shadow-sky-blue/10' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-sky-blue text-white text-[10px] font-black rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-gray-500 text-sm font-bold">/month</span>}
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">{tier.desc}</p>
                  </div>

                  <div className="flex-1 space-y-4">
                    {tier.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-5 h-5 rounded-full bg-sky-blue/10 flex items-center justify-center text-sky-blue">
                          <Check className="w-3 h-3" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link 
                    to="/signup"
                    className={`w-full py-4 rounded-2xl font-black text-center transition-all ${
                      tier.popular 
                        ? 'bg-sky-blue text-white shadow-xl shadow-sky-blue/20 hover:scale-[1.02]' 
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Get Started
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 CreatorHub Platform. Built for the future.
      </footer>
    </div>
  );
}
