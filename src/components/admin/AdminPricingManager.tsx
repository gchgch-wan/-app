import { useState } from 'react';
import Card from '../ui/Card';

interface PriceTier {
  id: string;
  name: string;
  emoji: string;
  price: number;
  period: string;
  popular: boolean;
  features: { text: string; included: boolean }[];
}

export default function AdminPricingManager() {
  const [tiers, setTiers] = useState<PriceTier[]>([
    {
      id: 'free', name: '免费体验', emoji: '🌱', price: 0, period: '永久', popular: false,
      features: [
        { text: '基础训练课程（6门）', included: true },
        { text: '每日10条AI消息', included: true },
        { text: '2个AI人格（炽阳/月白）', included: true },
        { text: '基础视频（14个）', included: true },
        { text: 'HD高清视频教学', included: false },
        { text: '全部5个AI人格', included: false },
      ],
    },
    {
      id: 'monthly', name: '月度会员', emoji: '⭐', price: 49, period: '/月', popular: false,
      features: [
        { text: '全部训练课程', included: true },
        { text: '无限AI消息', included: true },
        { text: '全部5个AI人格', included: true },
        { text: '全部22个HD视频', included: true },
        { text: 'AI定制训练计划', included: false },
        { text: '真人教练1v1', included: false },
      ],
    },
    {
      id: 'yearly', name: '年度会员', emoji: '👑', price: 299, period: '/年', popular: true,
      features: [
        { text: '全部训练课程', included: true },
        { text: '无限AI消息', included: true },
        { text: '全部5个AI人格', included: true },
        { text: '全部22个HD视频', included: true },
        { text: 'AI定制训练计划', included: true },
        { text: '真人教练1v1预约', included: true },
      ],
    },
  ]);

  const toggleFeature = (tierId: string, featIdx: number) => {
    setTiers((prev) => prev.map((t) =>
      t.id === tierId
        ? { ...t, features: t.features.map((f, i) => i === featIdx ? { ...f, included: !f.included } : f) }
        : t
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">💰 定价方案管理</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.id} className={tier.popular ? 'border-[#a855f7]/30' : ''}>
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{tier.emoji}</div>
              <h3 className="font-bold text-lg">{tier.name}</h3>
              <div className="mt-2">
                <input
                  type="number"
                  value={tier.price}
                  readOnly
                  className="w-20 text-center bg-transparent text-3xl font-extrabold text-[#a855f7] outline-none"
                />
                <span className="text-gray-500 text-sm">{tier.period}</span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {tier.features.map((feat, i) => (
                <button
                  key={i}
                  onClick={() => toggleFeature(tier.id, i)}
                  className="w-full flex items-center gap-2 text-sm text-left p-1 rounded hover:bg-[#1a1a3e] transition-colors"
                >
                  <span className={feat.included ? 'text-[#00ff88]' : 'text-gray-600'}>
                    {feat.included ? '✓' : '✗'}
                  </span>
                  <span className={feat.included ? 'text-gray-200' : 'text-gray-600'}>{feat.text}</span>
                </button>
              ))}
            </div>
            {tier.popular && (
              <div className="text-center">
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30">
                  🔥 最受欢迎
                </span>
              </div>
            )}
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        * 演示模式 · 正式版可修改价格和权益
      </div>
    </div>
  );
}
