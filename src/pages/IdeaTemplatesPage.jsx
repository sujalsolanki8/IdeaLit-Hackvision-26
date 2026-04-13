import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lightbulb, Copy, ArrowRight, Check, Layers } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'ai-saas',
    label: 'AI SaaS',
    color: 'from-violet-500 to-indigo-500',
    bgLight: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700/40',
    badgeColor: 'text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/30',
    title: 'AI-Powered Legal Document Summarizer',
    tagline: 'Make legalese readable for everyone.',
    description:
      'A SaaS tool that lets users upload contracts, NDAs, or legal documents and receive plain-English summaries, risk flags, and clause explanations powered by AI. Target users are freelancers, small businesses, and first-time founders who cannot afford lawyers for every document.',
    score: 89,
    tags: ['AI', 'LegalTech', 'SaaS', 'B2B'],
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/40',
    badgeColor: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30',
    title: 'Hyperlocal Skill-Exchange Platform',
    tagline: 'Trade skills, not money.',
    description:
      'A marketplace where users exchange skills — a graphic designer helps a developer with branding, who in turn helps the designer automate workflows. No cash involved. Uses a credit system. Target audience: students, freelancers, and creators in Tier-2 cities who want to grow their skillset without paying for courses.',
    score: 76,
    tags: ['Marketplace', 'Community', 'Gig Economy'],
  },
  {
    id: 'edtech-startup',
    label: 'EdTech Startup',
    color: 'from-primary-500 to-teal-500',
    bgLight: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700/40',
    badgeColor: 'text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30',
    title: 'Vernacular Language AI Tutor for Competitive Exams',
    tagline: 'Learn in your mother tongue. Crack any exam.',
    description:
      'An EdTech platform offering AI-powered tutoring for JEE, NEET, and UPSC in Hindi, Telugu, Tamil, and other regional languages. Uses voice interaction, adaptive difficulty, and weekly mock exams. Targets Tier-2 and Tier-3 students who are underserved by English-centric platforms.',
    score: 84,
    tags: ['EdTech', 'AI', 'Regional', 'India'],
  },
  {
    id: 'health-startup',
    label: 'Health Startup',
    color: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700/40',
    badgeColor: 'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30',
    title: 'AI Mental Health Check-In for Remote Teams',
    tagline: 'Prevent burnout before it happens.',
    description:
      'A B2B SaaS product for HR teams to monitor employee wellbeing via anonymous weekly check-ins. The AI aggregates mood trends, flags at-risk individuals, and sends manager nudges. Integrates with Slack and Microsoft Teams. Target customers: companies with 50–500 remote employees.',
    score: 81,
    tags: ['Health', 'B2B', 'HR Tech', 'Remote Work'],
  },
  {
    id: 'fintech',
    label: 'Fintech',
    color: 'from-emerald-500 to-green-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/40',
    badgeColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30',
    title: 'AI CFO Dashboard for Early-Stage Startups',
    tagline: 'Know your numbers before your investor asks.',
    description:
      'A financial intelligence tool that automatically pulls data from bank accounts, Razorpay, and Stripe to generate cashflow forecasts, runway alerts, and investor-ready metrics. Target users: pre-seed and seed-stage startups with 1–10 employees who lack a full-time CFO.',
    score: 86,
    tags: ['Fintech', 'SaaS', 'Startup', 'Analytics'],
  },
  {
    id: 'devtools',
    label: 'Developer Tool',
    color: 'from-slate-600 to-slate-800',
    bgLight: 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/40',
    badgeColor: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50',
    title: 'AI Code Review Bot for GitHub Pull Requests',
    tagline: 'Your always-on senior engineer.',
    description:
      'A GitHub App that automatically reviews pull requests with context-aware comments on code quality, security vulnerabilities, performance issues, and style consistency. Goes beyond linting — understands intent. Target audience: engineering teams of 3–50 developers shipping frequently.',
    score: 91,
    tags: ['DevTools', 'AI', 'GitHub', 'Open Source'],
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 text-xs font-medium transition-all"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function IdeaTemplatesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050508]">
      {/* Header */}
      <section className="py-20 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700/50 text-primary-700 dark:text-primary-300 text-xs font-bold tracking-widest uppercase mb-5"
          >
            <Layers className="w-3.5 h-3.5" />
            Ready-to-Use
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Idea Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-slate-500 dark:text-slate-400 text-lg"
          >
            Not sure where to start? Use a pre-built idea template, copy it into the validator, and see your score instantly.
          </motion.p>
        </div>
      </section>

      {/* Templates Grid */}
      <div className="container mx-auto px-4 max-w-5xl py-14">
        <div className="grid md:grid-cols-2 gap-7">
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${t.bgLight}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${t.badgeColor}`}>
                    {t.label}
                  </span>
                  <h3 className="text-slate-900 dark:text-white font-bold text-base leading-snug">{t.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 italic">{t.tagline}</p>
                </div>
                {/* Score badge */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {t.score}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{t.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {t.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-white/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link
                  to={`/submit?template=${t.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r text-white text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-90"
                  style={{ background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                >
                  <span className={`flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r ${t.color} text-white text-xs font-semibold w-full justify-center`}>
                    <Lightbulb className="w-3.5 h-3.5" />
                    Use This Template
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <CopyButton text={t.description} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">Or validate your own original idea</p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Start From Scratch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
