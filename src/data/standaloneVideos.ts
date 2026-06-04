// ============================================================
// NebulaFit 独立视频库 — 可靠CDN，国内可用
// 当前使用测试视频作为占位，可随时替换为真实训练视频
// 替换方法：将 mp4_url 改为你的真实视频URL即可
// ============================================================

export interface StandaloneVideo {
  id: string;
  title: string;
  titleZh: string;
  coach: string;
  coachZh: string;
  flag: string;
  category: VideoCat;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  calories: number;
  mp4_url: string;       // 主视频URL — 替换为真实视频即可
  poster?: string;
  equipment: string[];
  tags: string[];
  isPremium: boolean;
  description: string;
  descriptionZh: string;
  startTime: number;     // 起始秒数，让同一视频的不同片段模拟不同内容
}

export type VideoCat = 'hiit' | 'yoga' | 'strength' | 'cardio' | 'dance' | 'abs' | 'fullbody' | 'stretch' | 'pilates';

// 可靠视频源（已验证在国内可访问）
const DEMO_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

// 替换指南：将 DEMO_VIDEO 替换为你的视频URL
// 例如：'https://your-cdn.com/workouts/hiit-beginner.mp4'

export const STANDALONE_VIDEOS: StandaloneVideo[] = [
  // ========== HIIT 燃脂 ==========
  {
    id: 'hiit-001', title: 'Full Body HIIT Fat Burn', titleZh: '全身HIIT燃脂训练',
    coach: 'Chris Heria Style', coachZh: 'Chris Heria 风格', flag: '🇺🇸',
    category: 'hiit', difficulty: 'intermediate', duration: 15, calories: 280,
    mp4_url: DEMO_VIDEO, startTime: 5,
    equipment: [], tags: ['HIIT', '燃脂', '全身'], isPremium: false,
    description: 'High-intensity interval training — maximum burn in minimum time.',
    descriptionZh: '高强度间歇训练 · 短时高效燃脂 · 无需器械',
  },
  {
    id: 'hiit-002', title: 'Tabata Cardio Blast', titleZh: 'Tabata 有氧爆发训练',
    coach: 'Pamela Reif Style', coachZh: '帕梅拉风格', flag: '🇩🇪',
    category: 'hiit', difficulty: 'advanced', duration: 12, calories: 240,
    mp4_url: DEMO_VIDEO, startTime: 25,
    equipment: [], tags: ['Tabata', '爆发', '有氧'], isPremium: true,
    description: 'Tabata protocol — 20s work, 10s rest, 8 rounds.',
    descriptionZh: 'Tabata训练法 · 20秒训练10秒休息 · 8轮爆发',
  },
  {
    id: 'hiit-003', title: 'Low Impact HIIT', titleZh: '低冲击HIIT训练',
    coach: 'Chloe Ting Style', coachZh: 'Chloe Ting风格', flag: '🇦🇺',
    category: 'hiit', difficulty: 'beginner', duration: 20, calories: 200,
    mp4_url: DEMO_VIDEO, startTime: 45,
    equipment: [], tags: ['低冲击', '新手', '公寓友好'], isPremium: false,
    description: 'No jumping HIIT — apartment friendly, knee-safe.',
    descriptionZh: '无跳跃HIIT · 公寓友好 · 膝盖安全',
  },

  // ========== 瑜伽 ==========
  {
    id: 'yoga-001', title: 'Morning Yoga Flow', titleZh: '清晨瑜伽流',
    coach: 'Adriene Style', coachZh: 'Adriene风格', flag: '🇺🇸',
    category: 'yoga', difficulty: 'beginner', duration: 20, calories: 80,
    mp4_url: DEMO_VIDEO, startTime: 10,
    equipment: ['瑜伽垫'], tags: ['瑜伽', '晨练', '柔韧'], isPremium: false,
    description: 'Gentle morning flow to wake up your body and mind.',
    descriptionZh: '温柔晨间瑜伽 · 唤醒身心 · 适合每天练习',
  },
  {
    id: 'yoga-002', title: 'Power Yoga Strength', titleZh: '力量瑜伽训练',
    coach: 'Adriene Style', coachZh: 'Adriene风格', flag: '🇺🇸',
    category: 'yoga', difficulty: 'intermediate', duration: 25, calories: 150,
    mp4_url: DEMO_VIDEO, startTime: 35,
    equipment: ['瑜伽垫'], tags: ['力量瑜伽', '核心', '塑形'], isPremium: true,
    description: 'Build strength through yoga poses with longer holds.',
    descriptionZh: '通过瑜伽体式建立力量 · 长时间保持 · 核心挑战',
  },

  // ========== 力量训练 ==========
  {
    id: 'str-001', title: 'Dumbbell Full Body Strength', titleZh: '哑铃全身力量训练',
    coach: 'Jeff Cavaliere Style', coachZh: 'ATHLEAN-X风格', flag: '🇺🇸',
    category: 'strength', difficulty: 'intermediate', duration: 25, calories: 300,
    mp4_url: DEMO_VIDEO, startTime: 15,
    equipment: ['哑铃'], tags: ['力量', '哑铃', '全身'], isPremium: true,
    description: 'Science-based full body workout with dumbbells.',
    descriptionZh: '科学全身力量训练 · 哑铃必备 · 渐进式负荷',
  },
  {
    id: 'str-002', title: 'Bodyweight Push-Up Mastery', titleZh: '徒手俯卧撑大师课',
    coach: 'Chris Heria Style', coachZh: 'Chris Heria风格', flag: '🇺🇸',
    category: 'strength', difficulty: 'beginner', duration: 15, calories: 180,
    mp4_url: DEMO_VIDEO, startTime: 40,
    equipment: [], tags: ['俯卧撑', '自重', '上肢'], isPremium: false,
    description: 'Master push-ups — from knee push-ups to one-arm variations.',
    descriptionZh: '俯卧撑大师之路 · 从跪姿到单手 · 进阶指南',
  },
  {
    id: 'str-003', title: 'Glute & Leg Day', titleZh: '翘臀美腿训练日',
    coach: 'Pamela Reif Style', coachZh: '帕梅拉风格', flag: '🇩🇪',
    category: 'strength', difficulty: 'intermediate', duration: 20, calories: 220,
    mp4_url: DEMO_VIDEO, startTime: 55,
    equipment: ['哑铃', '弹力带'], tags: ['翘臀', '美腿', '下肢'], isPremium: false,
    description: 'Target glutes and legs with effective compound movements.',
    descriptionZh: '针对臀腿的复合训练 · 哑铃+弹力带 · 塑形燃脂',
  },

  // ========== 有氧心肺 ==========
  {
    id: 'cardio-001', title: 'Treadmill Hill Climb', titleZh: '跑步机爬坡训练',
    coach: 'Heather Robertson Style', coachZh: 'Heather风格', flag: '🇨🇦',
    category: 'cardio', difficulty: 'intermediate', duration: 20, calories: 350,
    mp4_url: DEMO_VIDEO, startTime: 8,
    equipment: ['跑步机'], tags: ['有氧', '爬坡', '燃脂'], isPremium: true,
    description: 'Hill climb intervals that torch calories and build endurance.',
    descriptionZh: '爬坡间歇训练 · 燃脂+耐力双提升 · 不伤膝盖',
  },
  {
    id: 'cardio-002', title: 'Jump Rope Cardio', titleZh: '跳绳有氧燃脂',
    coach: 'Fraser Wilson Style', coachZh: 'Fraser风格', flag: '🇦🇺',
    category: 'cardio', difficulty: 'beginner', duration: 12, calories: 200,
    mp4_url: DEMO_VIDEO, startTime: 28,
    equipment: ['跳绳'], tags: ['跳绳', '有氧', '便携'], isPremium: false,
    description: 'Jump rope intervals — portable cardio anywhere you go.',
    descriptionZh: '跳绳间歇训练 · 一根跳绳随时开练 · 高效燃脂',
  },

  // ========== 腹肌核心 ==========
  {
    id: 'abs-001', title: 'Six Pack Ab Circuit', titleZh: '六块腹肌雕刻循环',
    coach: 'Fraser Wilson Style', coachZh: 'Fraser风格', flag: '🇦🇺',
    category: 'abs', difficulty: 'advanced', duration: 10, calories: 120,
    mp4_url: DEMO_VIDEO, startTime: 50,
    equipment: ['瑜伽垫'], tags: ['腹肌', '核心', '高强度'], isPremium: true,
    description: '10 moves, 10 minutes — the ultimate ab shredder.',
    descriptionZh: '10个动作10分钟 · 终极腹肌撕裂者 · 高效核心',
  },
  {
    id: 'abs-002', title: 'Plank Challenge', titleZh: '平板支撑挑战',
    coach: 'Chris Heria Style', coachZh: 'Chris Heria风格', flag: '🇺🇸',
    category: 'abs', difficulty: 'beginner', duration: 8, calories: 60,
    mp4_url: DEMO_VIDEO, startTime: 2,
    equipment: ['瑜伽垫'], tags: ['平板支撑', '核心', '入门'], isPremium: false,
    description: 'Build core stability with plank variations for all levels.',
    descriptionZh: '平板支撑变式 · 全级别适用 · 核心稳定性训练',
  },

  // ========== 全身训练 ==========
  {
    id: 'full-001', title: 'Total Body Burn', titleZh: '全身燃脂塑形',
    coach: 'Heather Robertson Style', coachZh: 'Heather风格', flag: '🇨🇦',
    category: 'fullbody', difficulty: 'intermediate', duration: 30, calories: 400,
    mp4_url: DEMO_VIDEO, startTime: 18,
    equipment: [], tags: ['全身', '燃脂', '综合'], isPremium: true,
    description: 'Complete full body workout that hits every muscle group.',
    descriptionZh: '完整全身训练 · 覆盖所有肌群 · 30分钟最高效',
  },

  // ========== 拉伸恢复 ==========
  {
    id: 'strh-001', title: 'Deep Stretch Recovery', titleZh: '深度拉伸恢复',
    coach: 'Adriene Style', coachZh: 'Adriene风格', flag: '🇺🇸',
    category: 'stretch', difficulty: 'beginner', duration: 15, calories: 50,
    mp4_url: DEMO_VIDEO, startTime: 30,
    equipment: ['瑜伽垫'], tags: ['拉伸', '恢复', '放松'], isPremium: false,
    description: 'Post-workout stretch to improve flexibility and reduce soreness.',
    descriptionZh: '训练后全身拉伸 · 提升柔韧 · 减少酸痛',
  },
  {
    id: 'strh-002', title: 'Morning Mobility Routine', titleZh: '晨间关节活动度训练',
    coach: 'Jeff Cavaliere Style', coachZh: 'ATHLEAN-X风格', flag: '🇺🇸',
    category: 'stretch', difficulty: 'beginner', duration: 10, calories: 30,
    mp4_url: DEMO_VIDEO, startTime: 42,
    equipment: [], tags: ['晨练', '关节', '活动度'], isPremium: false,
    description: 'Daily mobility routine to keep joints healthy and pain-free.',
    descriptionZh: '每日关节活动度训练 · 保持关节健康 · 远离疼痛',
  },

  // ========== 舞蹈健身 ==========
  {
    id: 'dance-001', title: 'Dance Cardio Party', titleZh: '舞蹈有氧派对',
    coach: 'MadFit Style', coachZh: 'MadFit风格', flag: '🇨🇦',
    category: 'dance', difficulty: 'beginner', duration: 15, calories: 220,
    mp4_url: DEMO_VIDEO, startTime: 22,
    equipment: [], tags: ['舞蹈', '有氧', '快乐'], isPremium: false,
    description: 'Fun dance cardio — burn calories while having a blast.',
    descriptionZh: '欢乐舞蹈有氧 · 燃烧卡路里 · 快乐健身体验',
  },

  // ========== 普拉提 ==========
  {
    id: 'pil-001', title: 'Pilates Core Sculpt', titleZh: '普拉提核心塑形',
    coach: 'Heather Robertson Style', coachZh: 'Heather风格', flag: '🇨🇦',
    category: 'pilates', difficulty: 'intermediate', duration: 20, calories: 160,
    mp4_url: DEMO_VIDEO, startTime: 48,
    equipment: ['瑜伽垫'], tags: ['普拉提', '核心', '塑形'], isPremium: true,
    description: 'Classical Pilates moves to sculpt a strong, lean core.',
    descriptionZh: '经典普拉提动作 · 塑造强健纤细核心 · 身体控制',
  },
];
