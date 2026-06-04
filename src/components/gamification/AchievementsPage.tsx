import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../../data/achievements';
import { useUserStore } from '../../stores/useUserStore';
import Card from '../ui/Card';

export default function AchievementsPage() {
  const { t, i18n } = useTranslation('gamification');
  const { totalWorkouts, streak, level } = useUserStore();

  const checkCondition = (condition: string): boolean => {
    try {
      const ctx = { totalWorkouts, streak, level };
      return new Function(...Object.keys(ctx), `return ${condition}`)(...Object.values(ctx));
    } catch { return false; }
  };

  const getName = (a: typeof ACHIEVEMENTS[0]) => {
    if (i18n.language === 'en') return a.nameEn;
    if (i18n.language === 'ja') return a.nameJa;
    return a.name;
  };

  const getDesc = (a: typeof ACHIEVEMENTS[0]) => {
    if (i18n.language === 'en') return a.descriptionEn;
    if (i18n.language === 'ja') return a.descriptionJa;
    return a.description;
  };

  const achievements = ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: checkCondition(a.condition),
  }));

  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">🏆 {t('achievements.title')}</h1>
      <p className="text-gray-400 mb-8">
        {t('achievements.unlocked')}: {unlocked}/{achievements.length}
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-[#1a1a3e] mb-8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all duration-500"
          style={{ width: `${(unlocked / achievements.length) * 100}%` }}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={`text-center h-full ${!achievement.unlocked ? 'opacity-40' : ''}`}>
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 ${
                  achievement.unlocked ? 'bg-[#1a1a3e]' : 'bg-[#0a0a1a]'
                }`}
              >
                {achievement.unlocked ? achievement.emoji : '🔒'}
              </div>
              <h3 className="font-semibold text-sm mb-1">{getName(achievement)}</h3>
              <p className="text-xs text-gray-500">{getDesc(achievement)}</p>
              <div className="mt-2 text-xs font-semibold text-[#a855f7]">
                +{achievement.xpReward} XP
              </div>
              {achievement.unlocked && (
                <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                  {t('achievements.unlocked')} ✓
                </span>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
