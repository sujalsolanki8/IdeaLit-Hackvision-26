import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import {
  ArrowRight, Zap, Target, BarChart3, TrendingUp,
  Users, GraduationCap, Rocket, Trophy,
  CheckCircle2, Lightbulb, ShieldCheck, Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_TEXT = 'Lit up your Ideas with IdeaLit!';
const CHAR_DELAY = 65;

// ── Typing heading ─────────────────────────────────────────────────────────
function TypingHeading() {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        idx.current += 1;
        setDisplayed(HERO_TEXT.slice(0, idx.current));
        if (idx.current >= HERO_TEXT.length) { clearInterval(iv); setDone(true); }
      }, CHAR_DELAY);
      return () => clearInterval(iv);
    }, 300);
    return () => clearTimeout(start);
  }, []);

  const litStart = displayed.lastIndexOf('IdeaLit');
  const before = litStart === -1 ? displayed : displayed.slice(0, litStart);
  const after  = litStart === -1 ? ''        : displayed.slice(litStart);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 max-w-4xl mx-auto"
    >
      {before}
      {after && <span className="text-gradient-primary">{after}</span>}
      <span
        className="inline-block align-middle rounded-sm ml-[3px]"
        style={{ width: 3, height: '0.82em', background: 'currentColor', opacity: 1,
          animation: done ? 'idealit-blink 1.1s step-end infinite' : 'none' }}
      />
    </motion.h1>
  );
}

// ── Particles ──────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 15 }, (_, i) => {
  const seed = (i * 137.508) % 100;
  return {
    id:       i,
    left:     `${((seed * 9.3 + i * 6.7) % 100).toFixed(2)}%`,
    size:     2 + (i % 3),
    opacity:  (0.10 + (i % 4) * 0.025).toFixed(3),
    duration: `${18 + (i % 7) * 3}s`,
    delay:    `${-(i * 2.1).toFixed(1)}s`,
    drift:    `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 12)}px`,
    blur:     i % 4 === 0 ? '1px' : '0px',
  };
});

function Particles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-black dark:bg-white"
          style={{
            left: p.left, top: '-8px', width: p.size, height: p.size,
            opacity: p.opacity,
            filter: p.blur !== '0px' ? `blur(${p.blur})` : undefined,
            animationName: 'particle-fall', animationDuration: p.duration,
            animationDelay: p.delay, animationTimingFunction: 'linear',
            animationIterationCount: 'infinite', '--drift': p.drift,
          }}
        />
      ))}
    </div>
  );
}

// ── Star helper ────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} className={`w-4 h-4 flex-shrink-0 ${s < count ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`}
          fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: 'AI-Powered Scoring', description: 'Get an instant feasibility score based on market trends and technical complexity.' },
  { icon: <Target className="w-6 h-6 text-rose-500" />, title: 'Audience Profiling', description: 'Identify your ideal customers and understand their unfulfilled needs.' },
  { icon: <BarChart3 className="w-6 h-6 text-primary-500" />, title: 'Predictive SWOT', description: 'Automatically generate Strengths, Weaknesses, Opportunities, and Threats.' },
  { icon: <TrendingUp className="w-6 h-6 text-blue-500" />, title: 'Market Demand', description: 'Analyze current market signals to predict adoption and growth potential.' },
];

const WHY_CARDS = [
  { icon: <Clock className="w-5 h-5 text-violet-500" />, title: 'Instant Results', body: 'Full analysis in seconds. No waiting, no account needed to get started.' },
  { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, title: 'Always Free', body: 'Core validation is free forever. We believe every founder deserves honest feedback.' },
  { icon: <CheckCircle2 className="w-5 h-5 text-primary-500" />, title: 'Actionable', body: 'Every report ends with clear next steps so you know exactly what to improve.' },
  { icon: <Lightbulb className="w-5 h-5 text-amber-500" />, title: 'Multi-Factor', body: 'Scored across 5 dimensions: Clarity, Market, Audience, Feasibility, and Innovation.' },
];

const USE_CASES = [
  {
    icon: <GraduationCap className="w-7 h-7 text-indigo-500" />,
    label: 'Students',
    title: 'Build the Right Capstone',
    body: 'Validate your project concept before investing weeks of work. Impress professors with data-backed decisions.',
    color: 'from-indigo-500/10 to-indigo-500/5 border-indigo-200 dark:border-indigo-700/40',
  },
  {
    icon: <Rocket className="w-7 h-7 text-rose-500" />,
    label: 'Founders',
    title: 'Kill Bad Ideas Fast',
    body: 'Test assumptions before spending money or months building. Know your SWOT before your first investor meeting.',
    color: 'from-rose-500/10 to-rose-500/5 border-rose-200 dark:border-rose-700/40',
  },
  {
    icon: <Trophy className="w-7 h-7 text-amber-500" />,
    label: 'Hackathons',
    title: 'Win With a Validated Idea',
    body: 'Pick the strongest concept from your team brainstorm in minutes. Present with confidence backed by structured analysis.',
    color: 'from-amber-500/10 to-amber-500/5 border-amber-200 dark:border-amber-700/40',
  },
];

const TESTIMONIALS = [
  { name: 'Aman Sharma', role: 'Student Founder', review: 'IdeaLit helped me catch critical flaws before I wasted months building. The SWOT breakdown was genuinely eye-opening and saved two sprints of work.', stars: 5 },
  { name: 'Priya Nair', role: 'Product Manager · Series A Startup', review: 'The instant report gave our team a shared language for risk. We used it in sprint planning and aligned on priorities in one meeting instead of three.', stars: 5 },
  { name: 'Rohan Mehta', role: 'Indie Hacker', review: 'Perfect for weekend hackathons. I stress-tested four concepts in one afternoon, picked the strongest one, and walked away with a working MVP.', stars: 5 },
  { name: 'Sara Chen', role: 'Co-founder · EdTech Startup', review: 'We saved at least a month of guesswork. The dimensional score breakdown made it easy to justify our pivot to investors with concrete data.', stars: 5 },
  { name: 'Dev Patel', role: 'Final Year CS Student', review: 'My capstone presentation improved dramatically. The analysis depth genuinely impressed the panel — and I didn\'t have to add a single slide manually.', stars: 4 },
  { name: 'Nisha Bansal', role: 'Growth Lead · B2B SaaS', review: 'Refreshingly actionable. Every insight had a next step attached. It pushed us to challenge our own assumptions rather than echo-chamber our existing beliefs.', stars: 5 },
  { name: 'Karan Verma', role: 'Angel Investor', review: 'I recommend IdeaLit to every first-time founder who pitches me. It surfaces the questions I\'d ask in due diligence — before they even walk in the door.', stars: 5 },
  { name: 'Meera Joshi', role: 'UX Researcher', review: 'The audience-fit section replaced three rounds of user interviews for early discovery. Fast, precise, and surprisingly nuanced for an automated tool.', stars: 5 },
];

const FOOTER_LINKS = {
  Product:   [{ label: 'Validate Idea', to: '/submit' }, { label: 'Explore Ideas', to: '/explore' }, { label: 'Leaderboard', to: '/leaderboard' }, { label: 'Templates', to: '/templates' }],
  Resources: [{ label: 'How It Works', to: '/how-it-works' }, { label: 'AI News', to: '/news' }],
  About:     [{ label: 'Built for founders, students & hackers.', to: null }],
};

// ── Landing Page ────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-grid-pattern dark:bg-[#050508]">
      <Particles />

      {/* ── Hero ── */}
      <section className="relative z-10 pt-24 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            IdeaLit — Now live &amp; free to use
          </motion.div>

          <TypingHeading />

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stop wasting months on products nobody wants. Stress-test your startup concept in seconds with structured AI analysis.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/submit">
              <Button size="lg" className="w-full sm:w-auto text-base gap-2 group">
                Test My Idea <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">Browse Ideas</Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10"
          >
            {[
              { value: '500+', label: 'Ideas Validated' },
              { value: '<2s',  label: 'Avg. Analysis Time' },
              { value: '5',    label: 'Scoring Dimensions' },
              { value: '100%', label: 'Free Forever' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {['AI-Powered', 'Instant Analysis', 'SWOT Included', 'Smart Validation', 'No Sign-up'].map(badge => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-primary-500" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 py-24 bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Deep analysis for every idea</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Get a comprehensive breakdown of your concept's potential, risks, and market fit.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why IdeaLit ── */}
      <section className="relative z-10 py-24 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700/50 text-primary-700 dark:text-primary-300 text-xs font-bold tracking-widest uppercase mb-4"
            >
              <Zap className="w-3.5 h-3.5" /> Why IdeaLit
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Built for real founders</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">Not another generic tool. IdeaLit gives you exactly what matters — fast, free, structured.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-11 h-11 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 flex items-center justify-center mb-5 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="relative z-10 py-24 bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Who's it for?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">IdeaLit adapts to your context — whether you're shipping a capstone, pitching investors, or hacking overnight.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {USE_CASES.map((uc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-7 border bg-gradient-to-br ${uc.color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="mb-4">{uc.icon}</div>
                <span className="text-xs font-black tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-2 block">{uc.label}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{uc.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{uc.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 relative z-10 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-100/30 via-transparent to-transparent dark:from-primary-900/10 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700/50 text-primary-700 dark:text-primary-300 text-xs font-bold tracking-widest uppercase mb-5"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary-500" />
              Real Users · Real Results
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">What Users Are Saying</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">How IdeaLit is helping people validate smarter — before they build.</p>
          </div>

          <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900/60" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900/60" />
            <div className="testimonials-track flex gap-6 w-max">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i}
                  className="testimonial-card group relative shrink-0 rounded-2xl bg-white/85 dark:bg-slate-800/75 border border-slate-200/80 dark:border-slate-700/50 p-7 shadow-soft backdrop-blur-sm"
                  style={{ width: '360px' }}
                >
                  <Stars count={t.stars} />
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed min-h-[5rem] mt-4 mb-5">&#8220;{t.review}&#8221;</p>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                      {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.role}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: '0 0 0 1.5px rgba(34,197,94,0.18), 0 8px 40px rgba(34,197,94,0.13)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white">IdeaLit</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                The fastest way for founders, students, and hackers to validate startup ideas with structured AI analysis.
              </p>
              <div className="flex items-center gap-3">
                {[
                  {
                    label: 'Twitter',
                    svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                  },
                  {
                    label: 'GitHub',
                    svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
                  },
                  {
                    label: 'LinkedIn',
                    svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-xs font-black tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-sm text-slate-500 dark:text-slate-500 italic">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-400 dark:text-slate-500 text-sm">© {new Date().getFullYear()} IdeaLit · Validate first. Build smarter.</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs">Made with ❤️ for the startup community</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
