import { Clock, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TruthReport({ report }) {
  if (!report) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden mb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-5 flex items-center justify-between">
        <h3 className="font-headline font-bold text-xl text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          What Really Happened
        </h3>
        <span className="text-white/60 text-xs font-medium uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
          Verified Report
        </span>
      </div>

      <div className="p-8 md:p-10">
        {/* Narrative with drop-cap */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed first-letter:text-6xl first-letter:font-headline first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
          {report.what_really_happened.split('\n\n').map((para, idx) => (
            <p key={idx} className="mb-4 text-slate-700">{para}</p>
          ))}
        </div>

        {/* Timeline */}
        {report.timeline && report.timeline.length > 0 && (
          <div className="mt-10">
            <h4 className="font-semibold text-slate-800 text-base mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              Verified Timeline
            </h4>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-purple-300 to-transparent" />

              <div className="space-y-5">
                {report.timeline.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex gap-4 relative"
                  >
                    {/* Dot */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md z-10">
                      {idx + 1}
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
                      <time className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{event.date}</time>
                      <p className="text-slate-700 text-sm mt-1 leading-relaxed">{event.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Original sources */}
        {report.original_sources && report.original_sources.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Read Original Verified Reporting
            </h4>
            <div className="flex flex-col gap-2.5">
              {report.original_sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                >
                  <span className="font-medium text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">
                    {source.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0 ml-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
