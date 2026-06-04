import { useState } from 'react';

interface Props {
  bilibiliBv?: string;
  mp4_url?: string;
  startTime?: number;
  poster?: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ bilibiliBv, mp4_url, startTime, poster, title, className = '' }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useMp4, setUseMp4] = useState(false);
  const [biliError, setBiliError] = useState(false);

  const hasBili = !!bilibiliBv;
  const biliUrl = bilibiliBv
    ? `//player.bilibili.com/player.html?bvid=${bilibiliBv}&page=1&high_quality=1&autoplay=1&danmaku=0`
    : null;

  // 封面
  if (!isPlaying) {
    return (
      <div className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
        onClick={() => setIsPlaying(true)}>
        {poster ? (
          <img src={poster} alt={title || ''} className="w-full aspect-video object-cover" />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-[#0d0d26] via-[#12122e] to-[#1a1a3e] flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#6c5ce7]/20 flex items-center justify-center group-hover:bg-[#6c5ce7]/40 group-hover:scale-110 transition-all duration-300">
              <span className="text-4xl ml-1">▶</span>
            </div>
            {title && <p className="text-white/80 text-sm font-medium px-4 text-center">{title}</p>}
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#6c5ce7]/80 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white text-2xl ml-0.5">▶</span>
          </div>
        </div>
        {hasBili && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-pink-500/80 text-white text-[10px] font-bold z-10">B站</span>
        )}
      </div>
    );
  }

  // B站 iframe — 主引擎
  if (hasBili && !useMp4 && !biliError) {
    return (
      <div className={`rounded-2xl overflow-hidden bg-black relative ${className}`}>
        <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between">
          <p className="text-white text-sm font-medium truncate pr-8">{title || ''}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseMp4(true)}
              className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20"
            >切换备用源</button>
            <button onClick={() => setIsPlaying(false)} className="w-7 h-7 rounded-full bg-black/30 text-white/70 hover:bg-black/50">✕</button>
          </div>
        </div>
        <iframe
          src={biliUrl!}
          title={title || 'B站视频'}
          className="w-full aspect-video"
          allow="autoplay; fullscreen"
          allowFullScreen
          onError={() => setBiliError(true)}
        />
        {biliError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <button onClick={() => setUseMp4(true)} className="glow-btn text-sm px-6 py-2">切换到备用源 →</button>
          </div>
        )}
        <button onClick={() => { setIsPlaying(false); setBiliError(false); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white/70 text-xs hover:bg-black/70 z-20">
          ✕ 关闭
        </button>
      </div>
    );
  }

  // MP4 备用引擎
  if (mp4_url) {
    return (
      <div className={`rounded-2xl overflow-hidden bg-black relative ${className}`}>
        <video
          src={`${mp4_url}${startTime ? `#t=${startTime}` : ''}`}
          className="w-full aspect-video object-contain"
          autoPlay controls playsInline
          onError={() => setUseMp4(false)}
        />
        <button onClick={() => setIsPlaying(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 z-10">✕</button>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden bg-[#0d0d26] ${className}`}>
      <div className="aspect-video flex items-center justify-center text-gray-500">暂无可用视频源</div>
    </div>
  );
}
