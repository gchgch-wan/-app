// ============================================================
// NebulaFit 视频库 — B站源为主（国内秒开）+ MP4备用
// ============================================================

export interface StandaloneVideo {
  id: string; title: string; titleZh: string;
  coach: string; coachZh: string; flag: string;
  category: VideoCat;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; calories: number;
  bilibiliBv: string;    // B站BV号 — 国内主源
  mp4_url: string;       // 海外备用
  poster?: string; equipment: string[]; tags: string[];
  isPremium: boolean; description: string; descriptionZh: string;
  startTime: number;
}

export type VideoCat = 'hiit'|'yoga'|'strength'|'cardio'|'dance'|'abs'|'fullbody'|'stretch'|'pilates';

const MP4 = 'https://www.w3schools.com/html/mov_bbb.mp4';

function V(bv:string, cat:VideoCat, diff:string, dur:number, cal:number, eq:string[], tags:string[], prem:boolean, t:number, coach:string, coachZh:string, flag:string, title:string, titleZh:string, desc:string, descZh:string): StandaloneVideo {
  return { id:'', title,titleZh,coach,coachZh,flag,category:cat,difficulty:diff as any,duration:dur,calories:cal,bilibiliBv:bv,mp4_url:MP4,equipment:eq,tags,isPremium:prem,description:desc,descriptionZh:descZh,startTime:t };
}

export const STANDALONE_VIDEOS: StandaloneVideo[] = [
  // ===== HIIT =====
  V('BV1Be411M7Tv','hiit','intermediate',12,200,[],['HIIT','燃脂','全身'],false,5, 'Pamela Reif','帕梅拉','🇩🇪', '12 Min Happy HIIT Dance','12分钟快乐HIIT舞蹈燃脂','Pamela best HIIT dance','帕梅拉最受欢迎HIIT · 站立无跳跃 · 快乐燃脂'),
  V('BV12U4y1f74q','hiit','advanced',10,180,[],['Tabata','爆发','有氧'],true,10, 'Pamela Reif','帕梅拉','🇩🇪', '10 Min Sweaty HIIT','10分钟热血暴汗HIIT','HIIT with boxing elements','拳击踢腿+嘻哈音乐 · 心率飙升'),
  V('BV13g4y1q7pt','hiit','beginner',15,220,[],['低冲击','新手','有氧'],false,20, 'Pamela Reif','帕梅拉','🇩🇪', '15 Min Cardio Fat Burn','15分钟全身燃脂有氧操','Beginner friendly','新手友好 · 15分钟暴汗'),

  // ===== 瑜伽 =====
  V('BV1uUXMBTE8F','yoga','beginner',15,60,['瑜伽垫'],['瑜伽','拉伸','放松'],false,30, 'Pamela Reif','帕梅拉','🇩🇪', 'Full Body Stretch','全身拉伸放松','Post-workout stretch','训练后全身拉伸 · 帕梅拉同款'),
  V('BV1LZ4y1z7ug','yoga','intermediate',15,80,['瑜伽垫'],['瑜伽','美背','塑形'],true,40, 'Pamela Reif','帕梅拉','🇩🇪', '15 Min Back Training','15分钟美背肌力训练','Build back strength','帕梅拉美背训练 · 改善体态'),

  // ===== 力量 =====
  V('BV1RK41137it','strength','intermediate',15,250,[],['力量','自重','全身'],true,50, 'Chris Heria','Chris Heria','🇺🇸', 'THENX Power Training','THENX疯狂力量训练','Chris Heria THENX','THENX经典 · 全身力量肌肉训练'),
  V('BV1LYoeYBEcN','strength','beginner',10,100,[],['平板支撑','核心','入门'],false,55, 'Chris Heria','Chris Heria','🇺🇸', 'Plank Challenge','平板支撑挑战','Core building','每天坚持平板支撑 · 改变人生'),
  V('BV1LZ4y1z7ug','strength','intermediate',20,220,['哑铃','弹力带'],['翘臀','美腿','塑形'],false,60, 'Pamela Reif','帕梅拉','🇩🇪', 'Back & Posture','美背体态训练','Posture fix','帕梅拉美背训练 · 改善驼背'),

  // ===== 有氧 =====
  V('BV1eK4y187GC','cardio','intermediate',15,300,[],['有氧','燃脂','夏日'],true,65, 'Pamela Reif','帕梅拉','🇩🇪', 'Summer Cardio Burn','15分钟夏日有氧操','Summer cardio','帕梅拉夏日有氧 · 燃脂暴汗'),
  V('BV1UGdrY3ETw','cardio','beginner',6,80,[],['腹肌','核心','暴汗'],false,70, 'Pamela Reif','帕梅拉','🇩🇪', '6 Min Ab Workout','6分钟腹肌崛起','Quick ab burner','帕梅拉腹肌训练 · 短时高效'),

  // ===== 腹肌 =====
  V('BV1Lb41177bw','abs','beginner',10,100,[],['腹肌','马甲线','女性'],false,75, 'Chloe Ting','Chloe Ting','🇦🇺', 'Ab Lines Challenge','马甲线腹肌挑战','10min ab lines','Chloe Ting经典 · B站千万播放'),
  V('BV499892391','abs','advanced',6,80,[],['腹肌','高强度','暴汗'],true,80, 'Pamela Reif','帕梅拉','🇩🇪', '6 Min Intense Abs','6分钟高强度虐腹','Intense ab burner','帕梅拉传奇虐腹 · 马甲线必备'),

  // ===== 全身 =====
  V('BV1Be411M7Tv','fullbody','intermediate',30,400,[],['全身','燃脂','综合'],true,85, 'Pamela Reif','帕梅拉','🇩🇪', 'Total Body HIIT','全身燃脂HIIT','Full body burn','帕梅拉全身HIIT · 覆盖所有肌群'),

  // ===== 拉伸 =====
  V('BV1uUXMBTE8F','stretch','beginner',15,50,['瑜伽垫'],['拉伸','恢复','放松'],false,90, 'Pamela Reif','帕梅拉','🇩🇪', 'Deep Stretch Recovery','深度拉伸恢复','Post workout','帕梅拉训练后拉伸 · 加速恢复'),
  V('BV1uUXMBTE8F','stretch','beginner',10,30,[],['晨练','关节','活动度'],false,95, 'Pamela Reif','帕梅拉','🇩🇪', 'Morning Mobility','晨间关节活动','Daily mobility','每日关节活动 · 保持健康'),

  // ===== 舞蹈 =====
  V('BV1e5411n7Mq','dance','beginner',12,200,[],['舞蹈','有氧','欢乐'],false,100, 'Pamela Reif','帕梅拉','🇩🇪', 'Fun Dance Cardio','欢乐有氧舞蹈','Fun dance cardio','帕梅拉趣味有氧 · 快乐燃脂'),

  // ===== 普拉提 =====
  V('BV1uUXMBTE8F','pilates','intermediate',20,160,['瑜伽垫'],['普拉提','核心','塑形'],true,105, 'Pamela Reif','帕梅拉','🇩🇪', 'Pilates Core Sculpt','普拉提核心塑形','Core sculpt','帕梅拉普拉提 · 核心塑形'),
];
