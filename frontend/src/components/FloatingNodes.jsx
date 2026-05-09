import { motion, AnimatePresence } from 'framer-motion';

const FloatingNodes = () => {
  const floatingCards = [
    {
      position: 'left-[3%] top-[12%]',
      delay: 0,
      content: (
        <div className="w-44 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <div>
              <div className="h-2 w-16 bg-slate-200 rounded mb-1" />
              <div className="h-1.5 w-10 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded" />
            <div className="h-1.5 w-4/5 bg-slate-100 rounded" />
            <div className="h-1.5 w-3/5 bg-slate-100 rounded" />
          </div>
          <div className="mt-2 h-5 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-blue-600">VERIFIED</span>
          </div>
        </div>
      )
    },
    {
      position: 'left-[2%] bottom-[18%]',
      delay: 1.2,
      content: (
        <div className="w-52 p-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
            <div>
              <div className="h-2 w-20 bg-slate-200 rounded mb-1" />
              <div className="h-1.5 w-14 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="space-y-1 mb-2">
            {[85, 65, 92].map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="h-1.5 bg-indigo-200 rounded" style={{ width: `${w}%` }} />
                <span className="text-[8px] text-slate-400">{w}%</span>
              </div>
            ))}
          </div>
          <div className="h-6 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center">
            <span className="text-[9px] font-bold text-emerald-600">✓ Analysis Complete</span>
          </div>
        </div>
      )
    },
    {
      position: 'right-[3%] top-[15%]',
      delay: 0.6,
      content: (
        <div className="w-52 p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Fact Score</span>
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">✓</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">94%</div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '94%' }}
              transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
            />
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded mb-1" />
          <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
        </div>
      )
    },
    {
      position: 'right-[2%] bottom-[20%]',
      delay: 1.8,
      content: (
        <div className="w-56 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-[10px]">⚠</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-600">Sources Checked</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {['Reuters', 'AP News', 'BBC', 'Snopes'].map((src) => (
              <div key={src} className="h-5 bg-slate-50 border border-slate-200 rounded flex items-center justify-center">
                <span className="text-[8px] font-medium text-slate-500">{src}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[9px] text-slate-400 text-center">+48 more sources</div>
        </div>
      )
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Background blobs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)',
          animation: 'blob-morph 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
          animation: 'blob-morph 10s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute top-[30%] left-[40%] w-[350px] h-[350px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
          animation: 'blob-morph 14s ease-in-out infinite 2s',
        }}
      />

      {/* SVG connector lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lineLeft" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineRight2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 500,270 C 380,270 280,170 150,130"
          fill="none" stroke="url(#lineLeft)" strokeWidth="1.5" strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 500,330 C 380,330 280,430 150,460"
          fill="none" stroke="url(#lineLeft)" strokeWidth="1.5" strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 700,270 C 820,270 920,160 1050,140"
          fill="none" stroke="url(#lineRight)" strokeWidth="1.5" strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.9, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 700,330 C 820,330 920,420 1050,450"
          fill="none" stroke="url(#lineRight2)" strokeWidth="1.5" strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Floating cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute ${card.position} glass-card rounded-2xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: card.delay },
            y: {
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: card.delay,
            },
          }}
        >
          {card.content}
        </motion.div>
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,70,229,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,70,229,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

export default FloatingNodes;
