import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const VoiceNarration: React.FC<{ text: string; textUr: string }> = ({ text, textUr }) => {
  const { language, t } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(language === 'en' ? text : textUr);
      utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';
      utterance.rate = 0.9;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <button
      onClick={isSpeaking ? stop : speak}
      className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
        isSpeaking ? 'bg-rose-100 text-rose-600' : 'bg-pak-green/10 text-pak-green hover:bg-pak-green/20'
      }`}
      title={t('Listen to explanation', 'وضاحت سنیں')}
    >
      {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {isSpeaking ? t('Stop', 'روکیں') : t('Listen', 'سنیں')}
      </span>
    </button>
  );
};
