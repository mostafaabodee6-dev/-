
import React from 'react';
import { SKILLS } from '../constants';
import * as Icons from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section className="py-24 px-6 relative" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">أدواتي ومهاراتي</h2>
          <div className="h-1.5 w-24 bg-brand-red rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill, index) => {
            const IconComponent = (Icons as any)[skill.icon];
            return (
              <div 
                key={index}
                className="group relative p-8 glass rounded-3xl hover:border-brand-red/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-3xl group-hover:bg-brand-red/20 transition-all"></div>
                
                <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  {IconComponent && <IconComponent size={32} />}
                </div>

                <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{skill.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
