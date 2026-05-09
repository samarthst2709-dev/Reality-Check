import { useState } from 'react';
import { Search } from 'lucide-react';
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

// REAL BACKEND INTEGRATION
const realAnalyze = async (url, setProgress, setStep) => {
  try {
    // Start progress animation simulation while waiting
    let step = 0;
    const progressInterval = setInterval(() => {
      if (step < 5) { // Don't go to the last step until we get data
        step += 1;
        setStep(step - 1);
        setProgress((step / 6) * 100);
      }
    }, 1000);

    const response = await fetch('http://localhost:8000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url })
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

    // Complete the progress animation
    setStep(5);
    setProgress(100);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Analysis error:", error);
    if (error.message.includes('Failed to fetch')) {
      alert("There was an error connecting to the backend. Is it running on port 8000?");
    } else {
      alert("Error: " + error.message);
    }
    return null;
  }
};

function App() {
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
    
    // Call REAL API
    const data = await realAnalyze(url, setProgress, setStep);
    
    if (data) {
      // Save to history
      setSearchHistory(prev => {
        const newHistory = [url, ...prev.filter(u => u !== url)].slice(0, 10);
        localStorage.setItem('truthlens_history', JSON.stringify(newHistory));
        return newHistory;
      });

      // Simulate a small delay before showing results for the UX
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 500);
    } else {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsHistoryOpen(true)}
            title="View Search History"
          >
            <Search className="w-6 h-6 text-ink" />
            <span className="font-headline font-bold text-xl tracking-tight text-ink">TruthLens</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink/70">
            <button onClick={() => setIsHowItWorksOpen(true)} className="hover:text-ink transition-colors cursor-pointer">How It Works</button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-ink transition-colors cursor-pointer">About</button>
            <button onClick={() => setIsApiOpen(true)} className="hover:text-ink transition-colors cursor-pointer">API</button>
            <a 
              href="https://chromewebstore.google.com/search/TruthLens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-ink text-surface rounded-full hover:bg-ink/90 transition-colors cursor-pointer block text-center"
            >
              Chrome Extension
            </a>
          </nav>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </header>

      <main className="w-full">
        {/* Hero Section with Floating Nodes */}
        <div className="relative w-full pt-20 pb-12 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
          <FloatingNodes />
          
          <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h1 className="font-headline font-bold text-5xl md:text-7xl tracking-tight mb-4 drop-shadow-lg">
                Paste any social media URL.<br />Get the truth.
              </h1>
              <p className="font-body text-xl text-ink/60 max-w-2xl mx-auto">
                Our AI analyzes the video, images, and claims against thousands of verified sources to tell you what's real and what's manipulated.
              </p>
            </div>

            <URLInputBar onSubmit={handleAnalyze} isLoading={isAnalyzing} />
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-6">
          {isAnalyzing && (
            <AnalysisProgress progress={progress} currentStepIndex={step} />
          )}

        {result && !isAnalyzing && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out">
            <OriginalPostCard post={result.post} />
            <VerdictBanner verdict={result.verdict} />
            <SharingWarning verdict={result.verdict} platform={result.post.platform} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ClaimsPanel claims={result.claims} />
              <ImageAnalysisPanel images={result.images} />
            </div>
            
            <TruthReport report={result.truth_report} />
            <SourcesPanel sources={result.sources_used} />
          </div>
        )}
        </div>
      </main>

      {/* History Modal */}
      <Modal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        title="Search History"
      >
        <div className="space-y-4">
          {searchHistory.length === 0 ? (
            <p className="text-ink/60 italic font-body">No previous searches found.</p>
          ) : (
            <ul className="space-y-3">
              {searchHistory.map((historyUrl, idx) => (
                <li 
                  key={idx} 
                  className="bg-ink/5 p-4 rounded-xl border border-border flex items-center justify-between hover:bg-ink/10 transition-colors group"
                >
                  <span className="truncate text-sm pr-4 font-mono text-ink/80 flex-1">{historyUrl}</span>
                  <button 
                    onClick={() => {
                      setIsHistoryOpen(false);
                      handleAnalyze(historyUrl);
                    }}
                    className="px-4 py-2 bg-ink text-surface rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    Analyze
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>

      {/* How It Works Modal */}
      <Modal 
        isOpen={isHowItWorksOpen} 
        onClose={() => setIsHowItWorksOpen(false)} 
        title="How TruthLens Works"
      >
        <div className="space-y-4">
          <p>
            TruthLens is powered by advanced machine learning models that analyze the content of social media posts to detect misinformation, manipulation, and misleading claims.
          </p>
          <div className="bg-ink/5 p-4 rounded-xl border border-border">
            <h3 className="font-bold text-ink mb-2">1. URL Extraction</h3>
            <p className="text-sm">We securely extract text, images, and video frames directly from the provided post URL.</p>
          </div>
          <div className="bg-ink/5 p-4 rounded-xl border border-border">
            <h3 className="font-bold text-ink mb-2">2. Deepfake & Alteration Detection</h3>
            <p className="text-sm">Our vision models analyze the media for unnatural artifacts, inconsistencies, and known manipulation techniques.</p>
          </div>
          <div className="bg-ink/5 p-4 rounded-xl border border-border">
            <h3 className="font-bold text-ink mb-2">3. Fact-Checking Cross-Reference</h3>
            <p className="text-sm">We cross-reference textual claims with a massive database of trusted news organizations and academic journals.</p>
          </div>
          <div className="bg-ink/5 p-4 rounded-xl border border-border">
            <h3 className="font-bold text-ink mb-2">4. Verdict Generation</h3>
            <p className="text-sm">Finally, an easy-to-understand verdict is generated explaining why the post is considered true, false, or misleading.</p>
          </div>
        </div>
      </Modal>

      {/* About Modal */}
      <Modal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
        title="About TruthLens"
      >
        <div className="space-y-4">
          <p>
            We built TruthLens because the internet is increasingly filled with hyper-realistic fake images, out-of-context videos, and fabricated claims. 
          </p>
          <p>
            Our mission is to empower everyday users to easily verify the information they see on their feeds before they share it, stopping the spread of misinformation in its tracks.
          </p>
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-bold text-ink mb-2">Our Technology</h3>
            <p className="text-sm mb-4">
              We leverage cutting-edge computer vision for image forensics and large language models for natural language understanding and claim verification.
            </p>
            <h3 className="font-bold text-ink mb-2">Open Source & Transparency</h3>
            <p className="text-sm">
              We believe fact-checking should be transparent. Our core verification logic and models are accessible via our API for researchers and journalists.
            </p>
          </div>
        </div>
      </Modal>

      {/* API Modal */}
      <Modal 
        isOpen={isApiOpen} 
        onClose={() => setIsApiOpen(false)} 
        title="TruthLens API"
      >
        <div className="space-y-4">
          <p>
            Integrate our powerful fact-checking and deepfake detection engine directly into your own applications, platforms, or research workflows.
          </p>
          
          <div className="bg-ink/5 p-4 rounded-xl border border-border mt-4">
            <h3 className="font-bold text-ink mb-2">Endpoint</h3>
            <code className="block bg-surface p-2 rounded text-sm text-ink/80 font-mono">
              POST https://api.truthlens.com/v1/analyze
            </code>
          </div>

          <div className="bg-ink/5 p-4 rounded-xl border border-border">
            <h3 className="font-bold text-ink mb-2">Request Payload</h3>
            <pre className="bg-surface p-3 rounded text-sm text-ink/80 font-mono overflow-x-auto">
{`{
  "url": "https://www.instagram.com/p/..."
}`}
            </pre>
          </div>

          <div className="bg-ink/5 p-4 rounded-xl border border-border">
            <h3 className="font-bold text-ink mb-2">Features</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Automatic media extraction (Video, Images, Text)</li>
              <li>Deepfake and manipulation detection scores</li>
              <li>Cross-reference against trusted fact-check databases</li>
              <li>Detailed truth report and verdict generation</li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-between items-center">
            <span className="text-sm text-ink/60">Documentation coming soon.</span>
            <button className="px-4 py-2 bg-ink text-surface rounded-lg text-sm font-bold hover:bg-ink/90 transition-colors">
              Request Access
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default App;
