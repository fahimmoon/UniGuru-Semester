import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Router, Globe, Laptop, ArrowRight, Settings, Wifi } from 'lucide-react';

export const RouterSimulation: React.FC = () => {
  const { t } = useLanguage();
  const [packetStep, setPacketStep] = useState(0);

  const steps = [
    { title: 'Local Request', titleUr: 'مقامی درخواست', desc: 'PC sends a request to google.com. It first checks if the destination is in the local network.', descUr: 'پی سی گوگل ڈاٹ کام کو درخواست بھیجتا ہے۔ یہ پہلے چیک کرتا ہے کہ آیا منزل مقامی نیٹ ورک میں ہے۔' },
    { title: 'Default Gateway', titleUr: 'ڈیفالٹ گیٹ وے', desc: 'Since it\'s external, the PC sends the packet to the Default Gateway (Router IP: 192.168.1.1).', descUr: 'چونکہ یہ بیرونی ہے، پی سی پیکٹ کو ڈیفالٹ گیٹ وے (راؤٹر آئی پی: 192.168.1.1) پر بھیجتا ہے۔' },
    { title: 'NAT Translation', titleUr: 'نیٹ ٹرانسلیشن', desc: 'The Router (PTCL/Nayatel) replaces the private IP with a Public IP to send it over the Internet.', descUr: 'راؤٹر (پی ٹی سی ایل/نیاٹیل) پرائیویٹ آئی پی کو پبلک آئی پی سے بدل دیتا ہے تاکہ اسے انٹرنیٹ پر بھیجا جا سکے۔' },
    { title: 'Internet Reach', titleUr: 'انٹرنیٹ تک رسائی', desc: 'The packet travels through the ISP backbone to reach the destination server.', descUr: 'پیکٹ آئی ایس پی بیک بون کے ذریعے منزل کے سرور تک پہنچتا ہے۔' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Router size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('Home Router Sim', 'ہوم راؤٹر سمولیشن')}</h2>
            <p className="text-sm text-gray-500">{t('How Default Gateway works', 'ڈیفالٹ گیٹ وے کیسے کام کرتا ہے')}</p>
          </div>
        </div>

        <div className="relative h-48 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between px-10">
          {/* Internal PC */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-200">
              <Laptop size={24} className="text-gray-600" />
            </div>
            <p className="text-[8px] font-mono text-gray-400">192.168.1.5</p>
          </div>

          {/* Router */}
          <div className="flex flex-col items-center gap-2 relative">
            <div className="p-4 bg-pak-green text-white rounded-2xl shadow-lg">
              <Wifi size={32} />
            </div>
            <p className="text-[10px] font-bold text-pak-green">Gateway</p>
            <p className="text-[8px] font-mono text-gray-400">192.168.1.1</p>
            
            {/* Packet Animation */}
            <AnimatePresence>
              {packetStep === 1 && (
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 -translate-y-1/2 -left-12"
                >
                  <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
                </motion.div>
              )}
              {packetStep === 2 && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  className="absolute top-1/2 -translate-y-1/2"
                >
                  <div className="w-6 h-6 bg-pak-light-green rounded-full blur-sm opacity-50" />
                </motion.div>
              )}
              {packetStep === 3 && (
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 80, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 -translate-y-1/2 -right-12"
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Internet */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <Globe size={24} className="text-blue-500" />
            </div>
            <p className="text-[8px] font-mono text-gray-400">ISP Network</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 min-h-[80px]">
            <h4 className="font-bold text-gray-900 text-sm mb-1">{t(steps[packetStep].title, steps[packetStep].titleUr)}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{t(steps[packetStep].desc, steps[packetStep].descUr)}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPacketStep(0)}
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold"
            >
              {t('Reset', 'ری سیٹ')}
            </button>
            <button
              onClick={() => setPacketStep((s) => (s + 1) % steps.length)}
              className="flex-1 py-3 bg-pak-green text-white rounded-xl font-bold shadow-lg"
            >
              {t('Next Step', 'اگلا مرحلہ')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
