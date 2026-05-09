import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface/80 backdrop-blur">
          <h2 className="font-headline font-bold text-2xl text-ink">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-ink/10 text-ink/70 hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] font-body text-ink/80 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
