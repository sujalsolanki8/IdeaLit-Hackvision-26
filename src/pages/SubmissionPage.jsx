import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input, Textarea } from '../components/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Sparkles, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTION_CHIPS = ["AI SaaS", "Marketplace", "EdTech", "Health App"];
const PLACEHOLDERS = [
  "AI-powered fitness coach for beginners",
  "Marketplace for college students",
  "Habit tracker for ADHD users"
];

export function SubmissionPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: ''
  });
  const [errors, setErrors] = useState({});

  // Typing effect state
  const [placeholderText, setPlaceholderText] = useState('');
  const [phIndex, setPhIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const MAX_CHARS = 500;

  // Typing Effect Hook
  useEffect(() => {
    const currentString = PLACEHOLDERS[phIndex];
    let timeout;
    
    if (!isDeleting && placeholderText === currentString) {
      timeout = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
    } else if (isDeleting && placeholderText === '') {
      setIsDeleting(false);
      setPhIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    } else {
      const nextText = isDeleting 
        ? currentString.substring(0, placeholderText.length - 1)
        : currentString.substring(0, placeholderText.length + 1);
        
      timeout = setTimeout(() => {
        setPlaceholderText(nextText);
      }, isDeleting ? 30 : 60); // typing speed
    }
    
    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, phIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > MAX_CHARS) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleChipClick = (chipValue) => {
    setFormData(prev => ({ ...prev, title: chipValue }));
    if (errors.title) setErrors(prev => ({ ...prev, title: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 20) newErrors.description = 'Please provide more detail (min 20 characters)';
    if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/results', { state: { idea: formData } });
    }
  };

  // Live Strength Indicator Logic
  const getStrength = () => {
    let score = 0;
    const tLen = formData.title.trim().length;
    const dLen = formData.description.trim().length;
    
    if (tLen > 5) score += 20;
    if (tLen > 15) score += 10;
    if (dLen > 20) score += 30;
    if (dLen > 80) score += 40;
    
    if (score === 0) return { label: 'Needs input', percent: 0, color: 'bg-slate-200', text: 'text-slate-500' };
    if (score < 40) return { label: 'Weak', percent: score, color: 'bg-red-500', text: 'text-red-500' };
    if (score < 80) return { label: 'Average', percent: score, color: 'bg-amber-500', text: 'text-amber-500' };
    return { label: 'Strong', percent: score, color: 'bg-emerald-500', text: 'text-emerald-500' };
  };

  const strength = getStrength();

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl relative">
      
      {/* Floating Gradient Background specific to this page overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none flex justify-center items-center overflow-hidden">
        <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-purple-500/20 rounded-full mix-blend-multiply blur-[80px] animate-blob"></div>
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 rounded-full mix-blend-multiply blur-[80px] animate-blob animation-delay-2000 ml-20 mt-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-3 flex justify-center items-center gap-2">
            Validate Your Idea <Zap className="w-6 h-6 text-yellow-500" />
          </h1>
          <p className="text-slate-600">Provide details about your project to get a comprehensive AI analysis.</p>
        </div>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/90 backdrop-blur-sm relative z-10 overflow-hidden ring-1 ring-slate-200/50">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-primary-500 to-blue-500"></div>
          
          <CardHeader className="pt-8 pb-4">
            <CardTitle>Idea Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-7">
              
              <div className="space-y-3">
                <Input
                  label="Idea Title"
                  placeholder={placeholderText}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  className="transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                />
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-slate-400 py-1.5 font-medium uppercase tracking-wider">Suggestions:</span>
                  {SUGGESTION_CHIPS.map(chip => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100/80 text-slate-600 hover:bg-primary-50 hover:text-primary-600 border border-slate-200/50 hover:border-primary-200 transition-all hover:scale-105 active:scale-95"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Textarea
                    label="Description"
                    placeholder="Describe the problem you're solving and how your product works..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={errors.description}
                    className="transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                  />
                  <div className={`absolute bottom-3 right-3 text-xs font-medium px-2 py-0.5 rounded-md ${formData.description.length >= MAX_CHARS ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'}`}>
                    {formData.description.length}/{MAX_CHARS}
                  </div>
                </div>

                {/* Live Strength Indicator */}
                <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-wide">
                      <Activity className="w-3.5 h-3.5" /> Idea Strength
                    </span>
                    <span className={`text-xs font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${strength.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${strength.percent}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </div>

              <Input
                label="Target Audience"
                placeholder="e.g., Freelance designers, Small local business owners"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                error={errors.targetAudience}
                className="transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
              />

              <div className="pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gap-2 text-base bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300 hover:from-green-400 hover:to-emerald-400 relative overflow-hidden group"
                >
                   {/* Shimmer Effect wrapper inside button */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] transition-transform duration-1000 group-hover:translate-x-[200%] pointer-events-none"></div>
                  
                  <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 font-bold tracking-wide">Analyze with AI</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
