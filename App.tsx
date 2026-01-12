
import React, { useState, useEffect } from 'react';
import { ChevronUp, Send, User, Mail, MessageSquare, Info, CheckCircle2 } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AIChat from './components/AIChat';
import { PERSONAL_INFO } from './constants';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'مشروع جديد',
    message: ''
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال بريد إلكتروني عبر فتح العميل الافتراضي مع بيانات منظمة
    const mailtoLink = `mailto:bmwlove478@gmail.com?subject=${encodeURIComponent(formData.subject + " - من: " + formData.name)}&body=${encodeURIComponent("الاسم: " + formData.name + "\nالبريد: " + formData.email + "\nالموضوع: " + formData.subject + "\n\nالرسالة:\n" + formData.message)}`;
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-500 overflow-x-hidden">
      <CustomCursor />
      
      {/* Navigation Overlay */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6">
        <div className="glass px-10 py-5 rounded-3xl flex justify-between items-center shadow-2xl border-white/10">
          <div className="text-2xl font-black text-brand-red tracking-tighter">
            AM<span className="text-gray-900 dark:text-white">.DEV</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="hover:text-brand-red transition-colors">الرئيسية</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="hover:text-brand-red transition-colors">المهارات</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-brand-red transition-colors">المشاريع</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-brand-red transition-colors">تواصل معي</a>
          </div>

          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>
      </nav>

      <main>
        <div id="hero">
          <Hero />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h3 className="text-3xl md:text-5xl font-black italic opacity-20 dark:opacity-10 mb-4 select-none">
            "{PERSONAL_INFO.slogan}"
          </h3>
        </div>

        <Skills />
        <Projects />

        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-[3rem] shadow-2xl border-brand-red/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full"></div>
            
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black mb-6">تواصل معي</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                لديك فكرة أو مشروع؟ دعنا نتحدث ونحولها إلى تجربة رقمية استثنائية.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mr-2">
                    <User size={16} className="text-brand-red" /> الاسم الكامل
                  </label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="عبدالملك مصطفى"
                    className="w-full bg-white dark:bg-brand-brown/10 border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-brand-red/50 transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mr-2">
                    <Mail size={16} className="text-brand-red" /> البريد الإلكتروني
                  </label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="example@email.com"
                    className="w-full bg-white dark:bg-brand-brown/10 border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-brand-red/50 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mr-2">
                  <Info size={16} className="text-brand-red" /> نوع التواصل
                </label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full bg-white dark:bg-brand-brown/10 border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-brand-red/50 transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="مشروع جديد">بناء مشروع جديد</option>
                  <option value="استشارة تقنية">استشارة تقنية</option>
                  <option value="فرصة عمل">فرصة عمل / توظيف</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mr-2">
                  <MessageSquare size={16} className="text-brand-red" /> رسالتك
                </label>
                <textarea 
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="كيف يمكنني مساعدتك؟"
                  className="w-full bg-white dark:bg-brand-brown/10 border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-brand-red/50 transition-all text-gray-900 dark:text-white resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-red text-white font-black rounded-2xl shadow-xl hover:shadow-brand-red/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isSent ? (
                  <>
                    <CheckCircle2 size={24} />
                    <span>تم التحضير بنجاح!</span>
                  </>
                ) : (
                  <>
                    <span>إرسال الرسالة</span>
                    <Send size={20} className="group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-200 dark:border-white/5 text-center text-gray-500 dark:text-gray-400">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-bold">عبدالملك مصطفى &copy; {new Date().getFullYear()}</div>
            <div className="flex gap-8 text-sm">
              <span className="opacity-60 italic">"الموقع العادي يُنسى… وأنا أصنع مواقع تُحفر في الذاكرة"</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Utilities */}
      <AIChat />
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 right-8 w-14 h-14 glass rounded-full flex items-center justify-center text-brand-red border border-brand-red/30 shadow-2xl hover:bg-brand-red hover:text-white transition-all z-[90] animate-in fade-in zoom-in"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
