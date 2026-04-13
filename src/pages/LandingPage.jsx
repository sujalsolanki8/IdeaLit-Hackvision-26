import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, Zap, Target, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function LandingPage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "AI-Powered Scoring",
      description: "Get an instant feasibility score based on market trends and technical complexity.",
    },
    {
      icon: <Target className="w-6 h-6 text-rose-500" />,
      title: "Audience Profiling",
      description: "Identify your ideal customers and understand their unfulfilled needs.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary-500" />,
      title: "Predictive SWOT",
      description: "Automatically generate Strengths, Weaknesses, Opportunities, and Threats.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      title: "Market Demand",
      description: "Analyze current market signals to predict adoption and growth potential.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-grid-pattern">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden items-center flex flex-col justify-center">
        {/* Abstract Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 pointer-events-none flex justify-center">
          <div className="absolute top-0 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-purple-400/25 rounded-full mix-blend-multiply blur-[120px] animate-blob"></div>
          <div className="absolute top-[-100px] left-1/4 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] bg-blue-400/25 rounded-full mix-blend-multiply blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-[100px] right-1/4 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] bg-indigo-400/25 rounded-full mix-blend-multiply blur-[120px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-800 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
            IdeaForge AI 2.0 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto"
          >
            Validate your ideas <br className="hidden md:block"/>
            <span className="text-gradient-primary">before you build</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stop wasting months on products nobody wants. Use our advanced AI and community signals to stress-test your startup concepts in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/submit">
              <Button size="lg" className="w-full sm:w-auto text-base gap-2 group">
                Test My Idea 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                View Top Ideas
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Deep analysis for every idea</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Get a comprehensive breakdown of your concept's potential, risks, and market fit.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get / Auto-Scrolling Section */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Dark Feature Container */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden ring-1 ring-slate-800 shadow-2xl shadow-indigo-500/10 mb-20 transform transition-transform hover:scale-[1.01] duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-purple-500/20 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                AI-Powered Validation
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 mt-2 max-w-3xl leading-tight">
                From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Market-Ready Launch</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                We strip away the guesswork. Explore a comprehensive suite of AI tools engineered to pressure-test your concepts and generate actionable launch strategies.
              </p>

              <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
                {["AI Idea Validator", "Market Research", "SWOT Analysis", "Business Plan Generator", "Brand Strategy", "Ad Creatives"].map((chip) => (
                  <span key={chip} className="px-5 py-2.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 font-medium hover:text-white hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:bg-slate-800 transition-all duration-300 cursor-default">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Auto Scrolling Cards Title */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">See What You’ll Get</h3>
          </div>
        </div>

        {/* Carousel wrapper full width */}
        <div className="relative w-full overflow-hidden flex">
          {/* Fade Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-6 animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap py-6 pl-6">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  { title: "Startup Report", desc: "A robust 12-page breakdown of your niche." },
                  { title: "Competitor Map", desc: "Visual matrix of direct and indirect rivals." },
                  { title: "Pitch Outline", desc: "Slide-by-slide structure tailored for VCs." },
                  { title: "Risk Assessment", desc: "Predictive threat modeling and mitigation." },
                  { title: "Persona Profiles", desc: "Deep dive into your exact target audience." },
                  { title: "Fin Forecast", desc: "Estimated costs and revenue modeling." },
                ].map((card, idx) => (
                  <div key={`${i}-${idx}`} className="w-[300px] flex-shrink-0 bg-white rounded-3xl p-5 border border-slate-200 shadow-soft hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group hover:ring-1 hover:ring-indigo-200 cursor-pointer">
                    <div className="w-full h-40 rounded-2xl bg-slate-100 border border-slate-100 mb-5 overflow-hidden relative group-hover:border-indigo-100 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                          <Target className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{card.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed whitespace-normal line-clamp-2">{card.desc}</p>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 mt-auto bg-slate-50">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} IdeaForge. Built for the Hackathon.</p>
        </div>
      </footer>
    </div>
  );
}
