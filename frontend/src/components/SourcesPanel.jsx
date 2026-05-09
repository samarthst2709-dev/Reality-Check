import { ShieldCheck, ShieldAlert, ShieldX, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const TIER_CONFIG = {
  'HIGHLY CREDIBLE': { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', icon: ShieldCheck },
  'CREDIBLE':        { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-400', icon: ShieldCheck },
  'QUESTIONABLE':    { color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200',   dot: 'bg-amber-500',   icon: ShieldAlert },
  'UNRELIABLE':      { color: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200',     dot: 'bg-red-500',     icon: ShieldX },
};

export default function SourcesPanel({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <h3 className="font-headline font-bold text-2xl text-slate-800">Sources & Evidence</h3>
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          {sources.length} source{sources.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, idx) => {
          const config = TIER_CONFIG[source.credibility_tier] || TIER_CONFIG['CREDIBLE'];
          const Icon = config.icon;

          return (
            <motion.a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="block p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${config.color} ${config.bg} border ${config.border}`}>
                  <Icon className="w-3 h-3" />
                  {source.credibility_tier}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
              </div>

              <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                {source.name}
              </h4>

              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                  {source.type}
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
