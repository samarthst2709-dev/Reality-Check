import { ShieldCheck, ShieldAlert, ShieldX, ExternalLink } from 'lucide-react';

const TIER_CONFIG = {
  'HIGHLY CREDIBLE': { color: 'text-accent-green', bg: 'bg-accent-green/10', icon: ShieldCheck },
  'CREDIBLE': { color: 'text-accent-green', bg: 'bg-accent-green/5', icon: ShieldCheck },
  'QUESTIONABLE': { color: 'text-accent-amber', bg: 'bg-accent-amber/10', icon: ShieldAlert },
  'UNRELIABLE': { color: 'text-accent-red', bg: 'bg-accent-red/10', icon: ShieldX }
};

export default function SourcesPanel({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="font-headline font-bold text-2xl mb-6">Sources & Evidence</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, idx) => {
          const config = TIER_CONFIG[source.credibility_tier] || TIER_CONFIG['CREDIBLE'];
          const Icon = config.icon;

          return (
            <a 
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-surface border border-border rounded-xl hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.color} ${config.bg}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {source.credibility_tier}
                </span>
                <ExternalLink className="w-4 h-4 text-ink/30 group-hover:text-ink/70 transition-colors" />
              </div>
              
              <h4 className="font-body font-bold text-ink leading-tight mb-2 line-clamp-2">
                {source.name}
              </h4>
              
              <div className="font-mono text-xs text-ink/50 uppercase tracking-widest">
                {source.type}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
