import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, Reorder } from 'framer-motion';
import {
  Mail, User, Activity, Share2, Layers, Hash, Globe, Cpu, Server,
  ArrowRight, Info, CheckCircle2, Award, BookOpen, Users, Calendar,
  Shield, Laptop, Network, Zap, Box, Radio, XCircle, PlayCircle, Cloud, Search
} from 'lucide-react';

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

      {/* ==================== CHAPTER 1 ==================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 space-y-8 md:space-y-16 mt-12 md:mt-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#006400]">Chapter 1 – Introduction</h2>
        </div>

        {/* 1-1 Data Communications */}
        <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 text-[#006400]">1-1 Data Communications</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 mb-8">
            {[
              { label: "Message", desc: "The data or information to be communicated (text, video, audio)." },
              { label: "Sender", desc: "The device that sends the data message (computer, phone, camera)." },
              { label: "Receiver", desc: "The device that receives the message (server, workstation, TV)." },
              { label: "Transmission Medium", desc: "The physical path by which a message travels (cable, fiber, air)." },
              { label: "Protocol", desc: "A set of rules that governs data communications, ensuring both sides understand each other." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="bg-[#006400] text-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] text-center shadow-xl flex flex-col items-center justify-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl md:text-6xl mb-2 opacity-50 font-black relative z-10">0{i + 1}</div>
                <h4 className="font-black text-[12px] md:text-sm leading-tight relative z-10 mb-2">{t(item.label, item.label)}</h4>
                <p className="text-[8px] md:text-[10px] text-green-100/80 leading-snug hidden md:block">{t(item.desc, item.desc)}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 bg-gray-50 p-6 md:p-10 rounded-[24px] md:rounded-[32px]">
            <h4 className="font-black mb-4 md:mb-6 text-center text-lg md:text-xl text-[#006400]">Data Flow (Simplex vs Duplex)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h5 className="font-black text-blue-800 text-lg mb-2">Simplex</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{t('Communication is strictly one-way, like a one-way street. Only one device on a link can transmit; the other can only receive (e.g., Keyboard to Monitor, Television Broadcasting).', 'رابطہ صرف ایک طرفہ ہوتا ہے۔ ایک آلہ صرف بھیج سکتا ہے اور دوسرا صرف وصول کر سکتا ہے۔')}</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h5 className="font-black text-orange-800 text-lg mb-2">Half-Duplex</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{t('Each station can both transmit and receive, but NOT at the same time. While one transmits, the other must wait (e.g., Walkie-Talkies).', 'دونوں آلات بھیج اور وصول سکتے ہیں، لیکن ایک وقت میں نہیں۔ جیسے واکی ٹاکی۔')}</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h5 className="font-black text-emerald-800 text-lg mb-2">Full-Duplex</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{t('Both stations can transmit and receive simultaneously. The link capacity is shared between the two signals going in opposite directions (e.g., Telephone Networks, Fast Ethernet).', 'دونوں آلات ایک ہی وقت میں بھیج اور وصول سکتے ہیں۔ جیسے ٹیلی فون نیٹ ورک۔')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topologies */}
        <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-10 text-[#006400]">{t('Physical Topologies', 'Physical Topologies')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {["Star", "Bus", "Ring", "Mesh", "Tree", "Hybrid"].map((topo) => (
              <div key={topo} className="bg-gray-50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-gray-100 flex flex-col">
                <h4 className="font-black text-xl md:text-2xl text-[#006400] mb-4 md:mb-6">{topo}</h4>
                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-inner border border-gray-100 mb-4 md:mb-6">
                  <TopologyDiagram type={topo} />
                </div>
                <div className="space-y-4 flex-1">
                  <h5 className="font-black text-[10px] md:text-sm text-[#006400] uppercase tracking-wider">{t('Characteristics', 'Characteristics')}</h5>
                  <ul className="text-[10px] md:text-xs space-y-1.5 md:space-y-2 text-gray-600">
                    {topo === 'Star' && (
                      <>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Centralized control via hub/switch', 'Centralized control via hub/switch')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Easy to install and reconfigure', 'Easy to install and reconfigure')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Robust: one link failure doesn\'t affect others', 'Robust: one link failure doesn\'t affect others')}</li>
                      </>
                    )}
                    {topo === 'Bus' && (
                      <>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Uses a single backbone cable', 'Uses a single backbone cable')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Inexpensive and simple cabling', 'Inexpensive and simple cabling')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Critical failure if backbone breaks', 'Critical failure if backbone breaks')}</li>
                      </>
                    )}
                    {topo === 'Ring' && (
                      <>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Data travels in one direction', 'Data travels in one direction')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Token passing prevents collisions', 'Token passing prevents collisions')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('High latency in large rings', 'High latency in large rings')}</li>
                      </>
                    )}
                    {topo === 'Mesh' && (
                      <>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Every node connected to every other node', 'Every node connected to every other node')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Maximum redundancy and privacy', 'Maximum redundancy and privacy')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Complex and expensive to implement', 'Complex and expensive to implement')}</li>
                      </>
                    )}
                    {topo === 'Tree' && (
                      <>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Hierarchical structure (Parent-Child)', 'Hierarchical structure (Parent-Child)')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Highly scalable and manageable', 'Highly scalable and manageable')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Root node is a single point of failure', 'Root node is a single point of failure')}</li>
                      </>
                    )}
                    {topo === 'Hybrid' && (
                      <>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Combination of two or more topologies', 'Combination of two or more topologies')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Flexible and tailored to needs', 'Flexible and tailored to needs')}</li>
                        <li className="flex items-start gap-2"><Zap size={10} className="mt-0.5 text-[#00A651] flex-shrink-0" /> {t('Complex design and maintenance', 'Complex design and maintenance')}</li>
                      </>
                    )}
                  </ul>
                  <div className="pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                    <h5 className="font-black text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-1 md:mb-2">{t('Common Use Case', 'Common Use Case')}</h5>
                    <p className="text-[10px] md:text-xs font-bold text-[#006400]">
                      {topo === 'Star' && t('Modern LANs, Home Wi-Fi Routers', 'Modern LANs, Home Wi-Fi Routers')}
                      {topo === 'Bus' && t('Early Ethernet, Small temporary networks', 'Early Ethernet, Small temporary networks')}
                      {topo === 'Ring' && t('Fiber Distributed Data Interface (FDDI)', 'Fiber Distributed Data Interface (FDDI)')}
                      {topo === 'Mesh' && t('Military networks, Core ISP backbones', 'Military networks, Core ISP backbones')}
                      {topo === 'Tree' && t('Campus networks, Corporate hierarchies', 'Campus networks, Corporate hierarchies')}
                      {topo === 'Hybrid' && t('Large enterprise WANs, Internet structure', 'Large enterprise WANs, Internet structure')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Networks Types: LAN, MAN, WAN, PAN */}
        <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 text-[#006400]">{t('Network Types (Coverage Area)', 'نیٹ ورک کی اقسام (کوریج ایریا)')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100 hover:-translate-y-2 transition-transform shadow-sm">
              <h4 className="font-black text-xl text-purple-900 mb-2">PAN <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-1 rounded-full ml-2">Personal</span></h4>
              <p className="text-xs text-purple-800 leading-relaxed font-medium">{t('Covers a very small area (1-10 meters). Used for connecting personal devices like smartphones to wireless headphones via Bluetooth.', 'بہت چھوٹے حصے کا احاطہ کرتا ہے جیسے بلوٹوتھ کی مدد سے موبائل فون اور ہیڈفونز کا رابطہ۔')}</p>
            </div>
            <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 hover:-translate-y-2 transition-transform shadow-sm">
              <h4 className="font-black text-xl text-emerald-900 mb-2">LAN <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full ml-2">Local</span></h4>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">{t('Privately owned network linking devices in a single office, building, or campus. Can range from two PCs to thousands. Uses Ethernet/Wi-Fi.', 'ایک دفتر، عمارت، یا کیمپس میں ڈیوائسز کو جوڑنے والا پرائیویٹ نیٹ ورک۔')}</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 hover:-translate-y-2 transition-transform shadow-sm">
              <h4 className="font-black text-xl text-blue-900 mb-2">MAN <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-1 rounded-full ml-2">Metropolitan</span></h4>
              <p className="text-xs text-blue-800 leading-relaxed font-medium">{t('A network with a size between a LAN and a WAN, typically covering an entire city. Example: Cable TV networks.', 'ایسا نیٹ ورک جو LAN سے بڑا اور WAN سے چھوٹا ہو، جو عام طور پر ایک پورے شہر کا احاطہ کرتا ہے۔')}</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 hover:-translate-y-2 transition-transform shadow-sm">
              <h4 className="font-black text-xl text-orange-900 mb-2">WAN <span className="text-[10px] bg-orange-200 text-orange-800 px-2 py-1 rounded-full ml-2">Wide</span></h4>
              <p className="text-xs text-orange-800 leading-relaxed font-medium">{t('Spans a large geographical area, often a country or continent (or the globally connected Internet). Typically uses public transmission systems.', 'ایک بڑے جغرافیائی علاقے، ملک یا براعظم پر محیط نیٹ ورک۔')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-emerald-50 p-6 rounded-3xl">
                <h4 className="font-black text-emerald-900">LAN Example (Karachi Office)</h4>
                <p className="text-xs text-emerald-800 mt-2 opacity-80">High speed gigabit links, extremely low packet delay, owned entirely by the company within a single physical building.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-3xl">
                <h4 className="font-black text-orange-900">WAN Example (Karachi to Gilgit)</h4>
                <p className="text-xs text-orange-800 mt-2 opacity-80">~1500 km distance. High cost, lower bandwidth compared to LAN. Leased through third-party ISPs like PTCL using MPLS or VPN tunnels.</p>
              </div>
            </div>
            <div className="lg:col-span-3 bg-gray-50 p-6 md:p-8 rounded-[32px] flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 400 150" className="w-full h-32 md:h-48 drop-shadow-lg">
                <rect x="30" y="55" width="80" height="50" rx="10" fill="#10B981" />
                <text x="70" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LAN</text>
                <text x="70" y="125" textAnchor="middle" fill="gray" fontSize="12" fontWeight="bold">Karachi HQ</text>

                <path d="M 110 80 Q 200 10 290 80" fill="none" stroke="#F97316" strokeWidth="5" strokeDasharray="8 6" />
                <path d="M 110 80 Q 200 150 290 80" fill="none" stroke="#F97316" strokeWidth="5" strokeDasharray="8 6" opacity="0.4" />

                <circle cx="200" cy="45" r="25" fill="#FFFED4" stroke="#F97316" strokeWidth="3" />
                <text x="200" y="50" textAnchor="middle" fill="#C2410C" fontSize="12" fontWeight="bold">ISP</text>

                <rect x="290" y="55" width="80" height="50" rx="10" fill="#10B981" />
                <text x="330" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LAN</text>
                <text x="330" y="125" textAnchor="middle" fill="gray" fontSize="12" fontWeight="bold">Gilgit Branch</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER 2: FULL OSI MODEL ==================== */}
      <section className="px-4 md:px-6 space-y-8 md:space-y-16">
        <h2 className="text-3xl md:text-5xl font-black text-center text-[#006400]">Chapter 2 – Network Models</h2>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black text-center mb-8 md:mb-12">OSI 7-Layer Model</h3>

          <div className="space-y-4 md:space-y-6 mb-12">
            {[
              { no: "7", name: "Application Layer", color: "bg-purple-600", desc: "The user interface. Where network applications (like web browsers or email clients) access network services. Provides features like authentication and data formatting for user apps.", protocols: "HTTP, HTTPS, FTP, SMTP, DNS, SSH" },
              { no: "6", name: "Presentation Layer", color: "bg-pink-600", desc: "The translator. Converts incoming and outgoing data from one presentation format to another (e.g., from clear text to encrypted ciphertext, or compressing a video file).", protocols: "SSL/TLS, JPEG, MPEG, ASCII" },
              { no: "5", name: "Session Layer", color: "bg-rose-600", desc: "The dialogue controller. Establishes, manages, and terminates connections (sessions) between local and remote applications. Keeps different app streams separate.", protocols: "NetBIOS, PPTP, RPC" },
              { no: "4", name: "Transport Layer", color: "bg-red-600", desc: "The traffic cop. Responsible for end-to-end communication, error recovery, and flow control. Breaks large data into smaller pieces called 'Segments'.", protocols: "TCP, UDP", devices: "Firewalls" },
              { no: "3", name: "Network Layer", color: "bg-orange-600", desc: "The mailroom. Responsible for logical addressing (IP addresses) and routing. Determines the best path for data 'Packets' to travel across vastly different networks.", protocols: "IPv4, IPv6, ICMP, IPSec", devices: "Routers, Layer 3 Switches" },
              { no: "2", name: "Data Link Layer", color: "bg-emerald-600", desc: "The bridge. Responsible for physical MAC addressing, error detection in the physical layer, and framing data. Packages data into 'Frames' for local delivery.", protocols: "Ethernet, Wi-Fi (802.11), MAC, ARP, VLANs", devices: "Switches, Bridges" },
              { no: "1", name: "Physical Layer", color: "bg-blue-600", desc: "The cables. Converts digital data into physical signals (electrical volts, light pulses, or radio waves) to be transmitted over physical medium strictly as 'Bits' (0s and 1s).", protocols: "100Base-T, DSL, ISDN", devices: "Hubs, Cables, Repeaters, Modems" }
            ].map((layer) => (
              <div key={layer.no} className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className={`${layer.color} text-white flex flex-col justify-center items-center p-6 md:w-56 shrink-0 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-5xl md:text-7xl font-black opacity-30 mb-2 relative z-10 transition-transform group-hover:scale-110">L{layer.no}</div>
                  <h4 className="font-black text-center text-sm md:text-lg relative z-10 tracking-wide uppercase">{layer.name}</h4>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 md:space-y-0">
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">{t(layer.desc, layer.desc)}</p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[10px] md:text-xs font-black rounded-lg border border-gray-200 uppercase tracking-widest">{t('Protocols', 'پروٹوکول')}: <span className="text-[#006400] ml-1">{layer.protocols}</span></span>
                    {layer.devices && <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[10px] md:text-xs font-black rounded-lg border border-gray-200 uppercase tracking-widest">{t('Hardware', 'ہارڈویئر')}: <span className="text-[#00A651] ml-1">{layer.devices}</span></span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <OSIQuiz />
          <PacketFlowSimulation />
        </div>
      </section>

      {/* ==================== IPv4 & ARP SECTION ==================== */}
      <section className="px-4 md:px-6 space-y-8 md:space-y-16">
        <h2 className="text-3xl md:text-5xl font-black text-center text-[#006400]">IPv4 Addressing & ARP</h2>

        <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="text-xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
            <Layers size={24} className="md:w-8 md:h-8" /> {t('IPv4 Address Structure', 'IPv4 Address Structure')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { class: "Class A", net: 8, host: 24, color: "bg-blue-600" },
              { class: "Class B", net: 16, host: 16, color: "bg-orange-600" },
              { class: "Class C", net: 24, host: 8, color: "bg-emerald-600" }
            ].map((item, i) => (
              <div key={i} className="space-y-3 md:space-y-4">
                <h4 className="font-black text-center text-sm md:text-lg">{item.class}</h4>
                <div className="h-10 md:h-12 w-full flex rounded-lg md:rounded-xl overflow-hidden shadow-inner border border-gray-200">
                  <div
                    className={`${item.color} h-full flex items-center justify-center text-white text-[8px] md:text-[10px] font-bold`}
                    style={{ width: `${(item.net / 32) * 100}%` }}
                  >
                    NET ({item.net})
                  </div>
                  <div
                    className="bg-gray-100 h-full flex items-center justify-center text-gray-400 text-[8px] md:text-[10px] font-bold"
                    style={{ width: `${(item.host / 32) * 100}%` }}
                  >
                    HOST ({item.host})
                  </div>
                </div>
                <p className="text-[8px] md:text-[10px] text-center text-gray-500">32 Bits Total</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="text-xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
            <Hash size={24} className="md:w-8 md:h-8" /> {t('Classful IPv4 Addressing', 'Classful IPv4 Addressing')}
          </h3>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-[10px] md:text-sm border-collapse min-w-[500px]">
              <thead className="bg-[#006400] text-white">
                <tr>
                  <th className="p-3 md:p-5 text-left">{t('Class', 'Class')}</th>
                  <th className="p-3 md:p-5 text-left">{t('First Octet Range', 'First Octet Range')}</th>
                  <th className="p-3 md:p-5 text-left">{t('Default Mask', 'Default Mask')}</th>
                  <th className="p-3 md:p-5 text-left">{t('Typical Use', 'Typical Use')}</th>
                </tr>
              </thead>
              <tbody className="divide-y border-x border-b border-gray-100">
                <tr>
                  <td className="p-3 md:p-5 font-black text-blue-600">A</td>
                  <td className="p-3 md:p-5 font-mono">1 – 126</td>
                  <td className="p-3 md:p-5 font-mono">255.0.0.0 (/8)</td>
                  <td className="p-3 md:p-5">{t('Large Networks', 'Large Networks')}</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-5 font-black text-orange-600">B</td>
                  <td className="p-3 md:p-5 font-mono">128 – 191</td>
                  <td className="p-3 md:p-5 font-mono">255.255.0.0 (/16)</td>
                  <td className="p-3 md:p-5">{t('Medium Networks', 'Medium Networks')}</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-5 font-black text-emerald-600">C</td>
                  <td className="p-3 md:p-5 font-mono">192 – 223</td>
                  <td className="p-3 md:p-5 font-mono">255.255.255.0 (/24)</td>
                  <td className="p-3 md:p-5">{t('Small Networks', 'Small Networks')}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 md:p-5 font-black text-purple-600">D</td>
                  <td className="p-3 md:p-5 font-mono">224 – 239</td>
                  <td className="p-3 md:p-5 font-mono">N/A</td>
                  <td className="p-3 md:p-5">{t('Multicast Groups', 'Multicast Groups')}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 md:p-5 font-black text-gray-600">E</td>
                  <td className="p-3 md:p-5 font-mono">240 – 255</td>
                  <td className="p-3 md:p-5 font-mono">N/A</td>
                  <td className="p-3 md:p-5">{t('Experimental / Reserved', 'Experimental / Reserved')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 md:mt-6 text-[10px] md:text-sm text-gray-500 italic">
            * {t('Note: 127.0.0.0 is reserved for loopback testing.', 'Note: 127.0.0.0 is reserved for loopback testing.')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <h3 className="text-xl md:text-3xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3 text-[#006400]">
            <Shield size={24} className="md:w-8 md:h-8" /> {t('Private IP Address Ranges', 'Private IP Address Ranges')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {[
              { range: "10.0.0.0/8", use: "Large Enterprise", color: "bg-blue-50 text-blue-900" },
              { range: "172.16.0.0/12", use: "Medium Networks", color: "bg-orange-50 text-orange-900" },
              { range: "192.168.0.0/16", use: "Home / Small Office", color: "bg-emerald-50 text-emerald-900" }
            ].map((item, i) => (
              <div key={i} className={`p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-100 ${item.color}`}>
                <p className="text-xl md:text-2xl font-mono font-black mb-1 md:mb-2">{item.range}</p>
                <p className="text-[8px] md:text-xs font-bold uppercase tracking-wider opacity-70">{t(item.use, item.use)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="p-6 md:p-8 bg-gray-50 rounded-[24px] md:rounded-[32px] border-l-4 md:border-l-8 border-[#006400]">
              <h4 className="font-black text-lg md:text-xl mb-3 md:mb-4 flex items-center gap-2">
                <Info size={18} className="text-[#006400]" /> {t('Purpose of Private IPs', 'Purpose of Private IPs')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <p className="text-xs md:text-sm leading-relaxed text-gray-700">
                    {t('Private IP addresses are used within local networks (LANs) and are not routable on the public internet. They allow multiple devices to share a single public IP address using Network Address Translation (NAT).', 'Private IP addresses are used within local networks (LANs) and are not routable on the public internet. They allow multiple devices to share a single public IP address using Network Address Translation (NAT).')}
                  </p>
                  <ul className="text-[10px] md:text-xs space-y-1.5 md:space-y-2 text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#00A651]" /> {t('Conserves Public IPv4 addresses', 'Conserves Public IPv4 addresses')}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#00A651]" /> {t('Enhances Security (Internal IPs hidden)', 'Enhances Security (Internal IPs hidden)')}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#00A651]" /> {t('Cost-effective for large organizations', 'Cost-effective for large organizations')}</li>
                  </ul>
                </div>
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                  <p className="text-right font-urdu text-base md:text-lg leading-loose text-[#006400]">
                    پرائیویٹ آئی پی ایڈریسز مقامی نیٹ ورکس (LANs) میں استعمال ہوتے ہیں اور عوامی انٹرنیٹ پر براہ راست نہیں چل سکتے۔ یہ نیٹ ورک ایڈریس ٹرانسلیشن (NAT) کے ذریعے ایک ہی پبلک آئی پی کو کئی ڈیوائسز کے درمیان شیئر کرنے کی اجازت دیتے ہیں۔
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-[#006400] flex items-center gap-3">
                <Layers size={28} /> {t('Subnetting & CIDR Explained', 'سب نیٹ اور CIDR کی وضاحت')}
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">{t('Dividing a large network into smaller, efficient, and secure sub-networks.', 'ایک بڑے نیٹ ورک کو چھوٹے، موثر، اور محفوظ حصوں میں تقسیم کرنا۔')}</p>
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider">Classless Inter-Domain Routing</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-[#006400] text-lg mb-2">1. The Problem</h4>
              <p className="text-xs text-gray-600 leading-relaxed">A Class B network gives 65,534 hosts. If a company only has 500 computers, placing all 65,000 IPs in one broadcast domain wastes addresses and causes massive congestion.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm shadow-emerald-100/50">
              <h4 className="font-black text-emerald-800 text-lg mb-2">2. The Solution</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">Borrow bits from the Host portion to create a smaller "Subnet" portion. This splits the massive network into multiple bite-sized, isolated networks.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-[#006400] text-lg mb-2">3. The Result</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Reduced broadcast traffic, improved security (can place firewalls between subnets), and no wasted IP space.</p>
            </div>
          </div>

          <h4 className="font-black text-gray-800 text-lg mb-4">Practical ISP Subnetting Allocation (Base: 190.100.0.0/16)</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 md:p-6 bg-white border border-gray-200 rounded-[24px] hover:border-[#006400] transition-colors">
              <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">1</div>
              <div>
                <h5 className="font-black text-sm md:text-base text-gray-800">Group 1: Needs 64 addresses per customer</h5>
                <p className="text-xs text-gray-500 mt-1">If 256 addresses are required total per subnet, we use a <code className="bg-gray-100 px-1 rounded text-[#00A651] font-bold">/24</code> mask (leaves 8 host bits = 2^8 = 256).</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 md:p-6 bg-white border border-gray-200 rounded-[24px] hover:border-[#006400] transition-colors">
              <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">2</div>
              <div>
                <h5 className="font-black text-sm md:text-base text-gray-800">Group 2: Needs 128 smaller subnets</h5>
                <p className="text-xs text-gray-500 mt-1">If exactly 128 addresses are required per subnet, we borrow 1 more bit! Mask becomes <code className="bg-gray-100 px-1 rounded text-[#00A651] font-bold">/25</code> (leaves 7 host bits = 2^7 = 128).</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 md:p-6 bg-white border border-gray-200 rounded-[24px] hover:border-[#006400] transition-colors">
              <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">3</div>
              <div>
                <h5 className="font-black text-sm md:text-base text-gray-800">Group 3: Needs micro networks</h5>
                <p className="text-xs text-gray-500 mt-1">Require 64 addresses? Borrow 2 bits! Mask goes to <code className="bg-gray-100 px-1 rounded text-[#00A651] font-bold">/26</code> (leaves 6 host bits = 2^6 = 64).</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl">
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-black mb-4 flex justify-center md:justify-start items-center gap-2 md:gap-3 text-[#006400]">
              <Search size={28} className="md:w-10 md:h-10 text-orange-500" /> {t('ARP Protocol: The Missing Link', 'ARP پروٹوکول: گمشدہ لنک')}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-3xl font-medium">
              {t('Computers communicate over Local Networks (Layer 2) using Physical MAC Addresses, but internet applications only know Logical IP Addresses (Layer 3). Even if your PC knows a server\'s IP, it cannot physically build the Ethernet frame without the MAC address! ARP acts as the translator to fix this.', 'کمپیوٹر لوکل نیٹ ورکس پر میک ایڈریسز کا استعمال کرتے ہوئے بات چیت کرتے ہیں، لیکن انٹرنیٹ ایپلیکیشنز صرف آئی پی ایڈریسز کو جانتی ہیں۔ ARP ان دونوں کے درمیان مترجم کا کام کرتا ہے۔')}
            </p>
          </div>

          <ARPAnimation />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12">
            <div className="p-6 md:p-10 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-[24px] md:rounded-[32px] shadow-xl hover:-translate-y-2 transition-transform">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Share2 size={24} className="md:w-8 md:h-8" />
                <p className="text-xl md:text-2xl font-black">{t('ARP Request', 'ARP Request')}</p>
              </div>
              <p className="text-2xl md:text-4xl font-black mb-2 md:mb-4">BROADCAST</p>
              <p className="text-[10px] md:text-sm md:text-base opacity-90 leading-relaxed font-bold">
                {t('Sent to ALL devices on the local switch. It blindly shouts: "Hey everyone! Whoever owns IP 192.168.1.5, please reply to me and tell me your Hardware MAC Address!"', 'یہ نیٹ ورک پر موجود تمام آلات کو بھیجا جاتا ہے۔ یہ پوچھتا ہے کہ مطلوبہ آئی پی کا میک ایڈریس کیا ہے۔')}
              </p>
            </div>
            <div className="p-6 md:p-10 bg-gradient-to-br from-[#006400] to-[#00A651] text-white rounded-[24px] md:rounded-[32px] shadow-xl hover:-translate-y-2 transition-transform">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <p className="text-xl md:text-2xl font-black">{t('ARP Reply', 'ARP Reply')}</p>
              </div>
              <p className="text-2xl md:text-4xl font-black mb-2 md:mb-4">UNICAST</p>
              <p className="text-[10px] md:text-sm md:text-base opacity-90 leading-relaxed font-bold">
                {t('Sent DIRECTLY and privately back to the original requester. The target device answers: "That\'s my IP! Here is my exact MAC Address. Save it in your ARP Cache!"', 'یہ خاص طور پر اصل درخواست کنندہ کو واپس بھیجا جاتا ہے۔ ہدف والا آلہ اپنا درست میک ایڈریس فراہم کرتا ہے۔')}
              </p>
            </div>
          </div>
        </div>

        <DNSSection />

        {/* NEW ENHANCED CONTENT - CHAPTER 3 & 4 */}
        <NetworkDevicesSection />
        <TCPvsUDPSection />
        <WirelessSection />
        <SecuritySection />
        <CloudSection />
      </section>

    </div>
  );
};