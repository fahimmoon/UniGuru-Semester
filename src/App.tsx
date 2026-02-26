import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { SubnetCalculator } from './components/SubnetCalculator';
import { OSIModel } from './components/OSIModel';
import { ARPAnimation } from './components/ARPAnimation';
import { Quiz } from './components/Quiz';
import { IPv4Calculator } from './components/IPv4Calculator';
import { Topology3D } from './components/Topology3D';
import { RouterSimulation } from './components/RouterSimulation';
import { IPVisualizer } from './components/IPVisualizer';
import { Profile } from './components/Profile';
import { CNDCContent } from './components/CNDCContent';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Bookmark, Download, Share2, Award, Star, ArrowLeft } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { t } = useLanguage();

  const renderCourseContent = (courseId: string) => {
    if (courseId === 'cndc') {
      return (
        <div className="space-y-4 pb-24">
          <div className="p-4 flex items-center gap-4 sticky top-0 bg-gray-50 border-b border-gray-200 z-40">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="p-2 bg-white rounded-full shadow-sm text-pak-green"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-black text-gray-900">{t('Computer Networks', 'کمپیوٹر نیٹ ورکس')}</h2>
          </div>
          
          <CNDCContent />
          
          <div className="px-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-pak-green rounded-full" />
              <h3 className="text-xl font-black text-gray-900">{t('Interactive Labs', 'انٹرایکٹو لیبز')}</h3>
            </div>
            <Topology3D />
            <OSIModel />
            <ARPAnimation />
            <RouterSimulation />
            <IPVisualizer />
            <IPv4Calculator />
            <SubnetCalculator />
            <Quiz />
          </div>
        </div>
      );
    }
    return (
      <div className="p-8 text-center space-y-4">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="p-2 bg-white rounded-full shadow-sm text-pak-green inline-flex"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">{t('Coming Soon', 'جلد آ رہا ہے')}</h2>
        <p className="text-gray-500">{t('This course content is being prepared.', 'اس کورس کا مواد تیار کیا جا رہا ہے۔')}</p>
      </div>
    );
  };

  const renderContent = () => {
    if (selectedCourse) {
      return renderCourseContent(selectedCourse);
    }

    switch (activeTab) {
      case 'home':
        return <Dashboard onCourseSelect={setSelectedCourse} />;
      case 'learn':
        return (
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-black text-gray-900 px-2">{t('Quick Learn', 'فوری سیکھیں')}</h2>
            <OSIModel />
            <ARPAnimation />
          </div>
        );
      case 'tools':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-gray-900 px-6 pt-4">{t('Network Tools', 'نیٹ ورک ٹولز')}</h2>
            <IPv4Calculator />
            <SubnetCalculator />
            <Quiz />
          </div>
        );
      case 'cert':
        return (
          <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-pak-green/10 rounded-full scale-150 blur-xl"
              />
              <Award size={120} className="text-pak-green relative z-10 animate-float" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">{t('Your Achievements', 'آپ کی کامیابیاں')}</h2>
              <p className="text-gray-500 max-w-xs mx-auto">
                {t('Complete 80% of any course to unlock your official certificate.', 'سرکاری سرٹیفکیٹ حاصل کرنے کے لیے کسی بھی کورس کا 80 فیصد مکمل کریں۔')}
              </p>
            </div>
            <div className="w-full max-w-xs bg-white p-6 rounded-3xl shadow-xl border border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('Current Score', 'موجودہ سکور')}</span>
                <span className="text-lg font-black text-pak-green">32%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[32%] h-full bg-pak-green" />
              </div>
              <button className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">
                {t('Locked', 'مقفل')}
              </button>
            </div>
          </div>
        );
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onCourseSelect={setSelectedCourse} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-w-md mx-auto shadow-2xl relative">
      <Header onMenuClick={() => {}} />
      
      <main className="flex-1 overflow-y-auto pak-pattern">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
