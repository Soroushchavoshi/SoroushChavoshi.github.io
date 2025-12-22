
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/soroushchavoshi/' },
    { name: 'Dribbble', href: 'https://dribbble.com/soroushchavoshi' }
  ];

  return (
    <footer id="contact" className="py-6 border-t border-black/10 px-6 bg-accent text-black selection:bg-black selection:text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          
          {/* Left Side: Email Only */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto justify-center md:justify-start">
            <a 
              href="mailto:soroush.chavosh@gmail.com" 
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors group font-sans"
            >
              soroush.chavosh@gmail.com
              <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform duration-300" />
            </a>
          </div>

          {/* Right Side: Socials & Copyright */}
          <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-end">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-widest text-black/60 hover:text-black transition-colors font-sans font-bold"
              >
                {social.name}
              </a>
            ))}
            
             <p className="text-black/40 text-[10px] font-sans uppercase tracking-widest">
              © {new Date().getFullYear()} Soroush Chavoshi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
