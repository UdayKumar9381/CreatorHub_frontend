import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { CheckCircle2 } from 'lucide-react';

export default function Changelog() {
  const updates = [
    { version: "v2.0.0", date: "April 15, 2026", title: "The 3DVERSE Update", changes: ["Brand new isometric 3D landing redesign", "Cinematic dark mode integration", "Refractive glass spiral engine", "Floating dashboard elements"] },
    { version: "v1.5.2", date: "April 10, 2026", title: "AI Core Expansion", changes: ["Upgraded idea generation nodes", "Faster sync performance", "New low-poly dashboard backgrounds"] },
    { version: "v1.4.0", date: "April 02, 2026", title: "Security First", changes: ["End-to-end encryption for projects", "Two-factor authentication", "Security audit logs"] }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-black italic tracking-tighter">CHANGELOG</h1>
            <p className="text-gray-400 font-medium text-lg">See the latest evolution of CreatorHub.</p>
          </div>

          <div className="space-y-12 border-l border-white/10 pl-8 relative">
            {updates.map((update, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-sky-blue border-4 border-black shadow-lg shadow-sky-blue/20" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-black text-sky-blue uppercase tracking-widest">{update.version}</span>
                    <span className="text-gray-500 text-sm font-bold">{update.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{update.title}</h3>
                  <ul className="space-y-3">
                    {update.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-sky-blue/50 mt-0.5" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
