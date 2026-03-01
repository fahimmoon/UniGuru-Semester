import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import {
  Mail, User, Activity, Share2, Layers, Hash, Globe, Cpu, Server,
  ArrowRight, Info, CheckCircle2, Award, BookOpen, Users, Calendar,
  Shield, Laptop, Network, Zap, Box, Radio, XCircle, PlayCircle, Cloud, Search,
  Compass, Link, Wifi, Lock, Code, Headphones, Globe2, ChevronRight, ChevronDown, Rocket, Target, Send, Database, BarChart3, RefreshCw, PenTool, Terminal
} from 'lucide-react';

const WeekCard = ({ week, title, titleUr, isExpanded, onToggle, children }: any) => {
  const { t } = useLanguage();
  return (
    <div className={`transition-all duration-500 mb-6 ${isExpanded ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
      <button
        onClick={onToggle}
        className={`w-full text-left p-6 md:p-8 rounded-[32px] md:rounded-[40px] flex items-center justify-between transition-all duration-500 shadow-2xl ${isExpanded ? 'bg-[#006400] text-white shadow-[#006400]/40' : 'bg-white text-gray-900 border border-gray-100 hover:border-[#00A651]/30'
          }`}
      >
        <div className="flex items-center gap-4 md:gap-8">
          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[24px] flex items-center justify-center font-black text-lg md:text-2xl shadow-xl transform transition-transform duration-500 ${isExpanded ? 'bg-white text-[#006400] rotate-12' : 'bg-[#006400] text-white'
            }`}>
            {week}
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-xl md:text-3xl tracking-tight leading-none">{title}</h3>
            <p className={`font-urdu text-base md:text-xl font-medium transition-opacity duration-500 ${isExpanded ? 'opacity-90' : 'text-[#00A651]'}`}>{titleUr}</p>
          </div>
        </div>
        <div className={`p-2 md:p-3 rounded-full transition-all duration-500 ${isExpanded ? 'bg-white/20 rotate-180' : 'bg-gray-50'}`}>
          {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 md:p-12 bg-white rounded-[40px] md:rounded-[60px] border border-gray-100 shadow-2xl space-y-12">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LectureNote = ({ title, content, icon: Icon }: any) => {
  const { t } = useLanguage();
  return (
    <div className="p-6 md:p-8 bg-linear-to-br from-gray-50 to-white rounded-[32px] border border-gray-100 flex gap-6 items-start group hover:border-[#00A651]/20 transition-all">
      <div className="w-14 h-14 shrink-0 bg-white rounded-2xl shadow-lg border border-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={28} className="text-[#006400]" />
      </div>
      <div className="space-y-2">
        <h5 className="font-black text-gray-900 text-lg tracking-tight uppercase group-hover:text-[#006400] transition-colors">{t(title, title)}</h5>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">{t(content, content)}</p>
      </div>
    </div>
  );
};

const DiagramNode = ({ x, y, label, color = "#006400" }: { x: number; y: number; label?: string; color?: string }) => (
  <motion.g
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.2 }}
    className="cursor-pointer"
  >
    <defs>
      <radialGradient id={`grad-${x}-${y}`} cx="30%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <filter id="shadow-node" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="1" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Node Body */}
    <circle cx={x} cy={y} r="12" fill={color} filter="url(#shadow-node)" className="stroke-white/20 stroke-1" />
    {/* 3D Highlight */}
    <circle cx={x} cy={y} r="12" fill={`url(#grad-${x}-${y})`} />
    {/* Label */}
    {label && (
      <text x={x} y={y + 22} textAnchor="middle" className="text-[8px] font-black fill-gray-500 uppercase tracking-tighter">
        {label}
      </text>
    )}
  </motion.g>
);

const Connection = ({ x1, y1, x2, y2, color = "#00A651" }: { x1: number; y1: number; x2: number; y2: number; color?: string }) => (
  <motion.line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.6 }}
    whileHover={{ strokeWidth: 5, opacity: 1, stroke: "#006400" }}
    className="cursor-pointer transition-all"
  />
);

const TopologyDiagram = ({ type }: { type: string }) => {
  switch (type) {
    case 'Star':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-48 drop-shadow-2xl">
          <Connection x1={60} y1={60} x2={20} y2={20} />
          <Connection x1={60} y1={60} x2={100} y2={20} />
          <Connection x1={60} y1={60} x2={20} y2={100} />
          <Connection x1={60} y1={60} x2={100} y2={100} />
          <motion.circle cx={60} cy={60} r={16} fill="#006400" className="shadow-lg stroke-white stroke-2" />
          <text x={60} y={64} textAnchor="middle" fill="white" fontSize="8" fontWeight="black">HUB</text>
          <DiagramNode x={20} y={20} label="PC1" />
          <DiagramNode x={100} y={20} label="PC2" />
          <DiagramNode x={20} y={100} label="PC3" />
          <DiagramNode x={100} y={100} label="PC4" />
        </svg>
      );
    case 'Bus':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-48 drop-shadow-2xl">
          <motion.line x1={20} y1={50} x2={180} y2={50} stroke="#006400" strokeWidth={8} strokeLinecap="round" />
          <Connection x1={50} y1={50} x2={50} y2={20} />
          <Connection x1={90} y1={50} x2={90} y2={80} />
          <Connection x1={130} y1={50} x2={130} y2={20} />
          <DiagramNode x={50} y={20} label="PC1" />
          <DiagramNode x={90} y={80} label="PC2" />
          <DiagramNode x={130} y={20} label="PC3" />
        </svg>
      );
    case 'Ring':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-48 drop-shadow-2xl">
          <motion.circle cx={60} cy={60} r={35} fill="none" stroke="#006400" strokeWidth={4} strokeDasharray="5 5" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          <Connection x1={60} y1={25} x2={95} y2={60} />
          <Connection x1={95} y1={60} x2={60} y2={95} />
          <Connection x1={60} y1={95} x2={25} y2={60} />
          <Connection x1={25} y1={60} x2={60} y2={25} />
          <DiagramNode x={60} y={25} label="A" />
          <DiagramNode x={95} y={60} label="B" />
          <DiagramNode x={60} y={95} label="C" />
          <DiagramNode x={25} y={60} label="D" />
        </svg>
      );
    case 'Mesh':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-48 drop-shadow-2xl">
          <Connection x1={30} y1={30} x2={90} y2={30} />
          <Connection x1={30} y1={30} x2={30} y2={90} />
          <Connection x1={30} y1={30} x2={90} y2={90} />
          <Connection x1={90} y1={30} x2={30} y2={90} />
          <Connection x1={90} y1={30} x2={90} y2={90} />
          <Connection x1={30} y1={90} x2={90} y2={90} />
          <DiagramNode x={30} y={30} label="1" />
          <DiagramNode x={90} y={30} label="2" />
          <DiagramNode x={30} y={90} label="3" />
          <DiagramNode x={90} y={90} label="4" />
        </svg>
      );
    case 'Tree':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-48 drop-shadow-2xl">
          <Connection x1={60} y1={20} x2={30} y2={50} />
          <Connection x1={60} y1={20} x2={90} y2={50} />
          <Connection x1={30} y1={50} x2={15} y2={80} />
          <Connection x1={30} y1={50} x2={45} y2={80} />
          <Connection x1={90} y1={50} x2={75} y2={80} />
          <Connection x1={90} y1={50} x2={105} y2={80} />
          <DiagramNode x={60} y={20} label="Root" />
          <DiagramNode x={30} y={50} label="L1" />
          <DiagramNode x={90} y={50} label="L2" />
          <DiagramNode x={15} y={80} label="L3" />
          <DiagramNode x={45} y={80} label="L4" />
          <DiagramNode x={75} y={80} label="L5" />
          <DiagramNode x={105} y={80} label="L6" />
        </svg>
      );
    case 'Hybrid':
      return (
        <svg viewBox="0 0 200 120" className="w-full h-48 drop-shadow-2xl">
          <motion.line x1={30} y1={90} x2={170} y2={90} stroke="#006400" strokeWidth={8} strokeLinecap="round" />
          <Connection x1={60} y1={90} x2={60} y2={60} />
          <Connection x1={140} y1={90} x2={140} y2={60} />
          <Connection x1={60} y1={60} x2={40} y2={30} />
          <Connection x1={60} y1={60} x2={80} y2={30} />
          <Connection x1={140} y1={60} x2={120} y2={30} />
          <Connection x1={140} y1={60} x2={160} y2={30} />
          <DiagramNode x={60} y={60} label="Hub 1" color="#00A651" />
          <DiagramNode x={140} y={60} label="Hub 2" color="#00A651" />
          <DiagramNode x={40} y={30} label="PC1" />
          <DiagramNode x={80} y={30} label="PC2" />
          <DiagramNode x={120} y={30} label="PC3" />
          <DiagramNode x={160} y={30} label="PC4" />
        </svg>
      );
    default:
      return null;
  }
};

const PacketFlowSimulation = () => {
  const [step, setStep] = React.useState(0);
  const { t } = useLanguage();

  const steps = [
    {
      title: "Encapsulation",
      desc: "Client creates HTTP request. Data is wrapped in Transport (TCP), Network (IP), and Data Link (Ethernet) headers.",
      layers: ["Data", "TCP", "IP", "Eth"],
      activeNode: "client"
    },
    {
      title: "Switching (L2)",
      desc: "Switch receives Ethernet frame. It looks at the Destination MAC address and forwards it to the Router.",
      layers: ["Eth"],
      activeNode: "switch"
    },
    {
      title: "Routing (L3)",
      desc: "Router decapsulates Data Link layer. It looks at Destination IP, makes a routing decision, and re-encapsulates for the next hop.",
      layers: ["IP"],
      activeNode: "router"
    },
    {
      title: "Internet Traversal",
      desc: "Packet travels through multiple ISP routers across the globe using BGP and other protocols.",
      layers: ["IP"],
      activeNode: "internet"
    },
    {
      title: "Decapsulation",
      desc: "Web Server receives the packet. It strips away Eth, IP, and TCP headers to process the HTTP request.",
      layers: ["Data"],
      activeNode: "server"
    }
  ];

  return (
    <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-12 overflow-hidden">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 text-[#006400] flex items-center gap-3">
        <Activity size={28} className="md:w-8 md:h-8" /> {t('Packet Flow & Encapsulation', 'پیکٹ فلو اور انکیپسولیشن')}
      </h3>

      <div className="relative h-48 md:h-64 bg-gray-50 rounded-[24px] md:rounded-[32px] mb-6 md:mb-8 p-4 md:p-8 flex items-center justify-between">
        {/* Nodes */}
        <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
          <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg transition-all ${step === 0 ? 'bg-[#006400] text-white scale-110' : 'bg-white text-gray-400'}`}>
            <Laptop size={20} className="md:w-8 md:h-8" />
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter">Client</span>
        </div>

        <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
          <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg transition-all ${step === 1 ? 'bg-[#006400] text-white scale-110' : 'bg-white text-gray-400'}`}>
            <Server size={20} className="md:w-8 md:h-8" />
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter">Switch</span>
        </div>

        <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
          <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg transition-all ${step === 2 ? 'bg-[#006400] text-white scale-110' : 'bg-white text-gray-400'}`}>
            <Cpu size={20} className="md:w-8 md:h-8" />
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter">Router</span>
        </div>

        <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
          <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg transition-all ${step === 3 ? 'bg-[#006400] text-white scale-110' : 'bg-white text-gray-400'}`}>
            <Cloud size={20} className="md:w-8 md:h-8" />
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter">Internet</span>
        </div>

        <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
          <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg transition-all ${step === 4 ? 'bg-[#006400] text-white scale-110' : 'bg-white text-gray-400'}`}>
            <Globe size={20} className="md:w-8 md:h-8" />
          </div>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter">Server</span>
        </div>

        {/* Moving Packet */}
        <motion.div
          animate={{
            left: `${(step / 4) * 80 + 10}%`,
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1.2, 0.8]
          }}
          key={step}
          className="absolute top-1/2 -translate-y-1/2 w-8 md:w-12 h-6 md:h-8 bg-yellow-400 rounded-lg shadow-xl border-2 border-white flex items-center justify-center z-20"
        >
          <Box size={12} className="md:w-4 md:h-4 text-yellow-900" />
        </motion.div>

        {/* Connection Lines */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-0.5 md:h-1 bg-gray-200 -z-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-gray-50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-l-4 md:border-l-8 border-[#006400]">
            <h4 className="font-black text-lg md:text-xl mb-1 md:mb-2 text-[#006400]">{t(steps[step].title, steps[step].title)}</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{t(steps[step].desc, steps[step].desc)}</p>
          </div>

          <div className="flex gap-3 md:gap-4">
            <button
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="flex-1 py-3 md:py-4 bg-gray-100 text-gray-400 rounded-xl md:rounded-2xl font-black text-sm md:text-base disabled:opacity-50"
            >
              {t('Previous', 'پچھلا')}
            </button>
            <button
              onClick={() => setStep(prev => (prev + 1) % 5)}
              className="flex-1 py-3 md:py-4 bg-[#006400] text-white rounded-xl md:rounded-2xl font-black text-sm md:text-base shadow-xl hover:bg-[#00A651] transition-all"
            >
              {step === 4 ? t('Restart', 'دوبارہ شروع کریں') : t('Next Step', 'اگلا مرحلہ')}
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 md:p-8 rounded-[24px] md:rounded-[32px] text-white">
          <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 mb-4 md:mb-6">{t('Layer Stack (Encapsulation)', 'لیئر اسٹیک')}</h4>
          <div className="space-y-1.5 md:space-y-2">
            {steps[step].layers.map((layer, i) => (
              <motion.div
                key={layer}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-2 md:p-3 rounded-lg md:rounded-xl text-center font-black text-xs md:text-sm shadow-lg border-b-2 md:border-b-4
                  ${layer === 'Eth' ? 'bg-blue-600 border-blue-800' : ''}
                  ${layer === 'IP' ? 'bg-emerald-600 border-emerald-800' : ''}
                  ${layer === 'TCP' ? 'bg-orange-600 border-orange-800' : ''}
                  ${layer === 'Data' ? 'bg-purple-600 border-purple-800' : ''}
                `}
              >
                {layer}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 md:mt-6 text-[8px] md:text-[10px] text-gray-500 italic text-center">
            {step < 3 ? t('Adding headers (Encapsulation)', 'ہیڈرز شامل کیے جا رہے ہیں') : t('Removing headers (Decapsulation)', 'ہیڈرز ہٹائے جا رہے ہیں')}
          </p>
        </div>
      </div>
    </div>
  );
};

const DNSSection = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-16">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
        <Search size={28} className="md:w-8 md:h-8" /> {t('Domain Name System (DNS)', 'ڈومین نیم سسٹم (DNS)')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
        <div className="space-y-4 md:space-y-6">
          <p className="text-xs md:text-sm leading-relaxed text-gray-700">
            {t('DNS is the "Phonebook of the Internet". It translates human-readable domain names (like google.com) into machine-readable IP addresses (like 142.250.190.46).', 'DNS انٹرنیٹ کی "فون بک" ہے۔ یہ انسانی پڑھنے کے قابل ڈومین ناموں کو مشین کے پڑھنے کے قابل آئی پی ایڈریسز میں تبدیل کرتا ہے۔')}
          </p>

          <div className="bg-emerald-50 p-6 rounded-[24px] md:rounded-3xl border border-emerald-100">
            <h4 className="font-black text-sm md:text-base text-[#006400] mb-3 md:mb-4">{t('Common Record Types', 'عام ریکارڈ کی اقسام')}</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between text-[10px] md:text-xs">
                <span className="font-black">A Record</span>
                <span className="text-gray-500">IPv4 Address</span>
              </div>
              <div className="flex justify-between text-[10px] md:text-xs">
                <span className="font-black">AAAA Record</span>
                <span className="text-gray-500">IPv6 Address</span>
              </div>
              <div className="flex justify-between text-[10px] md:text-xs">
                <span className="font-black">CNAME</span>
                <span className="text-gray-500">Alias (Name to Name)</span>
              </div>
              <div className="flex justify-between text-[10px] md:text-xs">
                <span className="font-black">MX Record</span>
                <span className="text-gray-500">Mail Exchange (Email)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] relative overflow-hidden">
          <h4 className="font-black text-center mb-6 md:mb-8 text-[10px] md:text-xs uppercase tracking-widest text-gray-400">{t('DNS Query Process', 'DNS کوئری کا عمل')}</h4>
          <div className="space-y-3 md:space-y-4 relative z-10">
            {[
              { step: 1, text: "Client asks Resolver" },
              { step: 2, text: "Resolver asks Root Server" },
              { step: 3, text: "Resolver asks TLD Server (.com)" },
              { step: 4, text: "Resolver asks Authoritative Server" }
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3 md:gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#006400] text-white rounded-full flex items-center justify-center text-[10px] md:text-xs font-black">
                  {item.step}
                </div>
                <p className="text-[10px] md:text-xs font-bold">{t(item.text, item.text)}</p>
              </div>
            ))}
          </div>
          <motion.div
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute right-4 md:right-8 top-8 md:top-12 text-[#00A651] opacity-10 md:opacity-20"
          >
            <Search size={80} className="md:w-[120px] md:h-[120px]" />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="p-6 md:p-8 bg-white border-2 border-gray-100 rounded-[24px] md:rounded-[32px] shadow-sm">
          <h4 className="font-black text-sm md:text-base text-[#006400] mb-1 md:mb-2">{t('Recursive Query', 'ریکرسیو کوئری')}</h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
            {t('The client demands a complete answer. The resolver does all the work of contacting other servers.', 'کلائنٹ مکمل جواب کا مطالبہ کرتا ہے۔ ریزولور دوسرے سرورز سے رابطہ کرنے کا تمام کام کرتا ہے۔')}
          </p>
        </div>
        <div className="p-6 md:p-8 bg-white border-2 border-gray-100 rounded-[24px] md:rounded-[32px] shadow-sm">
          <h4 className="font-black text-sm md:text-base text-[#006400] mb-1 md:mb-2">{t('Iterative Query', 'ایٹریٹیو کوئری')}</h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
            {t('The server provides the best answer it has, or a referral to another server.', 'سرور بہترین جواب فراہم کرتا ہے جو اس کے پاس ہے، یا دوسرے سرور کا حوالہ دیتا ہے۔')}
          </p>
        </div>
      </div>
    </div>
  );
};

const OSIQuiz = () => {
  const { t } = useLanguage();
  const correctOrder = [
    "Application",
    "Presentation",
    "Session",
    "Transport",
    "Network",
    "Data Link",
    "Physical"
  ];

  const [items, setItems] = React.useState(() =>
    [...correctOrder].sort(() => Math.random() - 0.5)
  );

  const isCorrect = JSON.stringify(items) === JSON.stringify(correctOrder);

  return (
    <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-12">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 text-[#006400] flex items-center gap-3">
        <Layers size={28} className="md:w-8 md:h-8" /> {t('Interactive OSI Challenge', 'Interactive OSI Challenge')}
      </h3>
      <p className="text-xs md:text-sm text-gray-600 mb-6 md:mb-8">
        {t('Drag and drop the layers to arrange them in the correct order (Layer 7 at the top to Layer 1 at the bottom).', 'Drag and drop the layers to arrange them in the correct order (Layer 7 at the top to Layer 1 at the bottom).')}
      </p>

      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2 md:space-y-3">
        {items.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            className={`p-3 md:p-5 rounded-xl md:rounded-2xl border-2 cursor-grab active:cursor-grabbing transition-all flex items-center justify-between shadow-sm group
              ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-gray-50 border-gray-100 hover:border-[#006400]/30'}
            `}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white shadow-lg transform group-hover:scale-110 transition-transform text-sm md:text-base
                ${isCorrect ? 'bg-[#00A651]' : 'bg-[#006400]'}
              `}>
                {7 - correctOrder.indexOf(item)}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm md:text-lg text-gray-800 leading-tight">{t(item, item)}</span>
                <span className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  {item === "Application" && "Layer 7"}
                  {item === "Presentation" && "Layer 6"}
                  {item === "Session" && "Layer 5"}
                  {item === "Transport" && "Layer 4"}
                  {item === "Network" && "Layer 3"}
                  {item === "Data Link" && "Layer 2"}
                  {item === "Physical" && "Layer 1"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {isCorrect ? (
                <CheckCircle2 className="text-[#00A651] md:w-6 md:h-6" size={20} />
              ) : (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-300" />
                </div>
              )}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {isCorrect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 md:mt-10 p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-[24px] md:rounded-[32px] text-center shadow-xl"
        >
          <div className="inline-flex p-3 md:p-4 bg-emerald-500 text-white rounded-full mb-3 md:mb-4 shadow-lg">
            <Award size={24} className="md:w-8 md:h-8" />
          </div>
          <h4 className="text-xl md:text-2xl font-black text-emerald-900 mb-1 md:mb-2">
            {t('Excellent! Correct Order!', 'Excellent! Correct Order!')}
          </h4>
          <p className="text-emerald-700 text-xs md:text-sm">
            {t('You have successfully mastered the OSI 7-Layer hierarchy. "All People Seem To Need Data Processing"', 'You have successfully mastered the OSI 7-Layer hierarchy. "All People Seem To Need Data Processing"')}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const ARPAnimation = () => {
  const [step, setStep] = React.useState(0); // 0: Idle, 1: Request, 2: Reply
  const { t } = useLanguage();

  const nextStep = () => setStep((prev) => (prev + 1) % 3);

  return (
    <div className="relative w-full h-80 bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 p-8 shadow-inner">
      <div className="flex justify-between items-center h-full max-w-3xl mx-auto relative px-12">
        {/* Host A */}
        <div className="flex flex-col items-center gap-3 z-10">
          <motion.div
            animate={step === 1 ? { scale: [1, 1.1, 1] } : {}}
            className="p-5 bg-[#006400] text-white rounded-3xl shadow-xl"
          >
            <Laptop size={40} />
          </motion.div>
          <div className="text-center">
            <p className="font-black text-sm text-[#006400]">Host A</p>
            <p className="text-[10px] font-mono text-gray-500">IP: 192.168.1.1</p>
            <p className="text-[10px] font-mono text-gray-400">MAC: AA:AA</p>
          </div>
        </div>

        {/* Switch */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
          <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-100">
            <Server size={32} className="text-gray-400" />
          </div>
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">L2 Switch</p>
        </div>

        {/* Host B */}
        <div className="flex flex-col items-center gap-3 z-10">
          <motion.div
            animate={step === 2 ? { scale: [1, 1.1, 1] } : {}}
            className="p-5 bg-[#00A651] text-white rounded-3xl shadow-xl"
          >
            <Laptop size={40} />
          </motion.div>
          <div className="text-center">
            <p className="font-black text-sm text-[#00A651]">Host B</p>
            <p className="text-[10px] font-mono text-gray-500">IP: 192.168.1.2</p>
            <p className="text-[10px] font-mono text-gray-400">MAC: BB:BB</p>
          </div>
        </div>

        {/* Host C (Observer) */}
        <div className="absolute right-12 bottom-8 flex flex-col items-center gap-2 z-10 opacity-30">
          <div className="p-3 bg-gray-400 text-white rounded-2xl">
            <Laptop size={24} />
          </div>
          <p className="font-black text-[10px]">Host C</p>
        </div>

        {/* Animation Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Request: A -> Switch -> All */}
          {step === 1 && (
            <>
              {/* A to Switch */}
              <motion.div
                initial={{ x: "20%", y: "50%", opacity: 0, scale: 0.5 }}
                animate={{ x: "50%", y: "50%", opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-12 h-8 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center border-2 border-white"
                style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-[10px] font-black text-yellow-900">REQ</span>
              </motion.div>

              {/* Switch to B (Broadcast part 1) */}
              <motion.div
                initial={{ x: "50%", y: "50%", opacity: 0 }}
                animate={{ x: "80%", y: "50%", opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute w-12 h-8 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center border-2 border-white"
                style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-[10px] font-black text-yellow-900">REQ</span>
              </motion.div>

              {/* Switch to C (Broadcast part 2) */}
              <motion.div
                initial={{ x: "50%", y: "50%", opacity: 0 }}
                animate={{ x: "85%", y: "80%", opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute w-12 h-8 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center border-2 border-white"
                style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-[10px] font-black text-yellow-900">REQ</span>
              </motion.div>
            </>
          )}

          {/* Reply: B -> Switch -> A */}
          {step === 2 && (
            <>
              {/* B to Switch */}
              <motion.div
                initial={{ x: "80%", y: "50%", opacity: 0 }}
                animate={{ x: "50%", y: "50%", opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute w-12 h-8 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center border-2 border-white"
                style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-[10px] font-black text-white">REP</span>
              </motion.div>

              {/* Switch to A */}
              <motion.div
                initial={{ x: "50%", y: "50%", opacity: 0 }}
                animate={{ x: "20%", y: "50%", opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute w-12 h-8 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center border-2 border-white"
                style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-[10px] font-black text-white">REP</span>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Controls & Status */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4">
        <div className="bg-white/80 backdrop-blur px-6 py-2 rounded-full border border-gray-100 shadow-sm">
          <p className="text-[11px] font-black text-[#006400] text-center">
            {step === 0 && t("Host A needs MAC of 192.168.1.2", "Host A needs MAC of 192.168.1.2")}
            {step === 1 && t("ARP Request: 'Who has 1.2? Tell 1.1' (Broadcast)", "ARP Request: 'Who has 1.2? Tell 1.1' (Broadcast)")}
            {step === 2 && t("ARP Reply: 'I am 1.2, my MAC is BB:BB' (Unicast)", "ARP Reply: 'I am 1.2, my MAC is BB:BB' (Unicast)")}
          </p>
        </div>

        <button
          onClick={nextStep}
          className="group px-8 py-3 bg-[#006400] text-white rounded-2xl text-sm font-black shadow-xl hover:bg-[#00A651] transition-all flex items-center gap-3 active:scale-95"
        >
          {step === 0 && t("Start ARP Request", "Start ARP Request")}
          {step === 1 && t("Send ARP Reply", "Send ARP Reply")}
          {step === 2 && t("Reset Simulation", "Reset Simulation")}
          <PlayCircle size={18} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      <div className="absolute top-6 left-8">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${step === 0 ? 'bg-gray-400' : step === 1 ? 'bg-yellow-400 animate-pulse' : 'bg-blue-500 animate-pulse'}`} />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {step === 0 && t("Idle", "Idle")}
            {step === 1 && t("Requesting...", "Requesting...")}
            {step === 2 && t("Replying...", "Replying...")}
          </p>
        </div>
      </div>
    </div>
  );
};

const TCPvsUDPSection = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-16">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
        <Layers size={28} className="md:w-8 md:h-8" /> {t('Transport Layer: TCP vs UDP', 'ٹرانسپورٹ لیئر: TCP بمقابلہ UDP')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="p-6 md:p-8 bg-blue-50 border-2 border-blue-100 rounded-[24px] md:rounded-[32px] shadow-sm transform hover:-translate-y-2 transition-transform duration-300">
          <h4 className="font-black text-xl md:text-2xl text-blue-900 mb-4 flex items-center gap-2">
            <Shield size={24} /> TCP (Transmission Control Protocol)
          </h4>
          <p className="text-sm text-blue-800 mb-4 font-bold">{t('Connection-Oriented & Reliable', 'کنکشن پر مبنی اور قابل اعتماد')}</p>
          <ul className="text-[10px] md:text-xs space-y-3 text-gray-700">
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-600 flex-shrink-0 mt-0.5" /> {t('Guarantees delivery of data (Three-way Handshake)', 'ڈیٹا کی ترسیل کی ضمانت (تھری وے ہینڈ شیک)')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-600 flex-shrink-0 mt-0.5" /> {t('Error checking and recovery (Retransmission)', 'غلطی کی جانچ اور بازیابی (دوبارہ ترسیل)')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-600 flex-shrink-0 mt-0.5" /> {t('Slower but highly accurate and ordered', 'سست لیکن انتہائی درست اور منظم')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-600 flex-shrink-0 mt-0.5" /> {t('Use Cases: Web Browsing (HTTP/HTTPS), Email (SMTP), File Transfer (FTP)', 'استعمال: ویب براؤزنگ، ای میل، فائل ٹرانسفر')}</li>
          </ul>
        </div>
        <div className="p-6 md:p-8 bg-orange-50 border-2 border-orange-100 rounded-[24px] md:rounded-[32px] shadow-sm transform hover:-translate-y-2 transition-transform duration-300">
          <h4 className="font-black text-xl md:text-2xl text-orange-900 mb-4 flex items-center gap-2">
            <Zap size={24} /> UDP (User Datagram Protocol)
          </h4>
          <p className="text-sm text-orange-800 mb-4 font-bold">{t('Connectionless & Fast', 'بغیر کنکشن اور تیز')}</p>
          <ul className="text-[10px] md:text-xs space-y-3 text-gray-700">
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-orange-600 flex-shrink-0 mt-0.5" /> {t('Best-effort delivery (No Handshake, "Fire and Forget")', 'بہترین کوشش کی ترسیل (کوئی ہینڈ شیک نہیں)')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-orange-600 flex-shrink-0 mt-0.5" /> {t('No error recovery or retransmission mechanism', 'کوئی غلطی کی بازیابی کا طریقہ کار نہیں')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-orange-600 flex-shrink-0 mt-0.5" /> {t('Very fast, high performance, packets can drop', 'بہت تیز، اعلی کارکردگی، پیکٹ ضائع ہو سکتے ہیں')}</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-orange-600 flex-shrink-0 mt-0.5" /> {t('Use Cases: Video Streaming, Voice over IP (VoIP), Online Gaming, DNS', 'استعمال: ویڈیو اسٹریمنگ، وائس کالز، آن لائن گیمنگ')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const NetworkDevicesSection = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-16">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
        <Server size={28} className="md:w-8 md:h-8" /> {t('Network Devices: Hub vs Switch vs Router', 'نیٹ ورک ڈیوائسز: ہب، سوئچ اور راؤٹر')}
      </h3>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center p-6 bg-red-50 rounded-3xl border border-red-100 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-2xl shadow-inner flex-shrink-0">
            <Radio size={32} />
          </div>
          <div>
            <h4 className="font-black text-lg text-red-900 mb-2">{t('Hub (Layer 1 - Physical)', 'ہب (لیئر 1)')}</h4>
            <p className="text-xs text-red-800 leading-relaxed font-medium">{t('A legacy, non-intelligent device. When it receives a packet on one port, it blindly broadcasts it out of all other connected ports. This causes high collisions, slow speeds, and terrible security risks. Operates strictly in Half-Duplex.', 'ایک پرانی، غیر ذہین ڈیوائس۔ یہ ایک پورٹ پر موصول ہونے والے ڈیٹا کو آنکھیں بند کرکے باقی تمام پورٹس پر نشر کرتا ہے۔ اس سے تصادم اور حفاظتی خطرات بڑھتے ہیں۔')}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-emerald-200 text-emerald-700 flex items-center justify-center rounded-2xl shadow-inner flex-shrink-0">
            <Server size={32} />
          </div>
          <div>
            <h4 className="font-black text-lg text-emerald-900 mb-2">{t('Switch (Layer 2 - Data Link)', 'سوئچ (لیئر 2)')}</h4>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">{t('An intelligent localized filtering device. It actively learns MAC addresses and builds a MAC Address Table. When a frame arrives, the switch intelligently forwards it ONLY to the destination port, eliminating network collisions. Operates in Full-Duplex.', 'ایک ذہین مقامی ڈیوائس۔ یہ میک ایڈریس سیکھتا ہے اور صرف مخصوص پورٹ پر ڈیٹا بھیجتا ہے جس سے تصادم ختم ہوجاتا ہے۔')}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center p-6 bg-purple-50 rounded-3xl border border-purple-100 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-purple-200 text-purple-700 flex items-center justify-center rounded-2xl shadow-inner flex-shrink-0">
            <Cpu size={32} />
          </div>
          <div>
            <h4 className="font-black text-lg text-purple-900 mb-2">{t('Router (Layer 3 - Network)', 'راؤٹر (لیئر 3)')}</h4>
            <p className="text-xs text-purple-800 leading-relaxed font-medium">{t('Connects fundamentally different networks together (e.g., your home LAN to the public WAN/Internet). It inspects Destination IP Addresses to determine the absolute best path to forward a packet using internal Routing Tables.', 'مختلف نیٹ ورکس کو آپس میں جوڑتا ہے۔ یہ آئی پی ایڈریسز کا تجزیہ کرتا ہے تاکہ ڈیٹا کو آگے بڑھانے کا بہترین راستہ تلاش کرسکے۔')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WirelessSection = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-16">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
        <Radio size={28} className="md:w-8 md:h-8" /> {t('Wireless Networking (WLAN)', 'وائرلیس نیٹ ورکنگ (WLAN)')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h4 className="font-black text-blue-900 mb-2">2.4 GHz Band</h4>
            <ul className="text-xs text-blue-800 space-y-2">
              <li className="flex gap-2"><span>📡</span> {t('Longer range, better at penetrating walls.', 'طویل فاصلہ، دیواروں کے پار بہتر سگنل۔')}</li>
              <li className="flex gap-2"><span>🐢</span> {t('Slower speeds, high interference (used by microwaves/Bluetooth).', 'سست رفتار، زیادہ مداخلت (مائیکرو ویو اور بلوٹوتھ بھی اسے استعمال کرتے ہیں)۔')}</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h4 className="font-black text-emerald-900 mb-2">5 GHz Band</h4>
            <ul className="text-xs text-emerald-800 space-y-2">
              <li className="flex gap-2"><span>⚡</span> {t('Much faster speeds, less congestion.', 'بہت تیز رفتار، کم رش۔')}</li>
              <li className="flex gap-2"><span>🏚️</span> {t('Shorter range, easily blocked by physical obstacles.', 'کم فاصلہ، رکاوٹوں سے سگنل جلدی متاثر ہوتا ہے۔')}</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-[40px] shadow-inner relative h-64 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Range Circles */}
            <motion.circle initial={{ r: 0 }} animate={{ r: 120 }} transition={{ duration: 4, repeat: Infinity }} cx="50%" cy="50%" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.2" />
            <motion.circle initial={{ r: 0 }} animate={{ r: 80 }} transition={{ duration: 3, repeat: Infinity }} cx="50%" cy="50%" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.4" />
            <div className="bg-white p-4 rounded-3xl shadow-xl z-10 border-4 border-[#006400]">
              <Radio size={48} className="text-[#006400]" />
            </div>
            <div className="absolute top-4 left-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">{t('2.4GHz Range', '2.4GHz رینج')}</div>
            <div className="absolute top-16 left-16 text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t('5GHz Range', '5GHz رینج')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySection = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-16 overflow-hidden">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
        <Shield size={28} className="md:w-8 md:h-8" /> {t('Network Security: Defense in Depth', 'نیٹ ورک سیکیورٹی')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 text-white rounded-[32px] space-y-4">
          <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
            <Zap size={24} />
          </div>
          <h4 className="font-black text-xl">Firewall</h4>
          <p className="text-[10px] opacity-70 leading-relaxed font-medium">
            {t('Acts as a barrier between internal and external networks. It filters traffic based on predefined security rules (IPs, Ports, Protocols).', 'اندرونی اور بیرونی نیٹ ورکس کے درمیان ایک رکاوٹ کے طور پر کام کرتا ہے۔')}
          </p>
        </div>
        <div className="p-6 bg-[#006400] text-white rounded-[32px] space-y-4">
          <div className="w-12 h-12 bg-yellow-400 text-black rounded-2xl flex items-center justify-center">
            <Search size={24} />
          </div>
          <h4 className="font-black text-xl">IDS</h4>
          <p className="text-[10px] opacity-70 leading-relaxed font-medium">
            {t('Intrusion Detection System. It MONITORS and reports suspicious activity, like a burglar alarm.', 'درازی کی شناخت کا نظام۔ یہ مشکوک سرگرمیوں کی نگرانی اور رپورٹنگ کرتا ہے۔')}
          </p>
        </div>
        <div className="p-6 bg-[#00A651] text-white rounded-[32px] space-y-4">
          <div className="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <h4 className="font-black text-xl">IPS</h4>
          <p className="text-[10px] opacity-70 leading-relaxed font-medium">
            {t('Intrusion Prevention System. It not only detects but also BLOCKS threats immediately, like a security guard.', 'درازی کی روک تھام کا نظام۔ یہ نہ صرف شناخت کرتا ہے بلکہ خطرات کو فوری طور پر روکتا بھی ہے۔')}
          </p>
        </div>
      </div>
      <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">{t('Visualizing the Sandbox', 'تصوراتی خاکہ')}</p>
        <div className="flex justify-center items-center gap-8 md:gap-16 opacity-40">
          <Globe size={48} />
          <ArrowRight size={32} />
          <div className="w-2 h-24 bg-red-600 rounded-full" />
          <ArrowRight size={32} />
          <Server size={48} />
        </div>
      </div>
    </div>
  );
};

const CloudSection = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl mt-8 md:mt-16">
      <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
        <Cloud size={28} className="md:w-8 md:h-8" /> {t('Cloud Models (As-A-Service)', 'کلاؤڈ ماڈلز')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-8 rounded-3xl overflow-hidden border-2 border-gray-100">
        <div className="p-8 bg-blue-600 text-white">
          <h4 className="font-black text-2xl mb-2">IaaS</h4>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-bold uppercase">Infrastructure</span>
          <p className="text-[10px] mt-4 opacity-80 leading-relaxed">{t('Renting raw hardware (VMs, Storage). You manage everything else.', 'خام ہارڈویئر کرائے پر لینا۔ آپ باقی سب کچھ خود سنبھالتے ہیں۔')}</p>
        </div>
        <div className="p-8 bg-purple-600 text-white">
          <h4 className="font-black text-2xl mb-2">PaaS</h4>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-bold uppercase">Platform</span>
          <p className="text-[10px] mt-4 opacity-80 leading-relaxed">{t('Providers give you tools/OS to build apps. No hardware worries.', 'ایپس بنانے کے لیے ٹولز اور OS فراہم کیے جاتے ہیں۔')}</p>
        </div>
        <div className="p-8 bg-emerald-600 text-white">
          <h4 className="font-black text-2xl mb-2">SaaS</h4>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-bold uppercase">Software</span>
          <p className="text-[10px] mt-4 opacity-80 leading-relaxed">{t('Finished products over the internet (Gmail, Netflix, Zoom).', 'انٹرنیٹ پر تیار مصنوعات۔')}</p>
        </div>
      </div>
    </div>
  );
};

export const CNDCContent: React.FC = () => {
  const { t } = useLanguage();
  const [expandedWeek, setExpandedWeek] = useState<number>(1);

  return (
    <div className="min-h-screen bg-[#F8FAF9] pb-32">

      {/* ==================== INSTRUCTOR HEADER ==================== */}
      <div className="bg-gradient-to-br from-[#006400] via-[#00A651] to-[#006400] text-white p-8 md:p-12 rounded-b-[40px] md:rounded-b-[60px]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">Computer Networks and Data Communication</h1>
          <p className="text-lg md:text-2xl mt-3 md:mt-4 opacity-90">Dr. Engr. Muhammad Shahzad Haroon</p>
          <p className="text-[10px] md:text-base mt-2 opacity-70 uppercase tracking-widest font-bold">Head of Computer Science • PhD CS • Gold Medalist</p>
        </div>
      </div>

      {/* ==================== MARKS & REFERENCES ==================== */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-6 md:-mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="font-black text-xl md:text-3xl text-[#006400] mb-4 md:mb-8 flex items-center gap-2 md:gap-3">
            <Award size={24} className="md:w-8 md:h-8" /> Marks Distribution
          </h3>
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-[#006400] text-white">
              <tr><th className="p-3 md:p-4 text-left rounded-tl-xl">Head</th><th className="p-3 md:p-4 text-center rounded-tr-xl">Marks</th></tr>
            </thead>
            <tbody className="divide-y border-x border-b border-gray-100">
              <tr><td className="p-3 md:p-4">Quiz</td><td className="p-3 md:p-4 text-center font-bold">10</td></tr>
              <tr><td className="p-3 md:p-4">Mid Term Paper</td><td className="p-3 md:p-4 text-center font-bold">25</td></tr>
              <tr><td className="p-3 md:p-4">Final Paper</td><td className="p-3 md:p-4 text-center font-bold">40</td></tr>
              <tr><td className="p-3 md:p-4">Project</td><td className="p-3 md:p-4 text-center font-bold">20</td></tr>
              <tr><td className="p-3 md:p-4">Class Participation</td><td className="p-3 md:p-4 text-center font-bold">5</td></tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="font-black text-xl md:text-3xl text-[#006400] mb-4 md:mb-8">Reference Books</h3>
          <ul className="space-y-4 md:space-y-6">
            <li className="flex gap-3 md:gap-4">
              <BookOpen className="text-[#006400] mt-1 flex-shrink-0 md:w-7 md:h-7" size={20} />
              <div className="text-xs md:text-base leading-relaxed">Data Communications and Networking – Behrouz A. Forouzan (5th Edition)</div>
            </li>
            <li className="flex gap-3 md:gap-4">
              <BookOpen className="text-[#006400] mt-1 flex-shrink-0 md:w-7 md:h-7" size={20} />
              <div className="text-xs md:text-base leading-relaxed">Cisco CCNA Official Cert Guide – Wendell Odom</div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* ==================== COURSE CURRICULUM ==================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#006400] mb-4">{t("Course Curriculum", "کورس کا نصاب")}</h2>
          <p className="text-gray-500 font-medium">{t("From Physical Signals to Global Applications", "فزیکل سگنلز سے گلوبل ایپلیکیشنز تک")}</p>
        </div>

        {/* Week 1: Introduction */}
        <WeekCard
          week={1}
          title="Intro to Networks & Edge"
          titleUr="نیٹ ورکس اور ایج کا تعارف"
          isExpanded={expandedWeek === 1}
          onToggle={() => setExpandedWeek(expandedWeek === 1 ? 0 : 1)}
        >
          <div className="space-y-8 md:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="inline-flex px-4 py-1.5 bg-emerald-100 text-[#006400] rounded-full text-[10px] font-black uppercase tracking-widest items-center gap-2">
                  <Compass size={14} />
                  {t("Fundamental Concept", "بنیادی تصور")}
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                  {t("The Network Edge & Protocols", "نیٹ ورک ایج اور پروٹوکول")}
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                  {t("The 'Internet' is a network of networks. The Edge refers to the hosts (clients and servers) while the Core is the mesh of interconnected routers.", "انٹرنیٹ نیٹ ورکس کا ایک نیٹ ورک ہے۔ ایج سے مراد ہوسٹس (کلائنٹس اور سرورز) ہیں جبکہ کور آپس میں جڑے ہوئے راؤٹرز کا میش ہے۔")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Protocols', 'Algorithms', 'Layered Arch', 'Globalization'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-tighter italic">#{t(tag, tag)}</span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-6 md:p-8 rounded-[40px] shadow-inner flex flex-col justify-center gap-6">
                {[
                  { l: "Why Protocols?", d: "Rules governing communication. Without them, devices can't 'understand' the bits they receive.", icon: <Shield size={18} /> },
                  { l: "Layered Necessity", d: "Enables globalization. A web developer in Pakistan doesn't need to know how fiber optic works in USA.", icon: <Layers size={18} /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006400] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h6 className="font-black text-[12px] text-gray-900 uppercase">{t(item.l, item.l)}</h6>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{t(item.d, item.d)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <LectureNote
              title="Seamless Communication"
              content="The goal of algorithms in networking is to provide seamless communication across heterogeneous hardware. Layering abstracts complexity, allowing for rapid innovation at each level independently."
              icon={Zap}
            />
          </div>
        </WeekCard>

        {/* Week 2: OSI/TCP-IP & Core */}
        <WeekCard
          week={2}
          title="OSI Model & Network Core"
          titleUr="او ایس آئی ماڈل اور نیٹ ورک کور"
          isExpanded={expandedWeek === 2}
          onToggle={() => setExpandedWeek(expandedWeek === 2 ? 0 : 2)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-8 bg-blue-600 rounded-[40px] text-white space-y-4 shadow-xl shadow-blue-200">
                <Share2 size={32} />
                <h4 className="text-xl font-black uppercase">{t("Packet Switching", "پیکٹ سوئچنگ")}</h4>
                <p className="text-[11px] text-blue-100/70 font-medium leading-relaxed">
                  {t("Data is broken into small packets. Resources are used only when needed (Statistical Multiplexing). Efficient but can cause congestion.", "ڈیٹا کو چھوٹے پیکٹوں میں تقسیم کیا جاتا ہے۔ صرف ضرورت پڑنے پر وسائل استعمال کیے جاتے ہیں۔")}
                </p>
              </div>
              <div className="p-8 bg-emerald-600 rounded-[40px] text-white space-y-4 shadow-xl shadow-emerald-200">
                <RefreshCw size={32} />
                <h4 className="text-xl font-black uppercase">{t("Circuit Switching", "سرکٹ سوئچنگ")}</h4>
                <p className="text-[11px] text-emerald-100/70 font-medium leading-relaxed">
                  {t("Dedicated end-to-end connection (like old phone lines). Resources are reserved. Guaranteed performance but wasteful if silent.", "وقف شدہ اینڈ ٹو اینڈ کنکشن (پرانے فون لائنوں کی طرح)۔ وسائل محفوظ ہیں۔")}
                </p>
              </div>
              <div className="p-8 bg-gray-900 rounded-[40px] text-white space-y-6 shadow-xl">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t("Performance Metrics", "کارکردگی کی پیمائش")}</h4>
                <div className="space-y-4">
                  {[
                    { l: "Delay (Latency)", v: "End-to-end time" },
                    { l: "Throughput", v: "Bits per second" },
                    { l: "Packet Loss", v: "% of lost chunks" },
                  ].map(m => (
                    <div key={m.l} className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-[11px] font-black text-white">{t(m.l, m.l)}</span>
                      <span className="text-[10px] text-gray-400 font-bold italic">{t(m.v, m.v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 md:p-12 rounded-[50px] border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h4 className="text-2xl font-black text-gray-900">{t("OSI vs TCP/IP", "او ایس آئی بمقابلہ ٹی سی پی آئی پی")}</h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {t("OSI is a THEORETICAL 7-layer model (ISO standard). TCP/IP is the PRACTICAL 4-layer (or 5-layer) suite used by the actual global internet today.", "او ایس آئی ایک نظریاتی 7-لیئر ماڈل ہے۔ ٹی سی پی / آئی پی وہ عملی سوٹ ہے جسے آج انٹرنیٹ استعمال کرتا ہے۔")}
                  </p>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                      <span className="text-3xl font-black text-blue-600">7</span>
                      <p className="text-[10px] font-black uppercase text-gray-400 mt-1">OSI Layers</p>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                      <span className="text-3xl font-black text-emerald-600">4</span>
                      <p className="text-[10px] font-black uppercase text-gray-400 mt-1">TCP/IP Layers</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 relative">
                  {['Application', 'Transport', 'Network', 'Data Link', 'Physical'].map((l, i) => (
                    <div key={l} className="p-3 bg-white border border-gray-200 rounded-xl text-center font-black text-[10px] uppercase tracking-widest text-gray-500 shadow-sm relative overflow-hidden group hover:border-blue-500 transition-colors">
                      <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {t(l, l)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 3: Hierarchy & IoT */}
        <WeekCard
          week={3}
          title="Topologies & Future IoT"
          titleUr="ٹاپولوجی اور بٹی ہوئی مستقبل"
          isExpanded={expandedWeek === 3}
          onToggle={() => setExpandedWeek(expandedWeek === 3 ? 0 : 3)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { t: "PAN", d: "Personal Area", c: "bg-purple-500" },
                { t: "LAN", d: "Local (Bldg)", c: "bg-blue-500" },
                { t: "MAN", d: "City Wide", c: "bg-emerald-500" },
                { t: "WAN", d: "Global/Country", c: "bg-orange-500" },
              ].map(type => (
                <div key={type.t} className={`p-6 rounded-[32px] text-white shadow-lg ${type.c}`}>
                  <h5 className="font-black text-2xl mb-1">{type.t}</h5>
                  <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{t(type.d, type.d)}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-[40px] p-8 text-white space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 rounded-xl"><Wifi size={24} /></div>
                  <h4 className="text-xl font-black tracking-tight italic">{t("Low Power WAN (LPWAN)", "ایل پی ڈبلیو اے این")}</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {t("Designed for IoT (Internet of Things). Allows long-range communication at extremely low bit rates with years of battery life. Used for smart cities, agriculture, and telemetry.", "آئی او ٹی کے لیے ڈیزائن کیا گیا۔ یہ بہت کم بٹ ریٹ پر طویل فاصلے تک بات چیت کی اجازت دیتا ہے۔")}
                </p>
                <div className="space-y-3">
                  {['LoRaWAN', 'Sigfox', 'NB-IoT'].map(t => (
                    <div key={t} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[10px] font-black uppercase text-emerald-400">{t}</span>
                      <span className="text-[10px] text-gray-600 font-bold italic">LPWAN Standard</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-100 rounded-[40px] p-8 bg-white space-y-6">
                <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                  <Layers size={18} className="text-[#00A651]" />
                  {t("Transmission Media", "ٹرانسمیشن میڈیا")}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 space-y-2">
                    <h6 className="font-black text-[11px] text-blue-900 uppercase italic underline underline-offset-4 decoration-blue-200">{t("Guided (Wired)", "کیبل کے ساتھ")}</h6>
                    <p className="text-[9px] text-gray-500 font-medium">UTP, Coaxial, Fiber Optic (Light signals).</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 space-y-2">
                    <h6 className="font-black text-[11px] text-emerald-900 uppercase italic underline underline-offset-4 decoration-emerald-200">{t("Unguided (Wireless)", "وائرلیس")}</h6>
                    <p className="text-[9px] text-gray-500 font-medium">Free Space, Microwaves, Radio Waves.</p>
                  </div>
                </div>
                <LectureNote
                  title="Fiber Optic Advantage"
                  content="Uses Total Internal Reflection. Immune to EMI, massive bandwidth, and extremely low attenuation compared to copper."
                  icon={Zap}
                />
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 4: App Layer & IPv4 */}
        <WeekCard
          week={4}
          title="App Layer & Addressing"
          titleUr="ایپ لیئر اور ایڈریسنگ"
          isExpanded={expandedWeek === 4}
          onToggle={() => setExpandedWeek(expandedWeek === 4 ? 0 : 4)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg ring-4 ring-indigo-50"><Globe size={24} /></div>
                  <h4 className="text-2xl font-black text-gray-900 leading-none tracking-tight">{t("The Service Interface", "سروس انٹرفیس")}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {t("The Application layer provides the protocols necessary for user interactions. It handles name resolution (DNS), file transfer (FTP), and the web (HTTP).", "ایپلیکیشن لیئر صارف کے تعاملات کے لیے ضروری پروٹوکول فراہم کرتی ہے۔")}
                </p>
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 space-y-4">
                  <h5 className="font-black text-[10px] text-indigo-900 uppercase tracking-widest">{t("Key Protocols to Master", "اہم پروٹوکول")}</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {['HTTP (Port 80)', 'FTP (Port 21)', 'SMTP (Port 25)', 'DNS (Port 53)'].map(p => (
                      <div key={p} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-xs border border-indigo-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-black text-gray-700">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-900 rounded-[48px] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Hash size={120} /></div>
                <h4 className="text-xl font-black text-orange-400 mb-6 uppercase tracking-widest">{t("IPv4 Logical Addressing", "لاجیکل ایڈریسنگ")}</h4>
                <div className="space-y-6 relative z-10">
                  <p className="text-xs text-gray-400 italic">
                    {t("Chapter 19 & 20: Behrouz A. Forouzan Foundation.", "بہروز فاروزان کی فاؤنڈیشن۔")}
                  </p>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-tighter">
                      <span>Dotted Decimal</span>
                      <span>32-Bit Binary</span>
                    </div>
                    <div className="flex items-center justify-between font-mono bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="text-emerald-400">192.168.1.1</span>
                      <ArrowRight size={14} className="text-gray-700" />
                      <span className="text-emerald-800 text-[8px]">11000000.10101000...</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 bg-blue-500/10 rounded-xl text-center border border-blue-500/20">
                        <span className="block text-[8px] uppercase font-black text-blue-400">Class A</span>
                        <span className="text-[10px] font-black text-white italic">1-126</span>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl text-center border border-emerald-500/20">
                        <span className="block text-[8px] uppercase font-black text-emerald-400">Class B</span>
                        <span className="text-[10px] font-black text-white italic">128-191</span>
                      </div>
                      <div className="p-3 bg-orange-500/10 rounded-xl text-center border border-orange-500/20">
                        <span className="block text-[8px] uppercase font-black text-orange-400">Class C</span>
                        <span className="text-[10px] font-black text-white italic">192-223</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <LectureNote
              title="Socket Programming"
              content="A socket is the combination of an IP Address and a Port Number. It represents a single end-point of a two-way communication link between two programs running on the network."
              icon={Terminal}
            />
          </div>
        </WeekCard>

        {/* Week 5: Transport Layer */}
        <WeekCard
          week={5}
          title="Transport Layer Protocols"
          titleUr="ٹرانسپورٹ لیئر پروٹوکول"
          isExpanded={expandedWeek === 5}
          onToggle={() => setExpandedWeek(expandedWeek === 5 ? 0 : 5)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-linear-to-br from-blue-600 to-indigo-800 rounded-[48px] text-white space-y-6 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Shield size={100} /></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl"><Zap size={24} /></div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter italic">TCP (The Heavyweight)</h4>
                </div>
                <p className="text-xs text-blue-100 font-medium leading-relaxed mt-4">
                  {t("Transmission Control Protocol. Connection-oriented, meaning it performs a 'Handshake' before sending data. Guarantees every single bit arrives in order.", "کنکشن پر مبنی۔ یہ ڈیٹا بھیجنے سے پہلے ہینڈ شیک کرتا ہے۔")}
                </p>
                <div className="space-y-2 pt-4">
                  {['Reliable Delivery', 'Flow Control', 'Congestion Control', 'Error Detection'].map(feat => (
                    <div key={feat} className="flex gap-3 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-[10px] font-black uppercase text-blue-200">{t(feat, feat)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-linear-to-br from-orange-500 to-red-700 rounded-[48px] text-white space-y-6 shadow-2xl shadow-orange-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Zap size={100} /></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl"><RefreshCw size={24} /></div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter italic">UDP (The Lightweight)</h4>
                </div>
                <p className="text-xs text-orange-100 font-medium leading-relaxed mt-4">
                  {t("User Datagram Protocol. Connectionless 'Fire and Forget'. No setup required. Extremely fast but permits packet loss (Unreliable).", "بغیر کنکشن کے 'فائر اینڈ فارگیٹ'۔ بہت تیز لیکن غیر یقینی۔")}
                </p>
                <div className="space-y-2 pt-4">
                  {['Video Streaming', 'VoIP / Gaming', 'Low Overhead', 'Fast Response'].map(feat => (
                    <div key={feat} className="flex gap-3 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span className="text-[10px] font-black uppercase text-orange-200">{t(feat, feat)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 rounded-[48px] p-8 md:p-12 text-white flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center border border-white/10 shadow-inner group cursor-help relative">
                <Box size={32} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4 max-w-xl">
                <h4 className="text-2xl font-black italic">{t("Multiplexing & Demultiplexing", "ملٹی پلیکسنگ اور ڈی ملٹی پلیکسنگ")}</h4>
                <p className="text-[11px] text-emerald-100/60 leading-relaxed font-medium">
                  {t("The core job of the transport layer. Multiplexing gathers data from multiple sockets into one segment. Demultiplexing delivers the received segment to the correct socket based on Port Numbers.", "ٹرانسپورٹ لیئر کا بنیادی کام۔ یہ پورٹ نمبروں کی بنیاد پر ڈیٹا کو صحیح ساکٹ تک پہنچاتا ہے۔")}
                </p>
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 6: Network Layer & Routing */}
        <WeekCard
          week={6}
          title="Network Layer & Routing"
          titleUr="نیٹ ورک لیئر اور روٹنگ"
          isExpanded={expandedWeek === 6}
          onToggle={() => setExpandedWeek(expandedWeek === 6 ? 0 : 6)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[48px] border-2 border-emerald-100 shadow-xl space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Compass size={32} /></div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{t("Data Plane", "ڈیٹا پلین")}</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 leading-tight">{t("Forwarding vs Routing", "فارورڈنگ بمقابلہ روٹنگ")}</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[11px] text-gray-700 font-bold mb-1 uppercase tracking-tighter">{t("Forwarding (Local)", "فارورڈنگ")}</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{t("Moving a packet from a router's input Link to the appropriate output Link.", "پیکٹ کو راؤٹر کے ان پٹ لنک سے مناسب آؤٹ پٹ لنک پر منتقل کرنا۔")}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-[11px] text-emerald-900 font-bold mb-1 uppercase tracking-tighter">{t("Routing (Global)", "روٹنگ")}</p>
                    <p className="text-[10px] text-emerald-700 leading-relaxed font-medium">{t("Determining the overall path from Source to Destination across the entire network.", "پورے نیٹ ورک میں سورس سے ڈیسٹینیشن تک مجموعی راستے کا تعین کرنا۔")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-gray-900 rounded-[48px] text-white shadow-2xl shadow-emerald-900/40">
                  <h4 className="text-lg font-black text-emerald-400 mb-4 uppercase tracking-[0.2em]">{t("Routing Protocols", "روٹنگ پروٹوکول")}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { n: "RIP", t: "Distance Vector", d: "Uses hop count (Max 15)." },
                      { n: "OSPF", t: "Link State", d: "Uses Dijkstra's algorithm." },
                      { n: "BGP", t: "Path Vector", d: "Inter-AS routing (The Glue)." },
                      { n: "EIGRP", t: "Hybrid", d: "Cisco proprietary (fast)." },
                    ].map(protocol => (
                      <div key={protocol.n} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500 transition-colors group">
                        <span className="block text-sm font-black text-white group-hover:text-emerald-400">{protocol.n}</span>
                        <span className="block text-[8px] uppercase font-bold text-gray-500 mt-0.5">{t(protocol.t, protocol.t)}</span>
                        <p className="text-[8px] text-gray-600 mt-2 font-medium leading-tight">{t(protocol.d, protocol.d)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <LectureNote
                  title="IP Fragmentation"
                  content="Routers may break large packets into smaller fragments if the next link's MTU (Maximum Transmission Unit) is too small. Reassembly only happens at the destination."
                  icon={RefreshCw}
                />
              </div>
            </div>

            <PacketFlowSimulation />
          </div>
        </WeekCard>

        {/* Week 7: Wireless & Ad-hoc */}
        <WeekCard
          week={7}
          title="Wireless & Ad-hoc Networks"
          titleUr="وائرلیس اور ایڈہاک نیٹ ورکس"
          isExpanded={expandedWeek === 7}
          onToggle={() => setExpandedWeek(expandedWeek === 7 ? 0 : 7)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-purple-600 to-indigo-900 p-8 md:p-12 rounded-[60px] text-white space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000"><Wifi size={200} /></div>
                <div className="inline-flex px-4 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">{t("Untethered Nodes", "آزادی")}</div>
                <h4 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none">{t("Ad-hoc Networking", "ایڈہاک نیٹ ورکنگ")}</h4>
                <p className="text-[11px] md:text-sm text-purple-100 font-medium leading-relaxed max-w-sm">
                  {t("Networks formed on-the-fly without any pre-existing infrastructure or central access points. Each node acts as a router.", "ایڈہاک نیٹ ورکس بغیر کسی پہلے سے موجود انفراسٹرکچر کے بنائے جاتے ہیں۔")}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white/10 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <h6 className="font-black text-[12px] uppercase mb-1">MANET</h6>
                    <p className="text-[9px] text-purple-200">Mobile Ad-hoc Networks</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <h6 className="font-black text-[12px] uppercase mb-1">WSN</h6>
                    <p className="text-[9px] text-purple-200">Wireless Sensor Networks</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { l: "Bluetooth (802.15)", d: "Low range, high energy efficiency for peripherals.", i: <Headphones size={24} /> },
                  { l: "Zigbee", d: "Used in home automation and industrial sensors.", i: <Zap size={24} /> },
                  { l: "Satellite IP", d: "High latency but global coverage for remote areas.", i: <Globe size={24} /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 md:p-8 bg-white rounded-[40px] border border-gray-100 hover:border-indigo-100 transition-all group shadow-sm">
                    <div className="w-14 h-14 shrink-0 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.i}
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-black text-gray-900 uppercase text-sm tracking-tight">{t(item.l, item.l)}</h5>
                      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{t(item.d, item.d)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <WirelessSection />
          </div>
        </WeekCard>

        {/* Week 8: Midterm */}
        <WeekCard
          week={8}
          title="Midterm Assessment"
          titleUr="مڈ ٹرم اسسمنٹ"
          isExpanded={expandedWeek === 8}
          onToggle={() => setExpandedWeek(expandedWeek === 8 ? 0 : 8)}
        >
          <div className="p-8 md:p-16 bg-linear-to-br from-emerald-600 to-[#006400] rounded-[60px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10"><Award size={200} /></div>
            <div className="relative z-10 max-w-3xl">
              <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block">{t("Checkpoint Alpha", "چیک پوائنٹ الفا")}</span>
              <h4 className="text-4xl md:text-6xl font-black mb-8 leading-none tracking-tighter">{t("The Midterm Review", "مڈ ٹرم جائزہ")}</h4>
              <p className="text-lg md:text-xl text-emerald-100/80 font-medium leading-relaxed mb-12">
                {t("Consolidating concepts from Physical layer up to the Network layer. Prepare for deep-dive questions on IP addressing and OSI functions.", "فزیکل لیئر سے نیٹ ورک لیئر تک کے تصورات کو مستحکم کرنا۔")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/10 rounded-[32px] border border-white/20 backdrop-blur-md space-y-4">
                  <h5 className="font-black uppercase text-sm tracking-widest text-[#00A651]">{t("High-Yield Topics", "اہم عنوانات")}</h5>
                  <ul className="space-y-3">
                    {['IPv4 Addressing & Subnetting', 'OSI vs TCP/IP Layers', 'Circuit vs Packet Switching', 'Topologies: Mesh & Star'].map(topic => (
                      <li key={topic} className="flex gap-3 items-center text-[11px] font-bold text-emerald-50">
                        <CheckCircle2 size={16} className="text-[#00A651]" />
                        {t(topic, topic)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-black/20 rounded-[32px] border border-white/5 space-y-4">
                  <h5 className="font-black uppercase text-sm tracking-widest text-orange-400">{t("Exam Strategy", "امتحانی حکمت عملی")}</h5>
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                    {t("Conceptual understanding is key. Don't just memorize layers; understand EXCATLY how a bit becomes an application response.", "تصوراتی تفہیم کلید ہے۔ صرف تہوں کو حفظ نہ کریں؛ سمجھیں کہ بٹ کیسے ایپلیکیشن رسپانس بنتا ہے۔")}
                  </p>
                  <button className="w-full py-4 bg-white text-[#006400] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                    {t("Download Study Guide", "اسٹڈی گائیڈ ڈاؤن لوڈ کریں")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 9: Link Layer & Virtualization */}
        <WeekCard
          week={9}
          title="Data Link & Virtualization"
          titleUr="ڈیٹا لنک اور ورچوئلائزیشن"
          isExpanded={expandedWeek === 9}
          onToggle={() => setExpandedWeek(expandedWeek === 1 ? 0 : 9)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-[48px] border border-gray-100 flex flex-col justify-between">
                <div className="space-y-6">
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight">{t("The Data Link Sub-layers", "ڈیٹا لنک سب تہیں")}</h4>
                  <div className="space-y-4">
                    <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Link size={40} /></div>
                      <h6 className="font-black text-blue-600 uppercase text-[12px]">{t("LLC (Logical Link Control)", "ایل ایل سی")}</h6>
                      <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed">{t("Handles multi-protocol support and flow control. The upper sub-layer.", "ملٹی پروٹوکول سپورٹ اور فلو کنٹرول کو ہینڈل کرتا ہے۔")}</p>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Cpu size={40} /></div>
                      <h6 className="font-black text-emerald-600 uppercase text-[12px]">{t("MAC (Media Access Control)", "میک")}</h6>
                      <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed">{t("Handles physical addressing (MAC addresses) and channel access. The lower sub-layer.", "فزیکل ایڈریسنگ اور چینل تک رسائی کو ہینڈل کرتا ہے۔")}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("Protocol Data Unit (PDU)", "پی ڈی یو")}</span>
                  <div className="mt-2 text-3xl font-black text-[#006400] italic">"FRAME"</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-[48px] p-8 md:p-12 text-white space-y-6 shadow-2xl">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Box size={32} className="text-blue-400" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter">{t("Network Virtualization", "نیٹ ورک ورچوئلائزیشن")}</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {t("The ability to run multiple logical networks on a single physical infrastructure. Key to modern Data Centers and Cloud Computing.", "ایک ہی فزیکل انفراسٹرکچر پر متعدد منطقی نیٹ ورکس چلانے کی صلاحیت۔")}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="block text-xs font-black text-[#00A651]">VLANs</span>
                    <p className="text-[9px] text-gray-600 mt-1 uppercase">Virtual LANs</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="block text-xs font-black text-blue-500">VPNs</span>
                    <p className="text-[9px] text-gray-600 mt-1 uppercase">Virtual Private Networks</p>
                  </div>
                </div>
              </div>
            </div>

            <OSIQuiz />
          </div>
        </WeekCard>

        {/* Week 10: ALOHA & CSMA */}
        <WeekCard
          week={10}
          title="Multiple Access Protocols"
          titleUr="ملٹیپل رسائی پروٹوکول"
          isExpanded={expandedWeek === 10}
          onToggle={() => setExpandedWeek(expandedWeek === 10 ? 0 : 10)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { n: "ALOHA", t: "Pure & Slotted", d: "First random access protocol. In Slotted ALOHA, time is divided into discrete slots to reduce collisions.", c: "bg-blue-600" },
                { n: "CSMA/CD", t: "Collision Detection", d: "Used in Ethernet. 'Listen before speak, stop if someone else starts'.", c: "bg-emerald-600" },
                { n: "CSMA/CA", t: "Collision Avoidance", d: "Used in Wi-Fi (802.11). Uses 'Request to Send' (RTS) and 'Clear to Send' (CTS) to avoid collisions.", c: "bg-orange-600" },
              ].map(proto => (
                <div key={proto.n} className={`${proto.c} p-8 rounded-[48px] text-white space-y-4 shadow-xl shadow-opacity-20`}>
                  <h4 className="text-2xl font-black italic">{proto.n}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 italic">{t(proto.t, proto.t)}</p>
                  <p className="text-[11px] text-white/80 font-medium leading-relaxed">{t(proto.d, proto.d)}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-[60px] p-8 md:p-16 border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-orange-400 rounded-full" />
                  <h4 className="text-3xl font-black text-gray-900">{t("The Hidden Station Problem", "پوشیدہ اسٹیشن کا مسئلہ")}</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {t("In wireless networks, node A can hear B, and node C can hear B, but A and C cannot hear each other. If both send to B, collisions occur. CSMA/CA solves this using the virtual carrier sensing (RTS/CTS).", "وائرلیس نیٹ ورکس میں، نوڈ اے اور سی ایک دوسرے کو نہیں سن سکتے۔ اگر دونوں بی کو بھیجیں تو ٹکراؤ ہوتا ہے۔")}
                </p>
              </div>
              <div className="w-full md:w-96 p-8 bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
                <div className="flex justify-between items-center opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-black">A</div>
                  <div className="flex-1 h-0.5 border-t-2 border-dashed border-gray-300" />
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center font-black">B</div>
                  <div className="flex-1 h-0.5 border-t-2 border-dashed border-gray-300" />
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-black">C</div>
                </div>
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase mt-8">{t("Node B is the Intermediary", "نوڈ بی درمیانی ہے")}</p>
              </div>
            </div>
          </div>
        </WeekCard>
        {/* Week 11: ARP & RARP */}
        <WeekCard
          week={11}
          title="ARP & RARP Translation"
          titleUr="اے آر پی اور آر اے آر پی ترجمہ"
          isExpanded={expandedWeek === 11}
          onToggle={() => setExpandedWeek(expandedWeek === 11 ? 0 : 11)}
        >
          <div className="space-y-12">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h3 className="text-xl md:text-3xl font-black mb-4 flex justify-center md:justify-start items-center gap-2 md:gap-3 text-[#006400]">
                <Search size={28} className="md:w-10 md:h-10 text-orange-500" /> {t('ARP Protocol: The Missing Link', 'ARP پروٹوکول: گمشدہ لنک')}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-3xl font-medium">
                {t('Computers communicate over Local Networks (Layer 2) using Physical MAC Addresses, but internet applications only know Logical IP Addresses (Layer 3). ARP acts as the bridge.', 'لوکل نیٹ ورکس پر کمپیوٹر فزیکل ایڈریس استعمال کرتے ہیں جبکہ ایپلیکیشنز لاجیکل ایڈریس۔ اے آر پی ان کے درمیان پل ہے۔')}
              </p>
            </div>

            <ARPAnimation />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-blue-50 border border-blue-100 rounded-[40px] space-y-4">
                <h4 className="text-xl font-black text-blue-900 uppercase italic underline underline-offset-4 decoration-blue-200">ARP (Standard)</h4>
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                  {t("Maps an IP address to a MAC address. Used when you know the destination IP but need to build the Ethernet frame.", "آئی پی ایڈریس کو میک ایڈریس میں نقشہ بناتا ہے۔")}
                </p>
              </div>
              <div className="p-8 bg-orange-50 border border-orange-100 rounded-[40px] space-y-4">
                <h4 className="text-xl font-black text-orange-900 uppercase italic underline underline-offset-4 decoration-orange-200">RARP (Reverse)</h4>
                <p className="text-xs text-orange-800 font-medium leading-relaxed">
                  {t("Maps a physical MAC address to an IP address. Primarily used by diskless workstations to find their IP on startup.", "میک ایڈریس کو آئی پی ایڈریس میں نقشہ بناتا ہے۔")}
                </p>
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 12: Mobile IP & Dynamic Routing */}
        <WeekCard
          week={12}
          title="Mobile IP & 802.11"
          titleUr="موبائل آئی پی اور وائی فائی"
          isExpanded={expandedWeek === 12}
          onToggle={() => setExpandedWeek(expandedWeek === 12 ? 0 : 12)}
        >
          <div className="space-y-12">
            <div className="p-10 md:p-16 bg-gray-900 rounded-[60px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity"><Radio size={160} /></div>
              <div className="relative z-10 max-w-2xl space-y-8">
                <h4 className="text-4xl font-black italic tracking-tighter text-blue-400">{t("The Challenges of Mobility", "موبائلٹی کے چیلنجز")}</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {t("When a device moves from one network to another, its IP address must change, but active connections (TCP) would drop. Mobile IP solves this using 'Home Agents' and 'Foreign Agents' to tunnel traffic to the mobile node.", "جب کوئی آلہ ایک نیٹ ورک سے دوسرے نیٹ ورک میں جاتا ہے، تو اس کا آئی پی بدلنا چاہیے۔ موبائل آئی پی اسے ہوم اور فارن ایجنٹس کے ذریعے حل کرتا ہے۔")}
                </p>
                <div className="flex gap-4">
                  <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest text-blue-200">Indirect Routing</div>
                  <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest text-emerald-200">Direct Routing</div>
                </div>
              </div>
            </div>

            <LectureNote
              title="802.11 Framework"
              content="WiFi uses the 802.11 standard. Unlike Ethernet which uses Collision Detection, WiFi uses Collision Avoidance (CSMA/CA) because radio signals are difficult to detect during transmission."
              icon={Wifi}
            />
          </div>
        </WeekCard>

        {/* Week 13: ACL & Multimedia */}
        <WeekCard
          week={13}
          title="ACLs & Multimedia"
          titleUr="اے سی ایل اور ملٹی میڈیا"
          isExpanded={expandedWeek === 13}
          onToggle={() => setExpandedWeek(expandedWeek === 13 ? 0 : 13)}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[48px] border-2 border-red-100 shadow-xl space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Shield size={32} /></div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{t("Traffic Filtering", "ٹریفک فلٹر")}</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 leading-tight">{t("Access Control Lists", "ایکسیس کنٹرول لسٹ")}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {t("A set of rules for filtering network traffic. They can permit or deny packets based on Source IP, Destination IP, or Port Numbers.", "ٹریفک کو فلٹر کرنے کے قواعد کا ایک مجموعہ۔ یہ آئی پی یا پورٹ کی بنیاد پر پیکٹ کی اجازت دے سکتے ہیں۔")}
                </p>
                <div className="p-4 bg-gray-900 rounded-2xl font-mono text-[10px] text-emerald-400">
                  <div className="opacity-40"># Cisco Standard ACL</div>
                  <div>access-list 10 permit 192.168.1.0 0.0.0.255</div>
                  <div>access-list 10 deny any</div>
                </div>
              </div>

              <div className="bg-emerald-600 p-8 md:p-12 rounded-[48px] text-white flex flex-col justify-between shadow-2xl">
                <div className="space-y-4">
                  <PlayCircle size={40} className="text-emerald-200" />
                  <h4 className="text-2xl font-black italic">{t("Multimedia Networking", "ملٹی میڈیا نیٹ ورکنگ")}</h4>
                  <p className="text-[11px] text-emerald-100/70 font-medium leading-relaxed">
                    {t("Real-time streaming requires Quality of Service (QoS). It deals with Jitter, Packet Delay, and Bandwidth reservations to ensure smooth video/audio.", "ریئل ٹائم اسٹریمنگ کے لیے QoS کی ضرورت ہوتی ہے۔")}
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl mt-8">
                  <span className="text-[10px] font-black uppercase text-emerald-200">{t("VoIP (Voice over IP)", "وی او آئی پی")}</span>
                  <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 14: Security & Crypto */}
        <WeekCard
          week={14}
          title="Network Security & NAT"
          titleUr="نیٹ ورک سیکیورٹی اور نی اے ٹی"
          isExpanded={expandedWeek === 14}
          onToggle={() => setExpandedWeek(expandedWeek === 14 ? 0 : 14)}
        >
          <div className="space-y-12">
            <SecuritySection />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-8 rounded-[48px] text-white space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600 rounded-2xl"><Lock size={24} /></div>
                  <h4 className="text-2xl font-black italic">{t("Cryptography", "کرپٹوگرافی")}</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs font-black text-gray-400">{t("Symmetric", "سائیمیٹرک")}</span>
                    <span className="text-[10px] font-bold text-blue-400">AES, DES</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs font-black text-gray-400">{t("Asymmetric", "ایسائیمیٹرک")}</span>
                    <span className="text-[10px] font-bold text-emerald-400">RSA, Diffie-Hellman</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-8 rounded-[48px] border border-orange-100 flex flex-col justify-center gap-6">
                <h4 className="text-xl font-black text-orange-900 uppercase tracking-tight italic underline decoration-orange-200 underline-offset-8">Network Address Translation (NAT)</h4>
                <p className="text-xs text-orange-800/70 font-medium leading-relaxed">
                  {t("Translates private IP addresses to a single public IP address. This conserves the IPv4 address space and adds a layer of security by hiding internal network structure.", "پرائیویٹ آئی پی ایڈریسز کو ایک پبلک آئی پی ایڈریس میں ترجمہ کرتا ہے۔")}
                </p>
                <div className="flex items-center gap-4 opacity-50 grayscale">
                  <Laptop size={32} className="text-orange-900" />
                  <ArrowRight size={24} />
                  <Server size={32} className="text-orange-900" />
                  <ArrowRight size={24} />
                  <Globe2 size={32} className="text-orange-900" />
                </div>
              </div>
            </div>
          </div>
        </WeekCard>

        {/* Week 15: Final Evolution */}
        <WeekCard
          week={15}
          title="Final Implementation"
          titleUr="آخری نفاذ"
          isExpanded={expandedWeek === 15}
          onToggle={() => setExpandedWeek(expandedWeek === 15 ? 0 : 15)}
        >
          <div className="p-10 md:p-20 bg-linear-to-br from-[#006400] via-[#00A651] to-[#006400] rounded-[60px] text-white text-center relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 p-20 opacity-5"
            >
              <RefreshCw size={300} />
            </motion.div>
            <div className="relative z-10 space-y-8">
              <Rocket size={80} className="mx-auto text-emerald-200 mb-8" />
              <h4 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none">{t("The Capstone Project", "کیپ اسٹون پروجیکٹ")}</h4>
              <p className="text-lg md:text-2xl text-emerald-100/80 font-medium leading-relaxed max-w-2xl mx-auto">
                {t("Apply everything from application protocols to low-level link layer framing. Build a simulated or real network environment with full routing and security.", "ایپلیکیشن پروٹوکول سے لنک لیئر فریمنگ تک ہر چیز کا اطلاق کریں۔")}
              </p>
              <div className="pt-12 flex flex-wrap justify-center gap-4">
                <button className="px-10 py-5 bg-white text-[#006400] rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
                  {t("Submit Final Project", "پروجیکٹ جمع کرائیں")}
                </button>
              </div>
            </div>
          </div>
        </WeekCard>
      </section>

      {/* Completion Card */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-32">
        <div className="bg-white rounded-[60px] p-12 md:p-24 shadow-2xl border border-gray-100 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-[#006400] to-transparent opacity-20" />
          <div className="relative z-10 space-y-8">
            <div className="inline-flex p-4 bg-emerald-50 rounded-full text-[#006400] mb-4 animate-bounce">
              <Award size={48} />
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none italic">
              {t("Course Fully Mastered!", "کورس مکمل مہارت حاصل کی!")}
            </h2>
            <p className="text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              {t("You have traveled across all 7 layers of the OSI model. From physical bits to global applications, you are now a Network Architect.", "آپ نے او ایس آئی ماڈل کی تمام 7 تہوں کا سفر کیا ہے۔")}
            </p>
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { l: "Architectural Insight", v: "100%", i: <Layers /> },
                { l: "Security Proficiency", v: "100%", i: <Shield /> },
                { l: "Global Protocols", v: "100%", i: <Globe /> },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-4">
                  <div className="text-[#006400] w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center mx-auto mb-4">{stat.i}</div>
                  <h6 className="font-black text-[10px] text-gray-400 uppercase tracking-widest">{t(stat.l, stat.l)}</h6>
                  <div className="text-3xl font-black text-gray-900 italic">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};