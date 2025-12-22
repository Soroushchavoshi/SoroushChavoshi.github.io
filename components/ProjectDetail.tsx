
import React from 'react';
import { Project } from '../types';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../constants';
import Footer from './Footer';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNext: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onNext }) => {
  // Find the next project in the list (Loop back to start if at the end)
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextIndex];

  return (
    // Added padding-top (pt-32) to clear the fixed global header
    <div className="min-h-screen bg-background text-primary font-sans selection:bg-accent selection:text-black pt-32 flex flex-col">
      
      {/* Back Button Area */}
      <div className="container mx-auto px-6 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors duration-300 group font-sans"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-2" />
          Back to Home
        </button>
      </div>

      {/* Header Section */}
      <header className="container mx-auto px-6 pb-12 md:pb-24">
        <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-sans font-light tracking-tighter mb-8">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-secondary">
            {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 border border-white/10 rounded-full font-sans">
                    {tag}
                </span>
            ))}
        </div>
      </header>

      {/* Main Cover Image - Edge to Edge */}
      <div className="w-full mb-16 md:mb-32">
        <div className="w-full relative overflow-hidden">
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto"
            />
        </div>
      </div>

      {/* BLOCK 1: Metadata & The Challenge */}
      <div className="container mx-auto px-6 mb-24 md:mb-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-24 items-start">
            
            {/* Left Column: Metadata */}
            {/* Removed top border and padding to align flush with the Challenge title */}
            <div className="md:col-span-4">
                <div className="flex flex-col gap-10">
                    <div>
                        <h3 className="text-[10px] text-secondary uppercase tracking-widest mb-2 font-sans">Role</h3>
                        <p className="font-medium font-sans text-white text-lg">{project.role || 'Lead Designer'}</p>
                    </div>

                    {project.product && (
                        <div>
                            <h3 className="text-[10px] text-secondary uppercase tracking-widest mb-2 font-sans">Product</h3>
                            {project.id === 1 ? (
                              <p className="font-medium font-sans text-white text-lg">
                                <span className="inline-block border-b-2 border-green-400 pb-0.5">
                                  Aban Tether
                                </span>
                                <span>, Cryptocurrency Exchange</span>
                              </p>
                            ) : (
                              <p className="font-medium font-sans text-white text-lg">
                                {project.product}
                              </p>
                            )}
                        </div>
                    )}
                    
                    <div>
                        <h3 className="text-[10px] text-secondary uppercase tracking-widest mb-2 font-sans">Tools</h3>
                        <p className="font-medium font-sans text-white text-lg">
                            {project.tools ? project.tools.join(', ') : 'Figma, UI/UX Strategy'}
                        </p>
                    </div>

                    {project.timeline && (
                        <div>
                            <h3 className="text-[10px] text-secondary uppercase tracking-widest mb-2 font-sans">Timeline</h3>
                            <p className="font-medium font-sans text-white text-lg">{project.timeline}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: The Challenge */}
            <div className="md:col-span-8">
                <section>
                    <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight mb-8">The Challenge</h2>
                    <div className="text-lg md:text-2xl leading-relaxed text-gray-400 font-light space-y-6 font-sans">
                        <p className="whitespace-pre-line">
                            {project.challenge || "Every project begins with a unique set of obstacles. For this client, the primary goal was to completely reimagine their digital presence to align with a new strategic direction."}
                        </p>
                    </div>
                </section>
            </div>
        </div>
      </div>

      {/* BLOCK 2: Full Width Image (Edge-to-Edge) */}
      {project.images && project.images[0] && (
        <div className="w-full mb-24 md:mb-40 relative overflow-hidden group">
            <img 
                src={project.images[0]} 
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out" 
                alt="Process Highlight" 
            />
        </div>
      )}

      {/* BLOCK 3: The Process */}
      {project.process && (
        <div className="container mx-auto px-6 mb-12 md:mb-24">
             <div className="md:max-w-5xl">
                <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight mb-8">
                  {project.id === 2 ? "Discovery & Requirement Prioritization" : "The Process"}
                </h2>
                <div className="text-lg md:text-2xl leading-relaxed text-gray-400 font-light space-y-6 font-sans">
                    <p className="whitespace-pre-line">{project.process}</p>
                </div>
             </div>
        </div>
      )}

      {/* Process Image (Full Width - Like Challenge Image) */}
      {project.processImage && (
        <div className="w-full mb-24 md:mb-40 relative overflow-hidden group">
            <img 
                src={project.processImage} 
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out" 
                alt="Process Overview" 
            />
        </div>
      )}

      {/* BLOCK 4: Process Steps (Titles and Text like Process, Images like Challenge Image) */}
      {project.processSteps && project.processSteps.map((step, idx) => {
          // Check if this is the last step AND there is no subsequent "Solution" text.
          // If so, we remove the bottom margin so the image sticks to the footer.
          const isLastContent = idx === (project.processSteps?.length || 0) - 1 && !project.solution;
          const hasFigmaEmbed = !!step.figmaEmbedUrl;
          
          return (
              <React.Fragment key={idx}>
                  {/* Step Text */}
                  <div className="container mx-auto px-6 mb-12 md:mb-24">
                      <div className="md:max-w-5xl">
                          <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight mb-8">{step.title}</h2>
                          <div className="text-lg md:text-2xl leading-relaxed text-gray-400 font-light font-sans">
                              <p className="whitespace-pre-line">{step.description}</p>
                          </div>
                      </div>
                  </div>
                  
                  {/* Step Media (Full Width) */}
                  <div className={`w-full relative overflow-hidden group ${isLastContent ? 'mb-0' : 'mb-24 md:mb-40'}`}>
                      {hasFigmaEmbed ? (
                        <div className="w-full aspect-[16/9] bg-black/40">
                          <iframe
                            src={step.figmaEmbedUrl}
                            allowFullScreen
                            className="w-full h-full border-0"
                            title={`Figma Prototype - ${step.title}`}
                          />
                        </div>
                      ) : (
                        <img 
                            src={step.image} 
                            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out" 
                            alt={step.title} 
                        />
                      )}
                  </div>
              </React.Fragment>
          );
      })}

      {/* BLOCK 5: The Approach / Solution */}
      {project.solution && (
        <div className="container mx-auto px-6 pb-24">
            <div className="md:max-w-5xl">
                <h2 className="text-4xl md:text-6xl font-sans font-light tracking-tight mb-8">The Approach</h2>
                <div className="text-lg md:text-2xl leading-relaxed text-gray-400 font-light font-sans mb-24">
                    <p className="whitespace-pre-line">
                        {project.solution}
                    </p>
                </div>
            </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
