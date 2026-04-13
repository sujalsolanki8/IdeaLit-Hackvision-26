import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { ResultsPage } from './pages/ResultsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-primary-200">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/submit" element={<SubmissionPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
