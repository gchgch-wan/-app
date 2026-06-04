import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../stores/useAdminStore';
import { useUserStore } from '../../stores/useUserStore';
import { useMembershipStore } from '../../stores/useMembershipStore';
import { FOREIGN_COACHES, COACH_VIDEOS } from '../../data/coachVideos';
import { WORKOUTS } from '../../data/workouts';
import Card from '../ui/Card';

const AdminVideoManager = lazy(() => import('./AdminVideoManager'));
const AdminCoachManager = lazy(() => import('./AdminCoachManager'));
const AdminPricingManager = lazy(() => import('./AdminPricingManager'));

type AdminPage = 'overview' | 'videos' | 'coaches' | 'pricing' | 'users';

const SIDEBAR: { key: AdminPage; icon: string; label: string }[] = [
  { key: 'overview', icon: '📊', label: '数据概览' },
  { key: 'videos', icon: '🎬', label: '视频管理' },
  { key: 'coaches', icon: '👨‍🏫', label: '教练管理' },
  { key: 'pricing', icon: '💰', label: '定价设置' },
  { key: 'users', icon: '👥', label: '用户管理' },
];

export default function AdminDashboard() {
  const [page, setPage] = useState<AdminPage>('overview');
  const logout = useAdminStore((s) => s.logout);
  const user = useUserStore();
  const membership = useMembershipStore();

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d26] border-r border-[#1a1a3e] flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-[#1a1a3e]">
          <h1 className="text-lg font-bold neon-text">🛡️ 管理后台</h1>
          <p className="text-xs text-gray-500 mt-1">NebulaFit Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                page === item.key
                  ? 'bg-[#6c5ce7]/20 text-[#00f0ff] border border-[#6c5ce7]/30'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a3e]'
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1a1a3e]">
          <button onClick={logout} className="w-full px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
            🚪 退出管理
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d26] border-b border-[#1a1a3e] px-4 py-2 flex gap-1 overflow-x-auto">
        {SIDEBAR.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${page === item.key ? 'bg-[#6c5ce7]/20 text-[#00f0ff]' : 'text-gray-500'}`}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <button onClick={logout} className="px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-red-400">🚪</button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 pt-16 md:pt-8 overflow-auto">
        <Suspense fallback={<div className="text-gray-500">加载中...</div>}>
          {page === 'overview' && <OverviewPanel user={user} membership={membership} />}
          {page === 'videos' && <AdminVideoManager />}
          {page === 'coaches' && <AdminCoachManager />}
          {page === 'pricing' && <AdminPricingManager />}
          {page === 'users' && <UsersPanel user={user} membership={membership} />}
        </Suspense>
      </main>
    </div>
  );
}

// ============ 数据概览 ============
function OverviewPanel({ user, membership }: { user: any; membership: any }) {
  const stats = [
    { label: '注册用户', value: '1', icon: '👤', color: '#00f0ff' },
    { label: '训练视频', value: COACH_VIDEOS.length, icon: '🎬', color: '#a855f7' },
    { label: '外籍教练', value: FOREIGN_COACHES.length, icon: '🌍', color: '#ff6b35' },
    { label: '训练课程', value: WORKOUTS.length, icon: '🏋️', color: '#00ff88' },
    { label: '会员方案', value: '3', icon: '💰', color: '#ff00e5' },
    { label: '语言支持', value: '3', icon: '🌐', color: '#3b82f6' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 数据概览</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold mb-3">📈 快速操作</h3>
          <div className="space-y-2 text-sm">
            {[
              '✅ 视频全部使用外国权威教练 YouTube',
              '✅ PWA 离线安装已配置',
              '✅ ErrorBoundary 错误隔离已启用',
              '✅ 3语言 i18n 全覆盖',
              '✅ Vercel 部署配置已就绪',
            ].map((item, i) => (
              <p key={i} className="text-gray-400">{item}</p>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-bold mb-3">💡 待办事项</h3>
          <div className="space-y-2 text-sm">
            {[
              '⬜ 部署到 Vercel 上线',
              '⬜ 设置自定义域名',
              '⬜ 接入支付系统（支付宝/微信）',
              '⬜ 添加更多训练视频',
              '⬜ 用户数据分析面板',
            ].map((item, i) => (
              <p key={i} className="text-gray-500">{item}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============ 用户管理 ============
function UsersPanel({ user, membership }: { user: any; membership: any }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">👥 用户管理</h2>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a3e]">
                <th className="text-left py-3 px-4 text-gray-500">用户</th>
                <th className="text-left py-3 px-4 text-gray-500">等级</th>
                <th className="text-left py-3 px-4 text-gray-500">连续打卡</th>
                <th className="text-left py-3 px-4 text-gray-500">训练次数</th>
                <th className="text-left py-3 px-4 text-gray-500">会员</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1a1a3e]">
                <td className="py-3 px-4 font-medium">{user.name || '(未设置)'}</td>
                <td className="py-3 px-4 text-[#a855f7]">Lv.{user.level}</td>
                <td className="py-3 px-4 text-[#ff6b35]">🔥 {user.streak}天</td>
                <td className="py-3 px-4">{user.totalWorkouts}次</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    membership.tier === 'free' ? 'bg-gray-500/10 text-gray-400' :
                    membership.tier === 'yearly' ? 'bg-[#a855f7]/10 text-[#a855f7]' :
                    'bg-[#00f0ff]/10 text-[#00f0ff]'
                  }`}>
                    {membership.tier === 'free' ? '免费' : membership.tier === 'yearly' ? '年度VIP' : '月度PRO'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
