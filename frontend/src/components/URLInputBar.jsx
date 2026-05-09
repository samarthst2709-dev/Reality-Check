import { useState } from 'react';
import { Link, ArrowRight, Clipboard, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLATFORMS = [
  { name: 'Instagram', color: '#E1306C', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
  )},
  { name: 'Facebook', color: '#1877F2', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  )},
  { name: 'X', color: '#000', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" /></svg>
  )},
  { name: 'TikTok', color: '#FE2C55', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
  )},
  { name: 'YouTube', color: '#FF0000', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
  )},
  { name: 'LinkedIn', color: '#0A66C2', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
  )},
  { name: 'Any URL', color: '#64748B', icon: <Link className="w-3 h-3 text-slate-500" /> },
];

export default function URLInputBar({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [pasted, setPasted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) onSubmit(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 1500);
    } catch (err) {
      console.error('Clipboard read failed:', err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-14">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="relative"
          animate={{
            boxShadow: isFocused
              ? '0 0 0 3px rgba(79,70,229,0.15), 0 8px 32px rgba(79,70,229,0.12)'
              : '0 4px 20px rgba(15,23,42,0.08)',
          }}
          transition={{ duration: 0.2 }}
          style={{ borderRadius: '100px' }}
        >
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <motion.div animate={{ rotate: isLoading ? 360 : 0 }} transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}>
              <Search className="w-5 h-5 text-indigo-400" />
            </motion.div>
          </div>

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste a social media URL to fact-check..."
            className="w-full pl-14 pr-44 py-4 h-[62px] bg-white border-2 border-slate-200 rounded-full text-slate-800 font-body text-base focus:outline-none focus:border-indigo-400 transition-all placeholder:text-slate-400"
            required
          />

          <div className="absolute inset-y-0 right-2 flex items-center gap-1.5">
            <AnimatePresence>
              <motion.button
                type="button"
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-indigo-600 text-sm transition-colors rounded-full hover:bg-indigo-50"
                whileTap={{ scale: 0.95 }}
                title="Paste from clipboard"
              >
                <Clipboard className="w-4 h-4" />
                {pasted ? (
                  <motion.span
                    key="pasted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald-600 font-medium"
                  >
                    Pasted!
                  </motion.span>
                ) : (
                  <span>Paste</span>
                )}
              </motion.button>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(79,70,229,0.4)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading || !url.trim()}
              className="h-[46px] px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-all"
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  Analyzing...
                </>
              ) : (
                <>Analyze <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.form>

      {/* Platform chips */}
      <motion.div
        className="mt-5 flex flex-wrap justify-center gap-2 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-slate-400 text-xs self-center">Supports:</span>
        {PLATFORMS.map((p, i) => (
          <motion.span
            key={p.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.05 }}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-full flex items-center gap-1.5 text-xs text-slate-600 font-medium shadow-sm hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 cursor-default transition-all"
          >
            {p.icon}
            {p.name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
