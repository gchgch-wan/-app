import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { useUserStore } from '../../stores/useUserStore';
import { calculateXP } from '../../utils/xp-calculator';
import { WorkoutSession } from '../../types/workout';
import Card from '../ui/Card';

export default function WorkoutActive() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('workout');
  const activeWorkout = useWorkoutStore((s) => s.activeWorkout);
  const completeWorkout = useUserStore((s) => s.completeWorkout);
  const addXP = useUserStore((s) => s.addXP);
  const addSession = useWorkoutStore((s) => s.addSession);
  const streak = useUserStore((s) => s.streak);

  const [currentEx, setCurrentEx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRest, setIsRest] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [round, setRound] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!activeWorkout) {
      navigate('/workouts');
      return;
    }
    setTimeLeft(activeWorkout.exercises[0]?.duration || 0);
  }, [activeWorkout, navigate]);

  const finishWorkout = useCallback(() => {
    if (!activeWorkout) return;
    const xp = calculateXP(activeWorkout.durationMinutes, activeWorkout.difficulty, streak);
    setXpEarned(xp);
    setCompleted(true);
    completeWorkout(activeWorkout.durationMinutes);
    addXP(xp);

    const session: WorkoutSession = {
      id: `ws-${Date.now()}`,
      workoutId: activeWorkout.id,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: activeWorkout.durationMinutes,
      xpEarned: xp,
      completed: true,
      category: activeWorkout.category,
    };
    addSession(session);
  }, [activeWorkout, streak, completeWorkout, addXP, addSession]);

  useEffect(() => {
    if (!activeWorkout || completed) return;
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const ex = activeWorkout.exercises[currentEx];
          if (isRest) {
            // Move to next exercise
            if (currentEx < activeWorkout.exercises.length - 1) {
              setCurrentEx((c) => c + 1);
              setIsRest(false);
              return activeWorkout.exercises[currentEx + 1].duration;
            } else {
              // Check if more rounds
              const maxRounds = ex.sets || 1;
              if (round < maxRounds) {
                setRound((r) => r + 1);
                setCurrentEx(0);
                setIsRest(false);
                return activeWorkout.exercises[0].duration;
              }
              // Workout complete
              finishWorkout();
              return 0;
            }
          } else {
            setIsRest(true);
            return ex.restDuration;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentEx, isRest, round, isPaused, completed, activeWorkout, finishWorkout]);

  if (!activeWorkout) return null;
  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4 neon-text">{t('details.workoutComplete')}</h1>
        <Card className="mb-6">
          <div className="text-3xl font-bold text-[#a855f7] mb-2">+{xpEarned} XP</div>
          <p className="text-gray-400">连续打卡 {streak} 天 🔥</p>
        </Card>
        <button onClick={() => navigate('/dashboard')} className="glow-btn text-lg px-10 py-4">
          返回仪表盘 →
        </button>
      </div>
    );
  }

  const exercise = activeWorkout.exercises[currentEx];
  const maxRounds = exercise?.sets || 1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <div className="text-sm text-gray-500 mb-2">
        {t('timer.round', { current: currentEx + 1, total: activeWorkout.exercises.length })}
        {maxRounds > 1 && ` · ${t('details.sets')} ${round}/${maxRounds}${t('details.sets')}`}
      </div>

      {/* Timer */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a3e" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke={isRest ? '#00ff88' : '#00f0ff'}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - timeLeft / (isRest ? exercise.restDuration : exercise.duration))}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold" style={{ color: isRest ? '#00ff88' : '#00f0ff' }}>
            {timeLeft}
          </span>
          <span className="text-sm text-gray-500">{t('details.rest')}</span>
        </div>
      </div>

      {/* Exercise Info */}
      <Card className="mb-6">
        <div className="text-4xl mb-2">{exercise.emoji}</div>
        <h2 className="text-2xl font-bold mb-1">
          {isRest ? `💤 ${t('details.rest')}` :
            i18n.language === 'en' ? exercise.nameEn :
            i18n.language === 'ja' ? exercise.nameJa :
            exercise.name}
        </h2>
        <p className="text-gray-400 text-sm">
          {isRest ? `${exercise.restDuration}秒` : exercise.description}
        </p>
      </Card>

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-6 py-3 rounded-xl border border-[#1a1a3e] font-semibold hover:border-[#00f0ff] transition-colors"
        >
          {isPaused ? '▶ ' + t('timer.resume') : '⏸ ' + t('timer.pause')}
        </button>
        <button
          onClick={finishWorkout}
          className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20"
        >
          结束训练
        </button>
      </div>
    </div>
  );
}
