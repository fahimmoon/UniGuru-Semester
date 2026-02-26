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
      className={`flex flex-col items-center gap-1.5 p-2 flex-1 transition-all relative ${
        active ? 'text-pak-green' : 'text-gray-400 hover:text-pak-green/70'
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
    <nav className="bg-white/80 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-4 py-3 pb-safe fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[40px]">
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
