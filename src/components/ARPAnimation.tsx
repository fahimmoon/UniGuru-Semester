import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Laptop, Server, ArrowRight, RefreshCw } from 'lucide-react';

export const ARPAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Initial State', titleUr: 'ابتدائی حالت', desc: 'Host A wants to send data to 192.168.1.10 but doesn\'t know its MAC address.', descUr: 'ہوسٹ اے 192.168.1.10 کو ڈیٹا بھیجنا چاہتا ہے لیکن اسے اس کا میک ایڈریس معلوم نہیں ہے۔' },
    { title: 'ARP Request', titleUr: 'اے آر پی درخواست', desc: 'Host A broadcasts an ARP Request: "Who has 192.168.1.10? Tell 192.168.1.5"', descUr: 'ہوسٹ اے اے آر پی درخواست براڈکاسٹ کرتا ہے: "192.168.1.10 کس کے پاس ہے؟ 192.168.1.5 کو بتائیں"' },
    { title: 'ARP Reply', titleUr: 'اے آر پی جواب', desc: 'Host B (192.168.1.10) sends a unicast ARP Reply with its MAC address.', descUr: 'ہوسٹ بی (192.168.1.10) اپنے میک ایڈریس کے ساتھ یونیکاسٹ اے آر پی جواب بھیجتا ہے۔' },
    { title: 'Cache Updated', titleUr: 'کیشے اپ ڈیٹ', desc: 'Host A updates its ARP cache and can now send the data.', descUr: 'ہوسٹ اے اپنا اے آر پی کیشے اپ ڈیٹ کرتا ہے اور اب ڈیٹا بھیج سکتا ہے۔' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-pak-green/10 rounded-xl text-pak-green">
            <Send size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('ARP Simulation', 'اے آر پی سمولیشن')}</h2>
            <p className="text-sm text-gray-500">{t('Watch how MAC addresses are resolved', 'دیکھیں کہ میک ایڈریسز کیسے حل ہوتے ہیں')}</p>
          </div>
        </div>

        {/* Animation Area */}
        <div className="relative h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-around px-8">
          {/* Host A */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`p-4 rounded-2xl transition-all duration-500 ${step >= 1 ? 'bg-pak-green text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-200'}`}>
              <Laptop size={32} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider">Host A</p>
              <p className="text-[8px] font-mono opacity-60">192.168.1.5</p>
            </div>
          </div>

          {/* Packet Animation */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 100, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-pak-light-green text-white px-3 py-1 rounded-full text-[8px] font-bold flex items-center gap-1 shadow-lg">
                  <ArrowRight size={10} />
                  ARP REQ (BC)
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: -100, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-[8px] font-bold flex items-center gap-1 shadow-lg">
                  ARP REPLY (UC)
                  <ArrowRight size={10} className="rotate-180" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Host B */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`p-4 rounded-2xl transition-all duration-500 ${step >= 2 ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-200'}`}>
              <Server size={32} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider">Host B</p>
              <p className="text-[8px] font-mono opacity-60">192.168.1.10</p>
            </div>
          </div>
        </div>

        {/* Controls & Info */}
        <div className="mt-8 space-y-4">
          <div className="bg-pak-green/5 p-4 rounded-xl border border-pak-green/10">
            <h4 className="font-bold text-pak-green text-sm mb-1">{t(steps[step].title, steps[step].titleUr)}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{t(steps[step].desc, steps[step].descUr)}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(0)}
              className="p-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="flex-1 py-4 bg-pak-green text-white rounded-xl font-bold disabled:opacity-50 hover:bg-pak-green/90 transition-all shadow-lg shadow-pak-green/20"
            >
              {t('Next Step', 'اگلا مرحلہ')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
