
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-red/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-brown/10 blur-[120px] rounded-full"></div>

      <div className="z-10 max-w-4xl space-y-8">
        <div className="inline-block px-4 py-2 rounded-full border border-brand-red/30 bg-brand-red/5 text-brand-red font-medium mb-4 animate-bounce">
          {PERSONAL_INFO.tagline}
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-tight bg-gradient-to-l from-brand-red via-brand-red to-brand-brown dark:to-white bg-clip-text text-transparent">
          {PERSONAL_INFO.name}
        </h1>
        
        <p className="text-xl md:text-3xl font-bold text-gray-700 dark:text-gray-300">
          {PERSONAL_INFO.title}
        </p>

        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-10 py-4 bg-brand-red text-white font-bold rounded-2xl shadow-xl hover:shadow-brand-red/40 transition-all hover:-translate-y-1 active:scale-95"
          >
            ابدأ رحلتك معي
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-10 py-4 glass text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1"
          >
            مشاهدة أعمالي
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('skills')}>
        <div className="w-6 h-10 rounded-full border-2 border-brand-red flex justify-center p-1">
          <div className="w-1 h-2 bg-brand-red rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
