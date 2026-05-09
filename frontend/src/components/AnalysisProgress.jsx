import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Circle, Zap } from 'lucide-react';

const STEPS = [
  { label: 'Fetching post content', emoji: '📡', color: 'indigo' },
  { label: 'Extracting claims from caption & images', emoji: '🔎', color: 'blue' },
  { label: 'Analyzing photos and videos', emoji: '🖼️', color: 'purple' },
  { label: 'Searching news databases & fact-checkers', emoji: '🌐', color: 'teal' },
  { label: 'Synthesizing verdict', emoji: '⚖️', color: 'amber' },
  { label: 'Building report', emoji: '📋', color: 'emerald' },
];

const COLOR_MAP = {
  indigo: { active: 'text-indigo-600', complete: 'text-indigo-500', bg: 'bg-indigo-100', bar: 'bg-indigo-500' },
  blue: { active: 'text-blue-600', complete: 'text-blue-500', bg: 'bg-blue-100', bar: 'bg-blue-500' },
  purple: { active: 'text-purple-600', complete: 'text-purple-500', bg: 'bg-purple-100', bar: 'bg-purple-500' },
  teal: { active: 'text-teal-600', complete: 'text-teal-500', bg: 'bg-teal-100', bar: 'bg-teal-500' },
  amber: { active: 'text-amber-600', complete: 'text-amber-500', bg: 'bg-amber-100', bar: 'bg-amber-500' },
  emerald: { active: 'text-emerald-600', complete: 'text-emerald-500', bg: 'bg-emerald-100', bar: 'bg-emerald-500' },
};

export default function AnalysisProgress({ progress, currentStepIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto my-12"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="font-semibold text-white text-lg">AI Analysis in Progress</h3>
            </div>
            <span className="font-mono text-white/80 text-sm font-medium">{Math.round(progress)}%</span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut', duration: 0.4 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-3">
          {STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isComplete = index < currentStepIndex;
            const colors = COLOR_MAP[step.color];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isComplete ? 0.65 : isActive ? 1 : 0.35,
                  x: 0,
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? `${colors.bg} border border-${step.color}-200` : ''}`}
              >
                {/* Icon */}
                <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                  {isComplete ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <CheckCircle2 className={`w-6 h-6 ${colors.complete}`} />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 className={`w-6 h-6 ${colors.active}`} />
                    </motion.div>
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300" />
                  )}
                </div>

                {/* Label */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-base">{step.emoji}</span>
                  <span className={`text-sm font-medium ${isActive ? colors.active : isComplete ? 'text-slate-500' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="flex gap-0.5 ml-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.div
                          key={d}
                          className={`w-1 h-1 rounded-full ${colors.bar}`}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.2 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
