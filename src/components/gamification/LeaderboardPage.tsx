import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../stores/useUserStore';
import { LeaderboardEntry } from '../../types/gamification';
import Card from '../ui/Card';

function generateMockLeaderboard(): LeaderboardEntry[] {
  const currentUser = useUserStore.getState();
  const names = ['星尘', '烈焰战士', '月光女神', '风暴猎手', '甜蜜糖心', '暗夜骑士', '极光之翼', '雷霆战神', '霜雪之舞', '凤凰涅槃',
    'ShadowBlade', 'IronWill', 'CosmicFit', 'ZenMaster', 'PowerQueen',
    '龍神', '疾風', '鋼鉄', '桜花', '雷電'];
  const entries: LeaderboardEntry[] = names.map((name, i) => ({
    rank: i + 1,
    name,
    level: Math.floor(Math.random() * 30) + 5,
    xp: Math.floor(Math.random() * 50000) + 1000,
    avatar: ['🐺', '🔥', '🌙', '⚡', '💫', '🦅', '🌟', '🗡️', '❄️', '🦅',
      '🦊', '🐉', '🦁', '🐯', '🐻', '🦄', '🐲', '🦅', '🦋', '🐺'][i],
    isCurrentUser: false,
  }));
  entries.push({
    rank: 0,
    name: currentUser.name || '你',
    level: currentUser.level,
    xp: currentUser.totalXp,
    avatar: '💪',
    isCurrentUser: true,
  });
  entries.sort((a, b) => b.xp - a.xp);
  entries.forEach((e, i) => (e.rank = i + 1));
  return entries.slice(0, 20);
}

export default function LeaderboardPage() {
  const { t } = useTranslation('social');
  const [tab, setTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [leaderboard] = useState(generateMockLeaderboard);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">📋 {tab === 'weekly' ? t('leaderboard.weekly') : tab === 'monthly' ? t('leaderboard.monthly') : t('leaderboard.allTime')}</h1>
      <p className="text-gray-400 mb-6">看看谁是最努力的训练者</p>

      <div className="flex gap-2 mb-6">
        {(['weekly', 'monthly', 'allTime'] as const).map((tKey) => (
          <button
            key={tKey}
            onClick={() => setTab(tKey)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === tKey ? 'bg-[#6c5ce7] text-white' : 'bg-[#0d0d26] text-gray-400 border border-[#1a1a3e]'
            }`}
          >
            {t(`leaderboard.${tKey}`)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {leaderboard.map((entry) => (
          <Card
            key={entry.name}
            className={`flex items-center gap-4 ${entry.isCurrentUser ? 'border-[#00f0ff]/30 bg-[#00f0ff]/5' : ''}`}
          >
            <div className={`w-8 text-center font-bold text-lg ${
              entry.rank === 1 ? 'text-yellow-400' :
              entry.rank === 2 ? 'text-gray-300' :
              entry.rank === 3 ? 'text-amber-600' :
              'text-gray-500'
            }`}>
              {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1a1a3e] flex items-center justify-center text-xl">
              {entry.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {entry.name}
                {entry.isCurrentUser && <span className="text-xs text-[#00f0ff] ml-2">(你)</span>}
              </p>
              <p className="text-xs text-gray-500">Lv.{entry.level}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#a855f7]">{entry.xp.toLocaleString()}</p>
              <p className="text-xs text-gray-500">XP</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
