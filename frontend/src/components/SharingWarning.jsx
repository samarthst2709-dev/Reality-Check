import { useState } from 'react';
import { AlertOctagon, X, Share2, Flag, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SharingWarning({ verdict, platform }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!verdict || !['FAKE', 'MISLEADING'].includes(verdict.overall) || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface border-2 border-accent-red rounded-xl p-6 shadow-lg mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-accent-red" />
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-ink/40 hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 pl-4">
          <div className="bg-accent-red/10 p-3 rounded-full text-accent-red mt-1 shrink-0">
            <AlertOctagon className="w-8 h-8" />
          </div>
          
          <div>
            <h3 className="font-headline font-bold text-2xl text-accent-red mb-2">
              Before You Share This
            </h3>
            
            <p className="font-body text-ink/80 text-lg leading-relaxed mb-6">
              This post contains information that has been independently verified as {verdict.overall.toLowerCase()}. 
              Sharing false or misleading content can cause real-world harm and damage your credibility.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-accent-red text-surface font-bold rounded-full hover:bg-accent-red/90 transition-colors">
                <Flag className="w-4 h-4" /> Report on {platform || 'Platform'}
              </button>
              
              <button className="flex items-center gap-2 px-5 py-2.5 bg-ink text-surface font-bold rounded-full hover:bg-ink/90 transition-colors">
                <Share2 className="w-4 h-4" /> Share the Correction Instead
              </button>
              
              <button className="flex items-center gap-2 px-5 py-2.5 bg-surface border-2 border-border text-ink font-bold rounded-full hover:border-ink/30 transition-colors">
                <ShieldAlert className="w-4 h-4 text-ink/50" /> Learn More
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
