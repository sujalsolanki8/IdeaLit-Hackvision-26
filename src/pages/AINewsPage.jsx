import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Newspaper, TrendingUp, Cpu, Rocket, Globe } from 'lucide-react';

const CATEGORIES = ['All', 'AI', 'SaaS', 'Startup', 'Tech'];

const NEWS = [
  { id: 1,  title: 'OpenAI Releases GPT-5 with Reasoning Superpowers',           description: 'The latest model shows unprecedented performance on complex multi-step reasoning tasks, outperforming all prior benchmarks by a significant margin.', category: 'AI',      time: '1 hour ago',  tag: 'trending' },
  { id: 2,  title: 'Y Combinator Opens Applications for Summer 2026 Batch',       description: 'The iconic accelerator is doubling down on AI-first startups and opening a new track specifically for solo technical founders building in frontier AI.', category: 'Startup', time: '3 hours ago', tag: 'hot' },
  { id: 3,  title: 'Notion AI Adds Real-Time Collaboration Features',             description: 'Notions latest update lets teams co-edit AI-generated documents simultaneously, bridging the gap between async writing and live brainstorming.', category: 'SaaS',    time: '5 hours ago', tag: null },
  { id: 4,  title: 'Google DeepMind Achieves Breakthrough in Protein Folding 2.0',description: 'Researchers announce a next-generation model that predicts protein interactions with near-perfect accuracy, opening doors for rapid drug discovery.', category: 'AI',      time: '6 hours ago', tag: 'new' },
  { id: 5,  title: 'How Indian Startups Are Winning the Global SaaS Race',        description: 'A new wave of B2B SaaS companies from Bengaluru and Hyderabad are capturing enterprise contracts in North America and Europe at record pace.', category: 'SaaS',    time: '8 hours ago', tag: null },
  { id: 6,  title: 'NVIDIA Unveils Blackwell Ultra GPU for Edge AI',              description: 'The new chip delivers 4x the inference throughput of its predecessor, making real-time AI viable on mobile and embedded devices for the first time.', category: 'Tech',    time: '10 hours ago',tag: 'trending' },
  { id: 7,  title: 'Anthropic Raises $3B at $60B Valuation',                      description: 'The Claude maker secures its largest funding round yet, with commitments from Amazon Web Services and several sovereign wealth funds.', category: 'AI',      time: '12 hours ago',tag: 'hot' },
  { id: 8,  title: 'Micro-SaaS Is Booming: 1-Person Companies Hitting $1M ARR',  description: 'A growing cohort of solo developers are building niche tools, reaching 7-figure revenue with teams of one using AI-assisted development.', category: 'Startup', time: '14 hours ago',tag: null },
  { id: 9,  title: 'Apple Intelligence Expands to 40 New Languages',              description: 'Apples on-device AI suite now supports a wide range of regional languages, with a particular focus on South and Southeast Asian markets.', category: 'Tech',    time: '1 day ago',   tag: 'new' },
  { id: 10, title: 'Mistral AI Open-Sources Its Fastest Inference Engine',         description: 'The French AI lab releases vLLM-compatible runtime under Apache 2.0, enabling sub-100ms responses on consumer-grade hardware.', category: 'AI',      time: '1 day ago',   tag: null },
  { id: 11, title: 'Linear Raises $35M to Reinvent Engineering Workflows',         description: 'The beloved project management tool for software teams closes a Series B focused on AI-powered sprint planning and automated issue triage.', category: 'SaaS',    time: '2 days ago',  tag: null },
  { id: 12, title: '5 Startup Ideas That VCs Are Actively Funding in Q2 2026',    description: 'From AI legal assistants to autonomous logistics, we break down the verticals attracting the most early-stage capital right now.', category: 'Startup', time: '2 days ago',  tag: 'trending' },
];

const CAT_COLOR = {
  AI:      'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700/50',
  SaaS:    'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50',
  Startup: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700/50',
  Tech:    'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700/50',
};

// Icons as a function so JSX runs inside React scope, not at module init
function CatIcon({ category }) {
  if (category === 'AI')      return <Cpu className="w-3 h-3" />;
  if (category === 'SaaS')    return <Globe className="w-3 h-3" />;
  if (category === 'Startup') return <Rocket className="w-3 h-3" />;
  if (category === 'Tech')    return <TrendingUp className="w-3 h-3" />;
  return null;
}

const TAG_COLOR = {
  trending: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  hot:      'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  new:      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
};

function NewsCard({ item, index }) {
  const catColor = CAT_COLOR[item.category] || CAT_COLOR.Tech;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${catColor}`}>
          <CatIcon category={item.category} />
          {item.category}
        </span>
        {item.tag && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TAG_COLOR[item.tag] || ''}`}>
            {item.tag}
          </span>
        )}
      </div>
      <h3 className="text-slate-900 dark:text-white font-semibold text-[15px] leading-snug mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {item.description}
      </p>
      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
        <Clock className="w-3.5 h-3.5" />
        {item.time}
      </div>
    </motion.article>
  );
}

export function AINewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return NEWS.filter(n => {
      const matchCat = activeCategory === 'All' || n.category === activeCategory;
      const q = query.toLowerCase();
      const matchQ = !q || n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [activeCategory, query]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050508]">
      {/* Header */}
      <section className="py-16 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700/50 text-violet-700 dark:text-violet-300 text-xs font-bold tracking-widest uppercase mb-5"
          >
            <Newspaper className="w-3.5 h-3.5" />
            Live Updates
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
          >
            AI &amp; Tech News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto"
          >
            Stay ahead with the latest in AI, SaaS, and startup ecosystems — curated daily.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl py-3 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 max-w-5xl py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400 dark:text-slate-500">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No articles match your search.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
