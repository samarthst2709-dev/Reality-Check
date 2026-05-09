import { useState } from 'react';
import { Search, Sparkles, Shield, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import URLInputBar from './components/URLInputBar';
import AnalysisProgress from './components/AnalysisProgress';
import OriginalPostCard from './components/OriginalPostCard';
import VerdictBanner from './components/VerdictBanner';
import SharingWarning from './components/SharingWarning';
import ClaimsPanel from './components/ClaimsPanel';
import ImageAnalysisPanel from './components/ImageAnalysisPanel';
import TruthReport from './components/TruthReport';
import SourcesPanel from './components/SourcesPanel';
import Modal from './components/Modal';
import FloatingNodes from './components/FloatingNodes';

// Real backend integration
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const realAnalyze = async (url, setProgress, setStep) => {
  try {
    let step = 0;
    const progressInterval = setInterval(() => {
      if (step < 5) {
        step += 1;
        setStep(step - 1);
        setProgress((step / 6) * 100);
      }
    }, 1000);

    const response = await fetch(`${API_BASE}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    clearInterval(progressInterval);

    if (!response.ok) {
      let errorMsg = 'Failed to analyze the URL.';
      try {
        const errorData = await response.json();
        if (errorData.detail) errorMsg = errorData.detail;
      } catch (e) {}
      throw new Error(errorMsg);
    }

    setStep(5);
    setProgress(100);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Analysis error:', error);
    if (error.message.includes('Failed to fetch')) {
      alert('Could not connect to the backend. Is it running on port 8000?');
    } else {
      alert('Error: ' + error.message);
    }
    return null;
  }
};

// Stats for hero section
const STATS = [
  { value: '2M+', label: 'Posts Checked' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '50+', label: 'News Sources' },
];

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isApiOpen, setIsApiOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('truthlens_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleAnalyze = async (url) => {
    setIsAnalyzing(true);
    setResult(null);
    setProgress(0);
    setStep(0);

    const data = await realAnalyze(url, setProgress, setStep);

    if (data) {
      setSearchHistory((prev) => {
        const newHistory = [url, ...prev.filter((u) => u !== url)].slice(0, 10);
        localStorage.setItem('truthlens_history', JSON.stringify(newHistory));
        return newHistory;
      });
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 500);
    } else {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F4FF] via-[#FAFAFF] to-[#F4F7FF]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="View search history"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-headline font-bold text-xl text-slate-800 tracking-tight">
              TruthLens
            </span>
          </motion.button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'How It Works', action: () => setIsHowItWorksOpen(true) },
              { label: 'About', action: () => setIsAboutOpen(true) },
              { label: 'API', action: () => setIsApiOpen(true) },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-full transition-all"
              >
                {label}
              </button>
            ))}
            <a
              href="https://chromewebstore.google.com/search/TruthLens"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Chrome Extension
            </a>
          </nav>
        </div>
      </header>

      <main className="w-full">
        {/* ── Hero Section ── */}
        <AnimatePresence>
          {!result && (
            <motion.section
              key="hero"
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.4 }}
              className="relative w-full pt-16 pb-8 overflow-hidden flex flex-col items-center justify-center min-h-[75vh]"
            >
              <FloatingNodes />

              <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-full mb-8 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered Fact Checking
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-headline font-bold text-5xl md:text-7xl tracking-tight text-slate-900 mb-5 leading-tight"
                >
                  Paste any link.{' '}
                  <span className="shimmer-text">Get the truth.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Our AI analyzes videos, images, and claims against thousands of verified
                  sources to tell you what's real and what's manipulated.
                </motion.p>

                <URLInputBar onSubmit={handleAnalyze} isLoading={isAnalyzing} />

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex justify-center gap-10 mt-6"
                >
                  {STATS.map(({ value, label }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + i * 0.08 }}
                      className="text-center"
                    >
                      <div className="font-headline font-bold text-2xl text-indigo-700">{value}</div>
                      <div className="text-xs text-slate-400 font-medium">{label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Compact search bar shown when results appear */}
        {(isAnalyzing || result) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white border-b border-slate-200 py-4 px-6"
          >
            <div className="max-w-3xl mx-auto">
              <URLInputBar onSubmit={handleAnalyze} isLoading={isAnalyzing} />
            </div>
          </motion.div>
        )}

        {/* ── Results ── */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          {isAnalyzing && (
            <AnalysisProgress progress={progress} currentStepIndex={step} />
          )}

          <AnimatePresence>
            {result && !isAnalyzing && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <OriginalPostCard post={result.post} />
                <VerdictBanner verdict={result.verdict} />
                <SharingWarning verdict={result.verdict} platform={result.post.platform} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <ClaimsPanel claims={result.claims} />
                  <ImageAnalysisPanel images={result.images} />
                </div>

                <TruthReport report={result.truth_report} />
                <SourcesPanel sources={result.sources_used} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-slate-700">TruthLens</span>
            <span>© {new Date().getFullYear()} — Fight misinformation</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="https://github.com/samarthst2709-dev/Reality-Check" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}

      {/* History */}
      <Modal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} title="Search History">
        <div className="space-y-3">
          {searchHistory.length === 0 ? (
            <p className="text-slate-400 italic text-sm">No previous searches found.</p>
          ) : (
            <ul className="space-y-2">
              {searchHistory.map((historyUrl, idx) => (
                <li
                  key={idx}
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                >
                  <span className="truncate text-sm pr-4 font-mono text-slate-600 flex-1">{historyUrl}</span>
                  <button
                    onClick={() => { setIsHistoryOpen(false); handleAnalyze(historyUrl); }}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    Analyze
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>

      {/* How It Works */}
      <Modal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} title="How TruthLens Works">
        <div className="space-y-4">
          <p className="text-slate-600">TruthLens is powered by advanced machine learning models that analyze social media posts to detect misinformation, manipulation, and misleading claims.</p>
          {[
            { num: '1', title: 'URL Extraction', body: 'We securely extract text, images, and video frames directly from the provided post URL.' },
            { num: '2', title: 'Deepfake & Alteration Detection', body: 'Our vision models analyze the media for unnatural artifacts, inconsistencies, and known manipulation techniques.' },
            { num: '3', title: 'Fact-Checking Cross-Reference', body: 'We cross-reference textual claims with a massive database of trusted news organizations and academic journals.' },
            { num: '4', title: 'Verdict Generation', body: 'An easy-to-understand verdict is generated explaining why the post is considered true, false, or misleading.' },
          ].map(({ num, title, body }) => (
            <div key={num} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                {num}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
                <p className="text-slate-500 text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* About */}
      <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} title="About TruthLens">
        <div className="space-y-4">
          <p className="text-slate-600">We built TruthLens because the internet is increasingly filled with hyper-realistic fake images, out-of-context videos, and fabricated claims.</p>
          <p className="text-slate-600">Our mission is to empower everyday users to verify information they see on their feeds before sharing it — stopping the spread of misinformation in its tracks.</p>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <h4 className="font-semibold text-indigo-800 mb-1">Our Technology</h4>
              <p className="text-slate-600 text-sm">Cutting-edge computer vision for image forensics and large language models for natural language understanding and claim verification.</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-1">Open Source & Transparency</h4>
              <p className="text-slate-600 text-sm">We believe fact-checking should be transparent. Our core verification logic is accessible via our API for researchers and journalists.</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* API */}
      <Modal isOpen={isApiOpen} onClose={() => setIsApiOpen(false)} title="TruthLens API">
        <div className="space-y-4">
          <p className="text-slate-600">Integrate our powerful fact-checking and deepfake detection engine directly into your own applications, platforms, or research workflows.</p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">Endpoint</h4>
            <code className="block bg-slate-900 text-emerald-400 p-3 rounded-lg text-sm font-mono">
              POST https://api.truthlens.com/v1/analyze
            </code>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">Request Payload</h4>
            <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "url": "https://www.instagram.com/p/..."
}`}
            </pre>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">Features</h4>
            <ul className="space-y-1.5">
              {[
                'Automatic media extraction (Video, Images, Text)',
                'Deepfake and manipulation detection scores',
                'Cross-reference against trusted fact-check databases',
                'Detailed truth report and verdict generation',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm text-slate-400">Documentation coming soon.</span>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold hover:shadow-md transition-all">
              Request Access
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
