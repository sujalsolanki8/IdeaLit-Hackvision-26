import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenLine, ScanSearch, FileBarChart2, ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: <PenLine className="w-6 h-6" />,
    title: 'Describe Your Idea',
    description: 'Enter your startup concept in plain language. Include the problem you are solving, your target users, and how your solution works. The more detail, the richer your report.',
    color: 'from-violet-500 to-indigo-500',
    lightBg: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700/40',
    bullets: ['No technical jargon needed', 'Works for any stage of idea', 'Takes under 2 minutes'],
  },
  {
    number: '02',
    icon: <ScanSearch className="w-6 h-6" />,
    title: 'System Evaluates Your Concept',
    description: 'Our multi-factor evaluation engine scores your idea across five dimensions: Clarity, Market Signal, Problem-Solution Fit, Audience Match, and Feasibility.',
    color: 'from-primary-500 to-teal-500',
    lightBg: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700/40',
    bullets: ['5-factor scoring engine', 'Keyword & structure detection', 'Real-time evaluation'],
  },
  {
    number: '03',
    icon: <FileBarChart2 className="w-6 h-6" />,
    title: 'Get Your Structured Report',
    description: 'Receive a full breakdown with an overall score, tier label (Strong / Average / Weak), SWOT analysis, improvement roadmap, and actionable next steps.',
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/40',
    bullets: ['Full SWOT analysis', 'Improvement suggestions', 'Risk & opportunity map'],
  },
];

const WHY_CARDS = [
  { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: 'Instant Results', body: 'Get your full idea analysis in seconds — no waiting, no sign-up required.' },
  { icon: <Shield className="w-5 h-5 text-blue-500" />, title: 'Free Forever', body: 'Core validation is and will always be free. We believe every founder deserves feedback.' },
  { icon: <BarChart3 className="w-5 h-5 text-primary-500" />, title: 'Structured Scoring', body: 'Not vague advice — a precise numeric score across 5 meaningful dimensions.' },
  { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: 'Actionable Output', body: 'Every report ends with clear next steps so you know exactly what to do after reading.' },
];

export function HowItWorksPage() {
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
            <Zap className="w-3.5 h-3.5" />
            Simple Process
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            How IdeaLit Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-slate-500 dark:text-slate-400 text-lg"
          >
            From raw idea to structured report in three steps. No setup. No fluff.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 max-w-4xl py-20">
        <div className="flex flex-col gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Step icon / number */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                  {step.icon}
                </div>
                <span className="text-xs font-black text-slate-300 dark:text-slate-600 tracking-widest">{step.number}</span>
                {i < STEPS.length - 1 && (
                  <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-700" />
                )}
              </div>
              {/* Content */}
              <div className={`flex-1 border rounded-2xl p-6 ${step.lightBg}`}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why IdeaLit */}
      <section className="bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Why Choose IdeaLit?</h2>
            <p className="text-slate-500 dark:text-slate-400">Built for speed, clarity, and real founder utility.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center mb-4 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">{card.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to validate your idea?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">It takes 2 minutes. No account needed.</p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors shadow-sm text-sm"
          >
            Validate My Idea <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
