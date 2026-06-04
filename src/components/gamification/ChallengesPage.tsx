import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { Challenge } from '../../types/gamification';
import Card from '../ui/Card';

function generateChallenges(): Challenge[] {
  const { totalWorkouts, streak } = useUserStore.getState();
  const history = useWorkoutStore.getState().history;
  const today = new Date().toISOString().split('T')[0];
  const todayCount = history.filter((s) => s.date === today).length;
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekCount = history.filter((s) => new Date(s.date) >= weekStart).length;

  return [
    {
      id: 'daily-1', name: '每日训练', nameEn: 'Daily Workout', nameJa: 'デイリートレーニング',
      description: '今天完成任意一次训练', descriptionEn: 'Complete any workout today', descriptionJa: '今日任意のトレーニングを完了',
      emoji: '🎯', xpReward: 20, type: 'daily', target: 1, progress: Math.min(todayCount, 1),
      completed: todayCount >= 1, expiresAt: today,
    },
    {
      id: 'weekly-1', name: '每周五练', nameEn: '5 This Week', nameJa: '今週5回',
      description: '本周完成5次训练', descriptionEn: 'Complete 5 workouts this week', descriptionJa: '今週5回のトレーニングを完了',
      emoji: '📅', xpReward: 150, type: 'weekly', target: 5, progress: Math.min(weekCount, 5),
      completed: weekCount >= 5, expiresAt: new Date(weekStart.getTime() + 7 * 86400000).toISOString().split('T')[0],
    },
    {
      id: 'weekly-2', name: '持续打卡', nameEn: 'Keep Streak', nameJa: '継続チャレンジ',
      description: '保持连续打卡3天以上', descriptionEn: 'Maintain a 3+ day streak', descriptionJa: '3日以上の連続を維持',
      emoji: '🔥', xpReward: 100, type: 'weekly', target: 3, progress: Math.min(streak, 3),
      completed: streak >= 3, expiresAt: new Date(weekStart.getTime() + 7 * 86400000).toISOString().split('T')[0],
    },
    {
      id: 'monthly-1', name: '月度战神', nameEn: 'Monthly Warrior', nameJa: '月間戦士',
      description: '本月完成20次训练', descriptionEn: 'Complete 20 workouts this month', descriptionJa: '今月20回のトレーニングを完了',
      emoji: '👑', xpReward: 500, type: 'monthly', target: 20, progress: Math.min(totalWorkouts, 20),
      completed: totalWorkouts >= 20, expiresAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split('T')[0],
    },
  ];
}

export default function ChallengesPage() {
  const { t, i18n } = useTranslation('gamification');
  const challenges = generateChallenges();

  const getName = (c: Challenge) => {
    if (i18n.language === 'en') return c.nameEn;
    if (i18n.language === 'ja') return c.nameJa;
    return c.name;
  };

  const getDesc = (c: Challenge) => {
    if (i18n.language === 'en') return c.descriptionEn;
    if (i18n.language === 'ja') return c.descriptionJa;
    return c.description;
  };

  const sections = [
    { type: 'daily' as const, title: t('challenges.daily'), icon: '🎯' },
    { type: 'weekly' as const, title: t('challenges.weekly'), icon: '📅' },
    { type: 'monthly' as const, title: t('challenges.monthly'), icon: '👑' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">⚡ {t('challenges.daily')}</h1>
      <p className="text-gray-400 mb-8">完成挑战获取额外XP奖励</p>

      {sections.map((section) => {
        const items = challenges.filter((c) => c.type === section.type);
        return (
          <div key={section.type} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{section.icon} {section.title}</h2>
            <div className="space-y-3">
              {items.map((challenge) => (
                <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className={challenge.completed ? 'border-green-500/30' : ''}>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{challenge.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{getName(challenge)}</h3>
                        <p className="text-xs text-gray-500">{getDesc(challenge)}</p>
                        <div className="mt-2 w-full h-1.5 rounded-full bg-[#1a1a3e]">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              challenge.completed ? 'bg-green-500' : 'bg-gradient-to-r from-[#00f0ff] to-[#a855f7]'
                            }`}
                            style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('challenges.progress')}: {challenge.progress}/{challenge.target}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#a855f7]">+{challenge.xpReward}</p>
                        <p className="text-xs text-gray-500">XP</p>
                        {challenge.completed && (
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                            {t('challenges.completed')} ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
