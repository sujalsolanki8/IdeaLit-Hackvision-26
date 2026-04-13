import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Crown, Lightbulb, Newspaper, HelpCircle, Layers, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

// ── Theme helpers ────────────────────────────────────────────────────────────
function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('idealit-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') { root.classList.add('dark'); } else { root.classList.remove('dark'); }
  localStorage.setItem('idealit-theme', theme);
}

// ── Sun / Moon animated toggle ───────────────────────────────────────────────
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative w-14 h-7 rounded-full border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isDark ? 'bg-slate-800 border-slate-600' : 'bg-amber-100 border-amber-300'
      }`}
    >
      <span className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'} bg-gradient-to-r from-indigo-900/50 to-purple-900/50`} />
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? 'translate-x-7 bg-slate-700 shadow-indigo-500/30' : 'translate-x-0 bg-white shadow-amber-300/60'
        }`}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-indigo-300"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-amber-500">
            <circle cx="12" cy="12" r="4" />
            {[0,45,90,135,180,225,270,315].map((deg, i) => {
              const r = 10, x1 = 12 + r * Math.cos(deg * Math.PI/180), y1 = 12 + r * Math.sin(deg * Math.PI/180);
              const x2 = 12 + (r+2) * Math.cos(deg * Math.PI/180), y2 = 12 + (r+2) * Math.sin(deg * Math.PI/180);
              return <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>;
            })}
          </svg>
        )}
      </span>
    </button>
  );
}

// ── Main nav items ────────────────────────────────────────────────────────────
const PRIMARY_LINKS = [
  { to: '/submit',    label: 'Validate',  icon: <LayoutDashboard size={15} /> },
  { to: '/explore',   label: 'Explore',   icon: <Lightbulb size={15} /> },
  { to: '/leaderboard', label: 'Leaderboard', icon: <Crown size={15} /> },
];

const MORE_LINKS = [
  { to: '/news',         label: 'AI News',      icon: <Newspaper size={15} /> },
  { to: '/how-it-works', label: 'How It Works', icon: <HelpCircle size={15} /> },
  { to: '/templates',    label: 'Templates',    icon: <Layers size={15} /> },
];

// ── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => { applyTheme(theme); }, [theme]);
  useEffect(() => { setMobileOpen(false); setMoreOpen(false); }, [location.pathname]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative group ${
      isActive(path)
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-[#050508]/85 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img src={logo} alt="IdeaLit logo" className="h-8 w-8 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">IdeaLit</span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide hidden sm:block">Validate first. Build smarter.</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {PRIMARY_LINKS.map(link => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.icon}
              {link.label}
              {/* Active underline */}
              {isActive(link.to) && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary-500" />}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(o => !o)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                MORE_LINKS.some(l => isActive(l.to))
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              More
              <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden z-50">
                {MORE_LINKS.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      isActive(link.to)
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#050508] py-3 px-4 flex flex-col gap-1">
          {[...PRIMARY_LINKS, ...MORE_LINKS].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
