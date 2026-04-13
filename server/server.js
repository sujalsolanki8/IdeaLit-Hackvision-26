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

function analyzeIdea(idea) {
  const combined = `${idea.title} ${idea.description} ${idea.targetAudience || ''}`.toLowerCase();
  const words = combined.split(/\s+/);
  const sentences = (idea.description || '').split(/[.!?]+/).filter(s => s.trim().length > 3);
  const charLen = (idea.description || '').length;

  // ── 1. Length scoring (0–25 pts) ───────────────
  let lengthScore = 0;
  if (charLen > 30)  lengthScore += 10;
  if (charLen > 80)  lengthScore += 8;
  if (charLen > 150) lengthScore += 5;
  if (sentences.length >= 3) lengthScore += 2;

  // ── 2. Power-word bonus (0–25 pts) ─────────────
  const powerHits = POWER_WORDS.filter(w => combined.includes(w));
  const powerScore = Math.min(25, powerHits.length * 5);

  // ── 3. Vague-word penalty (-15 max) ────────────
  const vagueHits = VAGUE_WORDS.filter(w => combined.includes(w));
  const vagueScore = Math.min(15, vagueHits.length * 5);

  // ── 4. Clarity signal (0–25 pts) ───────────────
  const clarityHits = CLARITY_PHRASES.filter(w => combined.includes(w));
  const clarityScore = Math.min(25, clarityHits.length * 6);

  // ── 5. Uniqueness bonus (0–10 pts) ─────────────
  const uniqueHits = UNIQUENESS_WORDS.filter(w => combined.includes(w));
  const uniqueScore = uniqueHits.length > 0 ? 10 : 0;

  // ── 6. Word-count bonus (0–5 pts) ──────────────
  const wcBonus = Math.min(5, Math.floor(words.length / 8));

  // ── 7. Audience specificity bonus (0–5 pts) ────
  const audienceScore = (idea.targetAudience || '').trim().length > 10 ? 5 : 0;

  // Raw total out of 100, jitter by ±4 for variety
  const jitter = Math.floor(Math.random() * 9) - 4;
  const raw = lengthScore + powerScore + clarityScore + uniqueScore + wcBonus + audienceScore - vagueScore + jitter + 20;
  const feasibility_score = Math.max(10, Math.min(97, raw));
  const market_score      = Math.max(10, Math.min(97, raw - 5 + Math.floor(Math.random() * 11) - 5));
  const innovation_score  = Math.max(10, Math.min(97, raw - 10 + uniqueScore + Math.floor(Math.random() * 11) - 5));

  // ── Verdict ─────────────────────────────────────
  const verdict =
    feasibility_score >= 80 ? 'Excellent 🚀' :
    feasibility_score >= 60 ? 'Good 👍' :
    feasibility_score >= 40 ? 'Average 😐' : 'Needs Work ❌';

  // ── Feasibility label ────────────────────────────
  const feasibility =
    feasibility_score >= 70 ? 'High' :
    feasibility_score >= 45 ? 'Medium' : 'Low';

  // ── Market demand level ─────────────────────────
  const mktLevel = market_score >= 70 ? 'High' : market_score >= 45 ? 'Medium' : 'Low';
  const mktDescriptions = {
    High: [
      'Strong demand signals in this vertical — timing looks favorable.',
      'Growing market with proven consumer interest and budget allocation.',
    ],
    Medium: [
      'Moderate demand; niche adoption likely before broader scale is achievable.',
      'Market exists but needs strong positioning to capture meaningful share.',
    ],
    Low: [
      'Demand is speculative at this stage — early education of the market will be needed.',
      'Limited evidence of active consumer willingness-to-pay in this space.',
    ],
  };

  // ── Strengths pool ───────────────────────────────
  const strengthPool = [
    powerHits.length > 0  ? `Uses high-signal tech concepts: ${powerHits.slice(0,3).join(', ')}` : null,
    clarityHits.length > 0 ? `Clear problem–solution framing detected (${clarityHits[0]})` : null,
    uniqueHits.length > 0  ? `Positions the idea as differentiated / innovative` : null,
    charLen > 100          ? 'Well-detailed description gives evaluators enough context' : null,
    sentences.length >= 2  ? 'Multi-sentence explanation signals structured thinking' : null,
    audienceScore > 0      ? `Target audience "${idea.targetAudience}" is concretely defined` : null,
    market_score >= 65     ? 'Market score suggests real commercial viability' : null,
    feasibility_score >= 70 ? 'Feasibility score indicates implementation is realistic' : null,
  ].filter(Boolean);

  const strengthVariants = [
    'Solid conceptual foundation with identifiable market need',
    'Idea demonstrates awareness of competitive dynamics',
    'Shows potential for rapid MVP validation with low overhead',
    'Concept aligns with current technology adoption trends',
  ];
  const strengths = strengthPool.length >= 2
    ? strengthPool.slice(0, 3)
    : [...strengthPool, pick(strengthVariants), pick(strengthVariants)].slice(0, 3);

  // ── Weaknesses pool ──────────────────────────────
  const weaknessPool = [
    vagueHits.length > 0   ? `Vague language detected ("${vagueHits[0]}") — undermines credibility` : null,
    charLen < 60            ? 'Description is too short to evaluate the business model' : null,
    uniqueHits.length === 0 ? 'No clear differentiation from existing solutions stated' : null,
    clarityHits.length < 2  ? 'Problem statement lacks specificity; solution remains implicit' : null,
    market_score < 50       ? 'Market validation is weak — TAM/SAM not evidenced' : null,
    innovation_score < 45   ? 'Low innovation score — likely derivative of existing products' : null,
  ].filter(Boolean);

  const weaknessVariants = [
    'No mention of monetization strategy or revenue model',
    'Competitive moat is not articulated — easy to replicate',
    'User acquisition cost risks are not addressed',
    'Regulatory or compliance risk ignored in the concept',
  ];
  const weaknesses = weaknessPool.length >= 2
    ? weaknessPool.slice(0, 3)
    : [...weaknessPool, pick(weaknessVariants), pick(weaknessVariants)].slice(0, 3);

  // ── SWOT extras ──────────────────────────────────
  const opportunityPool = [
    'Growing demand for digital-first solutions in the post-pandemic era',
    'AI/automation adoption is accelerating — early movers capture disproportionate share',
    'Underserved niche with low competition presents entry opportunity',
    'B2B SaaS model allows predictable recurring revenue and high LTV',
    'API-first architecture enables rapid integration with existing tools',
    'Remote-work trends have expanded potential addressable market globally',
  ];
  const threatPool = [
    'Well-funded incumbents can replicate features within 6–12 months',
    'Changing platform policies (App Store, Google Play) could limit distribution',
    'Customer acquisition costs rising sharply in saturated digital channels',
    'Economic downturns typically reduce discretionary B2B software spend',
    'Talent shortage in core technical roles could slow go-to-market',
    'Open-source alternatives may commoditize the core value proposition',
  ];

  const swot = {
    strengths,
    weaknesses,
    opportunities: [pick(opportunityPool), pick(opportunityPool.filter(x => x !== opportunityPool[0]))],
    threats: [pick(threatPool), pick(threatPool.slice(2))],
  };

  // ── Risks ────────────────────────────────────────
  const riskPool = [
    'Dependency on a single channel for distribution creates fragility',
    'No stated IP protection — the core concept is easy to clone cheaply',
    'Unit economics not validated; CAC may exceed LTV at scale',
    'Technical complexity could dramatically extend time-to-market',
    'Regulatory uncertainty in this vertical introduces compliance overhead',
    'Initial product-market fit may not generalize to adjacent segments',
    'Key-person dependency risk if team is small or under-resourced',
  ];
  const shuffledRisks = riskPool.sort(() => 0.5 - Math.random()).slice(0, 3);

  // ── Suggestions ──────────────────────────────────
  const suggestionPool = [
    'Run 10 user interviews this week before writing a single line of code',
    'Define one specific persona and solve exclusively for them in v1',
    'Build a no-code prototype (Framer / Webflow) to validate willingness-to-pay',
    uniqueHits.length === 0 ? 'Clarify your unique angle — what do you do that competitors cannot copy in 30 days?' : null,
    charLen < 100 ? 'Expand the description with a concrete use-case scenario' : null,
    vagueHits.length > 0 ? 'Replace vague language with specific, measurable outcomes' : null,
    'Launch a waitlist page before building to gauge real demand',
    'Identify three direct competitors and map where you outperform each',
  ].filter(Boolean);
  const suggestions = suggestionPool.sort(() => 0.5 - Math.random()).slice(0, 3);

  // ── Target audience analysis ─────────────────────
  const audienceAnalyses = [
    `"${idea.targetAudience}" is a ${mktLevel.toLowerCase()}-density segment. Focus on the 20% most acutely underserved to find your early adopters.`,
    `Your stated audience (${idea.targetAudience}) could be narrowed further — specificity in audience = higher conversion in early campaigns.`,
    `This audience has ${market_score >= 60 ? 'reasonable' : 'limited'} digital purchasing patterns. Validate channel fit (SEO vs. paid vs. community) early.`,
  ];

  // ── Competitors / similar products ──────────────
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
    market_demand: { level: mktLevel, description: pick(mktDescriptions[mktLevel]) },
    target_audience_analysis: pick(audienceAnalyses),
    swot,
    risks: shuffledRisks,
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
    const result = analyzeIdea(idea);
    res.json(result);
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
