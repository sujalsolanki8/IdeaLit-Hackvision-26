import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { ResultsPage } from './pages/ResultsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AINewsPage } from './pages/AINewsPage';
import { ExploreIdeasPage } from './pages/ExploreIdeasPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { IdeaTemplatesPage } from './pages/IdeaTemplatesPage';

/* ── Cursor-follow glow — lives at App root to escape all stacking contexts ── */
function CursorGlow() {
  const darkRef  = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      // Direct DOM write — zero lag, no lerp
      const t = `translate(-50%,-50%) translate(${e.clientX}px,${e.clientY}px)`;
      if (darkRef.current)  { darkRef.current.style.transform  = t; darkRef.current.style.opacity  = '1'; }
      if (lightRef.current) { lightRef.current.style.transform = t; lightRef.current.style.opacity = '1'; }
    };
    const onLeave = () => {
      if (darkRef.current)  darkRef.current.style.opacity  = '0';
      if (lightRef.current) lightRef.current.style.opacity = '0';
    };
    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const base = {
    position:     'fixed',
    top:          0,
    left:         0,
    width:        400,
    height:       400,
    borderRadius: '50%',
    filter:       'blur(100px)',
    opacity:      0,
    transition:   'opacity 0.4s ease',
    zIndex:       9999,          // above everything — pointer-events:none so no click blocking
    pointerEvents:'none',
    willChange:   'transform',
  };

  return (
    <>
      {/* Dark mode — soft white, strong enough to see */}
      <div
        ref={darkRef}
        aria-hidden="true"
        className="hidden dark:block"
        style={{
          ...base,
          background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 45%, transparent 70%)',
        }}
      />
      {/* Light mode — soft dark, strong enough to see */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="dark:hidden"
        style={{
          ...base,
          background: 'radial-gradient(circle, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.09) 45%, transparent 70%)',
        }}
      />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary-200 transition-colors duration-300">
      <CursorGlow />
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/"            element={<LandingPage />} />
          <Route path="/submit"      element={<SubmissionPage />} />
          <Route path="/results"     element={<ResultsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/news"        element={<AINewsPage />} />
          <Route path="/explore"     element={<ExploreIdeasPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/templates"   element={<IdeaTemplatesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

