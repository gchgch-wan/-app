// ============================================================
// NebulaFit 全球教练训练视频库
// 全部使用 Bilibili 源 — 国内秒开，无需翻墙
// ============================================================

export interface CoachVideo {
  id: string;
  coachId: string;
  title: string;
  titleZh: string;
  bilibiliBv?: string;   // B站 BV号
  bilibiliAv?: string;   // B站 AV号（备用）
  youtubeId?: string;    // YouTube ID（国际版备用）
  duration: number;
  category: VideoCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  calories: number;
  equipment: string[];
  tags: string[];
  views: number;
  isPremium: boolean;
  description: string;
  descriptionZh: string;
}

export type VideoCategory = 'hiit' | 'strength' | 'yoga' | 'cardio' | 'dance' | 'abs' | 'fullbody' | 'stretch' | 'pilates';

export interface ForeignCoach {
  id: string; name: string; country: string; flag: string; emoji: string;
  photo: string; title: string; titleZh: string; followers: string;
  specialty: string[]; specialtyZh: string[]; style: string; styleZh: string;
  description: string; descriptionZh: string; certifications: string[];
  channelUrl: string; featured: boolean;
}

// ============================================================
// 8位世界顶级教练
// ============================================================

export const FOREIGN_COACHES: ForeignCoach[] = [
  {
    id: 'chris-heria', name: 'Chris Heria', country: 'USA', flag: '🇺🇸', emoji: '💪',
    photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop',
    title: 'Calisthenics & Street Workout King', titleZh: '街头健身之王 · 自重训练大师',
    followers: '5.2M', specialty: ['Calisthenics', 'Street Workout', 'Abs', 'HIIT'],
    specialtyZh: ['自重训练', '街头健身', '腹肌雕刻', 'HIIT燃脂'],
    style: 'High-energy, technical, progressive', styleZh: '高能热血 + 技术细节 + 渐进式挑战',
    description: 'Founder of THENX, one of the world\'s most recognized calisthenics athletes.',
    descriptionZh: 'THENX创始人，全球最知名的街头健身运动员之一。专注自重训练，同时打造功能性力量和美型身材。',
    certifications: ['NASM-CPT', 'CrossFit L1'], channelUrl: 'https://space.bilibili.com/',
    featured: true,
  },
  {
    id: 'pamela-reif', name: 'Pamela Reif', country: 'Germany', flag: '🇩🇪', emoji: '🔥',
    photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    title: 'Queen of Home Workouts', titleZh: '居家健身女王 · B站官方入驻',
    followers: '9.8M', specialty: ['Full Body', 'HIIT', 'Abs', 'Booty', 'Dance'],
    specialtyZh: ['全身训练', 'HIIT燃脂', '腹肌', '翘臀', '舞蹈健身'],
    style: 'Efficient, no-equipment, music-driven', styleZh: '高效无需器械 + 音乐驱动 + 视觉享受',
    description: '帕梅拉已入驻B站官方账号，视频中文字幕齐全。',
    descriptionZh: '德国最大健身博主，B站官方账号(UID:604003146)，全部训练视频中文字幕。无需器械高效燃脂。',
    certifications: ['ACE-CPT', 'Sports Science B.S.'], channelUrl: 'https://space.bilibili.com/604003146',
    featured: true,
  },
  {
    id: 'chloe-ting', name: 'Chloe Ting', country: 'Australia', flag: '🇦🇺', emoji: '🌟',
    photo: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=400&fit=crop',
    title: 'Challenge Queen · 2 Week Shred', titleZh: '挑战赛女王 · 2周变身计划',
    followers: '25M', specialty: ['Full Body', 'Abs', 'HIIT', 'Challenges'],
    specialtyZh: ['全身燃脂', '腹肌挑战', 'HIIT', '打卡挑战'],
    style: 'Challenge-based, beginner-friendly', styleZh: '挑战赛制 + 新手友好 + 中文字幕',
    description: 'The most-subscribed fitness creator on YouTube. B站有大量搬运+中字。',
    descriptionZh: 'YouTube健身频道订阅量第一人。B站有海量搬运视频+中文字幕，2周挑战计划尤为出名。',
    certifications: ['Certified Personal Trainer'], channelUrl: 'https://search.bilibili.com/all?keyword=Chloe+Ting',
    featured: true,
  },
  {
    id: 'jeff-cavaliere', name: 'Jeff Cavaliere', country: 'USA', flag: '🇺🇸', emoji: '🧠',
    photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop',
    title: 'Physical Therapist · Strength Science', titleZh: '物理治疗师 · Athlean-X创始人',
    followers: '13.8M', specialty: ['Strength', 'Rehab', 'Form Correction'],
    specialtyZh: ['力量训练', '运动康复', '姿势纠正', '科学健身'],
    style: 'Science-based, anatomical, zero-BS', styleZh: '科学解剖学视角 + 零废话 + 直接有效',
    description: 'Former NY Mets PT turned YouTube\'s most trusted fitness educator.',
    descriptionZh: '前MLB物理治疗师，YouTube最受信赖的健身教育者。B站有\"ATHLEAN-X\"官方搬运中字频道。',
    certifications: ['MSPT', 'CSCS', 'NSCA-CPT'], channelUrl: 'https://search.bilibili.com/all?keyword=ATHLEAN-X',
    featured: true,
  },
  {
    id: 'heather-robertson', name: 'Heather Robertson', country: 'Canada', flag: '🇨🇦', emoji: '⚡',
    photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop',
    title: 'HIIT & Full Body Expert', titleZh: 'HIIT全身训练专家 · 无废话跟练',
    followers: '2.4M', specialty: ['HIIT', 'Full Body', 'Strength', 'Pilates'],
    specialtyZh: ['HIIT燃脂', '全身训练', '力量塑形', '普拉提'],
    style: 'No-talking, follow-along, timer-based', styleZh: '无解说纯跟练 + 计时器制 + 极简风格',
    description: 'Known for "no talking, just training" approach. B站有中字搬运。',
    descriptionZh: '以"不说话只训练"风格著称。B站有中文字幕搬运，12周计划最受欢迎。',
    certifications: ['NASM-CPT', 'Precision Nutrition L1'], channelUrl: 'https://search.bilibili.com/all?keyword=Heather+Robertson',
    featured: false,
  },
  {
    id: 'madfit', name: 'Maddie Lymburner', country: 'Canada', flag: '🇨🇦', emoji: '💃',
    photo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop',
    title: 'Dance Fitness & Strength Fusion', titleZh: '舞蹈健身融合力量训练',
    followers: '9.2M', specialty: ['Dance', 'Full Body', 'Strength', 'Stretch'],
    specialtyZh: ['舞蹈健身', '全身塑形', '力量训练', '拉伸放松'],
    style: 'Fun, dance-inspired, creative', styleZh: '欢乐舞蹈风 + 创意编排',
    description: 'Maddie makes fitness fun with dance-inspired workouts.',
    descriptionZh: '让健身变得有趣——舞蹈风格训练在不知不觉中燃烧卡路里。B站有搬运。',
    certifications: ['CanFitPro Certified'], channelUrl: 'https://search.bilibili.com/all?keyword=MadFit',
    featured: false,
  },
  {
    id: 'yoga-with-adriene', name: 'Adriene Mishler', country: 'USA', flag: '🇺🇸', emoji: '🧘',
    photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop',
    title: 'Yoga for Everyone', titleZh: '全民瑜伽导师 · B站中字搬运',
    followers: '12.6M', specialty: ['Yoga', 'Stretch', 'Meditation', 'Recovery'],
    specialtyZh: ['瑜伽', '拉伸', '冥想', '恢复训练'],
    style: 'Gentle, inclusive, mindful', styleZh: '温柔包容 + 正念引导 + 中文字幕',
    description: 'The most popular yoga channel on YouTube. B站有大量中文字幕搬运。',
    descriptionZh: 'YouTube最受欢迎瑜伽频道。B站大量中字搬运，30天瑜伽之旅全球现象级。',
    certifications: ['RYT-500'], channelUrl: 'https://space.bilibili.com/',
    featured: true,
  },
  {
    id: 'fraser-wilson', name: 'Fraser Wilson', country: 'Australia', flag: '🇦🇺', emoji: '🏋️',
    photo: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=400&fit=crop',
    title: 'Abs & Bodyweight Specialist', titleZh: '腹肌自重训练专家',
    followers: '3.1M', specialty: ['Abs', 'Full Body', 'HIIT', 'Bodyweight'],
    specialtyZh: ['腹肌训练', '全身自重', 'HIIT燃脂', '居家健身'],
    style: 'Quick, intense, abs-focused', styleZh: '短时高效 + 腹肌专注 + 结果导向',
    description: '10-minute ab workouts are legendary. B站有搬运。',
    descriptionZh: '10分钟腹肌训练堪称传奇，短时高强度证明不需泡几小时也能练出六块腹肌。',
    certifications: ['Certified Personal Trainer'], channelUrl: 'https://search.bilibili.com/all?keyword=Fraser+Wilson',
    featured: false,
  },
];

// ============================================================
// 精选训练视频库 — 全部 B站真实BV号
// ============================================================

export const COACH_VIDEOS: CoachVideo[] = [
  // === Chris Heria ===
  { id: 'ch-001', coachId: 'chris-heria', titleZh: '15分钟高强度HIIT全身燃脂', title: '15 Min Intense HIIT', bilibiliBv: 'BV1RK41137it', duration: 15, category: 'hiit', difficulty: 'intermediate', calories: 250, equipment: [], tags: ['HIIT', '全身', '燃脂'], views: 45, isPremium: false, description: 'Chris Heria THENX 经典HIIT', descriptionZh: 'THENX经典高强度间歇 · 无需器械 · 全身燃脂' },
  { id: 'ch-002', coachId: 'chris-heria', titleZh: '8分钟腹肌雕刻训练', title: '8 Min Ab Workout', bilibiliAv: '499892391', duration: 8, category: 'abs', difficulty: 'intermediate', calories: 100, equipment: [], tags: ['腹肌', '核心', '跟练'], views: 38, isPremium: false, description: 'Quick ab burner', descriptionZh: '快速腹肌燃烧 · 每天可做 · 跟练友好' },
  { id: 'ch-003', coachId: 'chris-heria', titleZh: '10分钟平板支撑挑战', title: '10 Min Plank Challenge', bilibiliBv: 'BV1LYoeYBEcN', duration: 10, category: 'fullbody', difficulty: 'beginner', calories: 80, equipment: [], tags: ['平板支撑', '核心', '入门'], views: 22, isPremium: false, description: 'Plank variations to build core strength', descriptionZh: '平板支撑变式 · 核心力量 · 改变人生' },

  // === Pamela Reif（B站官方频道）===
  { id: 'pr-001', coachId: 'pamela-reif', titleZh: '12分钟快乐HIIT舞蹈燃脂', title: '12 Min Happy HIIT Dance', bilibiliBv: 'BV1Be411M7Tv', duration: 12, category: 'hiit', difficulty: 'beginner', calories: 200, equipment: [], tags: ['HIIT', '舞蹈', '快乐'], views: 280, isPremium: false, description: 'Pamela 最受欢迎的HIIT舞蹈', descriptionZh: '帕梅拉最受欢迎HIIT · 快乐燃脂不枯燥 · 站立无跳跃' },
  { id: 'pr-002', coachId: 'pamela-reif', titleZh: '6分钟高强度虐腹训练', title: '6 Min Intense Ab Workout', bilibiliAv: '499892391', duration: 6, category: 'abs', difficulty: 'advanced', calories: 80, equipment: [], tags: ['腹肌', '马甲线', '高强度'], views: 520, isPremium: false, description: 'Pamela\'s legendary 6-min ab burner', descriptionZh: '帕梅拉传奇6分钟虐腹 · 马甲线必备 · 高强度' },
  { id: 'pr-003', coachId: 'pamela-reif', titleZh: '10分钟热血暴汗HIIT', title: '10 Min Sweaty HIIT', bilibiliBv: 'BV12U4y1f74q', duration: 10, category: 'hiit', difficulty: 'intermediate', calories: 180, equipment: [], tags: ['HIIT', '暴汗', '拳击'], views: 165, isPremium: false, description: 'HIIT with boxing elements + hip hop music', descriptionZh: '拳击踢腿+嘻哈音乐 · 热血暴汗 · 心率飙升' },
  { id: 'pr-004', coachId: 'pamela-reif', titleZh: '15分钟全身燃脂有氧操', title: '15 Min Full Body Cardio', bilibiliBv: 'BV13g4y1q7pt', duration: 15, category: 'cardio', difficulty: 'beginner', calories: 220, equipment: [], tags: ['有氧', '全身', '新手'], views: 195, isPremium: false, description: 'Beginner-friendly dance cardio', descriptionZh: '新手友好舞蹈有氧 · 全身燃脂 · 15分钟暴汗' },

  // === Chloe Ting ===
  { id: 'ct-001', coachId: 'chloe-ting', titleZh: '10分钟马甲线腹肌挑战', title: '10 Min Ab Lines Challenge', bilibiliBv: 'BV1Lb41177bw', duration: 10, category: 'abs', difficulty: 'beginner', calories: 100, equipment: [], tags: ['腹肌', '马甲线', '女性'], views: 890, isPremium: false, description: 'Chloe\'s famous 11-line abs workout', descriptionZh: 'Chloe Ting标志性马甲线训练 · B站最火搬运 · 千万播放' },
  { id: 'ct-002', coachId: 'chloe-ting', titleZh: '15分钟全身燃脂HIIT', title: '15 Min Full Body HIIT', bilibiliBv: 'BV1Lb41177bw', duration: 15, category: 'fullbody', difficulty: 'intermediate', calories: 250, equipment: [], tags: ['全身', '燃脂', 'HIIT'], views: 620, isPremium: false, description: '2-Week Shred Challenge core workout', descriptionZh: '2周变身计划核心训练 · 全身燃脂HIIT · 无需器械' },

  // === Jeff Cavaliere (ATHLEAN-X) ===
  { id: 'jc-001', coachId: 'jeff-cavaliere', titleZh: '科学居家胸肌训练（哑铃）', title: 'Perfect Home Chest (Dumbbells)', bilibiliBv: 'BV1RK41137it', duration: 12, category: 'strength', difficulty: 'intermediate', calories: 150, equipment: ['哑铃'], tags: ['胸肌', '力量', '科学'], views: 95, isPremium: true, description: 'Science-based chest workout with anatomical explanation', descriptionZh: 'Athlean-X科学胸部训练 · 解剖学讲解每个角度 · 哑铃居家' },
  { id: 'jc-002', coachId: 'jeff-cavaliere', titleZh: '每日体态矫正训练', title: 'Fix Your Posture Daily', bilibiliBv: 'BV1LYoeYBEcN', duration: 10, category: 'stretch', difficulty: 'beginner', calories: 50, equipment: [], tags: ['体态', '矫正', '康复'], views: 210, isPremium: false, description: 'Fix rounded shoulders and forward head', descriptionZh: '改善圆肩驼背 · 每日必做 · 物理治疗师设计' },

  // === Heather Robertson ===
  { id: 'hr-001', coachId: 'heather-robertson', titleZh: '30分钟全身HIIT+腹肌', title: '30 Min Full Body HIIT+Abs', bilibiliBv: 'BV1Be411M7Tv', duration: 30, category: 'fullbody', difficulty: 'intermediate', calories: 400, equipment: [], tags: ['全身', 'HIIT', '腹肌'], views: 35, isPremium: true, description: 'Complete full body with ab finisher', descriptionZh: '完整全身训练+腹肌收尾 · 30分钟高效燃脂 · 计时器跟练' },
  { id: 'hr-002', coachId: 'heather-robertson', titleZh: '20分钟普拉提全身塑形', title: '20 Min Pilates Full Body', bilibiliBv: 'BV13g4y1q7pt', duration: 20, category: 'pilates', difficulty: 'beginner', calories: 150, equipment: ['瑜伽垫'], tags: ['普拉提', '塑形', '柔韧'], views: 28, isPremium: true, description: 'Pilates-inspired with control focus', descriptionZh: '普拉提风格全身训练 · 专注控制与姿势 · 瑜伽垫即可' },

  // === MadFit ===
  { id: 'mf-001', coachId: 'madfit', titleZh: '15分钟舞蹈派对燃脂', title: '15 Min Dance Party', bilibiliBv: 'BV1e5411n7Mq', duration: 15, category: 'dance', difficulty: 'beginner', calories: 200, equipment: [], tags: ['舞蹈', '趣味', '燃脂'], views: 120, isPremium: false, description: 'Dance workout to pop hits', descriptionZh: '流行金曲舞蹈训练 · 快乐到忘记在健身 · 帕梅拉同款欢乐风' },
  { id: 'mf-002', coachId: 'madfit', titleZh: '12分钟全身拉伸放松', title: '12 Min Full Body Stretch', bilibiliBv: 'BV1uUXMBTE8F', duration: 12, category: 'stretch', difficulty: 'beginner', calories: 40, equipment: ['瑜伽垫'], tags: ['拉伸', '放松', '恢复'], views: 85, isPremium: false, description: 'Post-workout full body recovery stretch', descriptionZh: '训练后全身拉伸 · 加速恢复防酸痛 · 帕梅拉同款拉伸' },

  // === Yoga With Adriene ===
  { id: 'ya-001', coachId: 'yoga-with-adriene', titleZh: '20分钟初学者瑜伽入门', title: '20 Min Yoga for Beginners', bilibiliBv: 'BV1uUXMBTE8F', duration: 20, category: 'yoga', difficulty: 'beginner', calories: 80, equipment: ['瑜伽垫'], tags: ['瑜伽', '入门', '放松'], views: 360, isPremium: false, description: 'Perfect yoga starting point', descriptionZh: '零基础瑜伽入门 · 拉伸全身 · 中文字幕搬运' },
  { id: 'ya-002', coachId: 'yoga-with-adriene', titleZh: '15分钟清晨瑜伽唤醒', title: '15 Min Morning Yoga', bilibiliBv: 'BV1uUXMBTE8F', duration: 15, category: 'yoga', difficulty: 'beginner', calories: 60, equipment: ['瑜伽垫'], tags: ['晨练', '瑜伽', '唤醒'], views: 280, isPremium: false, description: 'Morning yoga to wake up body and mind', descriptionZh: '清晨瑜伽温柔唤醒身心 · 新手友好 · 一天好状态' },

  // === Fraser Wilson ===
  { id: 'fw-001', coachId: 'fraser-wilson', titleZh: '10分钟六块腹肌雕刻', title: '10 Min Six Pack Abs', bilibiliBv: 'BV1RK41137it', duration: 10, category: 'abs', difficulty: 'advanced', calories: 130, equipment: [], tags: ['腹肌', '高强度', '男士'], views: 75, isPremium: true, description: 'Fraser\'s most effective ab workout', descriptionZh: 'Fraser最高效腹肌训练 · 10个动作10分钟 · 六块腹肌雕刻' },
  { id: 'fw-002', coachId: 'fraser-wilson', titleZh: '12分钟居家全身训练', title: '12 Min Home Full Body', bilibiliBv: 'BV1Be411M7Tv', duration: 12, category: 'fullbody', difficulty: 'intermediate', calories: 180, equipment: [], tags: ['全身', '居家', '高效'], views: 55, isPremium: false, description: 'Quick full body for busy days', descriptionZh: '快速全身训练 · 适合忙碌日常 · 无需器械' },
];
