import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMembershipStore, MembershipTier } from '../../stores/useMembershipStore';
import Card from '../ui/Card';

interface Plan {
  id: MembershipTier;
  name: string;
  nameEn: string;
  emoji: string;
  price: string;
  period: string;
  popular: boolean;
  features: { text: string; textEn: string; included: boolean }[];
  color: string;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: '免费体验',
    nameEn: 'Free',
    emoji: '🌱',
    price: '¥0',
    period: '永久',
    popular: false,
    color: '#606080',
    features: [
      { text: '基础训练课程（6门）', textEn: '6 Basic Workouts', included: true },
      { text: '每日10条AI消息', textEn: '10 AI msgs/day', included: true },
      { text: '2个AI人格（炽阳/月白）', textEn: '2 AI Personas', included: true },
      { text: '基础成就徽章', textEn: 'Basic Achievements', included: true },
      { text: '社区功能', textEn: 'Community Access', included: true },
      { text: 'HD高清视频教学', textEn: 'HD Video Lessons', included: false },
      { text: '全部5个AI人格', textEn: 'All 5 AI Personas', included: false },
      { text: 'AI定制训练计划', textEn: 'AI Custom Workouts', included: false },
      { text: '真人教练1v1预约', textEn: '1-on-1 Coach Booking', included: false },
      { text: '3D伴侣专属皮肤', textEn: 'Exclusive 3D Skins', included: false },
    ],
  },
  {
    id: 'monthly',
    name: '月度会员',
    nameEn: 'Monthly',
    emoji: '⭐',
    price: '¥49',
    period: '/月',
    popular: false,
    color: '#00f0ff',
    features: [
      { text: '全部训练课程', textEn: 'All Workouts', included: true },
      { text: '无限AI消息', textEn: 'Unlimited AI', included: true },
      { text: '全部5个AI人格', textEn: 'All 5 AI Personas', included: true },
      { text: '全部成就徽章', textEn: 'All Achievements', included: true },
      { text: '社区功能', textEn: 'Community Access', included: true },
      { text: 'HD高清视频教学', textEn: 'HD Video Lessons', included: true },
      { text: 'AI定制训练计划', textEn: 'AI Custom Workouts', included: false },
      { text: '真人教练1v1预约', textEn: '1-on-1 Coach Booking', included: false },
      { text: '3D伴侣专属皮肤', textEn: 'Exclusive 3D Skins', included: false },
    ],
  },
  {
    id: 'yearly',
    name: '年度会员',
    nameEn: 'Yearly',
    emoji: '👑',
    price: '¥299',
    period: '/年',
    popular: true,
    color: '#a855f7',
    features: [
      { text: '全部训练课程', textEn: 'All Workouts', included: true },
      { text: '无限AI消息', textEn: 'Unlimited AI', included: true },
      { text: '全部5个AI人格', textEn: 'All 5 AI Personas', included: true },
      { text: '全部成就徽章', textEn: 'All Achievements', included: true },
      { text: '社区VIP标识', textEn: 'VIP Badge', included: true },
      { text: 'HD高清视频教学', textEn: 'HD Video Lessons', included: true },
      { text: 'AI定制训练计划', textEn: 'AI Custom Workouts', included: true },
      { text: '真人教练1v1预约', textEn: '1-on-1 Coach Booking', included: true },
      { text: '3D伴侣专属皮肤', textEn: 'Exclusive 3D Skins', included: true },
    ],
  },
];

export default function PricingPage() {
  const { t, i18n } = useTranslation('common');
  const isZh = i18n.language === 'zh-CN';
  const { tier: currentTier, upgradeTo } = useMembershipStore();
  const [showConfirm, setShowConfirm] = useState<MembershipTier | null>(null);

  const handleUpgrade = (tier: MembershipTier) => {
    if (tier === 'free') return;
    setShowConfirm(tier);
  };

  const confirmUpgrade = () => {
    if (showConfirm) {
      upgradeTo(showConfirm);
      setShowConfirm(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {isZh ? '选择你的' : 'Choose Your'}<span className="neon-text">{isZh ? '升级计划' : ' Plan'}</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          {isZh
            ? '解锁更多AI互动、专属内容和真人教练服务'
            : 'Unlock more AI interactions, exclusive content, and real coach services'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {PLANS.map((plan, i) => {
          const isCurrent = currentTier === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ff00e5] text-white text-xs font-bold shadow-neon-purple">
                  🔥 {isZh ? '最受欢迎' : 'Most Popular'}
                </div>
              )}

              <Card className={`h-full relative overflow-hidden ${isCurrent ? 'border-[#00ff88]/30' : ''} ${plan.popular ? 'border-[#a855f7]/30' : ''}`}>
                {isCurrent && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-bold border border-[#00ff88]/20">
                    ✓ {isZh ? '当前' : 'Current'}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{plan.emoji}</div>
                  <h3 className="text-lg font-bold">{isZh ? plan.name : plan.nameEn}</h3>
                  <div className="mt-3">
                    <span className="text-4xl font-extrabold" style={{ color: plan.color }}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                  </div>
                  {plan.id === 'yearly' && (
                    <p className="text-xs text-[#00ff88] mt-1">
                      {isZh ? '省 49% · 仅 ¥25/月' : 'Save 49% · Only ¥25/mo'}
                    </p>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-center gap-2 text-sm">
                      <span className={feat.included ? 'text-[#00ff88]' : 'text-gray-600'}>
                        {feat.included ? '✓' : '✗'}
                      </span>
                      <span className={feat.included ? 'text-gray-200' : 'text-gray-600'}>
                        {isZh ? feat.text : feat.textEn}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#0d0d26] text-gray-600 cursor-not-allowed'
                      : plan.popular
                        ? 'glow-btn'
                        : 'border border-[#1a1a3e] hover:border-[#00f0ff] hover:text-[#00f0ff] text-gray-300'
                  }`}
                >
                  {isCurrent
                    ? (isZh ? '当前方案' : 'Current Plan')
                    : plan.id === 'free'
                      ? (isZh ? '免费开始' : 'Start Free')
                      : (isZh ? '立即升级' : 'Upgrade Now') + ' →'}
                </button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowConfirm(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {PLANS.find(p => p.id === showConfirm)?.emoji}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {isZh ? '确认升级' : 'Confirm Upgrade'}
              </h2>
              <p className="text-gray-400 text-sm">
                {isZh
                  ? `升级到 ${PLANS.find(p => p.id === showConfirm)?.name}`
                  : `Upgrade to ${PLANS.find(p => p.id === showConfirm)?.nameEn}`}
              </p>
              <p className="text-3xl font-extrabold text-[#a855f7] mt-3">
                {PLANS.find(p => p.id === showConfirm)?.price}
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center mb-4">
              {isZh
                ? '* 演示模式：点击确认即可体验会员功能'
                : '* Demo mode: Click confirm to experience premium features'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-[#1a1a3e] text-gray-400 hover:text-white"
              >
                {isZh ? '取消' : 'Cancel'}
              </button>
              <button onClick={confirmUpgrade} className="flex-1 py-3 rounded-xl glow-btn">
                {isZh ? '确认升级 ✨' : 'Confirm ✨'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
