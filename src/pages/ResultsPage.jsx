import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { analyzeIdeaWithAI, generatePitchWithAI, improveIdeaWithAI } from '../services/ai';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, AlertTriangle, BarChart3,
  Lightbulb, ShieldAlert, Target, Activity, Sparkles,
  TrendingUp, TrendingDown, ArrowRight, Wand2, Mic, Copy, Check
} from 'lucide-react';

// Circular Progress Component
const CircularProgress = ({ value, label, colorClass, strokeColor }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r={radius} 
            className="stroke-slate-100" 
            strokeWidth="8" fill="transparent" 
          />
          {/* Progress Circle */}
          <motion.circle 
            cx="50" cy="50" r={radius} 
            className={strokeColor} 
            strokeWidth="8" fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${colorClass}`}>{value}</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-slate-600 mt-3">{label}</span>
    </div>
  );
};

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ideaData = location.state?.idea;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New features state
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [pitchContent, setPitchContent] = useState("");
  const [pitchLoading, setPitchLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isImproveModalOpen, setIsImproveModalOpen] = useState(false);
  const [improvedIdea, setImprovedIdea] = useState(null);
  const [improveLoading, setImproveLoading] = useState(false);

  useEffect(() => {
    if (!ideaData) {
      navigate('/submit');
      return;
    }

    let isMounted = true;
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const data = await analyzeIdeaWithAI(ideaData);
        console.log('✅ API Response:', data); // debug
        if (isMounted) {
          setResult(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("AI Analysis failed", err);
        if (isMounted) {
          setError(err.message || "Something went wrong. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchAnalysis();
    return () => { isMounted = false; };
  }, [ideaData, navigate]);

  const handleGeneratePitch = async () => {
    setIsPitchModalOpen(true);
    if (pitchContent) return; // Prevent re-fetching if already have it
    setPitchLoading(true);
    const result = await generatePitchWithAI(ideaData.title);
    setPitchContent(result);
    setPitchLoading(false);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(pitchContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImproveIdea = async () => {
    setIsImproveModalOpen(true);
    if (improvedIdea) return;
    setImproveLoading(true);
    const result = await improveIdeaWithAI(ideaData.title);
    setImprovedIdea(result);
    setImproveLoading(false);
  };

  if (loading) return <Loader />;

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">{error || "Something went wrong"}</h2>
        <Button className="mt-4" onClick={() => navigate('/submit')}>Try Again</Button>
      </div>
    );
  }

  // Invalid input — backend rejected the idea
  if (result.valid === false) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-10 shadow-sm"
        >
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-3">Idea Needs More Detail</h2>
          <p className="text-amber-700 text-base leading-relaxed mb-6">
            Please enter a meaningful idea for accurate validation
          </p>
          <p className="text-sm text-amber-600 bg-amber-100 rounded-lg px-4 py-3 mb-8 font-medium">
            {result.reason}
          </p>
          <Button onClick={() => navigate('/submit')} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Go Back &amp; Improve Your Idea
          </Button>
        </motion.div>
      </div>
    );
  }

  const getScoreInfo = (score) => {
    if (score >= 80) return { color: "text-emerald-500", stroke: "stroke-emerald-500", bg: "bg-emerald-500" };
    if (score >= 60) return { color: "text-amber-500", stroke: "stroke-amber-500", bg: "bg-amber-500" };
    return { color: "text-red-500", stroke: "stroke-red-500", bg: "bg-red-500" };
  };

  const pFeas = getScoreInfo(result.feasibility_score);
  const pMkt = getScoreInfo(result.market_score);
  const pInn = getScoreInfo(result.innovation_score);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <Button variant="ghost" onClick={() => navigate('/submit')} className="mb-4 -ml-4 gap-2 text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-4 h-4" /> Back to Editor
          </Button>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{ideaData.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">AI Validation Report</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="gap-2" onClick={handleGeneratePitch}>
            <Mic className="w-4 h-4 text-purple-500" />
            30-Sec Pitch
          </Button>
          <Button variant="gradient" className="gap-2" onClick={handleImproveIdea}>
            <Wand2 className="w-4 h-4" />
            Improve Idea
          </Button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Scores & Key Metrics */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="overflow-visible border-none ring-1 ring-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                   <CircularProgress 
                     value={result.feasibility_score} 
                     label="Feasibility" 
                     colorClass={pFeas.color}
                     strokeColor={pFeas.stroke}
                   />
                </div>

                {/* Verdict Label Badge */}
                {result.verdict_label && (() => {
                  const vMap = {
                    'Strong':  { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-700', dot: 'bg-emerald-500' },
                    'Average': { bg: 'bg-amber-50 dark:bg-amber-900/20',   text: 'text-amber-700 dark:text-amber-400',   border: 'border-amber-200 dark:border-amber-700',   dot: 'bg-amber-500'   },
                    'Weak':    { bg: 'bg-red-50 dark:bg-red-900/20',       text: 'text-red-700 dark:text-red-400',       border: 'border-red-200 dark:border-red-700',       dot: 'bg-red-500'     },
                  };
                  const tier = result.verdict_label.startsWith('Strong') ? 'Strong' : result.verdict_label.startsWith('Average') ? 'Average' : 'Weak';
                  const v = vMap[tier];
                  return (
                    <div className={`flex items-center justify-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full border ${v.bg} ${v.text} ${v.border} mb-3 mx-auto w-fit`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${v.dot} inline-block`} />
                      {result.verdict_label}
                    </div>
                  );
                })()}
                {result.clarity && (() => {
                  const clarityMap = {
                    High:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
                    Medium: { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500'   },
                    Low:    { bg: 'bg-red-50',      text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-400'     },
                  };
                  const c = clarityMap[result.clarity] || clarityMap.Low;
                  return (
                    <div className={`flex items-center justify-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${c.bg} ${c.text} ${c.border} mb-4 mx-auto w-fit`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} inline-block`} />
                      {result.clarity} Clarity
                    </div>
                  );
                })()}
                
                <div className="space-y-5 border-t border-slate-100 pt-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span className="text-slate-600">Market Potential</span>
                      <span className={pMkt.color}>{result.market_score}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.market_score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${pMkt.bg}`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span className="text-slate-600">Innovation Level</span>
                      <span className={pInn.color}>{result.innovation_score}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.innovation_score}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className={`h-full rounded-full ${pInn.bg}`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-none ring-1 ring-slate-200/50 shadow-soft">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-5 h-5 text-blue-500" /> Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{result.target_audience_analysis}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── Score Breakdown Card ── */}
          <motion.div variants={itemVariants}>
            <Card className="border-none ring-1 ring-slate-200/50 dark:ring-slate-700/50 shadow-soft">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-5 h-5 text-primary-500" /> Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                {result.score_breakdown && Object.values(result.score_breakdown).map((factor, i) => {
                  const pct = Math.round((factor.score / factor.max) * 100);
                  const barColor =
                    pct >= 75 ? 'bg-emerald-500' :
                    pct >= 50 ? 'bg-amber-400' : 'bg-red-400';
                  const textColor =
                    pct >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
                    pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500';
                  return (
                    <div key={factor.label}>
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-slate-600 dark:text-slate-400">{factor.label}</span>
                        <span className={`font-bold ${textColor}`}>{factor.score}/{factor.max}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                          className={`h-full rounded-full ${barColor}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: In-depth Analysis */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="border-none ring-1 ring-slate-200/50 shadow-soft overflow-hidden">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100">
                <CardTitle>SWOT Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 md:border-r border-b md:border-b-0 border-slate-100 dark:border-slate-700/60 bg-emerald-50/20 dark:bg-emerald-900/10">
                    <h4 className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400 mb-4">
                      <TrendingUp className="w-5 h-5" /> Strengths
                    </h4>
                    <ul className="space-y-3">
                      {(result.swot?.strengths ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 md:border-b-0 bg-amber-50/20 dark:bg-amber-900/10">
                    <h4 className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400 mb-4">
                      <TrendingDown className="w-5 h-5" /> Weaknesses
                    </h4>
                    <ul className="space-y-3">
                      {(result.swot?.weaknesses ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 md:border-r border-t border-slate-100 dark:border-slate-700/60 bg-blue-50/20 dark:bg-blue-900/10">
                    <h4 className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-400 mb-4">
                      <Lightbulb className="w-5 h-5" /> Opportunities
                    </h4>
                    <ul className="space-y-3">
                      {(result.swot?.opportunities ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <ArrowRight className="w-5 h-5 text-blue-500 shrink-0" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 border-t border-slate-100 dark:border-slate-700/60 bg-red-50/20 dark:bg-red-900/10">
                    <h4 className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-400 mb-4">
                      <ShieldAlert className="w-5 h-5" /> Threats
                    </h4>
                    <ul className="space-y-3">
                      {(result.swot?.threats ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="h-full border-red-100 dark:border-red-900/40 bg-red-50/30 dark:bg-red-900/10">
                <CardHeader>
                  <CardTitle className="text-base text-red-800 dark:text-red-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Identified Risks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 marker:text-red-400">
                    {(result.risks ?? []).map((risk, i) => (
                      <li key={i} className="pl-1">{risk}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <Card className="h-full bg-primary-50/50 dark:bg-indigo-900/20 border-primary-100 dark:border-indigo-800/40">
                <CardHeader>
                  <CardTitle className="text-base text-primary-800 dark:text-indigo-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Actionable Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc pl-5 text-sm text-primary-900 dark:text-indigo-200 marker:text-primary-400">
                    {(result.suggestions ?? []).map((sug, i) => (
                      <li key={i} className="pl-1">{sug}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-soft ring-1 ring-slate-200/50">
              <CardHeader>
                <CardTitle className="text-base">Similar Products / Competitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {(result.similar_products ?? []).map((prod, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-lg font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                      {prod}
                    </span>
                  ))}
                  {(result.similar_products ?? []).length === 0 && (
                    <span className="text-sm text-slate-500">No direct competitors found.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Pitch Modal */}
      <Modal isOpen={isPitchModalOpen} onClose={() => setIsPitchModalOpen(false)} title="30-Second Elevator Pitch">
        {pitchLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <Mic className="w-8 h-8 text-purple-500 animate-pulse" />
            <p className="text-slate-500 animate-pulse">Generating your pitch...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40 text-purple-900 dark:text-purple-200 text-lg leading-relaxed font-medium">
              "{pitchContent}"
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="gap-2" onClick={handleCopyPitch}>
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Improve Idea Modal */}
      <Modal isOpen={isImproveModalOpen} onClose={() => setIsImproveModalOpen(false)} title="AI Improved Idea">
        {improveLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <Wand2 className="w-8 h-8 text-primary-500 animate-spin-slow" />
            <p className="text-slate-500 animate-pulse">Refining and iterating your concept...</p>
          </div>
        ) : improvedIdea && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Refined Positioning</h4>
              <p className="text-slate-800 p-4 bg-slate-50 rounded-xl border border-slate-100 text-base">
                {improvedIdea.clearer_positioning}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Improved Version</h4>
              <p className="text-slate-800 p-4 bg-primary-50 rounded-xl border border-primary-100 text-base leading-relaxed">
                {improvedIdea.improved_version}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Better Target Audience</h4>
              <p className="text-slate-800 p-4 bg-blue-50 rounded-xl border border-blue-100 text-base">
                {improvedIdea.better_target_audience}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
