import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, Bell, User } from 'lucide-react';

export const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-pak-green to-pak-light-green text-white p-4 shadow-xl relative z-50 rounded-b-[24px] sm:rounded-t-[40px] overflow-hidden">
      {/* Subtle Flag Element */}
      <div className="absolute top-0 right-0 w-24 h-full opacity-10 pointer-events-none">
        <div className="absolute top-2 right-2 w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-5 h-0.5 bg-white rotate-45" />
          <div className="w-5 h-0.5 bg-white -rotate-45" />
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-tight">
              {t('UniGuru Semester', 'یونی گرو سمسٹر')}
            </h1>
            <p className="text-sm font-black leading-tight">
              {t('Assalam-o-Alaikum, Fahim!', 'اسلام و علیکم، فہیم!')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-pak-green hover:bg-white/90 rounded-xl transition-all text-[10px] font-black shadow-md"
        >
          <Globe size={14} />
          {language === 'en' ? 'اردو' : 'English'}
        </button>
      </div>
    </header>
  );
};
