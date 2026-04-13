import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lightbulb, LayoutDashboard, Crown } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary-600 text-white p-1.5 rounded-lg group-hover:bg-primary-700 transition-colors">
            <Lightbulb size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">IdeaForge</span>
        </Link>
        
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <Link 
            to="/submit" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              isActive('/submit') 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Validate Idea</span>
          </Link>
          <Link 
            to="/leaderboard" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              isActive('/leaderboard') 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Crown size={16} />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
