import { Clock, BookOpen, ExternalLink } from 'lucide-react';

export default function TruthReport({ report }) {
  if (!report) return null;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="bg-ink text-surface p-6 flex items-center justify-between">
        <h3 className="font-headline font-bold text-2xl tracking-wide flex items-center gap-3">
          <BookOpen className="w-6 h-6" /> What Really Happened
        </h3>
        <span className="font-mono text-xs opacity-70 uppercase tracking-widest">Verified Report</span>
      </div>

      <div className="p-8 md:p-12">
        {/* Newspaper style drop cap for the narrative */}
        <div className="font-body text-lg leading-relaxed text-ink/90 prose-p:mb-6 first-letter:text-7xl first-letter:font-headline first-letter:font-bold first-letter:text-ink first-letter:mr-3 first-letter:float-left first-letter:leading-none">
          {report.what_really_happened.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {report.timeline && report.timeline.length > 0 && (
          <div className="mt-12">
            <h4 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-ink/60" /> Verified Timeline
            </h4>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {report.timeline.map((event, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-ink text-surface shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="font-mono text-xs">{idx + 1}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-bg/50 shadow-sm">
                    <time className="font-mono text-xs text-ink/50 font-bold tracking-wider uppercase">{event.date}</time>
                    <p className="font-body text-ink mt-1">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {report.original_sources && report.original_sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-ink/50 mb-4">
              Read Original Verified Reporting
            </h4>
            <div className="flex flex-col gap-3">
              {report.original_sources.map((source, idx) => (
                <a 
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-ink/50 transition-colors group bg-surface"
                >
                  <span className="font-body font-medium text-ink">{source.title}</span>
                  <ExternalLink className="w-5 h-5 text-ink/30 group-hover:text-ink transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
