export interface Coach {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  emoji: string;
  photo: string;
  credentials: string[];
  credentialsEn: string[];
  specialties: string[];
  specialtiesEn: string[];
  experience: number;
  students: number;
  rating: number;
  bio: string;
  bioEn: string;
  quote: string;
  quoteEn: string;
  socialLinks: { platform: string; url: string }[];
}

export const COACHES: Coach[] = [
  {
    id: 'zhang-wei',
    name: '张伟',
    nameEn: 'Wei Zhang',
    title: '首席健身教练',
    titleEn: 'Head Fitness Coach',
    emoji: '🏋️',
    photo: '',
    credentials: ['NSCA-CPT 认证', 'ACE-CPT 认证', '北京体育大学 运动科学硕士', '8年教学经验'],
    credentialsEn: ['NSCA-CPT Certified', 'ACE-CPT Certified', 'M.S. Sports Science', '8 Years Experience'],
    specialties: ['力量训练', '体型改造', '运动康复'],
    specialtiesEn: ['Strength Training', 'Body Transformation', 'Sports Rehab'],
    experience: 8,
    students: 8500,
    rating: 4.9,
    bio: '国家体育总局认证健身教练，曾为多位明星和企业家提供私人训练指导。擅长通过科学的渐进式负荷训练帮助学员实现体型改变。',
    bioEn: 'Nationally certified coach who has trained celebrities and entrepreneurs. Specializes in progressive overload training for body transformation.',
    quote: '没有速成魔法，只有科学方法和持续努力。',
    quoteEn: 'No quick fixes — just science and consistency.',
    socialLinks: [
      { platform: 'B站', url: '#' },
      { platform: '小红书', url: '#' },
      { platform: '抖音', url: '#' },
    ],
  },
  {
    id: 'lin-yue',
    name: '林悦',
    nameEn: 'Yue Lin',
    title: '瑜伽 & 柔韧教练',
    titleEn: 'Yoga & Flexibility Coach',
    emoji: '🧘',
    photo: '',
    credentials: ['RYT-500 认证瑜伽导师', '普拉提认证教练', '运动人体科学学士', '6年教学经验'],
    credentialsEn: ['RYT-500 Certified', 'Pilates Certified', 'B.S. Kinesiology', '6 Years Experience'],
    specialties: ['流瑜伽', '阴瑜伽', '产后修复', '体态矫正'],
    specialtiesEn: ['Vinyasa Flow', 'Yin Yoga', 'Postnatal Recovery', 'Posture Correction'],
    experience: 6,
    students: 6200,
    rating: 4.9,
    bio: '曾赴印度瑞诗凯诗深造瑜伽哲学，擅长将传统瑜伽与现代运动科学结合。帮助上千名学员通过瑜伽改善体态和缓解慢性疼痛。',
    bioEn: 'Studied yoga philosophy in Rishikesh, India. Combines traditional yoga with modern sports science to improve posture and relieve chronic pain.',
    quote: '瑜伽不只是体式，是身体与心灵的重新连接。',
    quoteEn: 'Yoga is not just poses — it\'s reconnecting body with mind.',
    socialLinks: [
      { platform: '小红书', url: '#' },
      { platform: 'B站', url: '#' },
    ],
  },
  {
    id: 'wang-chen',
    name: '王晨',
    nameEn: 'Chen Wang',
    title: 'HIIT & 体能教练',
    titleEn: 'HIIT & Conditioning Coach',
    emoji: '🔥',
    photo: '',
    credentials: ['NASM-CPT 认证', 'CrossFit Level 2 教练', '运动营养师', '5年教学经验'],
    credentialsEn: ['NASM-CPT Certified', 'CrossFit L2 Trainer', 'Sports Nutritionist', '5 Years Experience'],
    specialties: ['HIIT燃脂', '功能性训练', '运动营养', '马拉松训练'],
    specialtiesEn: ['HIIT Fat Burn', 'Functional Training', 'Sports Nutrition', 'Marathon Training'],
    experience: 5,
    students: 4800,
    rating: 4.8,
    bio: '前田径运动员转型体能教练，对HIIT和功能性训练有深入研究。相信"高效训练"理念——在最短时间内获得最大效果。',
    bioEn: 'Former track athlete turned conditioning coach. Deep expertise in HIIT and functional training. Believes in maximum results in minimum time.',
    quote: '20分钟的高效训练，胜过2小时的敷衍。',
    quoteEn: '20 minutes of focused training beats 2 hours of going through the motions.',
    socialLinks: [
      { platform: '抖音', url: '#' },
      { platform: 'B站', url: '#' },
    ],
  },
  {
    id: 'zhao-xue',
    name: '赵雪',
    nameEn: 'Xue Zhao',
    title: '舞蹈健身 & 营养教练',
    titleEn: 'Dance Fitness & Nutrition Coach',
    emoji: '💃',
    photo: '',
    credentials: ['AFAA 认证团操教练', 'Zumba 认证教练', '注册营养师', '4年教学经验'],
    credentialsEn: ['AFAA Group Fitness', 'Zumba Certified', 'Registered Dietitian', '4 Years Experience'],
    specialties: ['舞蹈健身', 'Zumba', '营养计划', '产后恢复'],
    specialtiesEn: ['Dance Fitness', 'Zumba', 'Meal Planning', 'Postnatal Recovery'],
    experience: 4,
    students: 3600,
    rating: 4.9,
    bio: '专业舞者出身，把舞蹈的快乐带入健身中。同时是注册营养师，能为学员提供"训练+饮食"一体化指导。',
    bioEn: 'Professional dancer bringing the joy of dance to fitness. Registered dietitian providing integrated training + nutrition guidance.',
    quote: '健身可以是一件快乐的事，你只需要找到属于自己的节奏。',
    quoteEn: 'Fitness can be joyful — you just need to find your rhythm.',
    socialLinks: [
      { platform: '小红书', url: '#' },
      { platform: '抖音', url: '#' },
    ],
  },
];
