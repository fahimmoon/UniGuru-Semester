import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Award, BookOpen, ChevronRight, Cpu, Database, Network, Star, Search } from 'lucide-react';
import { VoiceNarration } from './VoiceNarration';
import { COURSES } from '../constants';

export const Dashboard: React.FC<{ onCourseSelect: (id: string) => void }> = ({ onCourseSelect }) => {
  const { t } = useLanguage();

  const stats = [
    { label: 'Progress', labelUr: 'پیشرفت', value: '32%', icon: <TrendingUp size={18} />, color: 'bg-blue-500' },
    { label: 'Streak', labelUr: 'اسٹریک', value: '5 Days', icon: <Zap size={18} />, color: 'bg-orange-500' },
    { label: 'Credits', labelUr: 'کریڈٹس', value: '18', icon: <Award size={18} />, color: 'bg-emerald-500' },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Network': return <Network size={32} />;
      case 'Cpu': return <Cpu size={32} />;
      case 'Database': return <Database size={32} />;
      default: return <BookOpen size={32} />;
    }
  };

  return (
    <div className="p-4 space-y-8 pb-24 relative z-20">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pak-green transition-colors">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder={t('Search topics, chapters...', 'موضوعات، ابواب تلاش کریں...')}
          className="w-full pl-14 pr-6 py-5 bg-white rounded-[28px] shadow-xl shadow-gray-200/40 border border-gray-100 focus:ring-2 focus:ring-pak-green outline-none transition-all text-sm font-medium placeholder:text-gray-300"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center gap-2"
          >
            <div className={`p-2.5 rounded-2xl text-white ${stat.color} shadow-lg shadow-current/20`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider leading-tight">{t(stat.label, stat.labelUr)}</p>
              <p className="text-sm font-black text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quote of the Day */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-pak-light-green/20 rounded-[32px] p-8 relative overflow-hidden shadow-2xl shadow-pak-green/5"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star size={64} className="text-pak-green" />
        </div>
        <div className="absolute top-4 right-4">
          <VoiceNarration 
            text="Knowledge is the life of the mind. Hazrat Ali R.A." 
            textUr="علم ذہن کی زندگی ہے۔ حضرت علی رضی اللہ عنہ" 
          />
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-pak-green font-serif italic text-lg leading-relaxed text-center">
            "{t('Knowledge is the life of the mind.', 'علم ذہن کی زندگی ہے۔')}"
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-pak-green/20 to-transparent w-full" />
          <p className="text-[10px] font-black text-pak-green/60 uppercase tracking-[0.2em] text-center">
            — Hazrat Ali (R.A)
          </p>
        </div>
      </motion.div>

      {/* Course List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs flex items-center gap-2">
            <div className="w-1.5 h-4 bg-pak-green rounded-full" />
            {t('My Courses', 'میرے کورسز')}
          </h3>
          <button className="text-pak-green text-[10px] font-black uppercase tracking-widest hover:underline">
            {t('View Schedule', 'شیڈول دیکھیں')}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {COURSES.map((course, i) => (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCourseSelect(course.id)}
              className="bg-white p-6 rounded-[32px] shadow-2xl shadow-gray-300/60 border-2 border-gray-50 flex items-center gap-6 text-left group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${course.color} opacity-[0.08] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />
              
              <div className={`w-24 h-24 rounded-[28px] ${course.color} flex items-center justify-center text-white shadow-2xl shadow-current/40 group-hover:rotate-6 transition-transform duration-300 relative z-10`}>
                {getIcon(course.icon)}
              </div>
              
              <div className="flex-1 space-y-1 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-pak-green bg-pak-green/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {t('Semester 5', 'سمسٹر 5')}
                  </span>
                </div>
                <h4 className="font-black text-gray-900 text-2xl leading-tight group-hover:text-pak-green transition-colors">{t(course.title, course.titleUr)}</h4>
                <div className="flex items-center gap-4 pt-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full ${course.color} w-1/3 rounded-full shadow-lg`} />
                  </div>
                  <span className="text-xs font-black text-gray-900 uppercase">32%</span>
                </div>
              </div>
              
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-pak-green group-hover:text-white transition-all shadow-xl border border-gray-100">
                <ChevronRight size={24} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pak-light-green/20 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-white/50">
            {t('Recent Chapter', 'حالیہ باب')}
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Network size={24} className="text-pak-light-green" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{t('OSI 7-Layer Model', 'او ایس آئی 7 لیئر ماڈل')}</h4>
              <p className="text-xs text-white/50">{t('Computer Networks • Chapter 2', 'کمپیوٹر نیٹ ورکس • باب 2')}</p>
            </div>
          </div>
          <button className="w-full py-3 bg-pak-light-green text-white rounded-2xl font-black text-sm shadow-lg shadow-pak-light-green/20 hover:bg-pak-light-green/90 transition-all">
            {t('Resume Learning', 'سیکھنا جاری رکھیں')}
          </button>
        </div>
      </div>
    </div>
  );
};
