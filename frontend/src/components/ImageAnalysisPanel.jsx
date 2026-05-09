import { Image as ImageIcon, AlertTriangle, Search, CheckCircle2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const VERDICT_STYLES = {
  AUTHENTIC: { border: 'border-emerald-300', badge: 'bg-emerald-500', icon: CheckCircle2, iconColor: 'text-emerald-500' },
  MISUSED: { border: 'border-red-300', badge: 'bg-red-500', icon: AlertTriangle, iconColor: 'text-red-500' },
  MANIPULATED: { border: 'border-red-300', badge: 'bg-red-500', icon: AlertTriangle, iconColor: 'text-red-500' },
  UNVERIFIABLE: { border: 'border-amber-300', badge: 'bg-amber-500', icon: Search, iconColor: 'text-amber-500' },
};

export default function ImageAnalysisPanel({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden h-full"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-purple-50/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Eye className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">Visual Forensics</h3>
          <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
            {images.length} media item{images.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {images.map((img, idx) => {
          const style = VERDICT_STYLES[img.verdict] || VERDICT_STYLES.UNVERIFIABLE;
          const VerdictIcon = style.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col xl:flex-row gap-4"
            >
              {/* Thumbnail */}
              <div className="w-full xl:w-2/5 shrink-0">
                <div className={`relative rounded-xl overflow-hidden border-2 aspect-square bg-slate-100 ${style.border}`}>
                  {img.type === 'youtube_video' ? (
                    <iframe src={img.url} title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-full h-full pointer-events-none" />
                  ) : img.type === 'instagram_embed' ? (
                    <iframe src={img.url} className="w-full h-full border-none pointer-events-none bg-white" scrolling="no" />
                  ) : img.type === 'video' ? (
                    <video src={img.url} controls className="w-full h-full object-cover" />
                  ) : img.url ? (
                    <img src={img.url} alt="Analyzed media" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                  {/* Verdict badge */}
                  <span className={`absolute top-2 right-2 px-2 py-1 ${style.badge} text-white text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1`}>
                    <VerdictIcon className="w-3 h-3" />
                    {img.verdict}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="xl:w-3/5 space-y-3 text-sm">
                {/* Context comparison */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Post Claims</span>
                    <p className="text-slate-700 leading-relaxed">{img.claimed_context}</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${img.context_match === 'MISMATCH' ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Actually Shows</span>
                    <p className="font-medium text-slate-700 leading-relaxed">{img.description}</p>
                  </div>
                </div>

                {/* Manipulation signals */}
                {img.manipulation_signals && img.manipulation_signals.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-2">
                      <AlertTriangle className="w-3 h-3 text-red-400" /> Signals
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {img.manipulation_signals.map((sig, i) => (
                        <span key={i} className="px-2.5 py-1 bg-red-50 text-red-600 font-medium rounded-lg text-xs border border-red-100">
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Origin */}
                {img.actual_origin && (
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-3 rounded-xl">
                    <Search className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-0.5">Origin Found</span>
                      <p className="text-slate-700">{img.actual_origin}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
