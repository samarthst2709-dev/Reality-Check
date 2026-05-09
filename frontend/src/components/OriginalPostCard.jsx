import { ExternalLink, Heart, MessageCircle, Share } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OriginalPostCard({ post }) {
  if (!post) return null;

  const initials = post.author?.[0]?.toUpperCase() || '?';
  const platformColors = {
    Instagram: 'from-pink-500 to-purple-600',
    Facebook: 'from-blue-600 to-blue-500',
    YouTube: 'from-red-500 to-red-600',
    Twitter: 'from-slate-800 to-slate-700',
    X: 'from-slate-800 to-slate-700',
    TikTok: 'from-pink-500 to-rose-600',
    LinkedIn: 'from-blue-700 to-blue-600',
  };
  const avatarGradient = platformColors[post.platform] || 'from-indigo-500 to-purple-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md mb-8"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
            {initials}
          </div>
          <div>
            <div className="font-semibold text-slate-800">{post.author || 'Unknown'}</div>
            <div className="text-xs text-slate-400">{post.date} · <span className="font-medium text-slate-500">{post.platform}</span></div>
          </div>
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors px-3 py-1.5 rounded-full hover:bg-indigo-50"
        >
          View Original <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="border-b border-slate-100 overflow-hidden bg-slate-50">
          {post.media.map((item, idx) => (
            <div key={idx}>
              {item.type === 'youtube_video' ? (
                <div className="aspect-video w-full">
                  <iframe src={item.url} title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </div>
              ) : item.type === 'instagram_embed' ? (
                <div className="w-full flex justify-center bg-white py-4">
                  <iframe src={item.url} className="w-[400px] h-[600px] border-none rounded-xl shadow-sm" scrolling="no" allowTransparency="true" />
                </div>
              ) : item.type === 'video' ? (
                <video src={item.url} controls className="w-full h-auto max-h-[400px] object-cover" />
              ) : (
                <img src={item.url || item.thumbnail} alt="Post media" className="w-full h-auto max-h-[400px] object-contain" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Caption */}
      <div className="px-6 py-4">
        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">{post.caption}</p>
      </div>

      {/* Engagement */}
      {post.engagement && (
        <div className="px-6 py-3 border-t border-slate-100 flex gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-default">
            <Heart className="w-4 h-4" /> <span className="font-medium">{post.engagement.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-default">
            <MessageCircle className="w-4 h-4" /> <span className="font-medium">{post.engagement.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
            <Share className="w-4 h-4" /> <span className="font-medium">{post.engagement.shares}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
