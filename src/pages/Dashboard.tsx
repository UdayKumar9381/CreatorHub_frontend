import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { SidebarNav } from '../components/SidebarNav';
import { LowPolyBackground } from '../components/LowPolyBackground';
import AIAssistant from '../components/AIAssistant';

// Modular Views
import IdeasView from './IdeasView';
import NotionView from './NotionView';
import HackathonView from './HackathonView';
import ChecklistView from './ChecklistView';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('ideas');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Thorough cleanup of session data
    localStorage.removeItem('token');
    localStorage.clear(); // Clear all potential local state
    
    // Redirect to login with explicit logout flag
    navigate('/login?logout=success');
  };

  const renderView = () => {
    switch (activeView) {
      case 'ideas':
        return <IdeasView />;
      case 'docs':
        return <NotionView />;
      case 'projects':
        return <HackathonView />;
      case 'checklist':
        return <ChecklistView />;
      default:
        return <IdeasView />;
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative">
      <LowPolyBackground />
      <Toaster position="top-right" />
      
      {/* Universal Side Navigation */}
      <SidebarNav 
        activeView={activeView} 
        onViewChange={setActiveView} 
        onLogout={handleLogout} 
      />

      {/* Main Workspace Area */}
      <main className="flex-1 h-screen overflow-y-auto pl-20 md:pl-64 scrollbar-hide relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full pb-20"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global AI Assistant Overlay */}
      <AIAssistant />
    </div>
  );
}
