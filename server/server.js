import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// RULE-BASED AI ENGINE  (no external API needed)
// ─────────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const POWER_WORDS = ['ai', 'automation', 'platform', 'solution', 'market', 'data',
  'saas', 'tech', 'digital', 'analytics', 'cloud', 'mobile', 'app',
  'service', 'tool', 'system', 'engine', 'network', 'api', 'smart'];

const VAGUE_WORDS = ['something', 'stuff', 'random', 'things', 'whatever',
  'kind of', 'sort of', 'maybe', 'idk', 'etc'];

const UNIQUENESS_WORDS = ['unique', 'new', 'innovative', 'novel',
  'first', 'revolutionary', 'disruptive', 'original', 'different'];

const CLARITY_PHRASES = ['solve', 'problem', 'helps', 'enables', 'allows',
  'provides', 'improves', 'reduces', 'replaces', 'automate',
  'connect', 'simplify', 'streamline', 'increase', 'decrease'];

// ─────────────────────────────────────────────
// INPUT VALIDATION
// ─────────────────────────────────────────────
function validateInput(idea) {
  const title = (idea.title || '').trim();
  const desc  = (idea.description || '').trim();
  const combined = `${title} ${desc}`;

  // 1. Minimum description length (15 chars)
  if (desc.length < 15) {
    return { valid: false, reason: 'Description is too short. Please provide at least 15 characters to generate a meaningful report.' };
  }

  // 2. Repeated-character spam (e.g. "aaaaaa", "sssssss")
  if (/(.)\1{5,}/.test(combined)) {
    return { valid: false, reason: 'Input contains repeated characters. Please enter a meaningful idea description.' };
  }

  // 3. Keyboard-mash patterns
  if (/qwerty|asdfgh|zxcvbn|123456|abcdef/i.test(combined)) {
    return { valid: false, reason: 'Input looks like keyboard spam. Please describe a real idea.' };
  }

  // 4. Not enough distinct meaningful words (length > 2)
  const meaningfulWords = desc.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const uniqueWords = new Set(meaningfulWords);
  if (uniqueWords.size < 3) {
    return { valid: false, reason: 'Input does not contain enough meaningful words. Please elaborate on your idea.' };
  }

  return { valid: true };
}

// ─────────────────────────────────────────────
// CLARITY SCORING  (derived from breakdown)
// ─────────────────────────────────────────────
function getClarity(idea) {
  const desc = (idea.description || '').trim();
  const wordCount = desc.split(/\s+/).filter(w => w.length > 2).length;
  const hasClarity = CLARITY_PHRASES.some(p => desc.toLowerCase().includes(p));
  if (desc.length >= 120 && wordCount >= 18 && hasClarity) return 'High';
  if (desc.length >= 50  && wordCount >= 8)                return 'Medium';
  return 'Low';
}

// ─────────────────────────────────────────────
// ENHANCED RULE-BASED EVALUATION ENGINE
// 5 factors × 20 pts each = 100 pt total
// ─────────────────────────────────────────────
function analyzeIdea(idea) {
  const title    = (idea.title || '').toLowerCase();
  const desc     = (idea.description || '').toLowerCase();
  const audience = (idea.targetAudience || '').toLowerCase();
  const combined = `${title} ${desc} ${audience}`;
  const words    = combined.split(/\s+/);
  const descWords = desc.split(/\s+/).filter(w => w.length > 2);
  const sentences = (idea.description || '').split(/[.!?]+/).filter(s => s.trim().length > 3);

  // ══════════════════════════════════════════════
  // FACTOR 1 — CLARITY  (0–20)
  // Measures: description length + sentence structure + clarity phrases
  // ══════════════════════════════════════════════
  let clarityScore = 0;
  const charLen = (idea.description || '').length;
  if (charLen > 30)  clarityScore += 4;
  if (charLen > 80)  clarityScore += 4;
  if (charLen > 150) clarityScore += 3;
  if (charLen > 250) clarityScore += 2;
  const clarityHits = CLARITY_PHRASES.filter(w => combined.includes(w));
  clarityScore += Math.min(5, clarityHits.length * 2);
  if (sentences.length >= 2) clarityScore += 1;
  if (sentences.length >= 4) clarityScore += 1;
  clarityScore = Math.min(20, clarityScore);

  // ══════════════════════════════════════════════
  // FACTOR 2 — KEYWORDS / MARKET SIGNAL  (0–20)
  // Rewards tech/market vocabulary, penalises vague words
  // ══════════════════════════════════════════════
  const powerHits = POWER_WORDS.filter(w => combined.includes(w));
  const vagueHits = VAGUE_WORDS.filter(w => combined.includes(w));
  let keywordScore = Math.min(18, powerHits.length * 4);
  keywordScore -= Math.min(keywordScore, vagueHits.length * 4);
  keywordScore = Math.max(0, Math.min(20, keywordScore + 2)); // +2 base

  // ══════════════════════════════════════════════
  // FACTOR 3 — PROBLEM–SOLUTION STRUCTURE  (0–20)
  // Rewards for/helps/solves phrasing + cause-effect language
  // ══════════════════════════════════════════════
  const PS_WORDS = ['for', 'helps', 'solves', 'because', 'so that', 'in order',
    'enables', 'allows', 'instead of', 'unlike', 'unlike', 'without', 'challenge',
    'pain', 'problem', 'need', 'gap', 'friction', 'struggle'];
  const psHits = PS_WORDS.filter(w => combined.includes(w));
  let psScore = Math.min(14, psHits.length * 3);
  if (combined.includes('problem') || combined.includes('pain'))  psScore += 3;
  if (combined.includes('solution') || combined.includes('solve')) psScore += 3;
  psScore = Math.min(20, psScore);

  // ══════════════════════════════════════════════
  // FACTOR 4 — TARGET AUDIENCE SPECIFICITY  (0–20)
  // Rewards concrete, specific audience definition
  // ══════════════════════════════════════════════
  const aud = (idea.targetAudience || '').trim();
  let audienceScore = 0;
  if (aud.length > 5)  audienceScore += 6;
  if (aud.length > 15) audienceScore += 4;
  if (aud.length > 30) audienceScore += 4;
  // Bonus for specific demographic signals
  const DEMO_WORDS = ['age', 'year', 'professional', 'developer', 'student', 'manager',
    'freelancer', 'startup', 'enterprise', 'small business', 'mid-market', 'consumer'];
  if (DEMO_WORDS.some(w => audience.includes(w))) audienceScore += 4;
  if (audience.split(/\s+/).length >= 5) audienceScore += 2; // detailed description
  audienceScore = Math.min(20, audienceScore);

  // ══════════════════════════════════════════════
  // FACTOR 5 — PRACTICAL FEASIBILITY  (0–20)
  // Rewards uniqueness claims, MVP-ability language, no overreach
  // ══════════════════════════════════════════════
  const uniqueHits = UNIQUENESS_WORDS.filter(w => combined.includes(w));
  const MVP_WORDS = ['app', 'platform', 'tool', 'api', 'dashboard', 'mvp',
    'prototype', 'beta', 'launch', 'product', 'service', 'build'];
  const mvpHits = MVP_WORDS.filter(w => combined.includes(w));
  let feasScore = 4; // base
  feasScore += Math.min(8, uniqueHits.length * 4);
  feasScore += Math.min(6, mvpHits.length * 2);
  // Word count signals elaboration
  feasScore += descWords.length >= 20 ? 2 : 0;
  feasScore = Math.min(20, feasScore);

  // ══════════════════════════════════════════════
  // COMBINE SCORES
  // ══════════════════════════════════════════════
  const score_breakdown = {
    clarity:         { score: clarityScore,  max: 20, label: 'Clarity' },
    keywords:        { score: keywordScore,  max: 20, label: 'Market Signal' },
    problem_solution:{ score: psScore,       max: 20, label: 'Problem–Solution' },
    audience:        { score: audienceScore, max: 20, label: 'Audience Fit' },
    feasibility:     { score: feasScore,     max: 20, label: 'Feasibility' },
  };

  const rawTotal = clarityScore + keywordScore + psScore + audienceScore + feasScore;
  // Tiny jitter (±3) so back-to-back same submissions feel slightly different
  const jitter = Math.floor(Math.random() * 7) - 3;
  const feasibility_score = Math.max(10, Math.min(97, rawTotal + jitter));
  const market_score      = Math.max(10, Math.min(97, rawTotal + keywordScore - 10 + Math.floor(Math.random() * 9) - 4));
  const innovation_score  = Math.max(10, Math.min(97, rawTotal + uniqueHits.length * 4 - 12 + Math.floor(Math.random() * 9) - 4));

  // ══════════════════════════════════════════════
  // VERDICT LABEL  (Strong / Average / Weak)
  // ══════════════════════════════════════════════
  const verdict_label =
    feasibility_score >= 75 ? 'Strong Idea 🚀' :
    feasibility_score >= 50 ? 'Average Idea 👍' :
                               'Weak Idea — Needs Work ⚠️';

  const verdict =
    feasibility_score >= 80 ? 'Excellent 🚀' :
    feasibility_score >= 60 ? 'Good 👍' :
    feasibility_score >= 40 ? 'Average 😐' : 'Needs Work ❌';

  const tier = feasibility_score >= 75 ? 'strong' : feasibility_score >= 50 ? 'average' : 'weak';

  // ── Market demand ─────────────────────────────
  const mktLevel = market_score >= 70 ? 'High' : market_score >= 45 ? 'Medium' : 'Low';
  const mktDescMap = {
    High:  ['Strong demand signals in this vertical — timing looks favorable.',
             'Growing market with proven consumer interest and clear budget allocation.'],
    Medium:['Moderate demand; niche adoption likely before broader scale is achievable.',
             'Market exists but needs strong positioning to capture meaningful share.'],
    Low:   ['Demand is speculative at this stage — early market education will be critical.',
             'Limited evidence of active willingness-to-pay; validate manually before building.'],
  };

  // ══════════════════════════════════════════════
  // TIER-CONDITIONAL SWOT
  // ══════════════════════════════════════════════
  // — Strengths —
  const detectedStrengths = [
    powerHits.length > 0  ? `Strong tech vocabulary detected: ${powerHits.slice(0,3).join(', ')}` : null,
    clarityHits.length > 0 ? `Clear problem–solution framing (key phrase: "${clarityHits[0]}")` : null,
    uniqueHits.length > 0  ? 'Explicitly positions the concept as differentiated/innovative' : null,
    charLen > 120          ? 'Well-elaborated description gives evaluators enough context' : null,
    sentences.length >= 3  ? 'Structured multi-sentence explanation signals clear thinking' : null,
    audienceScore >= 14    ? `Audience "${idea.targetAudience}" is concretely and specifically defined` : null,
    market_score >= 65     ? 'Market score indicates real commercial opportunity' : null,
    psScore >= 14          ? 'Strong problem–solution structure detected throughout description' : null,
  ].filter(Boolean);

  const genericStrengths = {
    strong:  ['Solid commercial potential with identifiable early adopters',
               'Concept aligns well with current technology adoption cycles',
               'Shows clear awareness of competitive dynamics'],
    average: ['Core concept is understandable and achievable as an MVP',
               'Reasonable foundation — needs sharper positioning to stand out'],
    weak:    ['The underlying problem space may have real merit',
               'Idea shows initial intent — needs more specificity to evaluate properly'],
  };

  let strengths = detectedStrengths.slice(0, 3);
  while (strengths.length < 3) strengths.push(pick(genericStrengths[tier]));

  // — Weaknesses —
  const detectedWeaknesses = [
    vagueHits.length > 0    ? `Vague language detected ("${vagueHits[0]}") — undermines credibility` : null,
    charLen < 60             ? 'Description is too short to evaluate business model or viability' : null,
    uniqueHits.length === 0  ? 'No clear differentiation from existing solutions stated' : null,
    clarityHits.length < 2   ? 'Problem statement lacks specificity; solution is implicit' : null,
    audienceScore < 8        ? 'Target audience is too broad or vaguely defined' : null,
    psScore < 8              ? 'Problem–solution connection is weak or unstated' : null,
    market_score < 50        ? 'Market validation signals are weak — TAM not evidenced' : null,
  ].filter(Boolean);

  const genericWeaknesses = {
    strong:  ['Competitive moat is not explicitly articulated',
               'Monetisation model not mentioned in the description'],
    average: ['No mention of revenue strategy or pricing model',
               'User acquisition approach is not addressed',
               'Regulatory or compliance risks not considered'],
    weak:    ['Concept lacks a clear value proposition for any user segment',
               'Unable to identify a specific monetisable problem being solved',
               'Description reads as an idea fragment — not a validated concept'],
  };

  let weaknesses = detectedWeaknesses.slice(0, 3);
  while (weaknesses.length < 3) weaknesses.push(pick(genericWeaknesses[tier]));

  // — Opportunities & Threats —
  const oppPool = {
    strong: [
      'Early-mover advantage in a maturing vertical with low incumbent focus',
      'B2B SaaS model allows predictable recurring revenue and high LTV',
      'AI/automation wave creates tailwinds — early movers capture outsized share',
      'API-first architecture enables rapid ecosystem integrations',
    ],
    average:[
      'Underserved niche with low competition presents a low-CAC entry point',
      'Remote-work trends have expanded potential addressable markets globally',
      'Developer tooling and no-code ecosystems reduce time-to-MVP dramatically',
    ],
    weak:   [
      'Problem space itself likely has real demand — concept needs refinement to unlock it',
      'Pivoting to a narrower niche could reveal a more tractable opportunity',
    ],
  };
  const threatPool = [
    'Well-funded incumbents can replicate features within 6–12 months',
    'Changing platform policies (App Store / Google Play) could limit distribution',
    'Customer acquisition costs rising sharply in saturated digital channels',
    'Economic downturns reduce discretionary B2B software spend',
    'Open-source alternatives may commoditise the core value proposition',
    'Talent shortage in core technical roles could slow go-to-market timing',
  ];

  const swot = {
    strengths,
    weaknesses,
    opportunities: [pick(oppPool[tier]), pick(oppPool[tier].filter((_, i) => i > 0) || oppPool[tier])],
    threats:       [pick(threatPool), pick(threatPool.slice(3))],
  };

  // ── Risks (tier-conditional pool) ────────────
  const riskPools = {
    strong: [
      'Dependency on a single distribution channel creates fragility',
      'Unit economics not validated — CAC may exceed LTV at scale',
      'Key-person risk if team is small or under-resourced',
      'Technical debt from rapid MVP iteration may slow v2 development',
    ],
    average:[
      'No stated IP protection — core concept is easy to clone cheaply',
      'Initial product-market fit may not generalise to adjacent segments',
      'Regulatory uncertainty in this vertical introduces compliance overhead',
      'Customer support and onboarding costs may be underestimated',
    ],
    weak:   [
      'Without a clearly defined problem, user adoption is speculative',
      'Cannot estimate CAC or LTV without a specific value proposition',
      'High risk of building a solution looking for a problem',
      'Market validation is required before any meaningful investment of time or money',
    ],
  };
  const risks = riskPools[tier].sort(() => 0.5 - Math.random()).slice(0, 3);

  // ── Suggestions (tier-conditional) ───────────
  const suggPools = {
    strong: [
      'Run 10 user interviews this week before writing a single line of code',
      'Build a no-code prototype (Framer/Webflow) to validate willingness-to-pay',
      'Launch a waitlist page immediately — real signups are the best validation',
      'Define your pricing model now — anchor it to the value delivered, not cost',
      'Identify 3 direct competitors and map exactly where you outperform each',
      uniqueHits.length > 0 ? 'Double down on your differentiation — make it the centrepiece of your landing page' : null,
    ].filter(Boolean),
    average:[
      'Narrow the target audience to one specific segment and solve exclusively for them in v1',
      uniqueHits.length === 0 ? 'Define your unique angle — what can you do that competitors cannot copy in 30 days?' : null,
      charLen < 100 ? 'Expand the description with a concrete "day in the life" use-case scenario' : null,
      'Replace generic benefit claims with specific, measurable outcomes (e.g., "saves 3 hrs/week")',
      'List 3 assumptions underlying your idea and design experiments to test each one',
    ].filter(Boolean),
    weak:   [
      'Restart with a problem-first approach: write one sentence describing the exact pain your user feels',
      'Interview 5 potential users before writing any more product description',
      vagueHits.length > 0 ? 'Remove vague language and replace with specific, observable user behaviours' : null,
      'Use the format: "For [specific person] who [has this problem], [product] does [X] unlike [Y]"',
      'Consider if this is a feature (add-on) or a full product — most weak ideas are features in disguise',
    ].filter(Boolean),
  };
  const suggestions = suggPools[tier].sort(() => 0.5 - Math.random()).slice(0, 3);

  // ── Target audience analysis ──────────────────
  const audAnalyses = {
    strong: [
      `"${idea.targetAudience}" is a well-defined segment. Focus on the 20% most acutely underserved to find early adopters who will champion your product.`,
      `Your stated audience (${idea.targetAudience}) shows strategic clarity. Validate willingness-to-pay with direct outreach before full build.`,
    ],
    average:[
      `"${idea.targetAudience}" could be narrowed further — specificity in audience definition drives higher early conversion rates.`,
      `This audience has ${market_score >= 60 ? 'reasonable' : 'moderate'} digital purchasing patterns. Validate your channel fit (SEO vs. paid vs. community) early.`,
    ],
    weak:   [
      `The audience "${idea.targetAudience || 'undefined'}" is too broad to build an effective go-to-market strategy around. Define a specific persona first.`,
      `Without a sharply defined audience, resource allocation across channels will be inefficient. Narrow down to one primary user archetype.`,
    ],
  };

  // ── Similar products ──────────────────────────
  const competitorMap = {
    ai: ['OpenAI', 'Anthropic', 'Cohere', 'Mistral AI'],
    saas: ['Notion', 'Monday.com', 'Airtable', 'ClickUp'],
    marketplace: ['Fiverr', 'Upwork', 'Etsy', 'Peerspace'],
    health: ['Headspace', 'Noom', 'Teladoc', 'Calm'],
    education: ['Coursera', 'Udemy', 'Khan Academy', 'Brilliant'],
    fitness: ['Peloton', 'Nike Training Club', 'Strava', 'Whoop'],
    finance: ['Mint', 'YNAB', 'Robinhood', 'Plaid'],
    productivity: ['Todoist', 'Notion', 'Sunsama', 'Linear'],
    social: ['Discord', 'Circle', 'Geneva', 'Luma'],
  };
  let similar_products = ['Generic Competitor A', 'Generic Competitor B'];
  for (const [key, comps] of Object.entries(competitorMap)) {
    if (combined.includes(key)) {
      similar_products = comps.sort(() => 0.5 - Math.random()).slice(0, 3);
      break;
    }
  }

  return {
    feasibility_score,
    market_score,
    innovation_score,
    verdict,
    verdict_label,
    score_breakdown,
    market_demand: { level: mktLevel, description: pick(mktDescMap[mktLevel]) },
    target_audience_analysis: pick(audAnalyses[tier]),
    swot,
    risks,
    suggestions,
    similar_products,
  };
}

// ─────────────────────────────────────────────
// Offline pitch generator
// ─────────────────────────────────────────────
function generatePitch(title) {
  const pitches = [
    `${title} is the tool that finally solves what everyone ignores. We eliminate the friction between idea and outcome — directly, without the bloat. Our early users are already seeing measurable results in under a week. We're not building a product; we're removing a problem.`,
    `Imagine if ${title} could save professionals 5 hours every week. That's what we do. By automating the hardest part of the workflow, we free up time for the work that actually matters. Simple, focused, and ready to scale.`,
    `Every team struggles with the same broken process. ${title} is the solution they didn't know was possible. We've distilled the workflow into a single, elegant experience — and the results speak for themselves. Join us before your competitors do.`,
    `${title} exists because the current alternative is embarrassingly bad. We built the product we always wished existed — fast, reliable, and built for the people who do the real work. Early traction proves the market is ready.`,
  ];
  return pick(pitches);
}

// ─────────────────────────────────────────────
// Offline idea improver
// ─────────────────────────────────────────────
function improveIdea(title) {
  const pivots = [
    {
      improved_version: `A B2B SaaS version of "${title}" — white-label it and charge per seat.`,
      better_target_audience: 'Operations managers at Series-A startups (10–80 employees)',
      clearer_positioning: 'The only tool that integrates into your existing workflow rather than adding a new one.',
    },
    {
      improved_version: `Niche "${title}" down to a single vertical (e.g., legal, healthcare, or real estate) and own it.`,
      better_target_audience: 'Solo practitioners or freelancers who bill by the hour and value speed above all',
      clearer_positioning: 'Specialized depth beats generalist breadth — we go miles deep, not miles wide.',
    },
    {
      improved_version: `Build "${title}" as an API-first product — let developers embed it, then monetize at scale.`,
      better_target_audience: 'Mid-market SaaS companies looking to add intelligence to their own product',
      clearer_positioning: 'Infrastructure, not an app — the backbone others build on.',
    },
  ];
  return pick(pivots);
}

// ─────────────────────────────────────────────
// ROUTES  (identical signatures — frontend unchanged)
// ─────────────────────────────────────────────

// Validate Idea
app.post('/api/validate-idea', (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea || !idea.title || !idea.description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    // Gate: run input validation before analysis
    const check = validateInput(idea);
    if (!check.valid) {
      return res.json({ valid: false, reason: check.reason });
    }

    const result = analyzeIdea(idea);
    res.json({ valid: true, clarity: getClarity(idea), ...result });
  } catch (error) {
    console.error('[/api/validate-idea] Error:', error.message);
    res.status(500).json({ error: 'Gemini API failed', details: error.message });
  }
});

// Generate Pitch
app.post('/api/generate-pitch', (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    res.json({ text: generatePitch(title) });
  } catch (error) {
    console.error('[/api/generate-pitch] Error:', error.message);
    res.status(500).json({ error: 'Gemini API failed', details: error.message });
  }
});

// Improve Idea
app.post('/api/improve-idea', (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    res.json(improveIdea(title));
  } catch (error) {
    console.error('[/api/improve-idea] Error:', error.message);
    res.status(500).json({ error: 'Gemini API failed', details: error.message });
  }
});

// ─────────────────────────────────────────────
// SERVER
// ─────────────────────────────────────────────
process.on('SIGINT', () => { console.log('Shutting down...'); process.exit(0); });

const server = app.listen(port, () => {
  console.log(`✅ Offline AI engine running on http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} already in use.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});
