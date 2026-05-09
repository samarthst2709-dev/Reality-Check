import { Image as ImageIcon, AlertTriangle, Search, CheckCircle2 } from 'lucide-react';

const VERDICT_STYLES = {
  AUTHENTIC: 'border-accent-green',
  MISUSED: 'border-accent-red',
  MANIPULATED: 'border-accent-red',
  UNVERIFIABLE: 'border-accent-amber'
};

export default function ImageAnalysisPanel({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-border bg-ink/5">
        <h3 className="font-headline font-bold text-xl flex items-center gap-2">
          Visual Forensics
        </h3>
      </div>
      
      <div className="p-6 space-y-8">
        {images.map((img, idx) => (
          <div key={idx} className="flex flex-col xl:flex-row gap-6">
            <div className="w-full xl:w-1/3 shrink-0">
              <div className={`relative rounded-lg overflow-hidden border-2 aspect-square bg-ink/5 ${VERDICT_STYLES[img.verdict] || 'border-border'}`}>
                {img.type === 'youtube_video' ? (
                  <iframe 
                    src={img.url} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    className="w-full h-full pointer-events-none"
                  ></iframe>
                ) : img.type === 'instagram_embed' ? (
                  <iframe 
                    src={img.url} 
                    className="w-full h-full border-none pointer-events-none bg-white"
                    scrolling="no"
                  ></iframe>
                ) : img.type === 'video' ? (
                  <video 
                    src={img.url} 
                    controls 
                    className="w-full h-full object-cover"
                  />
                ) : img.url ? (
                  <img src={img.url} alt="Analyzed media" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-ink/20" />
                  </div>
                )}
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-ink/80 text-surface text-xs font-bold rounded backdrop-blur-sm shadow-sm">
                  {img.verdict}
                </span>
              </div>
            </div>

            <div className="w-full xl:w-2/3 space-y-4 font-body text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg p-4 rounded-lg border border-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">What Post Claims</span>
                  <p className="text-ink leading-relaxed">{img.claimed_context}</p>
                </div>
                <div className={`p-4 rounded-lg border ${img.context_match === 'MISMATCH' ? 'bg-accent-red/5 border-accent-red/20' : 'bg-accent-green/5 border-accent-green/20'}`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">What It Actually Shows</span>
                  <p className="font-medium text-ink leading-relaxed">{img.description}</p>
                </div>
              </div>

              {img.manipulation_signals && img.manipulation_signals.length > 0 && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Manipulation Signals
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {img.manipulation_signals.map((sig, i) => (
                      <span key={i} className="px-3 py-1 bg-accent-red/10 text-accent-red font-medium rounded text-xs border border-accent-red/20">
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {img.actual_origin && (
                <div className="flex items-start gap-2 bg-highlight/30 p-3 rounded border border-highlight/50">
                  <Search className="w-4 h-4 text-accent-amber mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-ink/70">Original Source Found:</span>
                    <p className="text-ink">{img.actual_origin}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
