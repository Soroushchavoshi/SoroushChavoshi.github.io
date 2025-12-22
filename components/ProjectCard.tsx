
import React from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  id?: string;
  isLast?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, id, isLast = false }) => {
  return (
    <div 
      id={id}
      onClick={() => onClick(project)}
      className={`group cursor-pointer w-full min-h-[60vh] md:h-[85vh] grid md:grid-cols-12 border-white/10 overflow-hidden ${index === 0 ? 'border-t' : ''} ${!isLast ? 'border-b' : ''}`}
    >
      {/* Left Column: Content (Now 50% width) */}
      <div className="md:col-span-6 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative order-2 md:order-1 border-r border-white/10">
         <div className="flex flex-col gap-8 max-w-lg">
            
            {/* Tags Row */}
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-[10px] md:text-xs uppercase tracking-wider text-secondary font-sans">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Description Grouped for tighter spacing */}
            <div className="flex flex-col gap-4">
                {/* Title - Font size matched to About section bio text (text-xl md:text-2xl) */}
                <h3 className="text-xl md:text-2xl font-sans font-light tracking-tight text-primary leading-[1.2] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-secondary text-base md:text-lg leading-relaxed font-sans font-light">
                  {project.description}
                </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors font-sans mt-4">
              <span>Explore Case Study</span>
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </div>

         </div>
      </div>

      {/* Right Column: Image (Now 50% width) */}
      <div className="md:col-span-6 h-[40vh] md:h-full relative overflow-hidden order-1 md:order-2 bg-black">
         <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0"
            />
         </div>
        {/* Removed inner shadow to keep images unshaded on hover */}
      </div>
    </div>
  );
};

export default ProjectCard;
