import { motion } from 'framer-motion';

const FloatingNodes = () => {
  // SVG Path animation properties
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3,
      transition: { duration: 2, ease: "easeInOut", delay: 0.5 }
    }
  };

  // Node floating animation
  const floatAnimation = (delay) => ({
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10">
      
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-cyan-glow)]/10 blur-[100px] rounded-full" />

      {/* SVG Connectors */}
      <svg className="absolute w-full h-full max-w-[1200px]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lineGradLeft" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="var(--color-cyan-glow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-cyan-glow)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradRight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--color-cyan-glow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-cyan-glow)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top Left Path */}
        <motion.path 
          d="M 500,280 C 400,280 300,150 200,150" 
          fill="none" 
          stroke="url(#lineGradLeft)" 
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Bottom Left Path */}
        <motion.path 
          d="M 500,320 C 400,320 300,450 200,450" 
          fill="none" 
          stroke="url(#lineGradLeft)" 
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Top Right Path */}
        <motion.path 
          d="M 700,280 C 800,280 900,180 1000,180" 
          fill="none" 
          stroke="url(#lineGradRight)" 
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Bottom Right Path */}
        <motion.path 
          d="M 700,320 C 800,320 900,420 1000,420" 
          fill="none" 
          stroke="url(#lineGradRight)" 
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>

      {/* Floating Cards Container - Using percentages to keep relative to center */}
      <div className="absolute w-full h-full max-w-[1200px] flex items-center justify-center">
        
        {/* Top Left Card */}
        <motion.div 
          className="absolute left-[5%] top-[15%] w-48 bg-surface/40 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl"
          animate={floatAnimation(0)}
        >
          <div className="w-6 h-6 rounded bg-accent-blue/20 flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-accent-blue rounded-full"></div>
          </div>
          <div className="h-2 w-3/4 bg-ink/20 rounded mb-1"></div>
          <div className="h-2 w-1/2 bg-ink/10 rounded mb-3"></div>
          <div className="h-1 w-full bg-ink/5 rounded"></div>
        </motion.div>

        {/* Bottom Left Card */}
        <motion.div 
          className="absolute left-[5%] bottom-[15%] w-56 bg-surface/40 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl"
          animate={floatAnimation(1)}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center">
              <div className="w-4 h-4 bg-accent-purple rounded-full"></div>
            </div>
            <div>
              <div className="h-2 w-16 bg-ink/20 rounded mb-1"></div>
              <div className="h-2 w-10 bg-ink/10 rounded"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 flex-1 border border-ink/10 rounded bg-ink/5"></div>
            <div className="h-6 flex-1 border border-ink/10 rounded bg-ink/5"></div>
          </div>
        </motion.div>

        {/* Top Right Card */}
        <motion.div 
          className="absolute right-[5%] top-[20%] w-52 bg-surface/40 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl"
          animate={floatAnimation(0.5)}
        >
           <div className="flex justify-between items-center mb-2">
            <div className="h-3 w-1/3 bg-ink/20 rounded"></div>
            <div className="w-4 h-4 rounded-full bg-accent-green"></div>
           </div>
           <div className="h-2 w-full bg-ink/10 rounded mb-1"></div>
           <div className="h-2 w-full bg-ink/10 rounded mb-1"></div>
           <div className="h-2 w-2/3 bg-ink/10 rounded"></div>
        </motion.div>

        {/* Bottom Right Card */}
        <motion.div 
          className="absolute right-[5%] bottom-[20%] w-64 bg-surface/40 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl"
          animate={floatAnimation(1.5)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 rounded bg-ink/10"></div>
            <div className="h-2 w-20 bg-ink/20 rounded"></div>
          </div>
          <div className="h-1.5 w-full bg-ink/10 rounded mb-1.5"></div>
          <div className="h-1.5 w-full bg-ink/10 rounded mb-1.5"></div>
          <div className="h-1.5 w-3/4 bg-ink/10 rounded mb-3"></div>
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-accent-blue/20 rounded text-[10px] text-accent-blue flex items-center justify-center font-bold">PASS</div>
            <div className="h-5 w-16 bg-ink/10 rounded"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default FloatingNodes;
