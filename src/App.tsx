import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Onboarding } from './components/Onboarding/Onboarding';
import { Dashboard } from './components/Dashboard/Dashboard';
import { WorkoutScreen } from './components/Workout/WorkoutScreen';
import { Progress } from './components/Progress/Progress';
import { Profile } from './components/Profile/Profile';
import { Settings } from './components/Settings/Settings';
import { useUser } from './hooks/useUser';
import { storageService } from './services/storageService';

function App() {
  const { user, isLoading, updateUser } = useUser();

  const handleOnboardingComplete = (newUser: any) => {
    storageService.saveUser(newUser);
    updateUser(newUser);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FitTracker Pro...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workout" element={<WorkoutScreen />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;