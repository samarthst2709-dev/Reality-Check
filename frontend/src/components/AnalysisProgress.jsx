import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

const STEPS = [
  "📡 Fetching post content...",
  "🔎 Extracting claims from caption and images...",
  "🖼️ Analyzing photos and videos...",
  "🌐 Searching news databases and fact-checkers...",
  "⚖️ Synthesizing verdict...",
  "📋 Building report..."
];

export default function AnalysisProgress({ progress, currentStepIndex }) {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-surface border border-border rounded-xl shadow-sm my-12">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-headline font-semibold text-2xl text-ink">Analyzing Context</h3>
        <span className="font-mono text-ink/60">{Math.round(progress)}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-ink"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      {/* Steps list */}
      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isComplete = index < currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0.3, y: 10 }}
              animate={{ 
                opacity: isActive ? 1 : isComplete ? 0.6 : 0.3,
                y: 0
              }}
              className="flex items-center gap-3"
            >
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-accent-green" />
              ) : isActive ? (
                <Loader2 className="w-5 h-5 text-ink animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-border" />
              )}
              <span className={`font-body ${isActive ? 'font-medium text-ink' : 'text-ink/60'}`}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
