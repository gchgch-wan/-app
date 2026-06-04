import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMembershipStore } from '../../stores/useMembershipStore';
import { STANDALONE_VIDEOS, StandaloneVideo, VideoCat } from '../../data/standaloneVideos';
import { generatePoster } from '../../services/posterGenerator';
import Card from '../ui/Card';
import VideoPlayer from '../ui/VideoPlayer';
import ErrorBoundary from '../ui/ErrorBoundary';

const CATEGORIES: { key: VideoCat | 'all'; icon: string; label: string; labelZh: string }[] = [
  { key: 'all', icon: '🎬', label: 'All', labelZh: '全部' },
  { key: 'hiit', icon: '🔥', label: 'HIIT', labelZh: 'HIIT燃脂' },
  { key: 'fullbody', icon: '💪', label: 'Full Body', labelZh: '全身训练' },
  { key: 'abs', icon: '🫃', label: 'Abs', labelZh: '腹肌核心' },
  { key: 'strength', icon: '🏋️', label: 'Strength', labelZh: '力量训练' },
  { key: 'yoga', icon: '🧘', label: 'Yoga', labelZh: '瑜伽' },
  { key: 'cardio', icon: '🏃', label: 'Cardio', labelZh: '有氧心肺' },
  { key: 'dance', icon: '💃', label: 'Dance', labelZh: '舞蹈健身' },
  { key: 'pilates', icon: '🤸', label: 'Pilates', labelZh: '普拉提' },
  { key: 'stretch', icon: '😌', label: 'Stretch', labelZh: '拉伸恢复' },
];

export default function StandaloneVideoPage() {
  const { t, i18n } = useTranslation('workout');
  const isZh = i18n.language === 'zh-CN';
  const { tier, canUseHdVideos } = useMembershipStore();
  const [activeCat, setActiveCat] = useState<VideoCat | 'all'>('all');
  const [activeVideo, setActiveVideo] = useState<StandaloneVideo | null>(null);
  const [premiumPopup, setPremiumPopup] = useState(false);

  const filtered = STANDALONE_VIDEOS.filter(v => activeCat === 'all' || v.category === activeCat);

  const handlePlay = (video: StandaloneVideo) => {
    if (video.isPremium && !canUseHdVideos()) {
      setPremiumPopup(true);
      return;
    }
    setActiveVideo(video);
  };

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isZh ? '🎬 训练视频库' : '🎬 Training Video Library'}
          </h1>
          <p className="text-gray-400">
            {isZh
              ? `${STANDALONE_VIDEOS.length}个独立训练视频 · 自有播放器 · 1080p高清`
              : `${STANDALONE_VIDEOS.length} standalone videos · Built-in player · 1080p HD`}
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                activeCat === cat.key ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30'
                  : 'text-gray-500 hover:text-gray-300'}`}>
              {cat.icon} {isZh ? cat.labelZh : cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((video, i) => (
            <motion.div key={video.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card hover className="overflow-hidden h-full cursor-pointer" onClick={() => handlePlay(video)}>
                <div className="relative aspect-video">
                  <img
                    src={generatePoster(isZh ? video.titleZh : video.title, video.category, video.duration, video.difficulty)}
                    alt={isZh ? video.titleZh : video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
                    {video.duration}min
                  </span>
                  {video.isPremium && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#a855f7] to-[#ff00e5] text-white text-[10px] font-bold">
                      PRO
                    </span>
                  )}
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[10px]">
                    {video.flag} {isZh ? video.coachZh : video.coach}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                    {isZh ? video.titleZh : video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span className={video.difficulty === 'beginner' ? 'text-green-400' : video.difficulty === 'intermediate' ? 'text-yellow-400' : 'text-red-400'}>
                      {video.difficulty.toUpperCase()}
                    </span>
                    <span>· 🔥{video.calories}kcal</span>
                    <span>· 1080p</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Player Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
              onClick={() => setActiveVideo(null)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                <VideoPlayer
                  mp4_1080p={activeVideo.mp4_1080p}
                  mp4_720p={activeVideo.mp4_720p}
                  mp4_480p={activeVideo.mp4_480p}
                  poster={generatePoster(isZh ? activeVideo.titleZh : activeVideo.title, activeVideo.category, activeVideo.duration, activeVideo.difficulty)}
                  title={isZh ? activeVideo.titleZh : activeVideo.title}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeVideo.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-lg bg-[#1a1a3e] text-gray-400 text-xs">{t}</span>
                  ))}
                  {activeVideo.equipment.map(e => (
                    <span key={e} className="px-2 py-0.5 rounded-lg bg-[#0a0a1a] border border-[#1a1a3e] text-gray-500 text-xs">🎒 {e}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Popup */}
        <AnimatePresence>
          {premiumPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              onClick={() => setPremiumPopup(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="glass-card p-8 max-w-sm mx-4 text-center" onClick={e => e.stopPropagation()}>
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-xl font-bold mb-2">{isZh ? '高级训练视频' : 'Premium Video'}</h2>
                <p className="text-gray-400 text-sm mb-4">
                  {isZh ? '升级月度会员即可观看全部高清训练视频' : 'Upgrade to watch all HD training videos'}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setPremiumPopup(false)}
                    className="flex-1 py-2 rounded-xl border border-[#1a1a3e] text-gray-400 text-sm">
                    {isZh ? '以后再说' : 'Later'}
                  </button>
                  <Link to="/pricing" className="flex-1 py-2 rounded-xl glow-btn text-sm text-center">
                    ¥49/月
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
