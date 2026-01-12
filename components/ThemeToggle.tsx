
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="p-3 rounded-full bg-white dark:bg-brand-brown/30 shadow-lg border border-gray-200 dark:border-brand-red/30 transition-all hover:scale-110 active:scale-95 text-brand-red"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeToggle;
