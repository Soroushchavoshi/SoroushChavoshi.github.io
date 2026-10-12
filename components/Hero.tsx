
import React from 'react';

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
            I’m Soroush Chavoshi, a Product Designer combining thoughtful design, user research, and emerging tech.
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
