
import React, { useRef, useEffect } from 'react';

// Helper component for the proximity shine effect
const ShinyText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateShine = (e: MouseEvent) => {
      if (!containerRef.current || !overlayRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from mouse to center of text
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      
      // The radius within which the effect starts (in pixels)
      const triggerRadius = 300;

      if (distance < triggerRadius) {
        // Calculate intensity (0 to 1) based on distance
        // Closer = Higher intensity
        const intensity = Math.pow(1 - distance / triggerRadius, 1.5); // Using power for smoother falloff
        overlayRef.current.style.opacity = intensity.toFixed(3);
        // Add a subtle blur reduction or glow effect
        overlayRef.current.style.filter = `drop-shadow(0 0 ${intensity * 10}px rgba(204, 255, 0, 0.5))`;
      } else {
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.filter = 'none';
      }
    };

    window.addEventListener('mousemove', updateShine);
    return () => window.removeEventListener('mousemove', updateShine);
  }, []);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Base Layer (White/Gray) */}
      <span className="relative z-10 text-white transition-colors duration-300">
        {children}
      </span>
      
      {/* Shine Layer (Accent Green) - Overlaid perfectly */}
      <span 
        ref={overlayRef} 
        aria-hidden="true"
        className="absolute inset-0 z-20 text-accent opacity-0 pointer-events-none select-none"
        style={{ willChange: 'opacity, filter' }}
      >
        {children}
      </span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-0 flex flex-col border-b border-border overflow-hidden">
      {/* Grid Background Layout */}
      <div className="flex-1 grid md:grid-cols-12 border-l border-border">
        
        {/* Left Column - Title */}
        <div 
          className="md:col-span-8 border-r border-border p-6 md:p-12 flex flex-col justify-center relative overflow-hidden"
        >
          {/* 
            Noise Texture Overlay 
            - Kept for texture depth
          */}
          <div 
            className="absolute inset-0 opacity-[0.08] pointer-events-none z-[1] mix-blend-overlay" 
            style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` 
            }}
          ></div>

          {/* Static ambient fallback for depth */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent -z-10"></div>
          
          <h1 className="text-3xl md:text-5xl leading-[1.3] font-light tracking-tight text-gray-200 max-w-4xl relative z-10">
            I’m Soroush Chavoshi, a UI/UX designer blending{' '}
            <ShinyText className="font-display italic">
                pixel-perfect craft
            </ShinyText>{' '}
            with{' '}
            <ShinyText className="font-display italic">
                user-focused research
            </ShinyText>, 
            always pushing into{' '}
            <ShinyText className="font-display italic">
                what’s next
            </ShinyText>{' '}
            in tech.
          </h1>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-4 flex flex-col md:pt-[81px]">
          {/* Image Block */}
          <div className="flex-1 bg-surface/50 relative overflow-hidden group">
            {/* Mobile Image */}
            <img 
              src="/images/myimage2.jpg" 
              alt="Soroush Chavoshi" 
              className="absolute inset-0 w-full h-full object-cover grayscale block md:hidden"
            />
            {/* Desktop Image */}
            <img 
              src="/images/myimage.jpg" 
              alt="Soroush Chavoshi" 
              className="absolute inset-0 w-full h-full object-cover grayscale hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
