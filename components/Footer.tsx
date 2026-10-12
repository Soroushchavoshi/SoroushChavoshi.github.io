
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/soroushchavoshi/' },
    { name: 'Dribbble', href: 'https://dribbble.com/soroushchavoshi' }
  ];

  return (
    <footer id="contact" className="py-2.5 border-t border-white/10 px-6 bg-black/10 backdrop-blur-2xl backdrop-saturate-150 text-white selection:bg-accent selection:text-black">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">

          {/* Left Side: Email Only */}
          <a
            href="mailto:soroush.chavosh@gmail.com"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors group font-sans text-gray-200 hover:text-accent"
          >
            soroush.chavosh@gmail.com
            <ArrowRight size={12} className="group-hover:-rotate-45 transition-transform duration-300" />
          </a>

          {/* Right Side: Socials & Copyright */}
          <div className="flex items-center gap-6 md:gap-8 justify-center md:justify-end">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors font-sans font-bold"
              >
                {social.name}
              </a>
            ))}

             <p className="text-white/40 text-[10px] font-sans uppercase tracking-widest">
              © {new Date().getFullYear()} Soroush Chavoshi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
