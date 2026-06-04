// ============================================================
// B站高清视频直链解析
// 通过 Vite 代理获取 B站 API 返回的直链 MP4
// 支持 1080p / 720p / 480p / 360p
// ============================================================

export interface VideoQuality {
  label: string;
  qn: number;
  url: string;
}

export interface VideoSource {
  title: string;
  cover: string;
  qualities: VideoQuality[];
  duration: number;
}

// 先获取视频信息（含cid）
async function fetchVideoPage(bvid?: string, avid?: string): Promise<{ cid: number; title: string; pic: string; duration: number }> {
  const params = bvid ? `bvid=${bvid}` : `aid=${avid}`;
  const url = `/api/bilibili/x/web-interface/view?${params}`;

  const resp = await fetch(url, {
    headers: { Referer: 'https://www.bilibili.com', Origin: 'https://www.bilibili.com' },
  });

  if (!resp.ok) throw new Error(`Info error: ${resp.status}`);
  const json = await resp.json();
  const d = json?.data || {};
  return {
    cid: d.cid || d.pages?.[0]?.cid || 0,
    title: d.title || '',
    pic: d.pic || '',
    duration: d.duration || 0,
  };
}

// B站 API → 获取视频流地址
async function fetchBilibiliStream(bvid: string, cid: number, avid?: string): Promise<any> {
  const params = bvid
    ? `bvid=${bvid}&cid=${cid}&qn=127&fnval=4048&fourk=1`
    : `aid=${avid}&cid=${cid}&qn=127&fnval=4048&fourk=1`;

  const url = `/api/bilibili/x/player/playurl?${params}`;

  const resp = await fetch(url, {
    headers: { Referer: 'https://www.bilibili.com', Origin: 'https://www.bilibili.com' },
  });

  if (!resp.ok) throw new Error(`Stream error: ${resp.status}`);
  return resp.json();
}

// 质量标签映射
const QUALITY_LABELS: Record<number, string> = {
  127: '超清 4K',
  125: '超清 4K',
  120: '超清 1080p+',
  116: '高清 1080p60',
  112: '高清 1080p',
  80: '高清 1080p',
  74: '高清 720p60',
  64: '高清 720p',
  48: '高清 720p',
  32: '标清 480p',
  16: '流畅 360p',
  6: '流畅 240p',
};

export async function getVideoSource(bvid?: string, avid?: string): Promise<VideoSource | null> {
  if (!bvid && !avid) return null;

  try {
    // 第一步：获取视频信息（含cid）
    const info = await fetchVideoPage(bvid, avid);
    if (!info.cid) return null;

    // 第二步：获取视频流
    const streamData = await fetchBilibiliStream(bvid!, info.cid, avid);

    const dash = streamData?.data?.dash;
    const durl = streamData?.data?.durl;

    const qualities: VideoQuality[] = [];

    if (dash?.video?.length > 0) {
      for (const v of dash.video) {
        const label = QUALITY_LABELS[v.id] || `画质${v.id}`;
        qualities.push({ label, qn: v.id, url: v.baseUrl || v.base_url || v.url || '' });
      }
    }

    if (qualities.length === 0 && durl?.length > 0) {
      const best = durl[durl.length - 1];
      qualities.push({ label: '高清', qn: 80, url: best.url || '' });
    }

    const valid = qualities.filter((q) => q.url);
    if (valid.length === 0) return null;

    return {
      title: info.title || '训练视频',
      cover: info.pic || '',
      qualities: valid.sort((a, b) => b.qn - a.qn),
      duration: info.duration || 0,
    };
  } catch (err) {
    console.warn('Bilibili fetch failed:', err);
    return null;
  }
}
