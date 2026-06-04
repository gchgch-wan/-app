import { useState, useRef, useEffect, useCallback } from 'react';

interface Props {
  mp4_1080p: string;
  mp4_720p?: string;
  mp4_480p?: string;
  poster?: string;
  title?: string;
  className?: string;
}

type Quality = '1080p' | '720p' | '480p';

export default function VideoPlayer({ mp4_1080p, mp4_720p, mp4_480p, poster, title, className = '' }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState<Quality>('1080p');
  const [showQualMenu, setShowQualMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSrc = () => {
    if (quality === '720p' && mp4_720p) return mp4_720p;
    if (quality === '480p' && mp4_480p) return mp4_480p;
    return mp4_1080p;
  };

  const availableQualities: Quality[] = [
    '1080p',
    ...(mp4_720p ? ['720p' as Quality] : []),
    ...(mp4_480p ? ['480p' as Quality] : []),
  ];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) videoRef.current.currentTime = pct * duration;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) { document.exitFullscreen(); setIsFullscreen(false); }
    else if (containerRef.current) { containerRef.current.requestFullscreen(); setIsFullscreen(true); }
  };

  // 封面状态
  if (!isPlaying) {
    return (
      <div className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
        onClick={() => setIsPlaying(true)}>
        {poster ? (
          <img src={poster} alt={title} className="w-full aspect-video object-cover" loading="lazy" />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-[#0d0d26] via-[#12122e] to-[#1a1a3e] flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#6c5ce7]/20 flex items-center justify-center group-hover:bg-[#6c5ce7]/40 group-hover:scale-110 transition-all duration-300">
              <span className="text-4xl ml-1">▶</span>
            </div>
            {title && <p className="text-white/80 text-sm font-medium px-4 text-center">{title}</p>}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono">
          {availableQualities[0]}
        </span>
      </div>
    );
  }

  // 播放器
  return (
    <div ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-black group ${className}`}
      onMouseMove={() => {}}>

      <video
        ref={videoRef}
        src={getSrc()}
        className="w-full aspect-video object-contain bg-black cursor-pointer"
        autoPlay playsInline crossOrigin="anonymous"
        poster={poster}
        onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
          }
        }}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* 缓冲中 */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-10 h-10 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* 底部控制栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-4">
        {/* 进度条 */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer hover:h-1.5 transition-all"
          onClick={seekTo}>
          <div className="h-full bg-[#00f0ff] rounded-full relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00f0ff] rounded-full opacity-0 group-hover:opacity-100 shadow-neon-cyan" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
              className="text-white hover:text-[#00f0ff] text-lg"> {videoRef.current?.paused ? '▶' : '⏸'} </button>
            <span className="text-white/70 text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
            <div className="hidden sm:flex items-center gap-1">
              <button onClick={() => { const v = volume > 0 ? 0 : 1; setVolume(v); if (videoRef.current) videoRef.current.volume = v; }}
                className="text-white/70 hover:text-white text-sm">{volume > 0 ? '🔊' : '🔇'}</button>
              <input type="range" min="0" max="1" step="0.1" value={volume}
                onChange={e => { const v = parseFloat(e.target.value); setVolume(v); if (videoRef.current) videoRef.current.volume = v; }}
                className="w-16 h-1 accent-[#00f0ff]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* 清晰度选择 */}
            {availableQualities.length > 1 && (
              <div className="relative">
                <button onClick={() => setShowQualMenu(!showQualMenu)}
                  className="text-white/70 hover:text-[#00f0ff] text-xs font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10">
                  {quality}
                </button>
                {showQualMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#0d0d26]/95 backdrop-blur-xl border border-[#1a1a3e] rounded-xl overflow-hidden min-w-[100px] shadow-xl z-50">
                    {availableQualities.map(q => (
                      <button key={q} onClick={() => { setQuality(q); setShowQualMenu(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-[#1a1a3e] ${q === quality ? 'text-[#00f0ff] font-bold bg-[#00f0ff]/5' : 'text-gray-300'}`}>
                        {q} {q === quality && '✓'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button onClick={() => setIsPlaying(false)} className="text-white/70 hover:text-white text-sm">✕</button>
            <button onClick={toggleFullscreen} className="text-white/70 hover:text-white text-sm">
              {isFullscreen ? '↙️' : '↗️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
