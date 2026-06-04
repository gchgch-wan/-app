import { FOREIGN_COACHES } from '../../data/coachVideos';
import Card from '../ui/Card';

export default function AdminCoachManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">👨‍🏫 教练管理 ({FOREIGN_COACHES.length})</h2>
        <button className="glow-btn text-sm px-4 py-2">+ 添加教练</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {FOREIGN_COACHES.map((coach) => (
          <Card key={coach.id} className="flex gap-4">
            <img src={coach.photo} alt={coach.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold">{coach.flag} {coach.name}</span>
                {coach.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400">⭐ 推荐</span>}
              </div>
              <p className="text-xs text-[#00f0ff] mb-1">{coach.titleZh}</p>
              <p className="text-xs text-gray-500">{coach.followers} 订阅 · {coach.specialtyZh.join(' / ')}</p>
              <div className="flex gap-2 mt-2">
                {coach.certifications.map((cert) => (
                  <span key={cert} className="text-[10px] px-2 py-0.5 rounded bg-[#0a0a1a] text-gray-500">{cert}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button className="text-xs px-2 py-1 rounded bg-[#1a1a3e] text-gray-400 hover:text-white">✏️</button>
              <button className="text-xs px-2 py-1 rounded bg-[#1a1a3e] text-gray-400 hover:text-yellow-400">⭐</button>
              <a href={coach.channelUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded bg-[#1a1a3e] text-gray-400 hover:text-[#00f0ff]">🔗</a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
