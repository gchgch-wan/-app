import { useState, useRef, useEffect } from 'react';

interface Props {
  mp4_url: string;
  startTime?: number;
  poster?: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ mp4_url, startTime, poster, title, className = '' }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

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

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (isPlaying) hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  };

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
      </div>
    );
  }

  // 播放器
  return (
    <div ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-black group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}>

      <video
        ref={videoRef}
        src={mp4_url}
        className="w-full aspect-video object-contain bg-black cursor-pointer"
        autoPlay playsInline crossOrigin="anonymous"
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
          }
        }}
        onLoadedMetadata={() => {
          const v = videoRef.current;
          if (v) {
            setDuration(v.duration);
            if (startTime && startTime > 0) v.currentTime = startTime;
          }
        }}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError(true)}
        onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
      />

      {/* Buffering */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-10 h-10 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-4">
          <span className="text-3xl">⚠️</span>
          <p className="text-gray-400 text-sm">视频暂时无法播放</p>
          <button onClick={() => { setError(false); setIsPlaying(false); }}
            className="px-4 py-2 rounded-xl bg-[#6c5ce7] text-white text-sm">返回</button>
        </div>
      )}

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-4 transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer hover:h-1.5 transition-all" onClick={seekTo}>
          <div className="h-full bg-[#00f0ff] rounded-full relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00f0ff] rounded-full opacity-0 group-hover:opacity-100 shadow-neon-cyan" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
              className="text-white hover:text-[#00f0ff] text-lg">{videoRef.current?.paused ? '▶' : '⏸'}</button>
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
            <button onClick={() => setIsPlaying(false)} className="text-white/70 hover:text-white text-sm">✕</button>
            <button onClick={toggleFullscreen} className="text-white/70 hover:text-white text-sm">{isFullscreen ? '↙️' : '↗️'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
