import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Database, Zap } from 'lucide-react';

const steps = [
  { text: "Understanding your core concept...", icon: <Sparkles className="w-5 h-5 text-indigo-500" /> },
  { text: "Analyzing market demand & trends...", icon: <Activity className="w-5 h-5 text-emerald-500" /> },
  { text: "Evaluating technical feasibility...", icon: <Database className="w-5 h-5 text-blue-500" /> },
  { text: "Generating actionable insights...", icon: <Zap className="w-5 h-5 text-amber-500" /> }
];

export function Loader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1100); // changes every 1.1s

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-md">
      <div className="relative w-24 h-24 mb-10">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 shadow-inner"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin shadow-[0_0_15px_rgba(34,197,94,0.3)]"></div>
        <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-primary-100 to-teal-50 animate-pulse flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary-600 animate-bounce" />
        </div>
      </div>
      
      <div className="h-12 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-soft border border-slate-100"
          >
            <div className="animate-pulse">{steps[currentStep].icon}</div>
            <span className="text-slate-700 font-medium">{steps[currentStep].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress Bar under the text */}
      <div className="w-64 h-1.5 bg-slate-200 mt-6 rounded-full overflow-hidden">
         <motion.div 
            className="h-full bg-gradient-to-r from-primary-500 to-teal-400"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
         />
      </div>
    </div>
  );
}
