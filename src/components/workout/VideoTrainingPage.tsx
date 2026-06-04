import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FOREIGN_COACHES, COACH_VIDEOS, ForeignCoach, CoachVideo, VideoCategory } from '../../data/coachVideos';
import { useMembershipStore } from '../../stores/useMembershipStore';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import VideoPlayer from '../ui/VideoPlayer';
import ErrorBoundary from '../ui/ErrorBoundary';
import { VideoCardSkeleton } from '../ui/Skeleton';

const CATEGORIES: { key: VideoCategory | 'all'; label: string; labelZh: string; emoji: string }[] = [
  { key: 'all', label: 'All', labelZh: '全部', emoji: '🎬' },
  { key: 'hiit', label: 'HIIT', labelZh: 'HIIT燃脂', emoji: '🔥' },
  { key: 'fullbody', label: 'Full Body', labelZh: '全身训练', emoji: '💪' },
  { key: 'abs', label: 'Abs', labelZh: '腹肌核心', emoji: '🫃' },
  { key: 'strength', label: 'Strength', labelZh: '力量训练', emoji: '🏋️' },
  { key: 'yoga', label: 'Yoga', labelZh: '瑜伽', emoji: '🧘' },
  { key: 'dance', label: 'Dance', labelZh: '舞蹈健身', emoji: '💃' },
  { key: 'pilates', label: 'Pilates', labelZh: '普拉提', emoji: '🤸' },
  { key: 'stretch', label: 'Stretch', labelZh: '拉伸恢复', emoji: '😌' },
  { key: 'cardio', label: 'Cardio', labelZh: '有氧心肺', emoji: '🏃' },
];

export default function VideoTrainingPage() {
  const { t, i18n } = useTranslation('workout');
  const isZh = i18n.language === 'zh-CN';
  const { tier, canUseHdVideos } = useMembershipStore();
  const [activeCat, setActiveCat] = useState<VideoCategory | 'all'>('all');
  const [activeCoach, setActiveCoach] = useState<string | 'all'>('all');
  const [selectedVideo, setSelectedVideo] = useState<CoachVideo | null>(null);
  const [premiumPopup, setPremiumPopup] = useState(false);

  const filtered = COACH_VIDEOS.filter((v) => {
    if (activeCat !== 'all' && v.category !== activeCat) return false;
    if (activeCoach !== 'all' && v.coachId !== activeCoach) return false;
    return true;
  });

  const handlePlay = (video: CoachVideo) => {
    if (video.isPremium && !canUseHdVideos()) {
      setPremiumPopup(true);
      return;
    }
    setSelectedVideo(video);
  };

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isZh ? '🌍 全球教练训练视频' : '🌍 Global Coach Training Videos'}
          </h1>
          <p className="text-gray-400">
            {isZh
              ? `精选${COACH_VIDEOS.length}个训练视频 · ${FOREIGN_COACHES.length}位世界顶级教练 · 科学训练体系`
              : `${COACH_VIDEOS.length} curated videos · ${FOREIGN_COACHES.length} world-class coaches · Science-based`}
          </p>
          {tier === 'free' && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs">💡</span>
              <span className="text-gray-500">
                {isZh ? '免费观看基础视频，' : 'Free basic videos, '}
                <Link to="/pricing" className="text-[#a855f7] hover:underline">
                  {isZh ? '升级会员解锁全部HD内容' : 'upgrade for full HD access'}
                </Link>
              </span>
            </div>
          )}
        </div>

        {/* Coach Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveCoach('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeCoach === 'all' ? 'bg-[#6c5ce7] text-white' : 'bg-[#0d0d26] text-gray-400 border border-[#1a1a3e] hover:text-white'
            }`}
          >
            🌍 {isZh ? '全部教练' : 'All Coaches'}
          </button>
          {FOREIGN_COACHES.map((coach) => (
            <button
              key={coach.id}
              onClick={() => setActiveCoach(coach.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCoach === coach.id ? 'bg-[#6c5ce7] text-white shadow-neon-purple' : 'bg-[#0d0d26] text-gray-400 border border-[#1a1a3e] hover:text-white'
              }`}
            >
              {coach.flag} {coach.name}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                activeCat === cat.key
                  ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat.emoji} {isZh ? cat.labelZh : cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card hover className="overflow-hidden h-full">
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-video cursor-pointer group"
                    onClick={() => handlePlay(video)}
                  >
                    <div className="w-full aspect-video bg-gradient-to-br from-[#1a1a3e] via-[#0d0d26] to-[#1a1a3e] flex items-center justify-center">
                      <span className="text-4xl opacity-30">🎬</span>
                    </div>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#6c5ce7]/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-white text-lg ml-0.5">▶</span>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                      {video.duration}min
                    </span>

                    {/* Premium Badge */}
                    {video.isPremium && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#a855f7] to-[#ff00e5] text-white text-[10px] font-bold">
                        PRO
                      </span>
                    )}

                    {/* Coach Badge */}
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[10px]">
                      {FOREIGN_COACHES.find(c => c.id === video.coachId)?.flag} {FOREIGN_COACHES.find(c => c.id === video.coachId)?.name}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                      {isZh ? video.titleZh : video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span className={video.difficulty === 'beginner' ? 'text-green-400' : video.difficulty === 'intermediate' ? 'text-yellow-400' : 'text-red-400'}>
                        {video.difficulty.toUpperCase()}
                      </span>
                      <span>·</span>
                      <span>🔥 {video.calories} kcal</span>
                      <span>·</span>
                      <span>👁 {video.views}K</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-gray-400">
              {isZh ? '没有匹配的视频，换个筛选条件试试' : 'No videos match your filters. Try another selection.'}
            </p>
          </div>
        )}

        {/* Video Player Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-white font-bold text-lg">
                      {isZh ? selectedVideo.titleZh : selectedVideo.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {FOREIGN_COACHES.find(c => c.id === selectedVideo.coachId)?.name} · {selectedVideo.duration}min · 🔥{selectedVideo.calories}kcal
                    </p>
                  </div>
                  <button onClick={() => setSelectedVideo(null)} className="text-white text-2xl hover:text-gray-300">✕</button>
                </div>
                <VideoPlayer
                  mp4_1080p={`https://cdn.coverr.co/videos/coverr-woman-doing-fitness-exercise-5643/1080p.mp4`}
                  title={isZh ? selectedVideo.titleZh : selectedVideo.title}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedVideo.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#1a1a3e] text-gray-400 text-xs">{tag}</span>
                  ))}
                  {selectedVideo.equipment.map(eq => (
                    <span key={eq} className="px-2 py-0.5 rounded-lg bg-[#0a0a1a] border border-[#1a1a3e] text-gray-500 text-xs">🎒 {eq}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Popup */}
        <AnimatePresence>
          {premiumPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              onClick={() => setPremiumPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="glass-card p-8 max-w-sm mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-xl font-bold mb-2">
                  {isZh ? '高级训练视频' : 'Premium Video'}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {isZh
                    ? '升级会员即可观看全球顶级教练的全部HD训练视频'
                    : 'Upgrade to access all HD training videos from world-class coaches'}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setPremiumPopup(false)} className="flex-1 py-2 rounded-xl border border-[#1a1a3e] text-gray-400 text-sm">
                    {isZh ? '以后再说' : 'Later'}
                  </button>
                  <Link to="/pricing" className="flex-1 py-2 rounded-xl glow-btn text-sm text-center">
                    {isZh ? '¥49/月 立即升级' : 'Upgrade ¥49/mo'}
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coach Info Cards */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            {isZh ? '🏅 全球顶级教练团队' : '🏅 World-Class Coaching Team'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOREIGN_COACHES.map((coach) => (
              <Card key={coach.id} hover className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#1a1a3e]">
                  <img src={coach.photo} alt={coach.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold">{coach.flag} {coach.name}</h3>
                <p className="text-xs text-[#00f0ff] mb-1">{isZh ? coach.titleZh : coach.title}</p>
                <p className="text-xs text-gray-500 mb-2">{coach.followers} subscribers</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {(isZh ? coach.specialtyZh : coach.specialty).slice(0, 3).map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a0a1a] border border-[#1a1a3e] text-gray-400">{s}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
