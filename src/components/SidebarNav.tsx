import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  FileText, 
  Layout, 
  LogOut,
  Sparkles,
  CheckSquare
} from 'lucide-react';

interface SidebarNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const NAV_ITEMS = [
  { id: 'ideas', label: 'Idea Flow', icon: Lightbulb, color: 'text-sky-blue', bg: 'bg-sky-blue/10' },
  { id: 'checklist', label: 'Daily Checklist', icon: CheckSquare, color: 'text-sky-blue', bg: 'bg-sky-blue/10' },
  { id: 'docs', label: 'Notion Docs', icon: FileText, color: 'text-soft-pink', bg: 'bg-soft-pink/10' },
  { id: 'projects', label: 'Hackathons', icon: Layout, color: 'text-apple-green', bg: 'bg-apple-green/10' },
];

export function SidebarNav({ activeView, onViewChange, onLogout }: SidebarNavProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-black/40 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-10 md:px-2">
        <div className="w-10 h-10 bg-sky-blue rounded-xl flex items-center justify-center shadow-2xl shadow-sky-blue/20 shrink-0">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl font-black tracking-tighter text-white leading-none italic uppercase">CreatorHub</h1>
          <p className="text-[10px] text-sky-blue font-black uppercase tracking-widest mt-1">Workspace v2</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full group relative flex items-center gap-3 p-3 rounded-2xl transition-all ${
                isActive ? 'bg-white/5 shadow-2xl shadow-black/50 overflow-hidden' : 'hover:bg-white/5'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? item.bg : 'bg-white/5 group-hover:bg-white/10'}`}>
                <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-white'}`} />
              </div>
              <span className={`hidden md:block font-bold text-sm ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-[-24px] w-1 h-8 bg-sky-blue rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-2">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all group"
        >
          <div className="p-2 bg-white/5 group-hover:bg-red-500/20 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="hidden md:block font-bold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
