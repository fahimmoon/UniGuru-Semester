import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ShieldCheck, Server, Smartphone } from 'lucide-react';

export const IPVisualizer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('Public vs Private IPs', 'پبلک بمقابلہ پرائیویٹ آئی پیز')}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Private IP Section */}
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center text-center gap-2">
              <ShieldCheck className="text-pak-green" size={32} />
              <h3 className="font-bold text-pak-green text-sm">{t('Private IP', 'پرائیویٹ آئی پی')}</h3>
              <p className="text-[10px] text-gray-500 leading-tight">
                {t('Used inside your home/office network.', 'آپ کے گھر یا دفتر کے نیٹ ورک کے اندر استعمال ہوتا ہے۔')}
              </p>
              <div className="bg-white px-2 py-1 rounded-md border border-emerald-100 font-mono text-[10px] font-bold text-pak-green">
                192.168.1.x
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-[9px] text-gray-400 italic">
              {t('Free to use, not reachable from Internet.', 'استعمال کے لیے مفت، انٹرنیٹ سے رسائی ممکن نہیں۔')}
            </div>
          </div>

          {/* Public IP Section */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center text-center gap-2">
              <Globe className="text-blue-500" size={32} />
              <h3 className="font-bold text-blue-500 text-sm">{t('Public IP', 'پبلک آئی پی')}</h3>
              <p className="text-[10px] text-gray-500 leading-tight">
                {t('Assigned by ISP (PTCL, Nayatel).', 'آئی ایس پی (پی ٹی سی ایل، نیاٹیل) کی طرف سے تفویض کردہ۔')}
              </p>
              <div className="bg-white px-2 py-1 rounded-md border border-blue-100 font-mono text-[10px] font-bold text-blue-500">
                182.176.x.x
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-[9px] text-gray-400 italic">
              {t('Unique worldwide, reachable from Internet.', 'دنیا بھر میں منفرد، انٹرنیٹ سے رسائی ممکن۔')}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('Pakistan ISP Examples', 'پاکستان آئی ایس پی کی مثالیں')}</h4>
          <div className="flex flex-wrap gap-2">
            {['PTCL', 'Nayatel', 'StormFiber', 'Jazz', 'Zong'].map(isp => (
              <span key={isp} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-600">
                {isp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
