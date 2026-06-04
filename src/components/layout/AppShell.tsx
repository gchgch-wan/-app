import { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import ParticleBackground from './ParticleBackground';
import AICoachFab from '../ai-coach/AICoachFab';
import AICoachPanel from '../ai-coach/AICoachPanel';
import LevelUpModal from '../gamification/LevelUpModal';
import { useUserStore } from '../../stores/useUserStore';

export default function AppShell({ children }: { children: ReactNode }) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const name = useUserStore((s) => s.name);
  const setName = useUserStore((s) => s.setName);

  useEffect(() => {
    if (!name) {
      const timer = setTimeout(() => setShowNameModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [name]);

  const handleSubmit = () => {
    if (nameInput.trim()) {
      setName(nameInput.trim());
      setShowNameModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-16 pb-20 md:pb-8">{children}</main>
      <MobileNav />
      <AICoachFab />
      <AICoachPanel />
      <LevelUpModal />

      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-md w-full mx-4 animate-slide-up">
            <h2 className="text-2xl font-bold neon-text mb-4">欢迎来到 NebulaFit 🌌</h2>
            <p className="text-gray-400 mb-6">你的3D AI健身伴侣已就绪，先告诉我你的名字吧~</p>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="输入你的名字..."
              className="w-full bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition-colors"
              autoFocus
            />
            <button onClick={handleSubmit} className="glow-btn w-full mt-4">
              开始健身之旅 ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
