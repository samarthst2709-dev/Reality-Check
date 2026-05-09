import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Info, ShieldAlert, Share2, Download, Flag } from 'lucide-react';

const VERDICT_CONFIG = {
  REAL: {
    gradient: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-500',
    textBadge: 'text-white',
    accent: 'text-emerald-700',
    bar: 'from-emerald-400 to-teal-500',
    icon: CheckCircle,
    label: 'REAL',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
  },
  FAKE: {
    gradient: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    badge: 'bg-red-500',
    textBadge: 'text-white',
    accent: 'text-red-700',
    bar: 'from-red-400 to-rose-500',
    icon: XCircle,
    label: 'FAKE',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-100',
  },
  MISLEADING: {
    gradient: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    badge: 'bg-amber-500',
    textBadge: 'text-white',
    accent: 'text-amber-800',
    bar: 'from-amber-400 to-orange-500',
    icon: AlertTriangle,
    label: 'MISLEADING',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
  },
  UNVERIFIED: {
    gradient: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    badge: 'bg-blue-500',
    textBadge: 'text-white',
    accent: 'text-blue-800',
    bar: 'from-blue-400 to-indigo-500',
    icon: Info,
    label: 'UNVERIFIED',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
  },
  SATIRE: {
    gradient: 'from-purple-50 to-violet-50',
    border: 'border-purple-200',
    badge: 'bg-purple-500',
    textBadge: 'text-white',
    accent: 'text-purple-800',
    bar: 'from-purple-400 to-violet-500',
    icon: ShieldAlert,
    label: 'SATIRE',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-100',
  }
};

export default function VerdictBanner({ verdict }) {
  if (!verdict) return null;

  const config = VERDICT_CONFIG[verdict.overall] || VERDICT_CONFIG.UNVERIFIED;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full bg-gradient-to-br ${config.gradient} border ${config.border} rounded-2xl overflow-hidden shadow-lg mb-8`}
    >
      <div className="p-8">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className={`${config.iconBg} p-4 rounded-2xl shrink-0`}
          >
            <Icon className={`w-10 h-10 ${config.iconColor}`} />
          </motion.div>

          <div className="flex-1">
            {/* Badge + Title */}
            <div className="flex items-center gap-3 mb-3">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`px-3 py-1 ${config.badge} ${config.textBadge} text-xs font-bold rounded-full tracking-widest uppercase`}
              >
                {config.label}
              </motion.span>
              <span className="text-slate-400 text-sm font-medium">Verdict</span>
            </div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className={`font-headline font-bold text-3xl mb-3 ${config.accent}`}
            >
              This post is {config.label}
            </motion.h2>

            {/* Confidence bar */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-slate-500 font-medium shrink-0">Confidence</span>
              <div className="flex-1 h-2.5 bg-white/70 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${verdict.confidence}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${config.bar} rounded-full`}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={`text-sm font-bold font-mono ${config.accent} shrink-0`}
              >
                {verdict.confidence}%
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-700 text-base leading-relaxed max-w-3xl"
            >
              {verdict.summary}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Actions bar */}
      <div className="border-t border-white/60 bg-white/40 px-8 py-3 flex flex-wrap gap-2">
        {[
          { icon: Share2, label: 'Share Verdict' },
          { icon: Download, label: 'Download Report' },
          { icon: Flag, label: 'Report to Platform', right: true },
        ].map(({ icon: BtnIcon, label, right }) => (
          <button
            key={label}
            className={`flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-700 px-4 py-2 rounded-full hover:bg-white transition-all ${right ? 'ml-auto' : ''}`}
          >
            <BtnIcon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
