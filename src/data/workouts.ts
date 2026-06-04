import { Workout } from '../types/workout';

export const WORKOUTS: Workout[] = [
  {
    id: 'hiit-beginner', category: 'hiit',
    title: '21天高效燃脂计划', titleEn: '21-Day Fat Burn', titleJa: '21日間脂肪燃焼プラン',
    description: '零基础友好，无需器械，每天15分钟HIIT科学燃脂', descriptionEn: 'Beginner friendly HIIT, no equipment needed', descriptionJa: '初心者向けHIIT、器具不要',
    difficulty: 'beginner', durationMinutes: 15, caloriesBurn: 180, emoji: '🔥',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    exercises: [
      { id: 'e1', name: '开合跳', nameEn: 'Jumping Jacks', nameJa: 'ジャンピングジャック', duration: 45, restDuration: 15, description: '双脚开合，手臂上举下放', emoji: '⭐', sets: 3 },
      { id: 'e2', name: '高抬腿', nameEn: 'High Knees', nameJa: 'ハイニーズ', duration: 45, restDuration: 15, description: '原地快速抬腿至腰部高度', emoji: '🏃', sets: 3 },
      { id: 'e3', name: '深蹲跳', nameEn: 'Squat Jumps', nameJa: 'スクワットジャンプ', duration: 30, restDuration: 20, description: '深蹲姿势起跳', emoji: '🦵', sets: 3 },
      { id: 'e4', name: '波比跳', nameEn: 'Burpees', nameJa: 'バーピー', duration: 30, restDuration: 30, description: '完整波比跳动作', emoji: '💪', sets: 3 },
      { id: 'e5', name: '平板支撑', nameEn: 'Plank', nameJa: 'プランク', duration: 60, restDuration: 15, description: '保持平板支撑姿势', emoji: '🧘', sets: 2 },
    ],
    equipment: ['瑜伽垫'], tags: ['燃脂', '入门', '无器械']
  },
  {
    id: 'yoga-flow', category: 'yoga',
    title: '柔韧核心瑜伽课', titleEn: 'Flexibility & Core Yoga', titleJa: '柔軟コアヨガ',
    description: '改善体态、缓解久坐腰背痛，适合上班族', descriptionEn: 'Improve posture, relieve back pain', descriptionJa: '姿勢改善、腰痛緩和',
    difficulty: 'beginner', durationMinutes: 20, caloriesBurn: 120, emoji: '🧘',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    exercises: [
      { id: 'y1', name: '猫牛式', nameEn: 'Cat-Cow', nameJa: 'キャットカウ', duration: 60, restDuration: 10, description: '脊柱波浪运动', emoji: '🐱', sets: 3 },
      { id: 'y2', name: '下犬式', nameEn: 'Downward Dog', nameJa: 'ダウンドッグ', duration: 45, restDuration: 15, description: '倒V字姿势', emoji: '🐕', sets: 3 },
      { id: 'y3', name: '战士二式', nameEn: 'Warrior II', nameJa: '戦士のポーズII', duration: 30, restDuration: 15, description: '弓步站立，双臂展开', emoji: '⚔️', sets: 2 },
      { id: 'y4', name: '婴儿式', nameEn: 'Child Pose', nameJa: '子供のポーズ', duration: 60, restDuration: 10, description: '跪姿前屈放松', emoji: '👶', sets: 2 },
    ],
    equipment: ['瑜伽垫'], tags: ['瑜伽', '柔韧', '放松']
  },
  {
    id: 'strength-home', category: 'strength',
    title: '家庭哑铃增肌训练', titleEn: 'Home Dumbbell Strength', titleJa: '自宅ダンベル筋トレ',
    description: '只需一对哑铃，系统训练全身肌群', descriptionEn: 'Full body strength with dumbbells', descriptionJa: 'ダンベルで全身筋トレ',
    difficulty: 'intermediate', durationMinutes: 25, caloriesBurn: 250, emoji: '🏋️',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop',
    exercises: [
      { id: 's1', name: '哑铃深蹲', nameEn: 'Goblet Squat', nameJa: 'ゴブレットスクワット', duration: 45, restDuration: 15, description: '持哑铃蹲至大腿平行', emoji: '🦵', sets: 4, reps: 12 },
      { id: 's2', name: '哑铃划船', nameEn: 'Dumbbell Row', nameJa: 'ダンベルロウ', duration: 45, restDuration: 15, description: '单臂哑铃划船', emoji: '🚣', sets: 3, reps: 10 },
      { id: 's3', name: '哑铃推举', nameEn: 'Shoulder Press', nameJa: 'ショルダープレス', duration: 45, restDuration: 15, description: '坐姿哑铃肩推', emoji: '🏋️', sets: 3, reps: 10 },
      { id: 's4', name: '哑铃弯举', nameEn: 'Bicep Curl', nameJa: 'バイセップカール', duration: 30, restDuration: 15, description: '哑铃二头弯举', emoji: '💪', sets: 3, reps: 12 },
    ],
    equipment: ['哑铃', '瑜伽垫'], tags: ['增肌', '力量', '哑铃']
  },
  {
    id: 'cardio-dance', category: 'dance',
    title: '动感燃脂舞蹈', titleEn: 'Dance Cardio Party', titleJa: 'ダンスカーディオ',
    description: '跟着音乐节奏燃脂，快乐暴汗', descriptionEn: 'Burn fat with rhythm, fun and sweaty', descriptionJa: '音楽に合わせて楽しく脂肪燃焼',
    difficulty: 'beginner', durationMinutes: 20, caloriesBurn: 220, emoji: '💃',
    imageUrl: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&h=400&fit=crop',
    exercises: [
      { id: 'd1', name: '侧步点地', nameEn: 'Side Step Tap', nameJa: 'サイドステップタップ', duration: 60, restDuration: 10, description: '左右侧步配合手臂摆动', emoji: '🕺', sets: 3 },
      { id: 'd2', name: '扭胯舞步', nameEn: 'Hip Twist', nameJa: 'ヒップツイスト', duration: 45, restDuration: 15, description: '髋部扭动配合步伐', emoji: '💃', sets: 3 },
      { id: 'd3', name: '拳击步', nameEn: 'Boxing Shuffle', nameJa: 'ボクシングステップ', duration: 45, restDuration: 15, description: '拳击基础步法+出拳', emoji: '🥊', sets: 3 },
      { id: 'd4', name: 'Zumba组合', nameEn: 'Zumba Combo', nameJa: 'ズンバコンボ', duration: 60, restDuration: 10, description: '自由舞步组合', emoji: '🎵', sets: 2 },
    ],
    equipment: [], tags: ['舞蹈', '燃脂', '趣味']
  },
  {
    id: 'hiit-advanced', category: 'hiit',
    title: '极限燃脂挑战', titleEn: 'Extreme Fat Burn', titleJa: '極限脂肪燃焼チャレンジ',
    description: '高强度间歇训练，20分钟狂燃400卡', descriptionEn: 'Advanced HIIT, torch 400 calories', descriptionJa: '上級HIIT、400kcal燃焼',
    difficulty: 'advanced', durationMinutes: 20, caloriesBurn: 400, emoji: '💀',
    imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=400&fit=crop',
    exercises: [
      { id: 'h1', name: '波比跳+俯卧撑', nameEn: 'Burpee Pushup', nameJa: 'バーピープッシュアップ', duration: 30, restDuration: 15, description: '波比跳加入俯卧撑', emoji: '💀', sets: 5 },
      { id: 'h2', name: '登山者', nameEn: 'Mountain Climbers', nameJa: 'マウンテンクライマー', duration: 45, restDuration: 10, description: '快速交替提膝', emoji: '⛰️', sets: 4 },
      { id: 'h3', name: '跳箱', nameEn: 'Box Jumps', nameJa: 'ボックスジャンプ', duration: 30, restDuration: 20, description: '全力纵跳', emoji: '📦', sets: 4 },
      { id: 'h4', name: '战绳', nameEn: 'Battle Ropes', nameJa: 'バトルロープ', duration: 30, restDuration: 15, description: '交替甩绳', emoji: '〰️', sets: 4 },
    ],
    equipment: ['瑜伽垫', '跳箱(可选)'], tags: ['高强度', '燃脂', '挑战']
  },
  {
    id: 'stretch-recovery', category: 'stretch',
    title: '深度放松拉伸', titleEn: 'Deep Recovery Stretch', titleJa: '深層リカバリーストレッチ',
    description: '训练后必备，缓解肌肉酸痛', descriptionEn: 'Post-workout essential for recovery', descriptionJa: 'トレーニング後の必須リカバリー',
    difficulty: 'beginner', durationMinutes: 10, caloriesBurn: 50, emoji: '😌',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop',
    exercises: [
      { id: 'r1', name: '腿后侧拉伸', nameEn: 'Hamstring Stretch', nameJa: 'ハムストリングストレッチ', duration: 60, restDuration: 5, description: '坐姿前屈拉伸', emoji: '🦵', sets: 2 },
      { id: 'r2', name: '髋屈肌拉伸', nameEn: 'Hip Flexor Stretch', nameJa: '股関節ストレッチ', duration: 45, restDuration: 10, description: '弓步髋部拉伸', emoji: '🏹', sets: 2 },
      { id: 'r3', name: '肩颈放松', nameEn: 'Shoulder Release', nameJa: '肩首リラックス', duration: 60, restDuration: 5, description: '肩颈环绕放松', emoji: '🤲', sets: 2 },
      { id: 'r4', name: '脊柱扭转', nameEn: 'Spinal Twist', nameJa: '脊柱ツイスト', duration: 45, restDuration: 10, description: '仰卧脊柱扭转', emoji: '🌀', sets: 2 },
    ],
    equipment: ['瑜伽垫'], tags: ['拉伸', '恢复', '放松']
  },
];
