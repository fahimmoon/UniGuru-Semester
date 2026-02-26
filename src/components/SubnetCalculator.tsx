import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, RefreshCw, Info, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const SubnetCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [ip, setIp] = useState('192.168.1.0');
  const [subnets, setSubnets] = useState('4');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const subnetCount = parseInt(subnets);
    const bitsNeeded = Math.ceil(Math.log2(subnetCount));
    const newMask = 24 + bitsNeeded;
    const blockSize = Math.pow(2, 32 - newMask);
    
    setResult({
      mask: `255.255.255.${256 - blockSize}`,
      cidr: `/${newMask}`,
      hosts: blockSize - 2,
      blockSize: blockSize,
      steps: [
        { title: 'Step 1: Find Bits', desc: `To create ${subnetCount} subnets, we need 2^n >= ${subnetCount}. Here n = ${bitsNeeded} bits.` },
        { title: 'Step 2: New Mask', desc: `Original mask was /24. Adding ${bitsNeeded} bits gives new mask /${newMask}.` },
        { title: 'Step 3: Block Size', desc: `Block size = 256 - ${256 - blockSize} = ${blockSize}.` },
        { title: 'Step 4: Ranges', desc: `Subnets will increment by ${blockSize} in the last octet.` }
      ],
      example: `Network 1: 192.168.1.0 to 192.168.1.${blockSize - 1}`
    });
  };

  const loadISPExample = () => {
    setIp('190.100.0.0');
    setSubnets('3');
    setResult({
      mask: 'Variable (VLSM)',
      cidr: '/24, /25, /26',
      hosts: 'Multiple',
      blockSize: 'Variable',
      steps: [
        { title: 'Group 1', desc: '64 customers x 256 addresses = 16,384 addresses. Mask /24.' },
        { title: 'Group 2', desc: '128 customers x 128 addresses = 16,384 addresses. Mask /25.' },
        { title: 'Group 3', desc: '128 customers x 64 addresses = 8,192 addresses. Mask /26.' }
      ],
      example: 'Range: 190.100.0.0 to 190.100.159.255'
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-[40px] p-8 shadow-2xl border-2 border-gray-50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-pak-green text-white rounded-[24px] shadow-xl shadow-pak-green/20">
              <Calculator size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t('Subnet Calculator', 'سب نیٹ کیلکولیٹر')}</h2>
              <p className="text-xs font-bold text-pak-green uppercase tracking-widest">{t('Forouzan 5th Edition', 'فروزاں 5 واں ایڈیشن')}</p>
            </div>
          </div>
          <button 
            onClick={loadISPExample}
            className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest"
          >
            <BookOpen size={16} />
            {t('ISP Example', 'آئی ایس پی مثال')}
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
              {t('Base Network IP', 'بیس نیٹ ورک آئی پی')}
            </label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] focus:ring-4 focus:ring-pak-green/10 focus:border-pak-green outline-none transition-all font-mono font-bold text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
              {t('Required Subnets', 'مطلوبہ سب نیٹس')}
            </label>
            <input
              type="number"
              value={subnets}
              onChange={(e) => setSubnets(e.target.value)}
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] focus:ring-4 focus:ring-pak-green/10 focus:border-pak-green outline-none transition-all font-bold text-gray-700"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-5 bg-pak-green text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-pak-green/90 transition-all shadow-2xl shadow-pak-green/30 active:scale-95"
          >
            <RefreshCw size={24} />
            {t('Calculate Now', 'ابھی حساب لگائیں')}
          </button>
        </div>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-900 text-white rounded-[40px] p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pak-light-green/20 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="flex items-center gap-3 text-pak-light-green">
              <Info size={20} />
              <span className="text-xs font-black uppercase tracking-[0.2em]">{t('Calculation Results', 'حساب کے نتائج')}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 p-6 rounded-[28px] border border-white/10">
                <p className="text-[10px] uppercase font-black text-white/40 mb-2 tracking-widest">{t('Subnet Mask', 'سب نیٹ ماسک')}</p>
                <p className="text-2xl font-mono font-black text-pak-light-green">{result.mask}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-[28px] border border-white/10">
                <p className="text-[10px] uppercase font-black text-white/40 mb-2 tracking-widest">{t('CIDR Notation', 'سی آئی ڈی آر')}</p>
                <p className="text-2xl font-mono font-black text-pak-light-green">{result.cidr}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-2xl border-2 border-gray-50 space-y-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1 h-4 bg-pak-green rounded-full" />
              {t('Step-by-Step Logic', 'مرحلہ وار منطق')}
            </h3>
            <div className="space-y-4">
              {result.steps.map((step: any, i: number) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-pak-green/10 text-pak-green flex items-center justify-center text-sm font-black shrink-0 group-hover:bg-pak-green group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-black text-gray-900 mb-1">{t(step.title, step.title)}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{t(step.desc, step.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
