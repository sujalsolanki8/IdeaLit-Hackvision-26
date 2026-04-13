import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

// Pre-generated star positions (stable, no re-render jitter)
const STARS = Array.from({ length: 90 }, (_, i) => {
  const seed = (i * 2654435761) >>> 0;
  return {
    id: i,
    cx: `${((seed % 1000) / 10).toFixed(1)}%`,
    cy: `${(((seed >> 8) % 1000) / 10).toFixed(1)}%`,
    r: (((seed >> 16) % 12) / 10 + 0.4).toFixed(1),
    dur: (((seed >> 20) % 20) / 10 + 1.2).toFixed(1),
    begin: (((seed >> 24) % 40) / 10).toFixed(1),
  };
});

export function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter');   // enter → writing → glow → exit
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => { setPhase('writing'); setCursorVisible(true); }, 200);
    const t1 = setTimeout(() => setPhase('glow'),    3600);
    const t2 = setTimeout(() => setPhase('exit'),    4400);
    const t3 = setTimeout(onComplete,                5100);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  const isExiting = phase === 'exit';

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#000000' }}
      animate={isExiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ── Starfield ──────────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {STARS.map(s => (
          <circle key={s.id} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity="0.1">
            <animate
              attributeName="opacity"
              values="0.08;0.9;0.08"
              dur={`${s.dur}s`}
              begin={`${s.begin}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* ── Ambient orbs (subtle white on black) ──────────────── */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', top: '-10%', left: '-5%' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', bottom: '-5%', right: '-5%' }}
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Logo ───────────────────────────────────────────────── */}
      <motion.img
        src={logo}
        alt="IdeaLit"
        className="w-20 h-20 object-contain mb-6"
        initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.7)) drop-shadow(0 0 6px rgba(255,255,255,0.4))' }}
      />

      {/* ── SVG Handwriting ────────────────────────────────────── */}
      <div className="relative w-full flex items-center justify-center" style={{ height: 230 }}>
        <svg
          viewBox="0 0 820 210"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[min(94vw,820px)]"
          overflow="visible"
        >
          <defs>
            {/* Text glow filter */}
            <filter id="sl-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" type="saturate" values="2.5" result="sat" />
              <feMerge>
                <feMergeNode in="sat" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Softer glow for glow-phase */}
            <filter id="sl-glow-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Cursor glow */}
            <filter id="sl-cursor-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Solid white stroke */}
            <linearGradient id="sl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            {/* Solid white fill */}
            <linearGradient id="sl-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.92" />
            </linearGradient>
          </defs>

          {/* ── Line 1 stroke (animated) ── */}
          <text
            x="410" y="85"
            textAnchor="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="58"
            fontWeight="700"
            fill="none"
            stroke="url(#sl-grad)"
            strokeWidth="1.2"
            filter={phase === 'glow' ? 'url(#sl-glow-soft)' : 'url(#sl-glow)'}
            className="sl-line1-stroke"
          >
            Light up your ideas
          </text>

          {/* ── Line 1 fill (fades in after stroke) ── */}
          <text
            x="410" y="85"
            textAnchor="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="58"
            fontWeight="700"
            fill="url(#sl-fill)"
            className="sl-line1-fill"
          >
            Light up your ideas
          </text>

          {/* ── Line 2 stroke ── */}
          <text
            x="410" y="175"
            textAnchor="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="74"
            fontWeight="700"
            fill="none"
            stroke="url(#sl-grad)"
            strokeWidth="1.6"
            filter={phase === 'glow' ? 'url(#sl-glow-soft)' : 'url(#sl-glow)'}
            className="sl-line2-stroke"
          >
            with IdeaLit
          </text>

          {/* ── Line 2 fill ── */}
          <text
            x="410" y="175"
            textAnchor="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="74"
            fontWeight="700"
            fill="url(#sl-fill)"
            className="sl-line2-fill"
          >
            with IdeaLit
          </text>

          {/* ── Animated pen cursor — line 1 ── */}
          {cursorVisible && (
            <motion.g filter="url(#sl-cursor-glow)">
              <motion.circle
                cx={0} cy={85} r={5}
                fill="#ffffff"
                initial={{ cx: 60 }}
                animate={{ cx: [60, 760] }}
                transition={{ duration: 2.2, delay: 0, ease: [0.4, 0, 0.6, 1] }}
              />
            </motion.g>
          )}

          {/* ── Animated pen cursor — line 2 ── */}
          {cursorVisible && (
            <motion.g filter="url(#sl-cursor-glow)">
              <motion.circle
                cx={0} cy={175} r={5}
                fill="#ffffff"
                initial={{ cx: 80, opacity: 0 }}
                animate={{ cx: [100, 720], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.0, delay: 1.5, ease: [0.4, 0, 0.6, 1] }}
              />
            </motion.g>
          )}

          {/* ── Glow pulse on final "IdeaLit" ── */}
          <AnimatePresence>
            {phase === 'glow' && (
              <motion.text
                x="410" y="175"
                textAnchor="middle"
                fontFamily="'Dancing Script', cursive"
                fontSize="74"
                fontWeight="700"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#sl-glow-soft)"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 0.8, repeat: 2 }}
              >
                with IdeaLit
              </motion.text>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* ── Tagline ─────────────────────────────────────────────── */}
      <motion.p
        className="text-slate-400 text-xs tracking-[0.4em] uppercase font-light mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={phase === 'glow' || phase === 'exit' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.9 }}
        style={{ textShadow: '0 0 12px rgba(255,255,255,0.25)' }}
      >
        Validate first. Build smarter.
      </motion.p>

      {/* ── Bottom loading bar ──────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #ffffff55, #ffffff, #ffffff55)' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 4.0, delay: 0.2, ease: 'linear' }}
      />

      {/* ── Skip button ─────────────────────────────────────────── */}
      <motion.button
        onClick={onComplete}
        className="absolute bottom-6 right-8 text-slate-600 text-xs tracking-widest uppercase hover:text-slate-300 transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Skip →
      </motion.button>
    </motion.div>
  );
}
