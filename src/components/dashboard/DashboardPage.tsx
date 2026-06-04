import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { xpProgressPercent } from '../../utils/xp-calculator';
import Card from '../ui/Card';

const CompanionScene = lazy(() => import('../companion-3d/CompanionScene'));

export default function DashboardPage() {
  const { name, level, xp, streak, totalWorkouts, totalMinutes, totalXp } = useUserStore();
  const { history } = useWorkoutStore();
  const progress = xpProgressPercent(totalXp);

  const todaySession = history.filter(
    (s) => s.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome + Stats */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* 3D Companion */}
        <div className="lg:col-span-1 lg:row-span-2">
          <Card className="h-[400px] lg:h-full p-0 overflow-hidden relative">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="animate-spin w-8 h-8 rounded-full border-2 border-[#1a1a3e] border-t-[#00f0ff]" />
              </div>
            }>
              <CompanionScene />
            </Suspense>
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="glass-card py-2 px-4 text-center">
                <p className="text-sm text-gray-400">AI 伴侣</p>
                <p className="text-[#00f0ff] font-semibold">点击互动 💬</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Welcome Card */}
        <Card className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-bold mb-2">
              你好，<span className="neon-text">{name}</span>！💪
            </h1>
            <p className="text-gray-400">
              已坚持 {streak} 天 | 累计训练 {totalWorkouts} 次 | {totalMinutes} 分钟
            </p>
          </motion.div>
        </Card>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: '等级', value: `Lv.${level}`, color: '#a855f7', icon: '⭐' },
            { label: '经验值', value: `${progress}%`, color: '#00f0ff', icon: '📈' },
            { label: '连续打卡', value: `${streak}天`, color: '#ff6b35', icon: '🔥' },
            { label: '今日训练', value: `${todaySession.length}次`, color: '#00ff88', icon: '✅' },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { to: '/workouts', icon: '🏋️', title: '开始训练', desc: '选择训练计划' },
          { to: '/coaches', icon: '👨‍🏫', title: '教练团队', desc: '专业真人教练' },
          { to: '/nutrition', icon: '🍽️', title: '营养饮食', desc: '科学餐单计划' },
          { to: '/achievements', icon: '🏆', title: '成就徽章', desc: '查看里程碑' },
        ].map((item) => (
          <Link to={item.to} key={item.to}>
            <Card hover className="text-center h-full">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Workouts */}
      <h2 className="text-xl font-semibold mb-4">📋 最近训练</h2>
      <div className="space-y-3">
        {history.slice(-5).reverse().map((session, i) => (
          <Card key={session.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {session.workoutId === 'hiit-beginner' ? '21天燃脂计划' :
                 session.workoutId === 'yoga-flow' ? '柔韧核心瑜伽课' :
                 session.workoutId === 'strength-home' ? '家庭哑铃增肌' :
                 session.workoutId === 'cardio-dance' ? '动感燃脂舞蹈' :
                 session.workoutId === 'hiit-advanced' ? '极限燃脂挑战' :
                 '深度放松拉伸'}
              </p>
              <p className="text-xs text-gray-500">{session.date} · {session.durationMinutes}分钟</p>
            </div>
            <span className="text-[#a855f7] font-semibold">+{session.xpEarned} XP</span>
          </Card>
        ))}
        {history.length === 0 && (
          <Card className="text-center py-8">
            <div className="text-4xl mb-3">🏃</div>
            <p className="text-gray-400">还没有训练记录</p>
            <Link to="/workouts" className="text-[#00f0ff] text-sm mt-2 inline-block">
              开始第一次训练 →
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
