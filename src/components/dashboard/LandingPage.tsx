import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import VideoPlayer from '../ui/VideoPlayer';
import { transformPlaceholder } from '../../services/imageFallback';

const features = [
  { icon: '🤖', key: 'ai', color: '#00f0ff' },
  { icon: '🏋️', key: 'workout', color: '#ff6b35' },
  { icon: '🏆', key: 'gamification', color: '#a855f7' },
  { icon: '🌍', key: 'community', color: '#00ff88' },
];

export default function LandingPage() {
  const { t } = useTranslation('home');
  const name = useUserStore((s) => s.name);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0d26] border border-[#1a1a3e] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-glow" />
              <span className="text-sm text-gray-300">{t('hero.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              {t('hero.title')}
              <br />
              <span className="neon-text">{t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={name ? '/dashboard' : '/'}
                className="glow-btn text-lg px-10 py-4"
                onClick={() => !name && document.querySelector('input')?.focus()}
              >
                {t('hero.cta1')} ✨
              </Link>
              <Link
                to="/dashboard"
                className="px-10 py-4 rounded-xl border border-[#1a1a3e] text-lg font-semibold hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all duration-200"
              >
                {t('hero.cta2')} →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {[
                { value: '50+', label: t('hero.stats.courses') },
                { value: '12,800+', label: t('hero.stats.users') },
                { value: '96%', label: t('hero.stats.satisfaction') },
                { value: '4.9', label: t('hero.stats.rating') },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00f0ff]">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-gray-400">{t('features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card-hover p-8 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: `${feature.color}15`, boxShadow: `0 0 20px ${feature.color}15` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t(`features.${feature.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformations Gallery */}
      <section className="py-24 px-4 bg-[#0a0a1a]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              真实的<span className="neon-text">蜕变故事</span>
            </h2>
            <p className="text-gray-400">他们的成果，就是你坚持下去的理由</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '小雯', age: '28岁 · 上班族', period: '90天', result: '-16kg', desc: '以前总找借口说没时间去健身房，NebulaFit让我在家就完成了蜕变。', img: transformPlaceholder('小雯', 0) },
              { name: '阿杰', age: '24岁 · 大学生', period: '120天', result: '+13kg肌肉', desc: '只用一对哑铃就实现了增肌目标，课程讲解非常细致。', img: transformPlaceholder('阿杰', 1) },
              { name: 'Lily', age: '32岁 · 产后妈妈', period: '180天', result: '-13kg', desc: '产后一年才开始训练，瑜伽课帮我修复了腹直肌分离。', img: transformPlaceholder('Lily', 2) },
            ].map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-[#00ff88]/20 text-[#00ff88] text-xs font-bold border border-[#00ff88]/30">
                      {s.period} → {s.result}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{s.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{s.age}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">"{s.desc}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Preview */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            看看<span className="neon-text">训练是什么样</span>
          </h2>
          <p className="text-gray-400 mb-8">跟着教练一起，每天只要15分钟</p>
          <div className="glass-card overflow-hidden">
            <VideoPlayer
              mp4_url="https://www.w3schools.com/html/mov_bbb.mp4"
              startTime={5}
              title="HIIT 全身燃脂训练预览"
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            准备好开始你的<span className="neon-text">健身之旅</span>了吗？
          </h2>
          <p className="text-gray-400 mb-8">
            加入12,800+学员，让AI健身伴侣陪你改变每一天
          </p>
          <Link to={name ? '/dashboard' : '/'} className="glow-btn text-lg px-12 py-4 inline-block">
            立即免费开始 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
