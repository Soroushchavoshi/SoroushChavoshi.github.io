import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import { PROJECTS, SERVICES } from './constants';
import { Project } from './types';
import { Award, Heart, ArrowRight } from 'lucide-react';
import ResumeModal from './components/ResumeModal';

const App: React.FC = () => {
  // State to track which project is currently being viewed.
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  // State to track the "Ghost" project (the one staying in back during crossover)
  const [ghostProject, setGhostProject] = useState<Project | null>(null);
  const [ghostScroll, setGhostScroll] = useState(0);

  // State to control the slide-in/slide-out animation
  const [isProjectVisible, setIsProjectVisible] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  // Ref for the project overlay container to handle scrolling
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: Project) => {
    // Check if we are already viewing a project (Cross Over Animation)
    if (isProjectVisible && activeProject) {
        // 1. Snapshot the current project as the "Ghost" background
        const currentScroll = overlayRef.current?.scrollTop || 0;
        setGhostScroll(currentScroll);
        setGhostProject(activeProject);

        // 2. Set the new project as active
        setActiveProject(project);

        // 3. Reset visibility temporarily. 
        // This ensures the new 'activeProject' renders starting at translate-y-full (bottom)
        // while the 'ghostProject' remains visible behind it.
        setIsProjectVisible(false);

        // 4. Force the slide-up animation for the new project
        setTimeout(() => {
            setIsProjectVisible(true);
        }, 50);

        // 5. Cleanup the ghost project after the animation finishes
        setTimeout(() => {
            setGhostProject(null);
            setGhostScroll(0);
        }, 750); // Matches duration-700 + buffer

    } else {
        // Standard opening from Home
        setActiveProject(project);
        // Small delay to allow the component to mount before starting the transition
        setTimeout(() => {
          setIsProjectVisible(true);
        }, 50);
    }
  };

  const handleBackToHome = () => {
    setIsProjectVisible(false);
    // Wait for the transition to finish before unmounting
    setTimeout(() => {
      setActiveProject(null);
    }, 700); // Matches the duration-700 in CSS
  };

    const openResume = () => {
        setIsResumeOpen(true);
        // Prevent background scrolling while resume modal is open
        try { document.body.style.overflow = 'hidden'; } catch (e) {}
    };

    const closeResume = () => {
        setIsResumeOpen(false);
        // Restore background scrolling
        try { document.body.style.overflow = ''; } catch (e) {}
    };

  // Scroll to top of overlay when activeProject changes
  useEffect(() => {
    if (activeProject && overlayRef.current) {
        // Only scroll to top if we aren't in the middle of a ghost transition setup
        // (Though strictly speaking, the new active project should always start at top)
        overlayRef.current.scrollTop = 0;
    }
  }, [activeProject]);

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-accent selection:text-black font-sans">
      {/* Header is always visible and passes handleBackToHome to reset view/scroll */}
    <Header onNavigate={handleBackToHome} onOpenResume={openResume} />
      
      <main>
          {/* 
             Home Page Content 
             Always rendered in the background so it's ready to be revealed.
          */}
          <div>
             <Hero />

             {/* Work Section */}
             <section id="work" className="bg-background relative z-10 pt-32">
                <div className="container mx-auto px-6 mb-16">
                  <h2 className="text-6xl md:text-9xl font-sans font-light tracking-tighter">Work</h2>
                </div>
                
                <div className="flex flex-col w-full">
                  {PROJECTS.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      onClick={handleProjectClick}
                      id={index === 0 ? "first-project" : undefined}
                      isLast={index === PROJECTS.length - 1}
                    />
                  ))}
                </div>
             </section>

             {/* About Section */}
             <section id="about" className="py-32 border-t border-white/10 relative overflow-hidden">
                  {/* Ambient Glass Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

                  <div className="container mx-auto px-6 relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                          <h2 className="text-6xl md:text-9xl font-sans font-light tracking-tighter">About</h2>
                      </div>
                     
                      {/* About Grid – 4 items in a 2x2 layout on desktop */}
                      <div className="grid gap-6 md:grid-cols-2">
                          {/* Intro Text (no card styling) */}
                          <div className="col-span-1">
                              <div className="text-base md:text-lg leading-relaxed font-sans text-gray-300 space-y-6">
                                {/* Big intro sentence */}
                                <p className="text-lg md:text-2xl leading-relaxed font-sans font-light text-gray-200">
                                  I&apos;m a natural idea generator and curious researcher at heart.
                                </p>

                                {/* Bullet checkpoints */}
                                <ul className="space-y-4 list-none">
                                  <li className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                    <span className="font-light text-gray-300">
                                      <span className="text-gray-100">
                                        Transitioning from graphic design to UI/UX
                                      </span>
                                      <span> with a focus on </span>
                                      <span className="text-gray-100">
                                        pixel-perfect execution
                                      </span>
                                      <span>.</span>
                                    </span>
                                  </li>

                                  <li className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                    <span className="font-light text-gray-300">
                                      As a{' '}
                                      <span className="text-gray-100">
                                        UX Researcher at{' '}
                                      </span>
                                      <a 
                                        href="https://abantether.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-inherit border-b border-accent/40"
                                      >
                                        AbanTether
                                      </a>
                                      , I specialized in{' '}
                                      <span className="text-gray-100">
                                        research methodologies
                                      </span>
                                      {' '}and user behavior analysis.
                                    </span>
                                  </li>

                                  <li className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                    <span className="font-light text-gray-300">
                                      <span className="text-gray-100">
                                        Eager to take high ownership
                                      </span>
                                      <span> in a small, collaborative team while growing my product skills.</span>
                                    </span>
                                  </li>
                                </ul>
                              </div>
                          </div>

                          {/* Remaining Service Cards */}
                          {SERVICES.map((service, index) => {
                              const hasImage = !!service.backgroundImage;

                              return (
                                <div 
                                    key={index}
                                    className={`col-span-1 p-8 md:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-white/20 ${hasImage ? 'text-white' : 'bg-surface'}`}
                                >
                                    {hasImage && (
                                        <>
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{ backgroundImage: `url(${service.backgroundImage})` }}
                                            />
                                            {/* Top gradient overlay for better text readability */}
                                            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
                                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
                                        </>
                                    )}

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-auto pt-4">
                                            <h3 className={`text-3xl md:text-4xl font-sans font-light tracking-tight mb-6 ${hasImage ? 'text-white drop-shadow-md' : ''}`}>
                                                {service.title}
                                            </h3>
                                            <p className={`text-base leading-relaxed max-w-lg font-sans ${hasImage ? 'text-gray-200' : 'text-gray-400'}`}>
                                                {service.description}
                                                {service.linkedinUrl && (
                                                    <a
                                                        href={service.linkedinUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 transition-all cursor-pointer font-light group/linkedinlink"
                                                        style={{ color: '#0A66C2' }}
                                                    >
                                                        check my linkedin
                                                        <ArrowRight size={14} className="group-hover/linkedinlink:-rotate-45 transition-all duration-300" />
                                                    </a>
                                                )}
                                                {service.dribbbleUrl && (
                                                    <a 
                                                        href={service.dribbbleUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 transition-all cursor-pointer font-light group/dribbblelink"
                                                        style={{ color: '#ea4c89' }}
                                                    >
                                                        check my dribbble
                                                        <ArrowRight size={14} className="group-hover/dribbblelink:-rotate-45 transition-all duration-300" />
                                                    </a>
                                                )}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-auto pt-8">
                                            {/* Spotify Embed */}
                                            {service.spotifyEmbedUrl && (
                                                <div className="w-full mt-4 rounded-xl overflow-hidden bg-black/20 border border-white/5 shadow-lg">
                                                    <iframe 
                                                        style={{ borderRadius: '12px', border: 0 }} 
                                                        src={service.spotifyEmbedUrl} 
                                                        width="100%" 
                                                        height="152" 
                                                        allowFullScreen 
                                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                                        loading="lazy"
                                                        className="block w-full"
                                                    ></iframe>
                                                </div>
                                            )}

                                            {/* Dribbble Link and Latest Project */}
                                            {service.dribbbleUrl && (
                                                // Use negative margins to cancel the card padding so this block
                                                // physically touches the card's left/right/bottom edges.
                                                <div className="flex flex-col gap-0 mt-0 relative z-20 pointer-events-auto -mx-8 md:-mx-10 -mb-8 md:-mb-10">
                                                    {/* Latest Project Showcase (image) */}
                                                    {service.latestDribbbleProject && (
                                                        <a
                                                            href={service.latestDribbbleProject.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`block group/dribbble overflow-hidden transition-all duration-300 cursor-pointer ${hasImage ? 'bg-black/30' : 'bg-white/5'}`}
                                                        >
                                                            <div className="aspect-video overflow-hidden bg-black/20">
                                                                <img
                                                                    src={service.latestDribbbleProject.image}
                                                                    alt={service.latestDribbbleProject.title}
                                                                    className="w-full h-full object-cover group-hover/dribbble:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                        </a>
                                                    )}

                                                    {/* Latest Work label area - flush to left/right/bottom of card */}
                                                    {service.latestDribbbleProject && (
                                                        <div className={`w-full px-4 py-3 bg-white/5 group-hover/dribbble:bg-white/10 transition-colors`}>
                                                            <p className={`text-sm font-sans font-light ${hasImage ? 'text-white' : 'text-gray-300'}`}>
                                                                Latest Work: {service.latestDribbbleProject.title}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Custom Audio Player */}
                                            {service.audioUrl && (
                                                <AudioPlayer src={service.audioUrl} />
                                            )}

                                            {/* Volunteer & Certificate Display */}
                                            {service.volunteer && service.certificate ? (
                                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                                    {/* Volunteer Card */}
                                                    <div className={`p-5 border border-white/10 rounded-sm bg-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors group/item ${hasImage ? 'backdrop-blur-md bg-black/30 border-white/20' : ''}`}>
                                                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                            <Heart size={24} />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] uppercase tracking-widest text-secondary mb-1">Volunteer Experience</div>
                                                            <div className="text-sm font-bold text-white font-sans leading-tight">{service.volunteer.role}</div>
                                                            <div className="text-xs text-secondary font-sans mt-1">{service.volunteer.organization} • {service.volunteer.year}</div>
                                                        </div>
                                                        {service.volunteer.logo && (
                                                            <img 
                                                              src={service.volunteer.logo} 
                                                              alt={service.volunteer.organization} 
                                                              className="ml-auto h-12 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Certificate Card */}
                                                    {service.certificate.link ? (
                                                        <a 
                                                            href={service.certificate.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`p-5 border border-white/10 rounded-sm bg-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors hover:border-accent/50 block cursor-pointer group/item ${hasImage ? 'backdrop-blur-md bg-black/30 border-white/20' : ''}`}
                                                        >
                                                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                                <Award size={24} />
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] uppercase tracking-widest text-secondary mb-1">Courses</div>
                                                                <div className="text-sm font-bold text-white font-sans leading-tight">{service.certificate.title}</div>
                                                                <div className="text-xs text-secondary font-sans mt-1">
                                                                    {service.certificate.issuer}
                                                                    {service.certificate.year ? ` • ${service.certificate.year}` : ''}
                                                                </div>
                                                            </div>
                                                            {service.certificate.logo && (
                                                                <img 
                                                                  src={service.certificate.logo} 
                                                                  alt={service.certificate.issuer} 
                                                                  className="ml-auto h-8 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                                                                />
                                                            )}
                                                        </a>
                                                    ) : (
                                                        <div className={`p-5 border border-white/10 rounded-sm bg-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors group/item ${hasImage ? 'backdrop-blur-md bg-black/30 border-white/20' : ''}`}>
                                                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                                <Award size={24} />
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] uppercase tracking-widest text-secondary mb-1">Courses</div>
                                                                <div className="text-sm font-bold text-white font-sans leading-tight">{service.certificate.title}</div>
                                                                <div className="text-xs text-secondary font-sans mt-1">
                                                                    {service.certificate.issuer}
                                                                    {service.certificate.year ? ` • ${service.certificate.year}` : ''}
                                                                </div>
                                                            </div>
                                                            {service.certificate.logo && (
                                                                <img 
                                                                  src={service.certificate.logo} 
                                                                  alt={service.certificate.issuer} 
                                                                  className="ml-auto h-8 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Volunteer Display (Single) */}
                                                    {service.volunteer && (
                                                        <div className={`mt-6 p-5 border border-white/10 rounded-sm bg-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors group/item ${hasImage ? 'backdrop-blur-md bg-black/30 border-white/20' : ''}`}>
                                                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                                <Heart size={24} />
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] uppercase tracking-widest text-secondary mb-1">Volunteer Experience</div>
                                                                <div className="text-sm font-bold text-white font-sans leading-tight">{service.volunteer.role}</div>
                                                                <div className="text-xs text-secondary font-sans mt-1">{service.volunteer.organization} • {service.volunteer.year}</div>
                                                            </div>
                                                            {service.volunteer.logo && (
                                                                <img 
                                                                  src={service.volunteer.logo} 
                                                                  alt={service.volunteer.organization} 
                                                                  className="ml-auto h-12 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                                                                />
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Certificate Display (Single) */}
                                                    {service.certificate && (
                                                        service.certificate.link ? (
                                                            <a 
                                                                href={service.certificate.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`mt-6 p-5 border border-white/10 rounded-sm bg-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors hover:border-accent/50 block cursor-pointer group/item ${hasImage ? 'backdrop-blur-md bg-black/30 border-white/20' : ''}`}
                                                            >
                                                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                                    <Award size={24} />
                                                                </div>
                                                                <div>
                                                                    <div className="text-[10px] uppercase tracking-widest text-secondary mb-1">Courses</div>
                                                                    <div className="text-sm font-bold text-white font-sans leading-tight">{service.certificate.title}</div>
                                                                    <div className="text-xs text-secondary font-sans mt-1">
                                                                        {service.certificate.issuer}
                                                                        {service.certificate.year ? ` • ${service.certificate.year}` : ''}
                                                                    </div>
                                                                </div>
                                                                {service.certificate.logo && (
                                                                    <img 
                                                                      src={service.certificate.logo} 
                                                                      alt={service.certificate.issuer} 
                                                                      className="ml-auto h-8 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                                                                    />
                                                                )}
                                                            </a>
                                                        ) : (
                                                            <div className={`mt-6 p-5 border border-white/10 rounded-sm bg-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors group/item ${hasImage ? 'backdrop-blur-md bg-black/30 border-white/20' : ''}`}>
                                                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                                    <Award size={24} />
                                                                </div>
                                                                <div>
                                                                    <div className="text-[10px] uppercase tracking-widest text-secondary mb-1">Courses</div>
                                                                    <div className="text-sm font-bold text-white font-sans leading-tight">{service.certificate.title}</div>
                                                                    <div className="text-xs text-secondary font-sans mt-1">
                                                                        {service.certificate.issuer}
                                                                        {service.certificate.year ? ` • ${service.certificate.year}` : ''}
                                                                    </div>
                                                                </div>
                                                                {service.certificate.logo && (
                                                                    <img 
                                                                      src={service.certificate.logo} 
                                                                      alt={service.certificate.issuer} 
                                                                      className="ml-auto h-8 w-auto object-contain opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                              );
                          })}
                      </div>
                  </div>
             </section>
             
             <Footer />
          </div>
      </main>

      {/* 
        GHOST PROJECT LAYER
        Used for the "Cross Over" effect. Renders the *previous* project underneath the incoming one.
      */}
      {ghostProject && (
         <div 
            className="fixed inset-0 z-[40] bg-background overflow-hidden pointer-events-none"
            ref={(el) => { if (el) el.scrollTop = ghostScroll; }}
         >
            <ProjectDetail 
               project={ghostProject} 
               onBack={() => {}} 
               onNext={() => {}} 
            />
         </div>
      )}

    {/* Resume Modal */}
    <ResumeModal open={isResumeOpen} onClose={closeResume} />

      {/* 
         ACTIVE PROJECT OVERLAY 
         Slides up over the home page OR the ghost project.
      */}
      {activeProject && (
        <div 
          ref={overlayRef}
          className={`fixed inset-0 z-[50] bg-background overflow-y-auto transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) ${
            isProjectVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
           <ProjectDetail 
             project={activeProject} 
             onBack={handleBackToHome}
             onNext={handleProjectClick}
           />
        </div>
      )}

      {/* 
         FIX: Tailwind CDN Preload
         The class 'translate-y-full' is not generated by the JIT compiler until it's used.
         On first render of the overlay, there's a delay in CSS generation, causing the instant snap.
         We force it to exist here.
      */}
      <div className="hidden translate-y-full"></div>
    </div>
  );
};

export default App;
