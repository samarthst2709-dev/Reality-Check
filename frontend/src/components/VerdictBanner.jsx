import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Info, ShieldAlert, Share2, Download, Flag } from 'lucide-react';

const VERDICT_CONFIG = {
  REAL: {
    color: 'bg-accent-green',
    text: 'text-surface',
    icon: CheckCircle,
    label: 'REAL'
  },
  FAKE: {
    color: 'bg-accent-red',
    text: 'text-surface',
    icon: XCircle,
    label: 'FAKE'
  },
  MISLEADING: {
    color: 'bg-accent-amber',
    text: 'text-surface',
    icon: AlertTriangle,
    label: 'MISLEADING'
  },
  UNVERIFIED: {
    color: 'bg-accent-blue',
    text: 'text-surface',
    icon: Info,
    label: 'UNVERIFIED'
  },
  SATIRE: {
    color: 'bg-accent-purple',
    text: 'text-surface',
    icon: ShieldAlert,
    label: 'SATIRE'
  }
};

export default function VerdictBanner({ verdict }) {
  if (!verdict) return null;
  
  const config = VERDICT_CONFIG[verdict.overall] || VERDICT_CONFIG.UNVERIFIED;
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full ${config.color} ${config.text} rounded-xl overflow-hidden shadow-lg mb-8`}
    >
      <div className="p-8">
        <div className="flex items-start gap-6">
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-surface/20 p-4 rounded-full"
          >
            <Icon className="w-12 h-12" />
          </motion.div>
          
          <div className="flex-1">
            <h2 className="font-headline font-bold text-4xl mb-2 tracking-tight">
              THIS POST IS {config.label}
            </h2>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-sm opacity-90">Confidence:</span>
              <div className="w-48 h-2 bg-surface/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${verdict.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-surface"
                />
              </div>
              <span className="font-mono text-sm font-bold">{verdict.confidence}%</span>
            </div>

            <p className="font-body text-xl opacity-90 leading-relaxed max-w-4xl">
              {verdict.summary}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-ink/10 px-8 py-4 flex flex-wrap gap-4 text-sm font-medium border-t border-surface/20">
        <button className="flex items-center gap-2 hover:bg-surface/10 px-4 py-2 rounded-full transition-colors">
          <Share2 className="w-4 h-4" /> Share Verdict
        </button>
        <button className="flex items-center gap-2 hover:bg-surface/10 px-4 py-2 rounded-full transition-colors">
          <Download className="w-4 h-4" /> Download Report
        </button>
        <button className="flex items-center gap-2 hover:bg-surface/10 px-4 py-2 rounded-full transition-colors ml-auto">
          <Flag className="w-4 h-4" /> Report to Platform
        </button>
      </div>
    </motion.div>
  );
}
