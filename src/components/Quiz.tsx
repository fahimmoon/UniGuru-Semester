import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    q: 'Which layer of the OSI model is responsible for routing packets?',
    qUr: 'او ایس آئی ماڈل کی کون سی لیئر پیکٹ روٹنگ کی ذمہ دار ہے؟',
    options: ['Physical', 'Data Link', 'Network', 'Transport'],
    optionsUr: ['فزیکل', 'ڈیٹا لنک', 'نیٹ ورک', 'ٹرانسپورٹ'],
    correct: 2,
    explanation: 'The Network layer handles logical addressing and routing.',
    explanationUr: 'نیٹ ورک لیئر منطقی ایڈریسنگ اور روٹنگ کو سنبھالتی ہے۔'
  },
  {
    q: 'What is the default subnet mask for a Class C IP address?',
    qUr: 'کلاس سی آئی پی ایڈریس کے لیے ڈیفالٹ سب نیٹ ماسک کیا ہے؟',
    options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
    optionsUr: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
    correct: 2,
    explanation: 'Class C uses 24 bits for the network portion.',
    explanationUr: 'کلاس سی نیٹ ورک کے حصے کے لیے 24 بٹس استعمال کرتی ہے۔'
  }
];

export const Quiz: React.FC = () => {
  const { t } = useLanguage();

  const [currentIdx, setCurrentIdx] = useState(() => {
    const saved = localStorage.getItem('quiz_idx');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('quiz_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [finished, setFinished] = useState(() => {
    const saved = localStorage.getItem('quiz_finished');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('quiz_idx', currentIdx.toString());
    localStorage.setItem('quiz_score', score.toString());
    localStorage.setItem('quiz_finished', finished.toString());
  }, [currentIdx, score, finished]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (score >= QUESTIONS.length * 0.8) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  if (finished) {
    return (
      <div className="p-8 text-center space-y-6">
        <div className="w-24 h-24 bg-pak-green/10 rounded-full flex items-center justify-center mx-auto text-pak-green">
          <Award size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900">{t('Quiz Completed!', 'کوئز مکمل ہو گیا!')}</h2>
          <p className="text-gray-500">
            {t(`You scored ${score} out of ${QUESTIONS.length}`, `آپ نے ${QUESTIONS.length} میں سے ${score} سکور کیا`)}
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentIdx(0);
            setScore(0);
            setFinished(false);
            setSelected(null);
          }}
          className="w-full py-4 bg-pak-green text-white rounded-xl font-bold shadow-lg"
        >
          {t('Try Again', 'دوبارہ کوشش کریں')}
        </button>
      </div>
    );
  }

  const q = QUESTIONS[currentIdx];

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pak-green/10 rounded-xl text-pak-green">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('Quick Quiz', 'فوری کوئز')}</h2>
          </div>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {currentIdx + 1} / {QUESTIONS.length}
          </span>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 leading-relaxed">
            {t(q.q, q.qUr)}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl text-left transition-all border-2 flex items-center justify-between ${selected === idx
                    ? idx === q.correct
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-rose-50 border-rose-500 text-rose-700'
                    : selected !== null && idx === q.correct
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-pak-green/30'
                  }`}
              >
                <span className="font-medium">{t(opt, q.optionsUr[idx])}</span>
                {selected !== null && idx === q.correct && <CheckCircle2 size={18} />}
                {selected === idx && idx !== q.correct && <XCircle size={18} />}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              >
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-bold text-pak-green uppercase tracking-widest mr-2">{t('Explanation:', 'وضاحت:')}</span>
                  {t(q.explanation, q.explanationUr)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {selected !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-pak-green text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              {t('Next Question', 'اگلا سوال')}
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
