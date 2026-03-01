import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Cpu, Search, Database, TrendingUp, Network, Layers,
    Zap, Box, MessageSquare, Image, BarChart3, Binary,
    Target, Activity, Globe, Info, CheckCircle2, Award, BookOpen,
    ChevronRight, ChevronDown, Rocket, Lightbulb, Microscope, User, Users, ArrowRight, Download,
    Trophy, Briefcase
} from 'lucide-react';


const WeekCard = ({ week, title, titleUr, children, isExpanded, onToggle }: {
    week: number;
    title: string;
    titleUr: string;
    children: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
            <button
                onClick={onToggle}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner">
                        {week}
                    </div>
                    <div>
                        <h3 className="font-black text-gray-900 text-xl tracking-tight">{t(title, titleUr)}</h3>
                        <p className="text-xs font-black text-purple-600 uppercase tracking-widest mt-1">
                            {t(`WEEK ${week}`, `ہفتہ ${week}`)}
                        </p>
                    </div>
                </div>
                <div className={`p-2 rounded-xl bg-gray-50 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={24} />
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-6 pb-8 space-y-6 border-t border-gray-50 pt-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SearchVisualizer = () => {
    const [activeSearch, setActiveSearch] = useState<'BFS' | 'DFS' | 'A*'>('BFS');
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <div className="flex gap-2 mb-6">
                {['BFS', 'DFS', 'A*'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveSearch(type as any)}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${activeSearch === type ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-400 hover:text-gray-600'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="relative h-48 bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Simple Tree Structure */}
                    <line x1="200" y1="20" x2="100" y2="80" stroke="#E5E7EB" strokeWidth="2" />
                    <line x1="200" y1="20" x2="300" y2="80" stroke="#E5E7EB" strokeWidth="2" />
                    <line x1="100" y1="80" x2="50" y2="150" stroke="#E5E7EB" strokeWidth="2" />
                    <line x1="100" y1="80" x2="150" y2="150" stroke="#E5E7EB" strokeWidth="2" />
                    <line x1="300" y1="80" x2="250" y2="150" stroke="#E5E7EB" strokeWidth="2" />
                    <line x1="300" y1="80" x2="350" y2="150" stroke="#E5E7EB" strokeWidth="2" />

                    {/* Nodes */}
                    {[
                        { x: 200, y: 20, l: 'Root', delay: 0 },
                        { x: 100, y: 80, l: 'A', delay: activeSearch === 'BFS' ? 1 : activeSearch === 'DFS' ? 1 : 1 },
                        { x: 300, y: 80, l: 'B', delay: activeSearch === 'BFS' ? 2 : activeSearch === 'DFS' ? 4 : 1.5 },
                        { x: 50, y: 150, l: 'C', delay: activeSearch === 'BFS' ? 3 : activeSearch === 'DFS' ? 2 : 2.5 },
                        { x: 150, y: 150, l: 'D', delay: activeSearch === 'BFS' ? 4 : activeSearch === 'DFS' ? 3 : 2 },
                        { x: 250, y: 150, l: 'E', delay: activeSearch === 'BFS' ? 5 : activeSearch === 'DFS' ? 5 : 3.5 },
                        { x: 350, y: 150, l: 'F', delay: activeSearch === 'BFS' ? 6 : activeSearch === 'DFS' ? 6 : 3 },
                    ].map((node, i) => (
                        <motion.g key={node.l}>
                            <motion.circle
                                cx={node.x} cy={node.y} r="15"
                                fill="white"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                                initial={{ fill: "white" }}
                                animate={{
                                    fill: ["#ffffff", "#9333ea", "#ffffff"],
                                    stroke: ["#E5E7EB", "#9333ea", "#E5E7EB"]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: node.delay,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            />
                            <text x={node.x} y={node.y + 4} textAnchor="middle" className="text-[10px] font-black fill-gray-400">{node.l}</text>
                        </motion.g>
                    ))}
                </svg>
            </div>
            <p className="mt-4 text-[10px] text-gray-500 font-medium italic text-center">
                {activeSearch === 'BFS' && t("BFS explores level by level (Broad search).", "BFS ہر سطح کو ترتیب وار تلاش کرتا ہے۔")}
                {activeSearch === 'DFS' && t("DFS goes deep into one branch first.", "DFS پہلے ایک شاخ کی گہرائی میں جاتا ہے۔")}
                {activeSearch === 'A*' && t("A* uses heuristics to find the shortest path.", "A* بہترین راستہ تلاش کرنے کے لیے ہیورسٹکس کا استعمال کرتا ہے۔")}
            </p>
        </div>
    );
};

const PEASVisualizer = () => {
    const { t } = useLanguage();
    const [selectedAgent, setSelectedAgent] = useState<'Taxi' | 'Vacuum' | 'Doctor'>('Taxi');

    const agents = {
        Taxi: {
            p: "Safe, fast, legal, comfortable trip, maximize profits",
            e: "Roads, other traffic, pedestrians, customers",
            a: "Steering, accelerator, brake, signal, horn, display",
            s: "Cameras, sonar, speedometer, GPS, odometer, engine sensors"
        },
        Vacuum: {
            p: "Cleanness, efficiency, battery life, safety",
            e: "Floors, furniture, stairs, dust, pets",
            a: "Wheels, brushes, vacuum motor, trash bin opener",
            s: "Cliff sensor, bump sensor, infrared wall sensor, dirt sensor"
        },
        Doctor: {
            p: "Healthy patient, reduced costs, no malpractice",
            e: "Patient, hospital staff, laboratory, medical devices",
            a: "Diagnosis, treatment plan, tests, surgery instructions",
            s: "Symptoms, patient history, test results, vital monitors"
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
            <h4 className="font-black text-xs text-gray-400 uppercase tracking-widest mb-6 text-center">{t("PEAS Analysis", "PEAS تجزیہ")}</h4>
            <div className="flex justify-center gap-2 mb-8">
                {Object.keys(agents).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedAgent(type as any)}
                        className={`px-4 py-2 rounded-xl font-black text-[10px] transition-all ${selectedAgent === type ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { l: 'Performance', v: agents[selectedAgent].p, c: 'bg-blue-50 text-blue-700', i: <Target size={14} /> },
                    { l: 'Environment', v: agents[selectedAgent].e, c: 'bg-emerald-50 text-emerald-700', i: <Globe size={14} /> },
                    { l: 'Actuators', v: agents[selectedAgent].a, c: 'bg-orange-50 text-orange-700', i: <Zap size={14} /> },
                    { l: 'Sensors', v: agents[selectedAgent].s, c: 'bg-purple-50 text-purple-700', i: <Activity size={14} /> },
                ].map(item => (
                    <motion.div
                        key={item.l}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl ${item.c} border border-current opacity-20 border-opacity-10`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {item.i}
                            <span className="font-black text-[10px] uppercase tracking-tighter">{t(item.l, item.l)}</span>
                        </div>
                        <p className="text-[10px] leading-relaxed font-bold opacity-80">{t(item.v, item.v)}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const NeuronVisualizer = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-8">{t("ANN Structure", "اعصابی نیٹ ورک کا ڈھانچہ")}</h4>

            <div className="flex justify-between items-center relative h-32">
                {/* Layer 1: Inputs */}
                <div className="space-y-4 relative z-10">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        />
                    ))}
                </div>

                {/* Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    {[0, 1, 2].map(i => (
                        <motion.line
                            key={i}
                            x1="20" y1={35 + i * 32} x2="180" y2="64"
                            stroke="white" strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    ))}
                    {[0, 1, 2].map(i => (
                        <motion.line
                            key={i + 3}
                            x1="180" y1="64" x2="340" y2="64"
                            stroke="white" strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
                        />
                    ))}
                </svg>

                {/* Layer 2: Hidden Node */}
                <div className="relative z-10">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
                    >
                        <Brain size={24} className="text-white" />
                    </motion.div>
                </div>

                {/* Layer 3: Output */}
                <div className="relative z-10">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)] flex items-center justify-center"
                    >
                        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    </motion.div>
                </div>
            </div>

            <div className="mt-8 flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-500">
                <span>{t("Inputs", "ان پٹس")}</span>
                <span>{t("Processing (Weights)", "پروسیسنگ")}</span>
                <span>{t("Prediction", "پیشن گوئی")}</span>
            </div>
        </div>
    );
};

const LectureNote = ({ title, content, icon: Icon = Lightbulb }: { title: string; content: string; icon?: any }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Icon size={48} className="text-amber-600" />
            </div>
            <div className="flex items-center gap-2 text-amber-900">
                <Icon size={18} className="shrink-0" />
                <h5 className="font-black text-[10px] uppercase tracking-wider">{t("Instructor's Note", "انسٹرکٹر کا نوٹ")}</h5>
            </div>
            <h4 className="font-black text-gray-900 text-sm tracking-tight">{t(title, title)}</h4>
            <p className="text-[10px] text-amber-900/80 leading-relaxed font-medium italic">
                {t(content, content)}
            </p>
        </div>
    );
};

export const AIContent = () => {
    const { t } = useLanguage();
    const [expandedWeek, setExpandedWeek] = useState<number>(1);

    return (
        <div className="px-4 pb-20">
            <div className="mb-10 text-center space-y-2">
                <h2 className="text-3xl font-black text-gray-900">{t("Course Syllabus", "کورس سلیبس")}</h2>
                <p className="text-sm text-gray-500 font-medium">{t("15 Weeks of Intelligence Mastery", "ذہانت کی مہارت کے 15 ہفتے")}</p>
            </div>

            {/* Week 1 */}
            <WeekCard
                week={1}
                title="Intro to AI & Intelligent Agents"
                titleUr="مصنوعی ذہانت اور ذہین ایجنٹس"
                isExpanded={expandedWeek === 1}
                onToggle={() => setExpandedWeek(expandedWeek === 1 ? 0 : 1)}
            >
                <div className="space-y-8">
                    {/* Definition Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
                            <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("What is Artificial Intelligence?", "مصنوعی ذہانت کیا ہے؟")}</h4>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                            {t("Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions) and self-correction.", "مصنوعی ذہانت (AI) مشینوں، خاص طور پر کمپیوٹر سسٹمز کے ذریعے انسانی ذہانت کے عمل کی نقل ہے۔ ان عملوں میں سیکھنا، استدلال اور خود کی اصلاح شامل ہے۔")}
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { t: "Thinking Humanly", d: "The Cognitive Modeling approach. It tries to determine how humans think by using psychological experiments and brain imaging. Aiming for an AI that mimics human thought patterns.", icon: <Brain size={18} /> },
                                { t: "Acting Humanly", d: "The Turing Test approach. A computer passes the test if a human interrogator cannot tell whether the written responses come from a human or a computer after questioning.", icon: <User size={18} /> },
                                { t: "Thinking Rationally", d: "The 'Laws of Thought' approach using Logic. It codifies 'right thinking' into syllogisms and logic programs to solve any solvable problem.", icon: <Lightbulb size={18} /> },
                                { t: "Acting Rationally", d: "The Rational Agent approach. An agent that acts so as to achieve the best outcome or, when there is uncertainty, the best expected outcome.", icon: <Rocket size={18} /> },
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-start group hover:bg-white hover:shadow-xl transition-all">
                                    <div className="p-2 bg-white rounded-xl text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="font-black text-xs text-gray-900 tracking-wide">{t(item.t, item.t)}</h5>
                                        <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{t(item.d, item.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="AI Paradigms"
                        content="Modern AI focuses on 'Acting Rationally'. We don't necessarily care if a self-driving car 'thinks' like a human, as long as it drives safely and reaches the destination optimally."
                        icon={Brain}
                    />

                    {/* Agent Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                            <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("PEAS Framework", "PEAS فریم ورک")}</h4>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium px-2">
                            {t("To design a rational agent, we must specify the task environment using PEAS: Performance, Environment, Actuators, and Sensors. This defines what the agent is supposed to do and where.", "ایجنٹ کو ڈیزائن کرنے کے لیے ہمیں PEAS کا استعمال کرتے ہوئے ٹاسک ماحول کی وضاحت کرنی چاہیے۔")}
                        </p>
                        <PEASVisualizer />
                    </div>

                    {/* Environment Properties */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                            <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("Environment Characteristics", "ماحول کی خصوصیات")}</h4>
                        </div>
                        <div className="bg-gray-900 rounded-[32px] p-6 text-white overflow-hidden relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                                {[
                                    { l: "Fully vs Partially Observable", d: "Can the agent sense everything needed to make a decision?" },
                                    { l: "Deterministic vs Stochastic", d: "Is the next state decided solely by the current state and action?" },
                                    { l: "Episodic vs Sequential", d: "Does the current action affect future decisions?" },
                                    { l: "Static vs Dynamic", d: "Does the environment change while the agent is thinking?" },
                                    { l: "Discrete vs Continuous", d: "Are states and actions limited (Chess) or infinite (Driving)?" },
                                    { l: "Known vs Unknown", d: "Does the agent know the 'rules' of the world physics?" },
                                ].map(item => (
                                    <div key={item.l} className="space-y-1">
                                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t(item.l, item.l)}</p>
                                        <p className="text-[9px] text-gray-400 font-bold leading-relaxed">{t(item.d, item.d)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Agent Architectures */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("Agent Types", "ایجنٹ کی اقسام")}</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { t: "Simple Reflex Agent", d: "Selects actions only on the basis of the current percept. Works only if the environment is fully observable.", icon: <Zap size={16} />, color: 'text-yellow-600' },
                                { t: "Model-Based Agent", d: "Keeps track of the part of the world it can't see now. It maintains an internal state.", icon: <Database size={16} />, color: 'text-blue-600' },
                                { t: "Goal-Based Agent", d: "Uses goal information to describe desirable situations. It considers the future (Search & Planning).", icon: <Target size={16} />, color: 'text-red-600' },
                                { t: "Utility-Based Agent", d: "Uses a utility function to measure the 'happiness' of a state. High utility = better performance.", icon: <TrendingUp size={16} />, color: 'text-emerald-600' },
                                { t: "Learning Agent", d: "Consists of: Learning Element, Performance Element, Critic, and Problem Generator.", icon: <Brain size={16} />, color: 'text-purple-600' },
                            ].map((agent, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:translate-x-2 transition-transform">
                                    <div className={`${agent.color} p-2 bg-gray-50 rounded-xl`}>
                                        {agent.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-black text-xs text-gray-900">{t(agent.t, agent.t)}</h5>
                                        <p className="text-[10px] text-gray-500 font-medium">{t(agent.d, agent.d)}</p>
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Teachable Machine Highlight */}
                    <div className="p-6 bg-linear-to-br from-purple-50 to-white rounded-[32px] border border-purple-100 shadow-inner relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
                            <Cpu size={120} className="text-purple-600" />
                        </div>
                        <div className="relative z-10 space-y-3">
                            <div className="inline-flex px-3 py-1 bg-purple-600 text-white rounded-full text-[8px] font-black uppercase tracking-widest leading-none items-center gap-2">
                                <Activity size={10} />
                                {t("Practical Lab", "عملی لیب")}
                            </div>
                            <h4 className="font-black text-gray-900 text-xl tracking-tight">{t("Teachable Machines", "سیکھنے والی مشینیں")}</h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium pr-12">
                                {t("Web-based tool that makes creating machine learning models fast, easy, and accessible to everyone. Train a computer to recognize your own images, sounds, & poses.", "ویب پر مبنی ٹول جو مشین لرننگ ماڈلز بنانا تیز، آسان اور ہر کسی کے لیے قابل رسائی بناتا ہے۔")}
                            </p>
                            <button className="flex items-center gap-2 text-purple-600 font-black text-xs hover:gap-3 transition-all mt-4">
                                {t("Launch Lab Tutorial", "لیب ٹیوٹوریل دیکھیں")}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 2 */}
            <WeekCard
                week={2}
                title="Problem Solving via Search"
                titleUr="تلاش کے ذریعے مسائل کا حل"
                isExpanded={expandedWeek === 2}
                onToggle={() => setExpandedWeek(expandedWeek === 2 ? 0 : 2)}
            >
                <div className="space-y-8">
                    <SearchVisualizer />

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                            <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("Formulating Problems", "مسائل کی تشکیل")}</h4>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            {t("Before an agent can search, it must define the problem precisely. This involves abstraction—removing unnecessary details from the real world.", "تلاش شروع کرنے سے پہلے ایجنٹ کو مسئلہ کی درست وضاحت کرنی چاہیے۔")}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { t: "Initial State", d: "The state the agent starts in." },
                                { t: "Actions(s)", d: "The set of actions the agent can perform." },
                                { t: "Transition Model", d: "What each action does (Result)." },
                                { t: "Goal Test", d: "Determines if a state is a goal state." },
                                { t: "Path Cost", d: "Cost of the path from start to node." },
                                { t: "Solution", d: "A sequence of actions leading to goal." },
                            ].map((item, i) => (
                                <div key={i} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                                    <h5 className="font-black text-[10px] text-indigo-900 uppercase tracking-tighter">{t(item.t, item.t)}</h5>
                                    <p className="text-[9px] text-indigo-700 font-bold">{t(item.d, item.d)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600">
                            <Box size={18} />
                            <h4 className="font-black text-gray-900 text-sm">{t("Uninformed Search Strategies", "بغیر معلومات کے تلاش")}</h4>
                        </div>
                        <p className="text-[10px] text-gray-500 italic px-2">
                            {t("These algorithms have no additional information about states beyond the problem definition.", "ان الگورتھم کے پاس مسئلہ کی تعریف کے علاوہ کوئی اور معلومات نہیں ہوتی۔")}
                        </p>
                        <div className="space-y-3">
                            {[
                                { n: "Breadth-First Search (BFS)", f: "First-In-First-Out (Queue)", d: "Explores neighbors first. Finds shortest path in terms of number of steps. Complete & Optimal." },
                                { n: "Depth-First Search (DFS)", f: "Last-In-First-Out (Stack)", d: "Goes deep into one branch. Low memory but might never find goal in infinite space." },
                                { n: "Uniform-Cost Search (UCS)", f: "Priority Queue (by g(n))", d: "Expands the cheapest node first. Optimal for any step costs." },
                            ].map(s => (
                                <div key={s.n} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-indigo-200 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-black text-xs text-indigo-600">{t(s.n, s.n)}</span>
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{t(s.f, s.f)}</span>
                                    </div>
                                    <p className="text-[9px] text-gray-500 font-medium leading-relaxed">{t(s.d, s.d)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 bg-gray-900 rounded-[32px] shadow-xl space-y-4 text-white">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <Zap size={18} />
                            <h4 className="font-black text-xl tracking-tight">{t("Informed (Heuristic) Search", "معلوماتی تلاش")}</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-black text-sm text-emerald-400">A* Search</span>
                                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-mono">f(n) = g(n) + h(n)</span>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                                    {t("The most famous search algorithm. g(n) is the actual cost so far, h(n) is the estimated cost to goal. If h(n) is admissible (never overestimates), A* is optimal.", "سب سے مشہور سرچ الگورتھم۔ اگر h(n) قابل قبول ہے، تو A* بہترین ہے۔")}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <h5 className="font-black text-[10px] text-emerald-400 mb-1">{t("Greedy Best-First", "لالچی تلاش")}</h5>
                                    <p className="text-[9px] text-gray-500">{t("Minimizes h(n). It can get stuck in loops but is often faster than A*.", "صرف h(n) کو کم سے کم کرنے کی کوشش کرتا ہے۔")}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <h5 className="font-black text-[10px] text-emerald-400 mb-1">{t("Bi-directional", "دو طرفہ")}</h5>
                                    <p className="text-[9px] text-gray-500">{t("Searches from start and goal simultaneously to meet in middle.", "شروع اور اختتام سے ایک ساتھ تلاش کرتا ہے۔")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="What makes a good Heuristic?"
                        content="An admissible heuristic never overestimates the cost. For the 8-puzzle, 'Manhattan Distance' is better than 'Misplaced Tiles' because it is more informed."
                        icon={Lightbulb}
                    />

                    {/* 8-Puzzle Problem */}
                    <div className="p-6 bg-amber-50 rounded-[32px] border border-amber-100 flex gap-6 items-center">
                        <div className="w-20 h-20 shrink-0 grid grid-cols-3 gap-1 bg-amber-200 p-1 rounded-xl shadow-inner">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 0].map((n, i) => (
                                <div key={i} className={`rounded ${n === 0 ? 'bg-transparent' : 'bg-white shadow-sm flex items-center justify-center font-black text-[8px]'}`}>
                                    {n !== 0 && n}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-black text-amber-900 text-sm italic underline">{t("Problem Focus: The 8-Puzzle", "8-پزل مسئلہ")}</h4>
                            <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                                {t("State: Location of 8 tiles. Action: Move blank tile Up, Down, Left, Right. Heuristic Concept: Help the agent choose the move that 'looks' closest to goal.", "8 ٹائلوں کی پوزیشن۔ ہیورسٹک ایجنٹ کو بہترین فیصلہ کرنے میں مدد دیتی ہے۔")}
                            </p>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 3 */}
            <WeekCard
                week={3}
                title="Learning from Data: ML Intro"
                titleUr="مشین لرننگ کا تعارف"
                isExpanded={expandedWeek === 3}
                onToggle={() => setExpandedWeek(expandedWeek === 3 ? 0 : 3)}
            >
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
                        <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("What is Machine Learning?", "مشین لرننگ کیا ہے؟")}</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                        {t("Field of study that gives computers the ability to learn without being explicitly programmed. It uses statistical techniques to give computer systems the ability to 'learn' from data.", "مطالعہ کا وہ میدان جو کمپیوٹرز کو واضح طور پر پروگرام کیے بغیر سیکھنے کی صلاحیت دیتا ہے۔")}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-5 rounded-[32px] border border-blue-100 space-y-2">
                            <TrendingUp size={24} className="text-blue-600" />
                            <h5 className="font-black text-xs text-blue-900">{t("Regression", "ریگریشن")}</h5>
                            <p className="text-[9px] text-blue-700 leading-relaxed">{t("Goal is to predict a continuous value. Example: Predicting temperature or stock prices based on historical trends.", "مقصد ایک مسلسل ویلیو کی پیشن گوئی کرنا ہے۔")}</p>
                        </div>
                        <div className="bg-orange-50 p-5 rounded-[32px] border border-orange-100 space-y-2">
                            <Microscope size={24} className="text-orange-600" />
                            <h5 className="font-black text-xs text-orange-900">{t("Correlation", "باہمی ربط")}</h5>
                            <p className="text-[9px] text-orange-700 leading-relaxed">{t("A statistical measure (r) that expresses the extent to which two variables are linearly related. Ranges from -1 to +1.", "ایک شماریاتی پیمائش جو دو متغیرات کے تعلق کو ظاہر کرتی ہے۔")}</p>
                        </div>
                    </div>

                    {/* ML Paradigms */}
                    <div className="p-6 bg-white border-2 border-purple-50 rounded-[40px] shadow-sm space-y-4">
                        <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                            <Layers size={18} className="text-purple-600" />
                            {t("The Three Pillars of ML", "ایم ایل کے تین ستون")}
                        </h4>
                        <div className="space-y-3">
                            {[
                                { t: "Supervised Learning", d: "Model is trained on labeled data. Like learning with a teacher. Examples: Classification, Regression." },
                                { t: "Unsupervised Learning", d: "Model finds hidden patterns in unlabeled data. Like learning by discovering. Example: Clustering (K-Means)." },
                                { t: "Reinforcement Learning", d: "Model learns from consequences of actions through rewards and penalties. Like training a dog." },
                            ].map(type => (
                                <div key={type.t} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                                    <div>
                                        <h6 className="font-black text-[10px] text-gray-900 uppercase">{t(type.t, type.t)}</h6>
                                        <p className="text-[9px] text-gray-500 font-medium leading-normal">{t(type.d, type.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="Dataset Terminology"
                        content="Features are independent variables (X), Labels are the target dependent variables (Y). A model essentially maps X -> Y using patterns found in the history."
                        icon={Activity}
                    />

                    {/* Dataset Repositories */}
                    <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-4">
                        <div className="flex items-center gap-2">
                            <Database size={18} className="text-purple-400" />
                            <h4 className="font-black text-sm uppercase tracking-widest">{t("Where to get Datasets?", "ڈیٹا سیٹ کہاں سے حاصل کریں؟")}</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { n: "Kaggle", d: "Data science competitions & massive hub." },
                                { n: "UCI Repository", d: "Legacy datasets for benchmarking." },
                                { n: "datasetsearch.google", d: "Google's search for data." },
                                { n: "OpenML", d: "Machine Learning sharing platform." },
                            ].map(tag => (
                                <div key={tag.n} className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <h6 className="text-[10px] font-black text-purple-400">{tag.n}</h6>
                                    <p className="text-[8px] text-gray-500">{t(tag.d, tag.d)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 4 */}
            <WeekCard
                week={4}
                title="Supervised Learning: KNN & LogReg"
                titleUr="کے این این اور لاجسٹک ریگریشن"
                isExpanded={expandedWeek === 4}
                onToggle={() => setExpandedWeek(expandedWeek === 4 ? 0 : 4)}
            >
                <div className="space-y-8">
                    {/* KNN Section */}
                    <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-blue-600">
                            <Users size={22} />
                            <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("K-Nearest Neighbors (KNN)", "کے-قریبی پڑوسی")}</h4>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                            {t("KNN is a non-parametric, lazy learning algorithm. It classifies a data point based on how its neighbors are classified. It 'memorizes' the training dataset instead of learning a discriminative function.", "KNN ایک ایسا الگورتھم ہے جو ڈیٹا پوائنٹ کی درجہ بندی اس کے پڑوسیوں کی بنیاد پر کرتا ہے۔")}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { t: "The 'K' Factor", d: "Choosing K is critical. Small K = sensitive to noise (overfitting). Large K = smoother boundaries (underfitting)." },
                                { t: "Distance Metrics", d: "Euclidean is standard. Manhattan or Minkowski are used depending on data dimensions." },
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                    <h5 className="font-black text-[10px] text-blue-900 uppercase tracking-tighter">{t(item.t, item.t)}</h5>
                                    <p className="text-[9px] text-blue-700 font-bold">{t(item.d, item.d)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logistic Regression */}
                    <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-6">
                        <div className="flex items-center gap-3 text-emerald-400">
                            <Zap size={22} />
                            <h4 className="font-black text-lg tracking-tight">{t("Logistic Regression", "لاجسٹک ریگریشن")}</h4>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                            {t("Despite its name, it's for Classification. It predicts the probability that an instance belongs to a particular class using the Sigmoid Function.", "اپنے نام کے باوجود، یہ درجہ بندی کے لیے ہے۔ یہ سگموئیڈ فنکشن کا استعمال کرتے ہوئے کلاس کی موجودگی کے امکان کا اندازہ لگاتا ہے۔")}
                        </p>

                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t("The Sigmoid Curve", "سگموئیڈ منحنی")}</span>
                                <span className="font-mono text-[10px] text-gray-500">f(x) = 1 / (1 + e^-x)</span>
                            </div>
                            <div className="h-24 flex items-end gap-1 px-2">
                                {[0.1, 0.2, 0.4, 0.7, 0.9, 0.95, 0.98, 0.99, 1.0].map((v, i) => (
                                    <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm relative group" style={{ height: `${v * 100}%` }}>
                                        <div className="absolute inset-0 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[9px] text-gray-500 text-center italic">{t("Maps any real value into a range between 0 and 1.", "کسی بھی حقیقی ویلیو کو 0 اور 1 کے درمیان رینج میں نقش کرتا ہے۔")}</p>
                        </div>
                    </div>

                    <LectureNote
                        title="Decision Boundary"
                        content="In Logistic Regression, we choose a threshold (usually 0.5). If probability > 0.5, we classify as Class A, else Class B. This creates a linear decision boundary."
                        icon={Target}
                    />
                </div>
            </WeekCard>

            {/* Week 5 */}
            <WeekCard
                week={5}
                title="Unsupervised: K-Means Clustering"
                titleUr="کے-مینز کلسٹرنگ"
                isExpanded={expandedWeek === 5}
                onToggle={() => setExpandedWeek(expandedWeek === 5 ? 0 : 5)}
            >
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                        <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("What is Clustering?", "کلسٹرنگ کیا ہے؟")}</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                        {t("Clustering is the process of dividing the entire data into groups (known as clusters) based on the patterns in the data. In Unsupervised learning, we don't have labels—the machine must find groups itself.", "کلسٹرنگ ڈیٹا کو گروپس میں تقسیم کرنے کا عمل ہے۔")}
                    </p>

                    {/* K-Means Steps */}
                    <div className="space-y-4">
                        <h5 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em] px-2">{t("The K-Means Process", "کے-مین کا عمل")}</h5>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                { t: "Initialization", d: "Choose 'K' random points as initial centroids." },
                                { t: "Assignment", d: "Assign each data point to the nearest centroid." },
                                { t: "Update", d: "Recalculate the mean of each cluster to get new centroids." },
                                { t: "Repeat", d: "Repeat Assignment and Update until centroids no longer move." },
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-emerald-600 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-xs text-emerald-600 group-hover:bg-white group-hover:text-emerald-900 shadow-sm">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="font-black text-[10px] text-gray-900 uppercase group-hover:text-white">{t(step.t, step.t)}</h6>
                                        <p className="text-[9px] text-gray-500 font-medium group-hover:text-emerald-100 leading-tight">{t(step.d, step.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-white border border-gray-100 rounded-[40px] shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-black text-gray-900 text-sm tracking-tight">{t("The Elbow Method", "ایلبو میتھڈ")}</h4>
                            <BarChart3 className="text-emerald-500" size={20} />
                        </div>
                        <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                            {t("How do we know how many clusters (K) to use? We plot the WCSS (Within-Cluster Sum of Squares) against K. The point where the 'elbow' occurs is often the optimal K.", "ہمیں کیسے معلوم ہوگا کہ کتنے کلسٹرز استعمال کرنے ہیں؟")}
                        </p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '40%' }}
                                className="h-full bg-emerald-500"
                            />
                        </div>
                    </div>

                    <LectureNote
                        title="Clustering Applications"
                        content="Used in Market Segmentation (grouping customers by habits), Document Clustering, and Image Compression (reducing colors by clustering pixels)."
                        icon={Briefcase}
                    />
                </div>
            </WeekCard>

            {/* Week 6 */}
            <WeekCard
                week={6}
                title="Naive Bayes & Decision Trees"
                titleUr="نیو بیز اور ڈیسیشن ٹری"
                isExpanded={expandedWeek === 6}
                onToggle={() => setExpandedWeek(expandedWeek === 6 ? 0 : 6)}
            >
                <div className="space-y-6">
                    <div className="p-5 bg-emerald-50 rounded-[32px] border border-emerald-100 space-y-4">
                        <div className="flex items-center gap-2 text-emerald-700">
                            <Binary size={20} />
                            <h4 className="font-black text-sm">{t("Naive Bayes", "نیو بیز")}</h4>
                        </div>
                        <div className="p-3 bg-white rounded-2xl border border-emerald-100 text-center font-mono text-[10px] font-black text-emerald-600">
                            P(A|B) = [P(B|A) * P(A)] / P(B)
                        </div>
                        <p className="text-[10px] text-emerald-900/70 leading-relaxed font-medium italic text-center">
                            {t("'Naive' because it assumes features are independent. It works exceptionally well for Spam Filtering and Sentiment Analysis.", "اسے 'نیو' کہا جاتا ہے کیونکہ یہ تسلیم کرتا ہے کہ تمام خصوصیات آزاد ہیں۔")}
                        </p>
                    </div>

                    <div className="p-5 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600">
                            <Network size={20} />
                            <h4 className="font-black text-gray-900 text-sm tracking-tight">{t("Decision Trees", "ڈیسیشن ٹری")}</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { t: "Root Node", d: "The top-most decision node based on the best feature (highest info gain)." },
                                { t: "Entropy", d: "Measure of randomness or impurity. High entropy = messy data." },
                                { t: "Information Gain", d: "The decrease in entropy after a dataset is split on an attribute." },
                            ].map(item => (
                                <div key={item.t} className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                                    <div>
                                        <h5 className="font-black text-[10px] text-gray-900 uppercase">{t(item.t, item.t)}</h5>
                                        <p className="text-[9px] text-gray-500 font-medium">{t(item.d, item.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-[32px] border border-yellow-100 flex items-center gap-3">
                        <Award className="text-yellow-600 shrink-0" size={24} />
                        <div>
                            <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest">{t("TEST 1 - COVERED", "ٹیسٹ 1 - مکمل")}</p>
                            <p className="text-[9px] text-yellow-700 font-medium">{t("Covers Search, Intro ML, KNN, K-Means, and Trees. Be prepared for conceptual questions!", "تلاش، مشین لرننگ کا تعارف اور کلسٹرنگ شامل ہے۔")}</p>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 7, 9: Neural Networks */}
            {/* Week 7 */}
            <WeekCard
                week={7}
                title="Neural Networks: Single Layer Perceptron"
                titleUr="سنگل لیئر پرسیپٹران"
                isExpanded={expandedWeek === 7}
                onToggle={() => setExpandedWeek(expandedWeek === 7 ? 0 : 7)}
            >
                <div className="space-y-8">
                    <NeuronVisualizer />
                    <div className="p-8 bg-purple-50 border border-purple-100 rounded-[40px] space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-600 text-white rounded-[20px] shadow-lg shadow-purple-200">
                                <Cpu size={24} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-black text-gray-900 text-lg tracking-tight">{t("The Biological Inspiration", "حیاتیاتی تحریک")}</h4>
                                <p className="text-[11px] text-purple-800 leading-relaxed font-medium">
                                    {t("Inspired by the human neuron, a Perceptron is the fundamental building block of ANN. It takes multiple inputs, applies weights, and passes the sum through an activation function.", "انسانی نیورون سے متاثر، پرسیپٹران ANN کی بنیادی اکائی ہے۔")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-400 uppercase tracking-widest">{t("Activation Functions", "ایکٹیویشن فنکشنز")}</h5>
                            <div className="space-y-3">
                                {[
                                    { t: "Step Function", d: "Outputs 0 or 1 based on threshold. Binary decisions." },
                                    { t: "Sigmoid", d: "Maps input to (0, 1). Smoother gradient than Step." },
                                    { t: "ReLU", d: "Outputs zero for negative input, x for positive. Fast learning." },
                                ].map(fn => (
                                    <div key={fn.t} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                                        <div>
                                            <h6 className="font-black text-[10px] text-gray-900">{t(fn.t, fn.t)}</h6>
                                            <p className="text-[9px] text-gray-500 font-medium">{t(fn.d, fn.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-6">
                            <h5 className="font-black text-xs text-purple-400 uppercase tracking-widest">{t("The Learning Goal", "سیکھنے کا ہدف")}</h5>
                            <p className="text-[10px] text-gray-400 font-medium">
                                {t("The goal of a perceptron is to find a weight vector 'W' that correctly separates all training examples.", "ہدف ایک ایسا وزن 'W' تلاش کرنا ہے جو تمام مثالوں کو صحیح طور پر الگ کرے۔")}
                            </p>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-[10px] text-center">
                                <span className="text-purple-300">Sum = Σ (Weights * Inputs) + Bias</span>
                                <br />
                                <span className="text-emerald-400">Output = Activation(Sum)</span>
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="Linear Separability"
                        content="SLPs can only handle 'Linearly Separable' datasets. This means a single straight line can divide the classes. For non-linear sets (like XOR), we need more layers."
                        icon={Layers}
                    />
                </div>
            </WeekCard>

            {/* Week 8 */}
            <WeekCard
                week={8}
                title="Mid Term Examination"
                titleUr="وسط مدتی امتحان"
                isExpanded={expandedWeek === 8}
                onToggle={() => setExpandedWeek(expandedWeek === 8 ? 0 : 8)}
            >
                <div className="space-y-8">
                    <div className="p-10 bg-linear-to-br from-purple-900 to-indigo-950 border border-white/10 rounded-[48px] text-center space-y-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Binary size={160} className="text-white" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <Award size={64} className="mx-auto text-yellow-400 drop-shadow-lg" />
                            <h4 className="font-black text-white text-3xl uppercase tracking-tighter italic">{t("Checkpoint Alpha", "چیک پوائنٹ الفا")}</h4>
                            <p className="text-xs text-indigo-200/70 font-medium max-w-sm mx-auto">
                                {t("The Midterm Exam covers the foundations of Search, Classical ML, and the transition into Deep Learning.", "مڈ ٹرم امتحان سرچ، کلاسیکی ایم ایل اور ڈیپ لرننگ کی بنیادوں پر محیط ہے۔")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
                            {[
                                { l: "Foundations", w: "20%", c: "bg-purple-600" },
                                { l: "Search", w: "30%", c: "bg-indigo-600" },
                                { l: "Classifiers", w: "25%", c: "bg-emerald-600" },
                                { l: "Regression", w: "25%", c: "bg-blue-600" },
                            ].map(item => (
                                <div key={item.l} className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                                    <h6 className="text-[10px] font-black text-gray-400 mb-2 uppercase">{t(item.l, item.l)}</h6>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.c}`} style={{ width: item.w }} />
                                    </div>
                                    <p className="text-[9px] font-black text-white mt-1">{item.w}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm space-y-6">
                        <h5 className="font-black text-gray-900 text-sm tracking-tight flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            {t("Mastery Checklist", "مہارت کی فہرست")}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {[
                                "BFS/DFS Search Space Complexity",
                                "A* Heuristic Admissibility",
                                "Linear vs Logistic Regression",
                                "Decision Tree Impurity Metrics",
                                "Naive Bayes Probability Theory",
                                "SLP Weight Update Rule"
                            ].map(check => (
                                <div key={check} className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-purple-200 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:scale-150 transition-transform" />
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{t(check, check)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="Study Tip"
                        content="Focus on the Search algorithms (Week 2). They always carry the highest weightage in technical interviews and exams. Practice drawing the search tree for 8-puzzle!"
                        icon={Brain}
                    />
                </div>
            </WeekCard>

            {/* Week 9 */}
            <WeekCard
                week={9}
                title="Neural Networks: Back Propagation (MLP)"
                titleUr="بیک پروپیگیشن (ایم ایل پی)"
                isExpanded={expandedWeek === 9}
                onToggle={() => setExpandedWeek(expandedWeek === 9 ? 0 : 9)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-linear-to-br from-indigo-900 to-indigo-950 rounded-[48px] text-white relative overflow-hidden shadow-2xl group">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <Zap size={32} className="text-indigo-400" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-black tracking-tight">{t("Multi-Layer Perceptron", "ملٹی لیئر پرسیپٹران")}</h4>
                                <p className="text-[11px] text-indigo-300 font-medium">{t("The Foundation of Modern Deep Learning", "جدید ڈیپ لرننگ کی بنیاد")}</p>
                            </div>
                        </div>
                        <p className="text-xs text-indigo-100/70 leading-relaxed font-medium mb-6">
                            {t("Complexity is solved by 'Hidden Layers'. By stacking layers and using backpropagation, we can approximate ANY continuous function (Universal Approximation Theorem).", "پیچیدگی کو 'پوشیدہ تہوں' کے ذریعے حل کیا جاتا ہے۔")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Learning via Backprop", "بیک پروپیگیشن کے ذریعے سیکھنا")}</h5>
                            <div className="space-y-2">
                                {[
                                    { s: "Loss Function", d: "Measures error (e.g., Mean Squared Error)." },
                                    { s: "Chain Rule", d: "Calculates the derivative of loss w.r.t weights." },
                                    { s: "Gradient Descent", d: "Updates weights in the direction that minimizes loss." },
                                ].map((item, i) => (
                                    <div key={i} className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex gap-4">
                                        <div className="font-black text-indigo-600 text-xs">{i + 1}</div>
                                        <div>
                                            <h6 className="font-black text-[10px] text-indigo-900 uppercase">{t(item.s, item.s)}</h6>
                                            <p className="text-[9px] text-indigo-700/70 font-medium">{t(item.d, item.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-[32px] space-y-4">
                            <h5 className="font-black text-xs text-gray-400 uppercase tracking-widest">{t("Why Multi-Layer?", "ملٹی لیئر کیوں؟")}</h5>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                {t("Input features are transformed through hidden units to create higher-level abstractions. This allows solving XOR and complex visual patterns.", "ان پٹ خصوصیات کو اعصابی اکائیوں کے ذریعے تبدیل کیا جاتا ہے۔")}
                            </p>
                            <div className="flex gap-2">
                                {['Hidden Layers', 'Non-Linearity', 'Chain Rule'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white rounded-full border border-gray-200 text-[8px] font-black text-gray-400 uppercase tracking-tighter shadow-sm">{t(tag, tag)}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="Hyperparameters"
                        content="Learning Rate (η), Number of Epochs, Hidden Units, and Activation Functions (ReLU vs Sigmoid) are all hyperparameters YOU must tune to make the MLP work!"
                        icon={Target}
                    />
                </div>
            </WeekCard>

            {/* Week 10 */}
            <WeekCard
                week={10}
                title="Pattern Mining: Apriori & Association"
                titleUr="ایپریوری اور ایسوسی ایشن"
                isExpanded={expandedWeek === 10}
                onToggle={() => setExpandedWeek(expandedWeek === 10 ? 0 : 10)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Box size={120} className="text-orange-950" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-200">
                                <Box size={24} />
                            </div>
                            <h4 className="font-black text-gray-900 text-xl tracking-tight">{t("Market Basket Analysis", "مارکیٹ باسکٹ تجزیہ")}</h4>
                        </div>
                        <p className="text-[12px] text-gray-600 leading-relaxed font-medium max-w-xl">
                            {t("Finding hidden relationships between items in a large data set. If a customer buys Bread and Butter, how likely are they to buy Milk? This is Association Rule Mining.", "ڈیٹا سیٹ میں اشیاء کے درمیان چھپے ہوئے تعلقات کو تلاش کرنا۔")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { l: "Support", d: "How popular an itemset is (Freq / Total Trans)." },
                            { l: "Confidence", d: "How likely Y is bought if X is bought (P(Y|X))." },
                            { l: "Lift", d: "Reliability of the rule. Lift > 1 = Strong relationship." },
                            { l: "Conviction", d: "Ratio of the expected frequency X occurs without Y." },
                        ].map((metric, i) => (
                            <div key={i} className="p-5 bg-orange-50 border border-orange-100 rounded-[28px] space-y-2">
                                <h5 className="font-black text-[9px] text-orange-900 uppercase tracking-widest">{metric.l}</h5>
                                <p className="text-[9px] text-orange-800/70 font-bold leading-tight">{t(metric.d, metric.d)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gray-900 rounded-[40px] text-white space-y-4">
                        <h4 className="font-black text-orange-400 text-xs uppercase tracking-[0.2em]">{t("The Apriori Algorithm", "ایپریوری الگورتھم")}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h6 className="text-[11px] font-black text-gray-400">{t("1. Candidate Generation", "1. امیدوار کی نسل")}</h6>
                                <p className="text-[10px] text-gray-500">{t("Create larger itemsets from frequent smaller ones.", "چھوٹے آئٹم سیٹس سے بڑے آئٹم سیٹس بنانا۔")}</p>
                            </div>
                            <div className="space-y-2 text-right">
                                <h6 className="text-[11px] font-black text-gray-400">{t("2. Pruning", "2. چھانٹنا")}</h6>
                                <p className="text-[10px] text-gray-500">{t("If a subset is infrequent, DISCARD the superset immediately.", "اگر کوئی ذیلی سیٹ غیر معمولی ہے تو اسے ضائع کر دیں۔")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 11 */}
            <WeekCard
                week={11}
                title="Nature Inspired Optimization"
                titleUr="فطرت سے متاثر اصلاح"
                isExpanded={expandedWeek === 11}
                onToggle={() => setExpandedWeek(expandedWeek === 11 ? 0 : 11)}
            >
                <div className="space-y-8">
                    <div className="p-10 bg-emerald-950 rounded-[50px] text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-10">
                            <div className="space-y-4 max-w-sm">
                                <h4 className="text-3xl font-black">{t("Evolutionary Logic", "ارتقائی منطق")}</h4>
                                <p className="text-xs text-emerald-100/60 leading-relaxed font-medium">
                                    {t("Algorithms like Genetic Algorithms (GA) and Swarm Intelligence model biological processes to find the OPTIMAL solution in huge search spaces where traditional math fails.", "ارتقائی الگورتھم حیاتیاتی عمل کی نقل کرتے ہیں۔")}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 flex-1">
                                {[
                                    { t: "Crossover", icon: <Network size={16} /> },
                                    { t: "Mutation", icon: <Activity size={16} /> },
                                    { t: "Selection", icon: <Target size={16} /> },
                                    { t: "Fitness", icon: <Trophy size={16} /> },
                                ].map(item => (
                                    <div key={item.t} className="p-4 bg-white/5 rounded-3xl border border-white/10 text-center">
                                        <div className="text-emerald-400 mb-2 flex justify-center">{item.icon}</div>
                                        <h6 className="font-black text-[10px] uppercase tracking-tighter">{t(item.t, item.t)}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-100 rounded-[40px] space-y-6">
                        <div className="flex items-center gap-3">
                            <Activity className="text-emerald-600" />
                            <h5 className="font-black text-gray-900 text-sm tracking-tight">{t("Genetic Algorithm Cycle", "جیناتی الگورتھم سائیکل")}</h5>
                        </div>
                        <div className="space-y-4">
                            {[
                                { s: "Population", d: "Start with a random set of possible solutions (Individuals)." },
                                { s: "Evaluation", d: "Use 'Fitness Function' to see how well each solution solves the problem." },
                                { s: "Mating Pool", d: "Select the best 'parents' based on their fitness scores." },
                                { s: "Reproduction", d: "Crossover (combine) and Mutation (random change) to create next Gen." },
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 mt-2 transition-transform group-hover:scale-150" />
                                    <div>
                                        <h6 className="font-black text-[11px] text-emerald-900 uppercase">{t(step.s, step.s)}</h6>
                                        <p className="text-[10px] text-gray-500 font-medium">{t(step.d, step.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="Swarm Intelligence"
                        content="Ant Colony Optimization and Particle Swarm Optimization are based on COLLECTIVE intelligence. No single agent knows everything, but the group finds the shortest path or optimal peak!"
                        icon={Users}
                    />
                </div>
            </WeekCard>

            {/* Week 12 */}
            <WeekCard
                week={12}
                title="Deep Learning: CNNs & Computer Vision"
                titleUr="کمپیوٹر ویژن اور سی این این"
                isExpanded={expandedWeek === 12}
                onToggle={() => setExpandedWeek(expandedWeek === 12 ? 0 : 12)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-linear-to-br from-indigo-700 to-indigo-900 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute -right-4 -top-4 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-4">
                            <Image size={32} className="text-indigo-300" />
                            {t("How AI Sees the World", "مصنوعی ذہانت دنیا کو کیسے دیکھتی ہے")}
                        </h4>
                        <p className="text-xs text-indigo-100/70 leading-relaxed font-medium mb-8 max-w-xl">
                            {t("Convolutional Neural Networks (CNN) mimic the human visual cortex. Instead of looking at pixels individually, they look at 'receptive fields' to find edges, textures, and eventually complex objects.", "سی این این انسانی بصری نظام کی نقل کرتے ہیں۔")}
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['Kernel', 'Stride', 'Padding', 'Feature Map', 'Activation'].map(term => (
                                <span key={term} className="px-4 py-2 bg-white/10 rounded-2xl border border-white/10 text-[9px] font-black uppercase whitespace-nowrap">{t(term, term)}</span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("CNN Core Layers", "سی این این کی بنیادی تہیں")}</h5>
                            <div className="space-y-4">
                                {[
                                    { l: "Convolution", d: "Extracts features using multiple filters (Kernels)." },
                                    { l: "Pooling", d: "Downsamples data (Max/Avg) to reduce complexity." },
                                    { l: "Flattening", d: "Converts 2D maps into 1D vector for classification." },
                                ].map(layer => (
                                    <div key={layer.l} className="flex gap-4">
                                        <div className="w-1 h-8 bg-indigo-100 rounded-full" />
                                        <div>
                                            <h6 className="font-black text-[10px] text-indigo-900 uppercase">{t(layer.l, layer.l)}</h6>
                                            <p className="text-[9px] text-gray-500 font-medium">{t(layer.d, layer.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-[32px] space-y-6">
                            <h5 className="font-black text-xs text-gray-400 uppercase tracking-widest">{t("Receptive Fields", "وصولی میدان")}</h5>
                            <div className="aspect-video bg-white rounded-2xl border border-gray-200 p-4 relative flex items-center justify-center">
                                <div className="grid grid-cols-4 gap-1 opacity-20">
                                    {[...Array(16)].map((_, i) => <div key={i} className="w-4 h-4 bg-indigo-900 rounded-sm" />)}
                                </div>
                                <div className="absolute w-8 h-8 bg-indigo-600 rounded-sm shadow-xl flex items-center justify-center animate-pulse">
                                    <Search size={16} className="text-white" />
                                </div>
                            </div>
                            <p className="text-[9px] text-gray-500 text-center font-bold uppercase tracking-tighter">
                                {t("The Filter 'Slides' Over Data", "فلٹر ڈیٹا پر سلائیڈ کرتا ہے")}
                            </p>
                        </div>
                    </div>

                    <LectureNote
                        title="Translation Invariance"
                        content="CNNs are powerful because they can recognize features regardless of position. A 'car filter' will fire whether the car is in the top-left or bottom-right of the image."
                        icon={Target}
                    />
                </div>
            </WeekCard>

            {/* Week 13 */}
            <WeekCard
                week={13}
                title="Deep Learning: RNNs & Sequence Processing"
                titleUr="آر این این اور سلسلہ وار پروسیسنگ"
                isExpanded={expandedWeek === 13}
                onToggle={() => setExpandedWeek(expandedWeek === 13 ? 0 : 13)}
            >
                <div className="space-y-8">
                    <div className="p-10 bg-gray-900 rounded-[50px] text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mb-32 -mr-32 group-hover:bg-purple-500/20 transition-colors" />
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <MessageSquare size={32} className="text-purple-400" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-black tracking-tight">{t("Sequence Intelligence", "سلسلہ وار ذہانت")}</h4>
                                <p className="text-[11px] text-gray-400 font-medium">{t("Language, Time Series, and Beyond", "زبان، ٹائم سیریز اور اس سے آگے")}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium mb-8 max-w-xl">
                            {t("Standard Neural Networks assume inputs are independent. Recurrent Neural Networks (RNN) have MEMORY. They process each element of a sequence while keeping an internal state (hidden state).", "آر این این میں یادداشت ہوتی ہے۔")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-purple-50 border border-purple-100 rounded-[32px] space-y-4">
                            <h5 className="font-black text-xs text-purple-900 uppercase tracking-widest">{t("The Feedback Loop", "فیڈ بیک لوپ")}</h5>
                            <p className="text-[10px] text-purple-800/70 font-medium leading-relaxed">
                                {t("Unlike Feed-Forward networks, RNNs pass information back to themselves. This loop allows information to persist.", "فیڈ بیک لوپ معلومات کو برقرار رکھنے کی اجازت دیتا ہے۔")}
                            </p>
                            <div className="p-4 bg-white rounded-2xl border border-purple-100 flex justify-center items-center gap-8">
                                <div className="p-2 border border-purple-200 rounded-lg text-[9px] font-black uppercase">Input</div>
                                <ArrowRight className="text-purple-400" />
                                <div className="p-4 bg-purple-600 text-white rounded-xl shadow-lg relative">
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 border-t border-r border-purple-600 rotate-[-135deg]" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase">RNN Cell</span>
                                </div>
                                <ArrowRight className="text-purple-400" />
                                <div className="p-2 border border-purple-200 rounded-lg text-[9px] font-black uppercase">Output</div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Long-Term Memory", "طویل مدتی یادداشت")}</h5>
                            <p className="text-[10px] text-gray-500 font-medium">
                                {t("Standard RNNs suffer from 'Vanishing Gradients'. To fix this, we use LSTMs (Long Short-Term Memory).", "معیاری RNNs 'غائب ہونے والے گریڈینٹس' کا شکار ہوتے ہیں۔")}
                            </p>
                            <div className="space-y-2">
                                {[
                                    { t: "Forget Gate", d: "Decides what info to discard." },
                                    { t: "Input Gate", d: "Decides what new info to store." },
                                    { t: "Output Gate", d: "Decides what the final output should be." },
                                ].map(gate => (
                                    <div key={gate.t} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
                                        <span className="text-[9px] font-black text-gray-700 uppercase">{t(gate.t, gate.t)}</span>
                                        <span className="text-[8px] text-gray-400 italic">{t(gate.d, gate.d)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="Applications"
                        content="Machine Translation (English -> Urdu), Sentiment Analysis, Speech Recognition (Alexa/Siri), and Stock Market Prediction are all powered by RNN architectures."
                        icon={Briefcase}
                    />
                </div>
            </WeekCard>

            {/* Week 14 */}
            <WeekCard
                week={14}
                title="Generative Models & Pre-trained Networks"
                titleUr="پہلے سے تربیت یافتہ نیٹ ورکس"
                isExpanded={expandedWeek === 14}
                onToggle={() => setExpandedWeek(expandedWeek === 14 ? 0 : 14)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-blue-900 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-blue-800/50 mix-blend-overlay" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <Cpu size={32} className="text-blue-300" />
                            </div>
                            <div className="space-y-4 max-w-lg">
                                <h4 className="text-2xl font-black tracking-tight">{t("Transfer Learning", "ٹرانسفر لرننگ")}</h4>
                                <p className="text-xs text-blue-100/60 leading-relaxed font-medium">
                                    {t("Don't start from scratch. Use a giant 'Pre-trained' model (like ResNet or BERT) that already knows the basics of vision or language, and 'Fine-tune' it for your specific task.", "صفر سے شروع نہ کریں۔ پہلے سے تربیت یافتہ ماڈل کا استعمال کریں۔")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Why Transfer Learning?", "ٹرانسفر لرننگ کیوں؟")}</h5>
                            <div className="space-y-3">
                                {[
                                    { t: "Less Data", d: "Requires 100x less images for high accuracy." },
                                    { t: "Less Compute", d: "No need for weeks of GPU training." },
                                    { t: "Better Generalization", d: "Leverages knowledge from massive datasets." },
                                ].map(item => (
                                    <div key={item.t} className="flex gap-4 items-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                                        <div>
                                            <h6 className="font-black text-[10px] text-blue-900 uppercase">{t(item.t, item.t)}</h6>
                                            <p className="text-[9px] text-gray-500 font-medium">{t(item.d, item.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-[32px] space-y-6">
                            <h5 className="font-black text-xs text-gray-400 uppercase tracking-widest">{t("The Fine-Tuning Process", "فائن ٹیوننگ کا عمل")}</h5>
                            <div className="space-y-4">
                                {[
                                    { s: "Freeze Base", d: "Keep early layers of the model unchanged." },
                                    { s: "Replace Head", d: "Swap final layers for your custom classes." },
                                    { s: "Unfreeze & Tune", d: "Slowly update early layers (optional)." },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4 items-center p-3 bg-white rounded-2xl border border-gray-100 shadow-xs">
                                        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px]">{i + 1}</div>
                                        <div>
                                            <h6 className="font-black text-[11px] text-gray-900">{t(step.s, step.s)}</h6>
                                            <p className="text-[9px] text-gray-500 font-medium leading-none">{t(step.d, step.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="VGG16 & BERT"
                        content="VGG16 is a classic pre-trained model for Vision. BERT (Bidirectional Encoder Representations from Transformers) is the king of pre-trained language models."
                        icon={Brain}
                    />
                </div>
            </WeekCard>        {/* Week 15: Dimension Reduction */}
            <WeekCard
                week={15}
                title="PCA & Dimension Reduction"
                titleUr="پی سی اے اور ڈائمینشن ریڈکشن"
                isExpanded={expandedWeek === 15}
                onToggle={() => setExpandedWeek(expandedWeek === 15 ? 0 : 15)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-emerald-50 rounded-[48px] border border-emerald-100 flex flex-col md:flex-row gap-8 items-center lg:items-start group">
                        <div className="w-24 h-24 shrink-0 bg-white rounded-3xl shadow-md border border-emerald-100 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <BarChart3 size={40} className="text-emerald-600" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-emerald-900 text-xl tracking-tight">{t("Combatting the 'Curse'", "لعنت کا مقابلہ")}</h4>
                            <p className="text-xs text-emerald-800/70 leading-relaxed font-medium">
                                {t("Principal Component Analysis (PCA) is a statistical technique used to simplify high-dimensional data while preserving as much 'information' (variance) as possible.", "پی سی اے ڈیٹا کو سادہ بنانے کی ایک تکنیک ہے۔")}
                            </p>
                            <div className="flex gap-2">
                                {['Eigenvalues', 'Eigenvectors', 'Projection'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white rounded-full border border-emerald-200 text-[10px] font-black text-emerald-600 uppercase tracking-tighter shadow-sm">{t(tag, tag)}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-4">
                            <h5 className="font-black text-xs text-emerald-400 uppercase tracking-widest">{t("Why Reduce Dimensions?", "ڈائمینشنز کیوں کم کریں؟")}</h5>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-[10px] font-medium text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {t("Speeds up training significantly.", "ٹریننگ کو تیز کرتا ہے۔")}
                                </li>
                                <li className="flex items-center gap-3 text-[10px] font-medium text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {t("Visualizes high-dim data in 2D or 3D.", "ڈیٹا کو ویژولائز کرتا ہے۔")}
                                </li>
                                <li className="flex items-center gap-3 text-[10px] font-medium text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {t("Removes noise and redundant features.", "شور اور فالتو فیچرز کو ختم کرتا ہے۔")}
                                </li>
                            </ul>
                        </div>
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm flex items-center justify-center">
                            <div className="text-center space-y-2">
                                <Layers size={40} className="text-emerald-100 mx-auto" />
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">{t("Feature Extraction", "فیچر نکالنا")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Course Completion Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-16 p-10 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-[60px] text-white text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-3xl border border-white/20 mb-6 group-hover:scale-110 transition-transform">
                        <Rocket size={40} className="text-yellow-300" />
                    </div>
                    <h3 className="text-3xl font-black mb-2">{t("Journey Complete!", "سفر مکمل ہوا!")}</h3>
                    <p className="text-sm text-indigo-100/80 font-medium max-w-xl mx-auto leading-relaxed">
                        {t("You've mastered the fundamentals of Artificial Intelligence, from classic search algorithms to modern deep neural networks. The future is built on what you've learned here.", "آپ نے کلاسیکی الگورتھم سے لے کر جدید نیورل نیٹ ورکس تک مصنوعی ذہانت کے بنیادی اصولوں پر عبور حاصل کر لیا ہے۔")}
                    </p>
                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 bg-white text-indigo-900 rounded-[24px] font-black text-sm shadow-xl hover:shadow-white/10 transition-all flex items-center justify-center gap-2">
                            {t("Get Course Certificate", "سرٹیفکیٹ حاصل کریں")}
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
