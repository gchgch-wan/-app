import { useState } from 'react';
import { COACH_VIDEOS, FOREIGN_COACHES, CoachVideo, VideoCategory } from '../../data/coachVideos';
import Card from '../ui/Card';

export default function AdminVideoManager() {
  const [videos, setVideos] = useState(COACH_VIDEOS);
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<CoachVideo | null>(null);

  const filtered = videos.filter((v) => {
    if (filter === 'free' && v.isPremium) return false;
    if (filter === 'premium' && !v.isPremium) return false;
    if (search && !v.title.toLowerCase().includes(search.toLowerCase()) &&
        !v.titleZh.includes(search)) return false;
    return true;
  });

  const togglePremium = (id: string) => {
    setVideos((prev) => prev.map((v) => v.id === id ? { ...v, isPremium: !v.isPremium } : v));
  };

  const toggleFeatured = (id: string) => {
    setVideos((prev) => prev.map((v) => v.id === id ? { ...v, tags: v.tags.includes('推荐') ? v.tags.filter(t => t !== '推荐') : [...v.tags, '推荐'] } : v));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🎬 视频管理 ({videos.length})</h2>
        <button className="glow-btn text-sm px-4 py-2">+ 添加视频</button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索视频..."
          className="flex-1 bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none"
        />
        {(['all', 'free', 'premium'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm ${filter === f ? 'bg-[#6c5ce7] text-white' : 'bg-[#0d0d26] text-gray-400 border border-[#1a1a3e]'}`}
          >
            {f === 'all' ? '全部' : f === 'free' ? '免费' : 'PRO'}
          </button>
        ))}
      </div>

      {/* Video List */}
      <div className="space-y-2">
        {filtered.map((video) => {
          const coach = FOREIGN_COACHES.find((c) => c.id === video.coachId);
          return (
            <Card key={video.id} className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-[#1a1a3e] to-[#0d0d26] flex items-center justify-center text-sm text-gray-600">
                🎬
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{video.titleZh}</p>
                <p className="text-xs text-gray-500">
                  {coach?.flag} {coach?.name} · {video.duration}min · 🔥{video.calories}kcal
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePremium(video.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                    video.isPremium ? 'bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30' : 'bg-green-500/10 text-green-400'
                  }`}
                >
                  {video.isPremium ? 'PRO' : '免费'}
                </button>
                <button
                  onClick={() => toggleFeatured(video.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] ${video.tags.includes('推荐') ? 'bg-yellow-500/10 text-yellow-400' : 'text-gray-600'}`}
                >
                  ⭐
                </button>
                <a
                  href={video.bilibiliBv ? `https://www.bilibili.com/video/${video.bilibiliBv}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#00f0ff] text-sm"
                >
                  🔗
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
