export interface Achievement {
  id: string;
  name: string;
  nameEn: string;
  nameJa: string;
  description: string;
  descriptionEn: string;
  descriptionJa: string;
  emoji: string;
  xpReward: number;
  category: 'milestone' | 'streak' | 'category' | 'special';
  condition: string;
  unlockedAt: string | null;
}

export interface Challenge {
  id: string;
  name: string;
  nameEn: string;
  nameJa: string;
  description: string;
  descriptionEn: string;
  descriptionJa: string;
  emoji: string;
  xpReward: number;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  progress: number;
  completed: boolean;
  expiresAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  avatar: string;
  isCurrentUser: boolean;
}
