import { useState } from 'react';
import { ChevronDown, ExternalLink, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VERDICT_CONFIG = {
  TRUE: {
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-l-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700',
    label: 'TRUE',
  },
  FALSE: {
    icon: XCircle,
    iconColor: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-l-red-400',
    badge: 'bg-red-100 text-red-700',
    label: 'FALSE',
  },
  MISLEADING: {
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-l-amber-400',
    badge: 'bg-amber-100 text-amber-700',
    label: 'MISLEADING',
  },
  UNVERIFIED: {
    icon: Info,
    iconColor: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-l-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    label: 'UNVERIFIED',
  },
};

export default function ClaimsPanel({ claims }) {
  if (!claims || claims.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden h-full"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Info className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">Claims Analysis</h3>
          <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
            {claims.length} claim{claims.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {claims.map((claim, idx) => (
          <ClaimItem key={claim.id || idx} claim={claim} defaultOpen={idx === 0} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

function ClaimItem({ claim, defaultOpen, index }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = VERDICT_CONFIG[claim.verdict] || VERDICT_CONFIG.UNVERIFIED;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`border-l-4 ${config.border}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-start gap-3 text-left hover:bg-slate-50 transition-colors"
      >
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${config.badge}`}>
              {config.label}
            </span>
          </div>
          <p className="text-slate-700 text-sm leading-snug font-medium">{claim.text}</p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 pt-2 pl-14 space-y-3 ${config.bg}`}>
              {/* Explanation */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Explanation</span>
                <p className="text-slate-600 text-sm leading-relaxed">{claim.explanation}</p>
              </div>

              {/* Correction */}
              {claim.correction && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-1">The Truth</span>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{claim.correction}</p>
                </div>
              )}

              {/* Sources */}
              {claim.sources && claim.sources.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Sources</span>
                  <div className="flex flex-wrap gap-2">
                    {claim.sources.map((source, i) => (
                      <a
                        key={i}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
                      >
                        {source.title} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
