import { useState } from 'react';
import { Search, Link, ArrowRight, Clipboard } from 'lucide-react';
import { motion } from 'framer-motion';

const getBrandIcon = (name) => {
  switch (name) {
    case 'Instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      );
    case 'Facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      );
    case 'X':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
      );
    case 'TikTok':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
      );
    case 'YouTube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
      );
    case 'LinkedIn':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      );
    case 'Any URL':
      return <Link className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};

export default function URLInputBar({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-16">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink/50">
          <Link className="h-5 w-5" />
        </div>
        
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Instagram, Facebook, Twitter, YouTube, TikTok link here..."
          className="w-full pl-12 pr-40 py-4 h-[60px] bg-surface/60 backdrop-blur-md border border-white/10 rounded-full text-ink font-body text-lg focus:outline-none focus:border-[var(--color-cyan-glow)]/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all shadow-xl"
          required
        />

        <div className="absolute inset-y-0 right-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="p-2 text-ink/50 hover:text-ink transition-colors hidden sm:block"
            title="Paste from clipboard"
          >
            <Clipboard className="h-5 w-5" />
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px 5px rgba(0, 240, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !url.trim()}
            className="h-[44px] px-6 bg-[var(--color-cyan-glow)] text-[#0B0E14] rounded-full font-body font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00d8e5] transition-all shadow-[0_0_15px_3px_rgba(0,240,255,0.3)] border border-[#00f0ff]/50"
          >
            Analyze <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-ink/60 font-body">
        <span className="flex items-center">Supported:</span>
        {['Instagram', 'Facebook', 'X', 'TikTok', 'YouTube', 'LinkedIn', 'Any URL'].map(platform => (
          <span key={platform} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-full flex items-center gap-1.5">
            {getBrandIcon(platform)}
            {platform}
          </span>
        ))}
      </div>
    </div>
  );
}
