import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, Award, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: <Settings size={20} />, label: 'Settings', labelUr: 'ترتیبات' },
    { icon: <Shield size={20} />, label: 'Privacy', labelUr: 'رازداری' },
    { icon: <Bell size={20} />, label: 'Notifications', labelUr: 'اطلاعات' },
    { icon: <HelpCircle size={20} />, label: 'Help Center', labelUr: 'مدد مرکز' },
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Profile Header */}
      <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-pak-green to-pak-light-green opacity-10" />

        <div className="relative">
          <div className="w-28 h-28 rounded-[32px] bg-pak-green p-1 shadow-2xl shadow-pak-green/30">
            <div className="w-full h-full rounded-[28px] bg-white flex items-center justify-center text-pak-green">
              <User size={48} />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
            <Zap size={18} fill="currentColor" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-900">Fahim Ahmad</h2>
          <p className="text-xs font-bold text-pak-green uppercase tracking-widest">BS Computer Science • Semester 5</p>
        </div>

        <div className="flex gap-4 w-full pt-4">
          <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('Points', 'پوائنٹس')}</p>
            <p className="text-lg font-black text-gray-900">1,240</p>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('Rank', 'رینک')}</p>
            <p className="text-lg font-black text-pak-green">Guru</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] shadow-lg shadow-gray-200/30 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">12</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">{t('Badges', 'بیجز')}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-lg shadow-gray-200/30 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-2xl">
            <Star size={24} />
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">4.8</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">{t('GPA', 'جی پی اے')}</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className={`w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${i !== menuItems.length - 1 ? 'border-bottom border-gray-50' : ''
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gray-100 rounded-xl text-gray-500">
                {item.icon}
              </div>
              <span className="font-bold text-gray-700">{t(item.label, item.labelUr)}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button className="w-full p-6 bg-red-50 text-red-500 rounded-[32px] font-black flex items-center justify-center gap-3 hover:bg-red-100 transition-all">
        <LogOut size={20} />
        {t('Logout', 'لاگ آؤٹ')}
      </button>

      <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
        UniGuru Semester v1.0.0
      </p>
    </div>
  );
};
