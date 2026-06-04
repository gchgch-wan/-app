import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { COACHES } from '../../data/coaches';
import Card from '../ui/Card';

export default function CoachPage() {
  const { t, i18n } = useTranslation('common');
  const isZh = i18n.language === 'zh-CN';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {isZh ? '🏅 专业教练团队' : '🏅 Our Coaching Team'}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {isZh
            ? '每一位教练都经过严格筛选，拥有国际认证资质和丰富的实战经验'
            : 'Every coach is rigorously vetted with international certifications and real-world experience'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {COACHES.map((coach, i) => (
          <motion.div
            key={coach.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden h-full">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Photo */}
                <div className="sm:w-48 flex-shrink-0">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                    <img
                      src={coach.photo}
                      alt={isZh ? coach.name : coach.nameEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-bold text-white">{coach.rating}</span>
                        <span className="text-gray-400 text-xs ml-1">
                          ({coach.students.toLocaleString()}+ {isZh ? '学员' : 'students'})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-xl font-bold">
                        {isZh ? coach.name : coach.nameEn}
                        <span className="text-lg ml-2">{coach.emoji}</span>
                      </h2>
                      <p className="text-[#00f0ff] text-sm font-medium">
                        {isZh ? coach.title : coach.titleEn}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#6c5ce7]/10 text-[#a855f7] border border-[#6c5ce7]/20">
                      {coach.experience}年
                    </span>
                  </div>

                  {/* Credentials */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(isZh ? coach.credentials : coach.credentialsEn).map((cred) => (
                      <span key={cred} className="text-[10px] px-2 py-0.5 rounded-lg bg-[#0a0a1a] border border-[#1a1a3e] text-gray-400">
                        {cred}
                      </span>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(isZh ? coach.specialties : coach.specialtiesEn).map((spec) => (
                      <span key={spec} className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff]">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    {isZh ? coach.bio : coach.bioEn}
                  </p>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-[#a855f7] pl-3 text-sm text-gray-300 italic mb-3">
                    "{isZh ? coach.quote : coach.quoteEn}"
                  </blockquote>

                  {/* Social */}
                  <div className="flex gap-2">
                    {coach.socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        className="text-xs px-3 py-1 rounded-lg bg-[#0a0a1a] border border-[#1a1a3e] text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition-all"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Card className="inline-block">
          <p className="text-lg font-semibold mb-2">
            {isZh ? '🏆 想找一位适合你的教练？' : '🏆 Want to find your perfect coach?'}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            {isZh ? '打开右下角 AI 教练，描述你的需求，我们帮你匹配' : 'Open the AI coach and describe your goals — we\'ll match you!'}
          </p>
          <button
            onClick={() => document.querySelector<HTMLButtonElement>('[class*="fixed bottom-6 right-6"]')?.click()}
            className="glow-btn text-sm"
          >
            {isZh ? '🤖 咨询 AI 教练' : '🤖 Ask AI Coach'}
          </button>
        </Card>
      </div>
    </div>
  );
}
