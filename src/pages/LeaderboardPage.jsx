import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import { Modal } from '../components/Modal';
import { Flame, Star, ChevronUp, Trophy, ArrowRight, CheckCircle2, AlertTriangle, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_IDEAS = [
  { 
    id: 1, 
    title: 'AI-Powered Contract Analysis for Freelancers', 
    description: 'An AI tool that scans freelance contracts and automatically flags unfair clauses, IP assignment issues, and payment terms, suggesting better alternatives before signing.',
    score: 92, 
    market_score: 89,
    innovation_score: 95,
    upvotes: 342, 
    tags: ['LegalTech', 'AI'],
    target_audience: 'Freelance designers, developers, and writers.',
    strengths: ['High utility value', 'Solves a very painful problem', 'Clear ROI'],
    risks: ['Legal liability if AI makes a mistake', 'High cost of specialized legal models']
  },
  { 
    id: 2, 
    title: 'Gamified Habit Tracker for ADHD', 
    description: 'A mobile app that uses RPG mechanics and body doubling (via AI avatars) to help adults with ADHD build and maintain daily routines without getting bored.',
    score: 88, 
    market_score: 90,
    innovation_score: 85,
    upvotes: 890, 
    tags: ['HealthTech', 'Mobile'],
    target_audience: 'Adults with ADHD or executive dysfunction.',
    strengths: ['Highly engaged target audience', 'Viral growth potential via communities'],
    risks: ['High churn rate after novelty wears off', 'Crowded habit tracking market']
  },
  { 
    id: 3, 
    title: 'Micro-SaaS for Podcast Show Notes Generation', 
    description: 'Upload podcast audio, and it automatically generates timestamped show notes, tweet threads, LinkedIn posts, and an SEO-optimized blog post.',
    score: 85, 
    market_score: 81,
    innovation_score: 74,
    upvotes: 215, 
    tags: ['Creator Economy'],
    target_audience: 'Podcast hosts and media agencies.',
    strengths: ['Easy to build', 'Clear monetization plan', 'Saves hours of manual work'],
    risks: ['A feature, not a product', 'Easily copied by competitors']
  },
  { 
    id: 4, 
    title: 'Local Community Equipment Sharing Marketplace', 
    description: 'A peer-to-peer rental marketplace where neighbors can rent out power tools, lawnmowers, and specialized equipment to each other securely.',
    score: 76, 
    market_score: 70,
    innovation_score: 65,
    upvotes: 56, 
    tags: ['Marketplace', 'Local'],
    target_audience: 'Homeowners and DIY enthusiasts.',
    strengths: ['Eco-friendly', 'Community building'],
    risks: ['Hard to bootstrap both supply and demand', 'Insurance and liability issues']
  },
];

export function LeaderboardPage() {
  const [sortBy, setSortBy] = useState('trending'); // 'trending' | 'top'
  const [selectedIdea, setSelectedIdea] = useState(null);

  const sortedIdeas = [...MOCK_IDEAS].sort((a, b) => {
    if (sortBy === 'top') return b.score - a.score;
    return b.upvotes - a.upvotes;
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-500" /> Leaderboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Discover and upvote the top validated ideas from the community.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start md:self-auto border border-slate-200 dark:border-slate-700 shadow-inner"
        >
          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              sortBy === 'trending' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Flame className={`w-4 h-4 ${sortBy === 'trending' ? 'text-orange-500' : ''}`} /> Trending
          </button>
          <button
            onClick={() => setSortBy('top')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              sortBy === 'top' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Star className={`w-4 h-4 ${sortBy === 'top' ? 'text-yellow-500' : ''}`} /> Top Rated
          </button>
        </motion.div>
      </div>

      <div className="space-y-4">
        {sortedIdeas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card 
              className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-slate-200/60 hover:border-primary-300 transform hover:-translate-y-1"
              onClick={() => setSelectedIdea(idea)}
            >
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 relative">
                <div className="absolute top-4 right-4 sm:hidden">
                  <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                </div>

                <div className="hidden sm:flex flex-shrink-0 text-3xl font-extrabold text-slate-200 dark:text-slate-700 w-10 justify-center">
                  #{index + 1}
                </div>
                
                <div className="flex-grow min-w-0 pr-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">{idea.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{idea.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {idea.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 text-slate-600 dark:text-slate-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-xs rounded-md font-semibold transition-colors border border-slate-200/50 dark:border-slate-600/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 flex-shrink-0 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mb-1">Score</div>
                    <div className={`text-2xl font-bold ${idea.score >= 90 ? 'text-emerald-500' : idea.score >= 80 ? 'text-amber-500' : 'text-slate-700'}`}>
                      {idea.score}
                    </div>
                  </div>
                  
                  <button 
                    className="flex flex-col items-center p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-colors z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ChevronUp className="w-6 h-6 text-slate-400 hover:text-primary-500 transition-colors" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{idea.upvotes}</span>
                  </button>
                  
                  <div className="hidden sm:flex text-slate-300 group-hover:text-primary-400 transition-colors group-hover:translate-x-1 duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedIdea} 
        onClose={() => setSelectedIdea(null)} 
        title={<span className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500"/> Idea Details</span>}
      >
        {selectedIdea && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedIdea.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedIdea.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                {selectedIdea.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">Feasibility</div>
                <div className={`text-2xl font-bold ${selectedIdea.score >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{selectedIdea.score}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">Market</div>
                <div className="text-2xl font-bold text-blue-500">{selectedIdea.market_score}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">Innovation</div>
                <div className="text-2xl font-bold text-purple-500">{selectedIdea.innovation_score}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm uppercase tracking-wide">
                  <Target className="w-4 h-4 text-blue-500" /> Target Audience
                </h4>
                <p className="text-slate-600 dark:text-slate-400 pl-6">{selectedIdea.target_audience}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                  <h4 className="flex items-center gap-2 font-semibold text-emerald-800 mb-3 text-sm uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {selectedIdea.strengths.map((str, i) => (
                      <li key={i} className="text-sm text-emerald-900 pl-6 relative before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-400 before:rounded-full">{str}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-4">
                  <h4 className="flex items-center gap-2 font-semibold text-red-800 mb-3 text-sm uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> Core Risks
                  </h4>
                  <ul className="space-y-2">
                    {selectedIdea.risks.map((risk, i) => (
                      <li key={i} className="text-sm text-red-900 pl-6 relative before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-red-400 before:rounded-full">{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
