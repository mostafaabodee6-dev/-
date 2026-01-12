
import React from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-black/40" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">معرض المشاريع</h2>
          <div className="h-1.5 w-24 bg-brand-red rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-brand-brown/10 border border-gray-100 dark:border-white/5 hover:border-brand-red/30 transition-all duration-500 shadow-xl hover:shadow-2xl"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                  <button className="flex items-center gap-2 px-6 py-3 bg-brand-red rounded-full text-white font-bold hover:scale-105 transition-transform shadow-lg">
                    <ExternalLink size={20} />
                    <span>عرض المشروع</span>
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold rounded-lg uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
