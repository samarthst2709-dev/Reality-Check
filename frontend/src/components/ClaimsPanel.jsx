import { useState } from 'react';
import { ChevronDown, ExternalLink, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VERDICT_ICONS = {
  TRUE: { icon: CheckCircle2, color: 'text-accent-green', border: 'border-accent-green' },
  FALSE: { icon: XCircle, color: 'text-accent-red', border: 'border-accent-red' },
  MISLEADING: { icon: AlertTriangle, color: 'text-accent-amber', border: 'border-accent-amber' },
  UNVERIFIED: { icon: Info, color: 'text-accent-blue', border: 'border-accent-blue' }
};

export default function ClaimsPanel({ claims }) {
  if (!claims || claims.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-border bg-ink/5">
        <h3 className="font-headline font-bold text-xl flex items-center gap-2">
          Claims Analysis
        </h3>
      </div>
      <div className="divide-y divide-border">
        {claims.map((claim, idx) => (
          <ClaimItem key={claim.id || idx} claim={claim} defaultOpen={idx === 0} />
        ))}
      </div>
    </div>
  );
}

function ClaimItem({ claim, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = VERDICT_ICONS[claim.verdict] || VERDICT_ICONS.UNVERIFIED;
  const Icon = config.icon;

  return (
    <div className={`border-l-4 ${config.border} transition-colors`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-start gap-4 text-left hover:bg-ink/5 transition-colors"
      >
        <Icon className={`w-6 h-6 shrink-0 mt-1 ${config.color}`} />
        <div className="flex-1 font-body">
          <p className="font-medium text-ink leading-snug">{claim.text}</p>
        </div>
        <ChevronDown className={`w-5 h-5 shrink-0 text-ink/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-bg/50"
          >
            <div className="p-4 pl-14 pr-6 pb-6 space-y-4 font-body">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">Explanation</span>
                <p className="text-ink text-sm leading-relaxed">{claim.explanation}</p>
              </div>

              {claim.correction && (
                <div className="bg-highlight/50 p-4 rounded-lg border border-highlight border-opacity-50">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-amber block mb-1">The Truth</span>
                  <p className="text-ink font-medium leading-relaxed">{claim.correction}</p>
                </div>
              )}

              {claim.sources && claim.sources.length > 0 && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-2">Sources</span>
                  <div className="flex flex-wrap gap-2">
                    {claim.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-full text-xs font-medium hover:border-ink transition-colors"
                      >
                        {source.title} <ExternalLink className="w-3 h-3 text-ink/50" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
