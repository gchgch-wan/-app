import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhCommon from './locales/zh-CN/common.json';
import zhHome from './locales/zh-CN/home.json';
import zhWorkout from './locales/zh-CN/workout.json';
import zhGamification from './locales/zh-CN/gamification.json';
import zhAi from './locales/zh-CN/ai.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enWorkout from './locales/en/workout.json';
import enGamification from './locales/en/gamification.json';
import enAi from './locales/en/ai.json';

import jaCommon from './locales/ja/common.json';
import jaHome from './locales/ja/home.json';
import jaWorkout from './locales/ja/workout.json';
import jaGamification from './locales/ja/gamification.json';
import jaAi from './locales/ja/ai.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': { common: zhCommon, home: zhHome, workout: zhWorkout, gamification: zhGamification, ai: zhAi },
      en: { common: enCommon, home: enHome, workout: enWorkout, gamification: enGamification, ai: enAi },
      ja: { common: jaCommon, home: jaHome, workout: jaWorkout, gamification: jaGamification, ai: jaAi },
    },
    fallbackLng: 'zh-CN',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
