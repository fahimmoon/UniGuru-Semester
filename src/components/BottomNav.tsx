import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, BookOpen, Calculator, Award, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  labelUr: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, labelUr, active, onClick }) => {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-2 flex-1 transition-all relative ${active ? 'text-pak-green' : 'text-gray-400 hover:text-pak-green/70'
        }`}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="nav-active"
            className="absolute inset-0 bg-pak-green/5 rounded-2xl -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={active ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
        className={`transition-all ${active ? 'drop-shadow-[0_4px_8px_rgba(0,100,0,0.2)]' : ''}`}
      >
        {icon}
      </motion.div>
      <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all ${active ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {t(label, labelUr)}
      </span>
    </button>
  );
};

export const BottomNav: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="absolute z-50 bottom-0 w-full bg-white/70 backdrop-blur-2xl border-t border-white/40 flex justify-around items-center px-2 py-3 pb-[env(safe-area-inset-bottom,12px)] shadow-[0_-20px_40px_rgba(0,0,0,0.04)] sm:rounded-b-[40px] rounded-t-3xl">
      <NavItem
        icon={<Home size={24} />}
        label="Home"
        labelUr="ہوم"
        active={activeTab === 'home'}
        onClick={() => onTabChange('home')}
      />
      <NavItem
        icon={<BookOpen size={24} />}
        label="Learn"
        labelUr="سیکھیں"
        active={activeTab === 'learn'}
        onClick={() => onTabChange('learn')}
      />
      <NavItem
        icon={<Calculator size={24} />}
        label="Tools"
        labelUr="ٹولز"
        active={activeTab === 'tools'}
        onClick={() => onTabChange('tools')}
      />
      <NavItem
        icon={<Award size={24} />}
        label="Cert"
        labelUr="سرٹیفکیٹ"
        active={activeTab === 'cert'}
        onClick={() => onTabChange('cert')}
      />
      <NavItem
        icon={<User size={24} />}
        label="Profile"
        labelUr="پروفائل"
        active={activeTab === 'profile'}
        onClick={() => onTabChange('profile')}
      />
    </nav>
  );
};
