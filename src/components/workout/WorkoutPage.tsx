import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { WORKOUTS } from '../../data/workouts';
import { WorkoutCategory, Difficulty } from '../../types/workout';
import Card from '../ui/Card';

const categories: { key: WorkoutCategory | 'all'; emoji: string }[] = [
  { key: 'all', emoji: '📋' },
  { key: 'hiit', emoji: '🔥' },
  { key: 'yoga', emoji: '🧘' },
  { key: 'strength', emoji: '🏋️' },
  { key: 'cardio', emoji: '🏃' },
  { key: 'dance', emoji: '💃' },
  { key: 'stretch', emoji: '😌' },
];

const difficulties: { key: Difficulty | 'all'; label: string }[] = [
  { key: 'all', label: '全部难度' },
  { key: 'beginner', label: '入门' },
  { key: 'intermediate', label: '进阶' },
  { key: 'advanced', label: '高级' },
];

export default function WorkoutPage() {
  const { t, i18n } = useTranslation('workout');
  const [activeCat, setActiveCat] = useState<WorkoutCategory | 'all'>('all');
  const [activeDiff, setActiveDiff] = useState<Difficulty | 'all'>('all');

  const filtered = WORKOUTS.filter((w) => {
    if (activeCat !== 'all' && w.category !== activeCat) return false;
    if (activeDiff !== 'all' && w.difficulty !== activeDiff) return false;
    return true;
  });

  const getTitle = (w: typeof WORKOUTS[0]) => {
    if (i18n.language === 'en') return w.titleEn;
    if (i18n.language === 'ja') return w.titleJa;
    return w.title;
  };

  const getDesc = (w: typeof WORKOUTS[0]) => {
    if (i18n.language === 'en') return w.descriptionEn;
    if (i18n.language === 'ja') return w.descriptionJa;
    return w.description;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">🏋️ {t('categories.all')}</h1>
      <p className="text-gray-400 mb-8">选择适合你的训练计划，开始健身之旅</p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCat(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCat === cat.key
                ? 'bg-[#6c5ce7] text-white shadow-neon-purple'
                : 'bg-[#0d0d26] text-gray-400 hover:text-white border border-[#1a1a3e]'
            }`}
          >
            {cat.emoji} {cat.key === 'all' ? '全部' : t(`categories.${cat.key}`)}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2 mb-8">
        {difficulties.map((d) => (
          <button
            key={d.key}
            onClick={() => setActiveDiff(d.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeDiff === d.key
                ? 'bg-[#0d0d26] text-[#00f0ff] border border-[#00f0ff]/30'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Workout Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((workout, i) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/workouts/${workout.id}`}>
              <Card hover className="h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{workout.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{getTitle(workout)}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        workout.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                        workout.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {t(`difficulty.${workout.difficulty}`)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {workout.durationMinutes}分钟 · {workout.caloriesBurn} kcal
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{getDesc(workout)}</p>
                <div className="flex flex-wrap gap-1">
                  {workout.equipment.map((eq) => (
                    <span key={eq} className="text-xs px-2 py-1 rounded-lg bg-[#0a0a1a] text-gray-500">
                      {eq}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
