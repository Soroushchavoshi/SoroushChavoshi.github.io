
import React, { useState } from 'react';
import { Menu, X, Asterisk } from 'lucide-react';

interface HeaderProps {
  onNavigate?: () => void;
  onOpenResume?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenResume }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Work', href: '#work' }, // Targets the Work section title
    { name: 'Resume', href: '#resume' }, 
    { name: 'About', href: '#about' }, // Targets the renamed About section
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (onNavigate) {
        onNavigate();
    }

    if (href === '#resume') {
        // Instead of downloading directly, call the parent to open the resume modal
        if (typeof onOpenResume === 'function') {
          onOpenResume();
        }
        return;
    }

    if (href.startsWith('#')) {
        const targetId = href.substring(1);
        if (!targetId) return;

        const element = document.getElementById(targetId);
        if (element) {
            // Using window.scrollTo with calculation to ensure "exactly smooth" behavior matches the logo click
            const y = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    // Triggers the "Cross Down" animation (closes project overlay) in App.tsx
    if (onNavigate) {
      onNavigate();
    }
    // Smoothly scrolls the main window to the Hero section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Updated z-index from z-50 to z-[55] to ensure visibility over Project Overlay (which is z-[50]) */}
      <header className="fixed top-0 left-0 w-full z-[55] text-white transition-all duration-300">
        <div className="grid grid-cols-2 md:grid-cols-12 border-b border-white/10 bg-black/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          
          {/* Logo Area */}
          <div className="col-span-1 md:col-span-4 p-6 border-r border-white/10 flex items-center">
            <a 
              href="#" 
              onClick={handleLogoClick} 
              className="text-xl font-bold tracking-tighter uppercase group font-sans flex items-center gap-1"
            >
              Soroush Chavoshi
              <Asterisk className="text-accent w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            </a>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:col-span-4 md:flex justify-center items-center p-6 border-r border-white/10">
            <nav className="flex gap-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs font-medium uppercase tracking-[0.2em] font-sans opacity-80 hover:opacity-100 transition-opacity ${link.name === 'Resume' ? 'hidden lg:block' : ''}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right - Action Block */}
          <div className="hidden md:col-span-4 md:flex justify-end items-center p-6 h-full min-h-[80px]">
             <div className="group flex items-center relative">
                {/* Phone Number Reveal */}
                <span className="absolute right-full mr-8 whitespace-nowrap text-[10px] text-accent uppercase tracking-widest opacity-0 translate-x-8 group-hover:opacity-90 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] font-sans pointer-events-none">
                    <span className="hidden xl:inline">you can even call +98 991 221 83 32</span>
                    <span className="hidden min-[1150px]:inline xl:hidden">you can call +98 991 221 83 32</span>
                    <span className="hidden lg:inline min-[1150px]:hidden">or call +98 991 221 83 32</span>
                    <span className="inline lg:hidden">+98 991 221 83 32</span>
                </span>
                
                <a href="mailto:soroush.chavosh@gmail.com" className="text-xs font-medium uppercase tracking-[0.2em] font-sans opacity-80 hover:opacity-100 transition-opacity">
                    Let's Talk
                </a>
             </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden col-span-1 flex justify-end items-center p-6">
             <button onClick={() => setIsMenuOpen(true)}>
               <Menu size={24} />
             </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay - Updated z-index to z-[70] to sit above header */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-3xl backdrop-saturate-150 z-[70] flex flex-col transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <span className="text-xl font-bold font-sans text-white">MENU</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-accent transition-colors">
            <X size={32} />
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col justify-center px-6 md:px-20 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-6xl md:text-8xl font-sans font-light tracking-tighter text-white hover:text-accent transition-colors hover:translate-x-4 duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 flex justify-between items-end">
          <div className="text-secondary text-sm font-sans">
            Soroush Chavoshi <br /> Digital Product Designer
          </div>
          <div className="text-9xl font-bold text-white/5 select-none absolute bottom-0 right-0 pointer-events-none font-sans">
            MENU
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
