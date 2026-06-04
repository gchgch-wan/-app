import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WORKOUTS } from '../../data/workouts';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function WorkoutDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation('workout');
  const navigate = useNavigate();
  const workout = WORKOUTS.find((w) => w.id === id);
  const startWorkout = useWorkoutStore((s) => s.startWorkout);

  if (!workout) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">训练未找到</h1>
        <Link to="/workouts" className="text-[#00f0ff]">返回训练列表 →</Link>
      </div>
    );
  }

  const getTitle = () => {
    if (i18n.language === 'en') return workout.titleEn;
    if (i18n.language === 'ja') return workout.titleJa;
    return workout.title;
  };

  const handleStart = () => {
    startWorkout(workout);
    navigate(`/workouts/${workout.id}/active`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/workouts" className="text-gray-500 hover:text-[#00f0ff] text-sm mb-4 inline-block">
        ← 返回
      </Link>

      <div className="flex items-start gap-6 mb-8">
        <div className="text-6xl">{workout.emoji}</div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="text-gray-400">⏱ {workout.durationMinutes} {t('details.duration')}</span>
            <span className="text-gray-400">🔥 {workout.caloriesBurn} {t('details.calories')}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              workout.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
              workout.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-red-500/10 text-red-400'
            }`}>
              {t(`difficulty.${workout.difficulty}`)}
            </span>
          </div>
        </div>
      </div>

      {/* Equipment */}
      <Card className="mb-6">
        <h3 className="font-semibold mb-2">🎒 {t('details.equipment')}</h3>
        <div className="flex flex-wrap gap-2">
          {workout.equipment.map((eq) => (
            <span key={eq} className="px-3 py-1 rounded-lg bg-[#0a0a1a] border border-[#1a1a3e] text-sm">
              {eq}
            </span>
          ))}
        </div>
      </Card>

      {/* Exercises */}
      <h3 className="font-semibold text-lg mb-4">📋 {t('details.exercises')} ({workout.exercises.length})</h3>
      <div className="space-y-3 mb-8">
        {workout.exercises.map((ex, i) => (
          <Card key={ex.id}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1a1a3e] flex items-center justify-center text-xl">
                {ex.emoji}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">
                  {i18n.language === 'en' ? ex.nameEn : i18n.language === 'ja' ? ex.nameJa : ex.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {ex.duration}秒 · {ex.sets}{t('details.sets')} {ex.reps ? `· ${ex.reps}${t('details.reps')}` : ''}
                </p>
              </div>
              <span className="text-xs text-gray-600">#{i + 1}</span>
            </div>
          </Card>
        ))}
      </div>

      <Button size="lg" className="w-full" onClick={handleStart}>
        🚀 {t('details.getReady')}
      </Button>
    </div>
  );
}
