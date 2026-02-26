import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OSI_LAYERS } from '../constants';
import { motion, Reorder } from 'framer-motion';
import { Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export const OSIModel: React.FC = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState([...OSI_LAYERS].sort(() => Math.random() - 0.5));
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkOrder = () => {
    const correctOrder = OSI_LAYERS.map(l => l.name);
    const currentOrder = items.map(l => l.name);
    const correct = JSON.stringify(correctOrder) === JSON.stringify(currentOrder);
    setIsCorrect(correct);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pak-green/10 rounded-xl text-pak-green">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('OSI Layer Challenge', 'او ایس آئی لیئر چیلنج')}</h2>
            <p className="text-sm text-gray-500">{t('Drag to arrange from Top to Bottom', 'اوپر سے نیچے ترتیب دینے کے لیے ڈریگ کریں')}</p>
          </div>
        </div>

        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
          {items.map((layer) => (
            <Reorder.Item
              key={layer.name}
              value={layer}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-pak-green/30 transition-all"
              >
                <div 
                  className="w-3 h-12 rounded-full" 
                  style={{ backgroundColor: layer.color }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{t(layer.name, layer.nameUr)}</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{layer.description}</p>
                </div>
                <div className="text-gray-300">
                  <Layers size={16} />
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={checkOrder}
            className="w-full py-4 bg-pak-green text-white rounded-xl font-bold hover:bg-pak-green/90 transition-all shadow-lg shadow-pak-green/20"
          >
            {t('Verify Order', 'ترتیب کی تصدیق کریں')}
          </button>

          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-center gap-3 ${
                isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
              }`}
            >
              {isCorrect ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span className="font-bold">
                {isCorrect 
                  ? t('Perfect! You know your layers.', 'بہترین! آپ اپنی تہوں کو جانتے ہیں۔') 
                  : t('Not quite right. Try again!', 'بالکل درست نہیں۔ دوبارہ کوشش کریں!')}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
