import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { aiService } from '../services/api';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  isAi: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your CreatorHub assistant. How can I help you build today?", isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when message list changes or when assistant is opened
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), text: input, isAi: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await aiService.chat(input);
      const aiMsg = { id: (Date.now() + 1).toString(), text: res.data.response, isAi: true };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      toast.error('AI is resting right now...');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-80 md:w-96 bg-black/60 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden flex flex-col"
            style={{ height: '540px' }}
          >
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-blue rounded-xl flex items-center justify-center shadow-lg shadow-sky-blue/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-sm tracking-tight uppercase italic">Cyber Companion</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-apple-green rounded-full animate-pulse" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Always Active</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                    msg.isAi 
                      ? 'bg-white/5 text-gray-200 rounded-bl-none border border-white/5' 
                      : 'bg-sky-blue/10 text-sky-blue rounded-br-none border border-sky-blue/20 shadow-xl shadow-sky-blue/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl rounded-bl-none border border-white/5">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-sky-blue/50 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-sky-blue/50 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-sky-blue/50 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 pt-0">
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full pl-6 pr-14 py-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-sm font-medium text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-sky-blue/30 transition-all shadow-2xl"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-2 p-2.5 bg-sky-blue text-white rounded-xl shadow-lg shadow-sky-blue/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative group transition-all duration-500 ${
          isOpen ? 'bg-white/5 border border-white/10' : 'bg-gray-900 shadow-sky-blue/20 shadow-2xl'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-gray-400" /> : <Bot className="w-7 h-7 text-white" />}
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-sky-blue rounded-full border-4 border-[#050505] flex items-center justify-center"
          >
             <Sparkles className="w-2 h-2 text-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
