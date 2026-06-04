import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

const TABS = [
  { path: '/dashboard', icon: '📊', label: 'dashboard' },
  { path: '/workouts', icon: '🏋️', label: 'workouts' },
  { path: '/videos', icon: '🎬', label: 'videos' },
  { path: '/', icon: '🌌', label: 'home' },
  { path: '/coaches', icon: '👨‍🏫', label: 'coaches' },
  { path: '/nutrition', icon: '🍽️', label: 'nutrition' },
];

export default function MobileNav() {
  const { t } = useTranslation('common');
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-xl border-t border-[#1a1a3e] safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path === '/workouts' && location.pathname.startsWith('/workouts')) ||
            (tab.path === '/dashboard' && location.pathname === '/dashboard');
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl min-w-[56px] transition-all duration-200',
                isActive
                  ? 'text-[#00f0ff]'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <span className={cn('text-xl transition-transform', isActive && 'scale-110')}>
                {tab.icon}
              </span>
              <span className={cn('text-[10px] font-medium', isActive && 'text-[#00f0ff]')}>
                {t(`nav.${tab.label}`)}
              </span>
              {isActive && (
                <span className="absolute -top-0.5 w-6 h-0.5 rounded-full bg-[#00f0ff] shadow-neon-cyan" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
