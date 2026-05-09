import { ExternalLink, Heart, MessageCircle, Share } from 'lucide-react';

export default function OriginalPostCard({ post }) {
  if (!post) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm mb-8 font-body">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-border rounded-full flex items-center justify-center font-bold text-ink/50">
            {post.author?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="font-bold text-ink">{post.author}</div>
            <div className="text-sm text-ink/60">{post.date} • {post.platform}</div>
          </div>
        </div>
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-ink/60 hover:text-ink transition-colors flex items-center gap-1 text-sm"
        >
          View original <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {post.media && post.media.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden border border-border bg-ink/5 relative">
          {post.media.map((item, idx) => (
            <div key={idx} className="relative">
              {item.type === 'youtube_video' ? (
                <div className="aspect-video w-full">
                  <iframe 
                    src={item.url} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : item.type === 'instagram_embed' ? (
                <div className="w-full flex justify-center bg-white py-4 rounded-lg">
                  <iframe 
                    src={item.url} 
                    className="w-[400px] h-[600px] border-none rounded shadow-sm"
                    scrolling="no"
                    allowTransparency="true"
                  ></iframe>
                </div>
              ) : item.type === 'video' ? (
                <video 
                  src={item.url} 
                  controls 
                  className="w-full h-auto max-h-[400px] object-cover bg-black"
                />
              ) : (
                <img 
                  src={item.url || item.thumbnail} 
                  alt="Post media" 
                  className="w-full h-auto max-h-[400px] object-contain bg-black/20"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-ink whitespace-pre-wrap mb-4">
        {post.caption}
      </p>

      {post.engagement && (
        <div className="flex gap-6 text-ink/60 text-sm border-t border-border pt-4">
          <div className="flex items-center gap-1"><Heart className="w-4 h-4" /> {post.engagement.likes}</div>
          <div className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.engagement.comments}</div>
          <div className="flex items-center gap-1"><Share className="w-4 h-4" /> {post.engagement.shares}</div>
        </div>
      )}
    </div>
  );
}
