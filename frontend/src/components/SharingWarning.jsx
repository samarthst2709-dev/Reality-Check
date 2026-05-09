import { useState } from 'react';
import { AlertOctagon, X, Share2, Flag, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SharingWarning({ verdict, platform }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!verdict || !['FAKE', 'MISLEADING'].includes(verdict.overall) || !isVisible) {
    return null;
  }

  const isFake = verdict.overall === 'FAKE';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className={`relative rounded-2xl border-2 overflow-hidden shadow-md mb-8 ${
            isFake ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
          }`}
        >
          {/* Top accent stripe */}
          <div className={`h-1 w-full ${isFake ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`} />

          {/* Close */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 flex items-start gap-5">
            <div className={`p-3 rounded-xl shrink-0 ${isFake ? 'bg-red-100' : 'bg-amber-100'}`}>
              <AlertOctagon className={`w-7 h-7 ${isFake ? 'text-red-500' : 'text-amber-500'}`} />
            </div>

            <div className="flex-1 pr-8">
              <h3 className={`font-semibold text-xl mb-2 ${isFake ? 'text-red-700' : 'text-amber-800'}`}>
                ⚠️ Before You Share This
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                This post contains information independently verified as{' '}
                <strong>{verdict.overall.toLowerCase()}</strong>. Sharing false or misleading content can cause
                real-world harm and damage your credibility.
              </p>

              <div className="flex flex-wrap gap-2.5">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:shadow-md ${isFake ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}>
                  <Flag className="w-4 h-4" />
                  Report on {platform || 'Platform'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all hover:shadow-md">
                  <Share2 className="w-4 h-4" />
                  Share the Correction
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-medium hover:border-slate-300 transition-all">
                  <ShieldAlert className="w-4 h-4 text-slate-400" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
