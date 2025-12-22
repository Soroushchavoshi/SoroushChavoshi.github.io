import React from 'react';
import { X } from 'lucide-react';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  pdfPath?: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose, pdfPath = '/Soroush_Chavoshi_Resume.pdf' }) => {
  return (
    <div
      className={`fixed inset-0 z-[60] bg-background transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Fullscreen container */}
      <div className="relative inset-0 w-full h-full flex flex-col">
        {/* Close button (top-right) - styled to match site design */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-black transition-colors shadow-sm"
          aria-label="Close resume"
        >
          <X size={18} />
        </button>

        {/* PDF Embed - fills entire viewport except bottom CTA height */}
        <div className="flex-1 relative z-20">
          <iframe
            src={pdfPath}
            title="Resume PDF"
            className="w-full h-[calc(100vh-72px)] bg-white"
            style={{ border: 0 }}
          />
        </div>

        {/* Download CTA - fixed at bottom of viewport */}
        <div className="z-30 bg-transparent p-4 flex justify-center">
          <a
            href={pdfPath}
            download
            className="py-3 px-6 bg-accent text-black font-bold uppercase tracking-widest text-xs rounded-none hover:opacity-95 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center gap-2"
          >
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
