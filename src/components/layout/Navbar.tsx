import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { path: '/', label: 'home', icon: '🏠' },
  { path: '/dashboard', label: 'dashboard', icon: '📊' },
  { path: '/workouts', label: 'workouts', icon: '🏋️' },
  { path: '/achievements', label: 'achievements', icon: '🏆' },
  { path: '/leaderboard', label: 'leaderboard', icon: '📋' },
  { path: '/challenges', label: 'challenges', icon: '⚡' },
];

const LANGUAGES = [
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation('common');
  const location = useLocation();
  const { level, xp, streak, name } = useUserStore();
  const [langOpen, setLangOpen] = useState(false);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    useUserStore.getState().setLanguage(code);
    setLangOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-[#1a1a3e]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">🌌</span>
          <span className="neon-text">NebulaFit</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                location.pathname === link.path
                  ? 'bg-[#1a1a3e] text-[#00f0ff] shadow-neon-cyan'
                  : 'text-gray-400 hover:text-white hover:bg-[#0d0d26]'
              )}
            >
              <span className="mr-1">{link.icon}</span>
              {t(`nav.${link.label}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {name && (
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <span className="text-[#00f0ff]">🔥 {streak}天</span>
              <span className="text-[#a855f7]">Lv.{level}</span>
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="px-2 py-1 rounded-lg text-sm bg-[#0d0d26] border border-[#1a1a3e] hover:border-[#00f0ff] transition-colors"
            >
              🌐 {LANGUAGES.find((l) => l.code === i18n.language)?.flag}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 glass-card p-2 min-w-[120px] z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#1a1a3e] transition-colors',
                      i18n.language === lang.code && 'text-[#00f0ff]'
                    )}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
