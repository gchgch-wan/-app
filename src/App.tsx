import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppShell from './components/layout/AppShell';
import LoadingSpinner from './components/ui/LoadingSpinner';

const LandingPage = lazy(() => import('./components/dashboard/LandingPage'));
const DashboardPage = lazy(() => import('./components/dashboard/DashboardPage'));
const WorkoutPage = lazy(() => import('./components/workout/WorkoutPage'));
const WorkoutDetail = lazy(() => import('./components/workout/WorkoutDetail'));
const WorkoutActive = lazy(() => import('./components/workout/WorkoutActive'));
const AchievementsPage = lazy(() => import('./components/gamification/AchievementsPage'));
const LeaderboardPage = lazy(() => import('./components/gamification/LeaderboardPage'));
const ChallengesPage = lazy(() => import('./components/gamification/ChallengesPage'));
const CommunityPage = lazy(() => import('./components/social/CommunityPage'));

export default function App() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/workouts/:id/active" element={<WorkoutActive />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
