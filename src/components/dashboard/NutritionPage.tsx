import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

interface MealPlan {
  id: string;
  type: 'loss' | 'gain' | 'maintain';
  title: string;
  titleEn: string;
  emoji: string;
  calories: number;
  meals: { time: string; timeEn: string; food: string; foodEn: string; emoji: string }[];
}

const MEAL_PLANS: MealPlan[] = [
  {
    id: 'fat-loss',
    type: 'loss',
    title: '减脂燃脂餐单',
    titleEn: 'Fat Loss Meal Plan',
    emoji: '🔥',
    calories: 1600,
    meals: [
      { time: '07:30 早餐', timeEn: '07:30 Breakfast', food: '燕麦粥+水煮蛋2个+小番茄', foodEn: 'Oatmeal + 2 boiled eggs + cherry tomatoes', emoji: '🥣' },
      { time: '10:30 加餐', timeEn: '10:30 Snack', food: '希腊酸奶+蓝莓', foodEn: 'Greek yogurt + blueberries', emoji: '🫐' },
      { time: '12:30 午餐', timeEn: '12:30 Lunch', food: '鸡胸肉150g+糙米饭+西兰花', foodEn: '150g chicken breast + brown rice + broccoli', emoji: '🍗' },
      { time: '15:30 加餐', timeEn: '15:30 Snack', food: '蛋白粉奶昔+香蕉半根', foodEn: 'Protein shake + half banana', emoji: '🥤' },
      { time: '18:30 晚餐', timeEn: '18:30 Dinner', food: '三文鱼120g+藜麦沙拉', foodEn: '120g salmon + quinoa salad', emoji: '🐟' },
      { time: '20:30 宵夜', timeEn: '20:30 Light', food: '无糖豆浆200ml', foodEn: '200ml unsweetened soy milk', emoji: '🥛' },
    ],
  },
  {
    id: 'muscle-gain',
    type: 'gain',
    title: '增肌塑形餐单',
    titleEn: 'Muscle Gain Meal Plan',
    emoji: '💪',
    calories: 2500,
    meals: [
      { time: '07:00 早餐', timeEn: '07:00 Breakfast', food: '全麦面包3片+花生酱+香蕉+牛奶', foodEn: '3 whole wheat toast + peanut butter + banana + milk', emoji: '🍞' },
      { time: '10:00 加餐', timeEn: '10:00 Snack', food: '坚果混合+鸡胸肉条100g', foodEn: 'Mixed nuts + 100g chicken strips', emoji: '🥜' },
      { time: '12:30 午餐', timeEn: '12:30 Lunch', food: '牛肉150g+红薯+混合蔬菜', foodEn: '150g beef + sweet potato + mixed vegetables', emoji: '🥩' },
      { time: '15:30 练前', timeEn: '15:30 Pre-workout', food: '全麦面包2片+蜂蜜', foodEn: '2 whole wheat toast + honey', emoji: '🍯' },
      { time: '17:30 练后', timeEn: '17:30 Post-workout', food: '蛋白粉2勺+葡萄糖', foodEn: '2 scoops protein + dextrose', emoji: '🥤' },
      { time: '19:00 晚餐', timeEn: '19:00 Dinner', food: '鸡腿肉200g+意大利面+菠菜', foodEn: '200g chicken thigh + pasta + spinach', emoji: '🍝' },
      { time: '22:00 宵夜', timeEn: '22:00 Night', food: '酪蛋白奶昔+杏仁', foodEn: 'Casein shake + almonds', emoji: '🥛' },
    ],
  },
  {
    id: 'maintain',
    type: 'maintain',
    title: '健康维持餐单',
    titleEn: 'Maintenance Meal Plan',
    emoji: '🥗',
    calories: 2000,
    meals: [
      { time: '08:00 早餐', timeEn: '08:00 Breakfast', food: '全谷物麦片+牛奶+水果拼盘', foodEn: 'Whole grain cereal + milk + fruit platter', emoji: '🥣' },
      { time: '12:00 午餐', timeEn: '12:00 Lunch', food: '杂粮饭+清蒸鱼+时蔬', foodEn: 'Mixed grain rice + steamed fish + seasonal veg', emoji: '🐟' },
      { time: '15:00 加餐', timeEn: '15:00 Snack', food: '水果+坚果+酸奶', foodEn: 'Fruits + nuts + yogurt', emoji: '🍎' },
      { time: '18:30 晚餐', timeEn: '18:30 Dinner', food: '豆腐煲+杂粮馒头+凉拌黄瓜', foodEn: 'Tofu stew + whole grain bun + cucumber salad', emoji: '🥒' },
    ],
  },
];

export default function NutritionPage() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-CN';
  const [activeTab, setActiveTab] = useState<'loss' | 'gain' | 'maintain'>('loss');

  const activePlan = MEAL_PLANS.find((p) => p.type === activeTab)!;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">🍽️ {isZh ? '营养饮食计划' : 'Nutrition Plans'}</h1>
      <p className="text-gray-400 mb-8">
        {isZh ? '科学的饮食是健身成功的关键，选择适合你目标的餐单' : 'Nutrition is key to fitness success. Choose a plan for your goals'}
      </p>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-8">
        {MEAL_PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setActiveTab(plan.type)}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              activeTab === plan.type
                ? 'bg-[#6c5ce7] text-white shadow-neon-purple'
                : 'bg-[#0d0d26] text-gray-400 border border-[#1a1a3e] hover:border-[#00f0ff]/30'
            }`}
          >
            <span className="text-2xl block mb-1">{plan.emoji}</span>
            <span className="text-sm">{isZh ? plan.title : plan.titleEn}</span>
            <span className="block text-xs opacity-70 mt-0.5">{plan.calories} kcal</span>
          </button>
        ))}
      </div>

      {/* Meal Timeline */}
      <div className="space-y-4">
        {activePlan.meals.map((meal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card hover className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1a1a3e] flex items-center justify-center text-2xl flex-shrink-0">
                {meal.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#00f0ff] font-medium">
                  {isZh ? meal.time : meal.timeEn}
                </p>
                <p className="text-gray-300 text-sm truncate">
                  {isZh ? meal.food : meal.foodEn}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-[#1a1a3e] flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                {i + 1}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Nutrition Tips */}
      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold mb-2">💧 {isZh ? '饮水建议' : 'Hydration'}</h3>
          <p className="text-gray-400 text-sm">
            {isZh ? '每天至少饮用 2-3L 水，训练期间每15分钟补充150-300ml' : 'Drink 2-3L water daily, 150-300ml every 15min during training'}
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2">💤 {isZh ? '恢复与睡眠' : 'Recovery'}</h3>
          <p className="text-gray-400 text-sm">
            {isZh ? '保证7-8小时睡眠，睡前1小时避免蓝光，可以进行10分钟冥想' : 'Get 7-8h sleep, avoid blue light 1h before bed, try 10min meditation'}
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2">🥩 {isZh ? '蛋白质摄入' : 'Protein Intake'}</h3>
          <p className="text-gray-400 text-sm">
            {isZh ? '每公斤体重摄入1.6-2.2g蛋白质，均匀分配在各餐中' : '1.6-2.2g protein per kg bodyweight, distributed across meals'}
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2">⏰ {isZh ? '进食时机' : 'Meal Timing'}</h3>
          <p className="text-gray-400 text-sm">
            {isZh ? '训练前2小时吃碳水+蛋白质，训练后30分钟内补充快碳+蛋白质' : 'Carbs + protein 2h pre-workout, fast carbs + protein within 30min post-workout'}
          </p>
        </Card>
      </div>
    </div>
  );
}
