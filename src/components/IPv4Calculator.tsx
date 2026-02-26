import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, RefreshCw, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const IPv4Calculator: React.FC = () => {
  const { t } = useLanguage();
  const [ip, setIp] = useState('192.168.1.1');
  const [result, setResult] = useState<any>(null);

  const calculateClass = () => {
    const firstOctet = parseInt(ip.split('.')[0]);
    let ipClass = '';
    let range = '';
    let mask = '';
    let type = 'Public';

    if (firstOctet >= 1 && firstOctet <= 126) {
      ipClass = 'A';
      range = '1.0.0.0 - 126.255.255.255';
      mask = '255.0.0.0';
      if (firstOctet === 10) type = 'Private (Internal)';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      ipClass = 'B';
      range = '128.0.0.0 - 191.255.255.255';
      mask = '255.255.0.0';
      if (firstOctet === 172 && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31) type = 'Private (Internal)';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      ipClass = 'C';
      range = '192.0.0.0 - 223.255.255.255';
      mask = '255.255.255.0';
      if (firstOctet === 192 && parseInt(ip.split('.')[1]) === 168) type = 'Private (Internal)';
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      ipClass = 'D (Multicast)';
      mask = 'N/A';
    } else if (firstOctet >= 240 && firstOctet <= 255) {
      ipClass = 'E (Experimental)';
      mask = 'N/A';
    } else if (firstOctet === 127) {
      ipClass = 'Loopback';
      mask = '255.0.0.0';
    }

    setResult({ class: ipClass, range, mask, type });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-[40px] p-8 shadow-2xl border-2 border-gray-50">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-blue-600 text-white rounded-[24px] shadow-xl shadow-blue-600/20">
            <Calculator size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">{t('IPv4 Class Finder', 'آئی پی وی 4 کلاس فائنڈر')}</h2>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t('Identify IP Class & Type', 'آئی پی کلاس اور قسم کی شناخت کریں')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
              {t('Enter IP Address', 'آئی پی ایڈریس درج کریں')}
            </label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono font-bold text-gray-700"
            />
          </div>
          <button
            onClick={calculateClass}
            className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 active:scale-95"
          >
            <RefreshCw size={24} />
            {t('Identify Class', 'کلاس کی شناخت کریں')}
          </button>
        </div>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-600 text-white rounded-[40px] p-8 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="flex items-center gap-3 text-white/70 relative z-10">
            <ShieldCheck size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">{t('Identification Results', 'شناخت کے نتائج')}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/10 p-6 rounded-[28px] border border-white/10">
              <p className="text-[10px] uppercase font-black text-white/40 mb-2 tracking-widest">{t('Class', 'کلاس')}</p>
              <p className="text-3xl font-black">{result.class}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-[28px] border border-white/10">
              <p className="text-[10px] uppercase font-black text-white/40 mb-2 tracking-widest">{t('Type', 'قسم')}</p>
              <p className="text-sm font-black">{result.type}</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-[28px] border border-white/10 relative z-10">
            <p className="text-[10px] uppercase font-black text-white/40 mb-2 tracking-widest">{t('Default Mask', 'ڈیفالٹ ماسک')}</p>
            <p className="text-2xl font-mono font-black">{result.mask}</p>
          </div>
          <div className="text-[10px] text-white/50 text-center italic relative z-10 font-bold">
            {t('Note: Private IPs are used by PTCL, Nayatel, etc. internally.', 'نوٹ: پرائیویٹ آئی پیز پی ٹی سی ایل، نیاٹیل وغیرہ اندرونی طور پر استعمال کرتے ہیں۔')}
          </div>
        </motion.div>
      )}
    </div>
  );
};
