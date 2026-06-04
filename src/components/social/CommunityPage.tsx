import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import Card from '../ui/Card';

const mockPosts = [
  { user: '烈焰战士', avatar: '🔥', action: '完成了 极限燃脂挑战', time: '5分钟前', emoji: '💀', likes: 24 },
  { user: '月光女神', avatar: '🌙', action: '完成了 柔韧核心瑜伽课', time: '12分钟前', emoji: '🧘', likes: 18 },
  { user: '星尘', avatar: '✨', action: '连续打卡 30 天！', time: '1小时前', emoji: '🏆', likes: 56 },
  { user: '暗夜骑士', avatar: '🦇', action: '完成了 家庭哑铃增肌', time: '2小时前', emoji: '🏋️', likes: 15 },
  { user: '甜蜜糖心', avatar: '💫', action: '今日经验值突破 5000！', time: '3小时前', emoji: '🎉', likes: 42 },
  { user: '风暴猎手', avatar: '⚡', action: '升级到 Lv.20！', time: '5小时前', emoji: '⬆️', likes: 33 },
];

export default function CommunityPage() {
  const { t } = useTranslation('social');
  const { name } = useUserStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">🌍 {t('community.title')}</h1>
      <p className="text-gray-400 mb-8">{t('community.subtitle')}</p>

      {/* Share box */}
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#1a1a3e] flex items-center justify-center text-xl">💪</div>
          <div className="flex-1 bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl px-4 py-3 text-gray-500 text-sm">
            分享你的训练成果...
          </div>
        </div>
        <button className="glow-btn w-full">{t('community.shareWorkout')} ✨</button>
      </Card>

      {/* Feed */}
      <h2 className="text-xl font-semibold mb-4">📱 {t('community.friendActivity')}</h2>
      <div className="space-y-4">
        {mockPosts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hover>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1a1a3e] flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{post.user}</p>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {post.action} <span className="text-lg ml-1">{post.emoji}</span>
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">{post.time}</span>
                    <button className="text-xs text-gray-500 hover:text-red-400 transition-colors">
                      ❤️ {post.likes}
                    </button>
                    <button className="text-xs text-gray-500 hover:text-[#00f0ff] transition-colors">
                      💬 评论
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
