import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '../../stores/useGamificationStore';
import { useTranslation } from 'react-i18next';

export default function LevelUpModal() {
  const { t } = useTranslation('gamification');
  const showLevelUp = useGamificationStore((s) => s.showLevelUp);
  const levelUpData = useGamificationStore((s) => s.levelUpData);
  const dismissLevelUp = useGamificationStore((s) => s.dismissLevelUp);

  return (
    <AnimatePresence>
      {showLevelUp && levelUpData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={dismissLevelUp}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="glass-card p-12 text-center max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-4xl font-bold neon-text mb-2">
              {t('levelUp')}
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              {t('levelUpDesc', { level: levelUpData.level })}
            </p>
            <div className="text-6xl font-extrabold text-[#a855f7] my-6">
              Lv.{levelUpData.level}
            </div>
            <button onClick={dismissLevelUp} className="glow-btn text-lg px-8 py-3">
              继续训练 →
            </button>

            {/* Sparkle particles simulation */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300,
                }}
                transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#00f0ff', '#ff00e5', '#a855f7', '#00ff88'][Math.floor(Math.random() * 4)],
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
