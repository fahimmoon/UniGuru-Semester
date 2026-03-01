import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Edit3, Mail, FileText, Presentation, Users, ShieldCheck,
    Search, Layout, Image, BookOpen, Send, Lightbulb,
    CheckCircle2, AlertCircle, Info, Bookmark, UserCheck,
    Briefcase, FileCheck, Layers, ChevronDown, ChevronRight,
    PenTool, MessageSquare, Zap, Target, Book, Quote, Rocket, ArrowRight, BarChart3, Award
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
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner">
                        {week}
                    </div>
                    <div>
                        <h3 className="font-black text-gray-900 text-xl tracking-tight">{t(title, titleUr)}</h3>
                        <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">
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

const LectureNote = ({ title, content, icon: Icon }: { title: string, content: string, icon: any }) => {
    const { t } = useLanguage();
    return (
        <div className="p-5 bg-linear-to-br from-emerald-50 to-white rounded-[24px] border border-emerald-100/50 flex gap-4">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                <Icon size={20} />
            </div>
            <div className="space-y-1">
                <h5 className="font-black text-emerald-900 text-xs uppercase tracking-wider">{t(title, title)}</h5>
                <p className="text-[10px] text-emerald-800/70 font-medium leading-relaxed italic">
                    "{t(content, content)}"
                </p>
            </div>
        </div>
    );
};

export const TechnicalWritingContent: React.FC = () => {
    const [expandedWeek, setExpandedWeek] = useState<number>(1);
    const { t } = useLanguage();

    return (
        <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
            {/* Intro Header */}
            <div className="mb-10 text-center space-y-2">
                <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-[0.4em]">{t("Course Syllabus", "کورس کا نصاب")}</h3>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">{t("The Art of Technical Writing", "ٹیکنیکل رائٹنگ کا فن")}</h2>
                <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full mt-4" />
            </div>

            {/* Week 1 */}
            <WeekCard
                week={1}
                title="Introduction to Technical Writing"
                titleUr="ٹیکنیکل رائٹنگ کا تعارف"
                isExpanded={expandedWeek === 1}
                onToggle={() => setExpandedWeek(expandedWeek === 1 ? 0 : 1)}
            >
                <div className="space-y-8">
                    {/* Core Definition */}
                    <div className="flex gap-4 p-6 bg-emerald-900 rounded-[32px] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <PenTool size={32} className="text-emerald-400 shrink-0" />
                        <div className="space-y-3 relative z-10">
                            <h5 className="font-black text-emerald-100 text-lg tracking-tight">{t("What is Technical Writing?", "ٹیکنیکل رائٹنگ کیا ہے؟")}</h5>
                            <p className="text-[11px] text-emerald-200/90 leading-relaxed font-medium">
                                {t("Technical writing is a specialized form of communication used in fields like software engineering, medicine, and manufacturing. Its primary goal is to simplify the complex and make information usable.", "ٹیکنیکل رائٹنگ مواصلات کی ایک ایسی شکل ہے جو پیچیدہ معلومات کو سادہ اور قابل استعمال بنانے کے لیے استعمال ہوتی ہے۔")}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { t: "Objectivity", d: "Focus on facts and data, not opinions or emotions. The writer stays neutral.", icon: <ShieldCheck size={18} /> },
                            { t: "Accessibility", d: "Information should be easy to find (headings, lists) and easy to understand.", icon: <Search size={18} /> },
                        ].map((item, i) => (
                            <div key={i} className="p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm hover:shadow-md transition-shadow space-y-3">
                                <div className="text-emerald-600">{item.icon}</div>
                                <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t(item.t, item.t)}</h5>
                                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{t(item.d, item.d)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Genres Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                            <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest">{t("Common Genres", "عام اقسام")}</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {['User Manuals', 'White Papers', 'API Docs', 'Proposals', 'Lab Reports', 'Feasibility Studies'].map(genre => (
                                <div key={genre} className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 group hover:bg-emerald-50 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                                    <span className="text-[10px] font-black text-gray-700">{t(genre, genre)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="Style Guideline"
                        content="Always use the Active Voice ('The software calculates output') instead of Passive Voice ('Output is calculated by software'). Active voice is shorter, clearer, and more direct."
                        icon={Zap}
                    />
                </div>
            </WeekCard>

            {/* Week 2 */}
            <WeekCard
                week={2}
                title="The 7 C's of Communication"
                titleUr="کمیونیکیشن کے 7 سی"
                isExpanded={expandedWeek === 2}
                onToggle={() => setExpandedWeek(expandedWeek === 2 ? 0 : 2)}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { c: "Clarity", d: "Use simple words and avoid jargon." },
                            { c: "Conciseness", d: "Remove wordy phrases. Keep it brief." },
                            { c: "Concreteness", d: "Use specific facts and figures." },
                            { c: "Correctness", d: "Verify grammar and factual accuracy." },
                            { c: "Consideration", d: "Focus on the 'You' attitude." },
                            { c: "Completeness", d: "Include all necessary details." },
                            { c: "Courtesy", d: "Maintain a professional, polite tone." },
                            { c: "Confidence", d: "Write with authority and certainty." },
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl text-center group hover:bg-emerald-600 transition-all hover:scale-105 shadow-sm">
                                <span className="text-[10px] font-black text-emerald-600 group-hover:text-white uppercase tracking-tighter block mb-1">{t(item.c, item.c)}</span>
                                <p className="text-[8px] text-gray-400 group-hover:text-emerald-100 leading-tight font-medium">{t(item.d, item.d)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-white border-2 border-emerald-50 rounded-[40px] shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Quote size={80} className="text-emerald-900" />
                        </div>
                        <h4 className="font-black text-gray-900 text-lg tracking-tight flex items-center gap-3">
                            <Layers size={22} className="text-emerald-500" />
                            {t("Strategic Writing Principles", "تزویراتی تحریری اصول")}
                        </h4>
                        <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                            {t("The 7 C's provide a framework for both written and oral business communication. Following these ensures that your message is not only sent but successfully RECEIVED and UNDERSTOOD.", "7 سی مواصلات کے لیے ایک فریم ورک فراہم کرتے ہیں۔ ان پر عمل کرنے سے یہ یقینی ہوتا ہے کہ آپ کا پیغام سمجھا گیا ہے۔")}
                        </p>
                    </div>

                    <LectureNote
                        title="The 'You' Attitude"
                        content="Instead of saying 'I want to help you,' say 'You will benefit from this service.' This shift in perspective makes the reader feel valued and more likely to cooperate."
                        icon={UserCheck}
                    />
                </div>
            </WeekCard>

            {/* Week 3 */}
            <WeekCard
                week={3}
                title="The Writing Process"
                titleUr="لکھنے کا عمل"
                isExpanded={expandedWeek === 3}
                onToggle={() => setExpandedWeek(expandedWeek === 3 ? 0 : 3)}
            >
                <div className="space-y-8">
                    {/* Progress Bar */}
                    <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 shadow-inner">
                        {[
                            { l: 'Pre-writing', i: <Search size={16} /> },
                            { l: 'Drafting', i: <PenTool size={16} /> },
                            { l: 'Revision', i: <Edit3 size={16} /> }
                        ].map((step, i) => (
                            <React.Fragment key={step.l}>
                                <div className="text-center space-y-2 relative">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-emerald-100">
                                        {step.i}
                                    </div>
                                    <p className="text-[9px] font-black uppercase text-emerald-900 tracking-tighter">{t(step.l, step.l)}</p>
                                </div>
                                {i < 2 && (
                                    <div className="h-0.5 flex-1 bg-emerald-200 mx-4 relative">
                                        <div className="absolute inset-0 bg-emerald-500 w-1/2 animate-pulse" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white border border-gray-100 rounded-[28px] space-y-3">
                            <h6 className="font-black text-xs text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <Info size={16} className="text-emerald-500" />
                                {t("Pre-writing", "پری رائٹنگ")}
                            </h6>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                {t("80% of the work happens here. Analyze your audience, brainstorm ideas, and create an outline. Never start writing without a plan.", "80 فیصد کام یہاں ہوتا ہے۔ اپنے سامعین کا تجزیہ کریں اور آئیڈیاز پر کام کریں۔")}
                            </p>
                        </div>
                        <div className="p-5 bg-gray-900 rounded-[28px] space-y-3 text-white">
                            <h6 className="font-black text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                {t("Revision vs Editing", "نظر ثانی بمقابلہ تدوین")}
                            </h6>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start text-[9px] text-gray-400">
                                    <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1" />
                                    <span>{t("Revision: Structural changes, logic, clarity, and organization.", "نظر ثانی: ساختی تبدیلیاں، منطق اور وضاحت۔")}</span>
                                </li>
                                <li className="flex gap-2 items-start text-[9px] text-gray-400">
                                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-1" />
                                    <span>{t("Editing: Micro-level fixes, grammar, spelling, and punctuation.", "تدوین: چھوٹی غلطیاں، گرامر اور ہجے کی تصحیح۔")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <LectureNote
                        title="The First Draft Rule"
                        content="Don't be a perfectionist during the drafting stage. Just get the ideas onto the page. You can't edit a blank page! Focus on 'Output' first, then 'Polishing'."
                        icon={Rocket}
                    />
                </div>
            </WeekCard>

            {/* Week 4 */}
            <WeekCard
                week={4}
                title="Business Correspondence"
                titleUr="کاروباری خط و کتابت"
                isExpanded={expandedWeek === 4}
                onToggle={() => setExpandedWeek(expandedWeek === 4 ? 0 : 4)}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Mail size={24} />
                            </div>
                            <h5 className="font-black text-lg text-gray-900 tracking-tight">{t("Memos & Their Utility", "میموز اور ان کے فوائد")}</h5>
                            <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                                {t("Memos are 'Internal' documents. They are used to inform employees of policy changes, announce meetings, or provide brief status updates.", "میموز اندرونی دستاویزات ہیں۔ ان کا استعمال پالیسی میں تبدیلیوں یا میٹنگز کے اعلانات کے لیے کیا جاتا ہے۔")}
                            </p>
                            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <p className="text-[9px] font-black text-blue-900 uppercase mb-2">{t("Standard Header", "معیاری ہیڈر")}</p>
                                <div className="space-y-1 font-mono text-[9px] text-blue-700">
                                    <p>MEMO TO: [Audience]</p>
                                    <p>FROM: [Writer's Name]</p>
                                    <p>DATE: [Current Date]</p>
                                    <p>SUBJECT: [Specific & Clear]</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-900 rounded-[32px] text-white space-y-4">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <h5 className="font-black text-lg text-purple-100 tracking-tight">{t("Short Reports", "مختصر رپورٹس")}</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                                {t("Short reports range from 1 to 5 pages. They often use memo or letter format but contain more detailed data analysis.", "مختصر رپورٹس 1 سے 5 صفحات پر مشتمل ہوتی ہیں۔ ان میں ڈیٹا کا تفصیلی تجزیہ ہوتا ہے۔")}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { t: "Incident", d: "Documenting a specific accident or event." },
                                    { t: "Progress", d: "Updates on a long-term project." },
                                    { t: "Trip", d: "Summary of a business travel outcome." },
                                    { t: "Lab", d: "Recording a scientific test or experiment." },
                                ].map(rep => (
                                    <div key={rep.t} className="p-3 bg-white/5 rounded-xl border border-white/10">
                                        <h6 className="text-[9px] font-black text-purple-400 uppercase">{t(rep.t, rep.t)}</h6>
                                        <p className="text-[8px] text-gray-500">{t(rep.d, rep.d)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="Executive Directness"
                        content="Business writing value time. Don't hide your main point in the middle. Use the 'Inverted Pyramid' approach—give the most important info first, followed by supporting details."
                        icon={MessageSquare}
                    />
                </div>
            </WeekCard>

            {/* Week 5 */}
            <WeekCard
                week={5}
                title="Business Letters & Emails"
                titleUr="کاروباری خطوط اور ای میلز"
                isExpanded={expandedWeek === 5}
                onToggle={() => setExpandedWeek(expandedWeek === 5 ? 0 : 5)}
            >
                <div className="space-y-8">
                    <div className="p-6 bg-gray-900 rounded-[40px] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="flex items-center gap-4 mb-6">
                            <Send className="text-emerald-400" size={28} />
                            <h4 className="text-xl font-black">{t("The Professional Email", "پیشہ ورانہ ای میل")}</h4>
                        </div>
                        <div className="space-y-4 relative z-10">
                            {[
                                { t: "Subject Line", d: "Should be a 'mini-summary' of the email. Never leave it blank." },
                                { t: "Salutation", d: "Use 'Dear Mr./Ms. [Last Name]' for formal, 'Hi [Name]' for informal." },
                                { t: "Closing", d: "Use 'Sincerely' for formal, 'Best regards' for general business." },
                            ].map(part => (
                                <div key={part.t} className="flex gap-4 items-start p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <div>
                                        <h6 className="font-black text-[10px] text-emerald-400 uppercase">{t(part.t, part.t)}</h6>
                                        <p className="text-[9px] text-gray-400 font-medium">{t(part.d, part.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-3">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Inquiry Letters", "انکوائری لیٹرز")}</h5>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                {t("Used to request information about products, services, or people. Be specific about what you need and why.", "مصنوعات یا خدمات کے بارے میں معلومات حاصل کرنے کے لیے استعمال کیا جاتا ہے۔")}
                            </p>
                        </div>
                        <div className="p-5 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-3">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Adjustment Letters", "ایڈجسٹمنٹ لیٹرز")}</h5>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                {t("A response to a complaint. It should be objective, fair, and aim to restore client trust.", "شکایت کا جواب۔ یہ معروضی، منصفانہ اور اعتماد بحال کرنے والا ہونا چاہیے۔")}
                            </p>
                        </div>
                    </div>

                    <LectureNote
                        title="The Buffer Technique"
                        content="When writing a 'Bad News' letter, start with a neutral 'Buffer' statement. Explain the reasons before giving the refusal, and end with a helpful alternative."
                        icon={ShieldCheck}
                    />
                </div>
            </WeekCard>

            {/* Week 6 */}
            <WeekCard
                week={6}
                title="Formal Reports"
                titleUr="رسمی رپورٹس"
                isExpanded={expandedWeek === 6}
                onToggle={() => setExpandedWeek(expandedWeek === 6 ? 0 : 6)}
            >
                <div className="space-y-8">
                    <div className="relative p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <FileCheck size={120} className="text-emerald-600" />
                        </div>
                        <h4 className="font-black text-gray-900 text-lg uppercase tracking-widest mb-8">{t("Standard Structure", "معیاری ڈھانچہ")}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            {[
                                { t: "Front Matter", l: ["Cover Page", "Abstract", "TOC", "Executive Summary"] },
                                { t: "The Body", l: ["Introduction", "Methodology", "Discussion", "Conclusion"] },
                                { t: "Back Matter", l: ["References (APA)", "Appendices", "Glossary", "Index"] },
                            ].map(section => (
                                <div key={section.t} className="space-y-3">
                                    <h6 className="font-black text-[11px] text-emerald-600 uppercase tracking-[0.2em]">{t(section.t, section.t)}</h6>
                                    <div className="space-y-1">
                                        {section.l.map(item => (
                                            <p key={item} className="text-[10px] text-gray-500 font-bold flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-gray-300" />
                                                {t(item, item)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[32px] space-y-3">
                            <h5 className="font-black text-xs text-emerald-900 uppercase">{t("Feasibility Reports", "فزیبلٹی رپورٹس")}</h5>
                            <p className="text-[10px] text-emerald-700 leading-relaxed font-medium">
                                {t("Used to determine if a project is viable. Analyzes technical, financial, and legal aspects before commitment.", "یہ طے کرنے کے لیے استعمال ہوتی ہے کہ آیا کوئی پروجیکٹ قابل عمل ہے۔")}
                            </p>
                        </div>
                        <div className="p-6 bg-emerald-900 rounded-[32px] text-white space-y-3">
                            <h5 className="font-black text-xs text-emerald-400 uppercase">{t("Empirical Research", "تجرباتی تحقیق")}</h5>
                            <p className="text-[10px] text-emerald-100 leading-relaxed font-medium">
                                {t("Reports based on direct observation or balanced experimentation. Follows strict methodology and data analysis.", "براہ راست مشاہدے یا متوازن تجربات پر مبنی رپورٹس۔")}
                            </p>
                        </div>
                    </div>

                    <LectureNote
                        title="The Executive Summary"
                        content="Managerial readers often ONLY read the Executive Summary. It must stand alone as a complete document that answers 'What is the problem?', 'What did you find?', and 'What should we do?'"
                        icon={Briefcase}
                    />
                </div>
            </WeekCard>

            {/* Week 7 */}
            <WeekCard
                week={7}
                title="Visual Aids & Graphics"
                titleUr="بصری امداد اور گرافکس"
                isExpanded={expandedWeek === 7}
                onToggle={() => setExpandedWeek(expandedWeek === 7 ? 0 : 7)}
            >
                <div className="space-y-8">
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium px-2">
                        {t("Graphics should clarify, not decorate. They help convert abstract data into understandable shapes and patterns.", "گرافکس کو معلومات کو واضح کرنا چاہیے، نہ کہ صرف سجاوٹ کے لیے ہونا چاہیے۔")}
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { i: <BarChart3 />, l: "Bar Charts", d: "Comparison" },
                            { i: <Layers />, l: "Flowcharts", d: "Process" },
                            { i: <Image />, l: "Schematics", d: "Function" },
                            { i: <FileCheck />, l: "Tables", d: "Exact Data" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white border border-gray-100 rounded-3xl text-center space-y-2 group hover:bg-emerald-600 transition-all shadow-sm">
                                <div className="text-emerald-500 group-hover:text-white flex justify-center">{item.i}</div>
                                <h6 className="text-[9px] font-black text-gray-900 group-hover:text-white uppercase tracking-tighter">{t(item.l, item.l)}</h6>
                                <p className="text-[8px] text-gray-400 group-hover:text-emerald-100 italic">{t(item.d, item.d)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-gray-900 rounded-[40px] text-white space-y-4">
                        <h4 className="font-black text-xs text-emerald-400 uppercase tracking-widest">{t("The G.R.I.P Principle", "جی آر آئی پی اصول")}</h4>
                        <div className="space-y-3">
                            {[
                                { l: "Go Close", d: "Place the graphic as close to the text reference as possible." },
                                { l: "Reference", d: "Always mention the figure in the text (e.g., 'See Figure 1')." },
                                { l: "Interpret", d: "Tell the reader what the graphic shows. Don't let them guess." },
                                { l: "Perfect", d: "Ensure high resolution and clear labels." },
                            ].map(rule => (
                                <div key={rule.l} className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-xs text-emerald-400 border border-white/10">{rule.l[0]}</div>
                                    <div>
                                        <h6 className="font-black text-[10px] text-white">{t(rule.l, rule.l)}</h6>
                                        <p className="text-[9px] text-gray-500 font-medium">{t(rule.d, rule.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                    <div className="p-10 bg-linear-to-br from-emerald-600 to-teal-800 rounded-[48px] text-white text-center space-y-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden px-6">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

                        <div className="relative z-10 space-y-4">
                            <Award size={64} className="mx-auto text-emerald-100" />
                            <h4 className="text-3xl font-black uppercase tracking-tighter italic">{t("Checkpoint Bravo", "چیک پوائنٹ براوو")}</h4>
                            <p className="text-sm text-emerald-50/70 font-medium max-w-sm mx-auto leading-relaxed">
                                {t("Evaluating your grasp of professional correspondence, formal reporting, and the 7 C's of communication.", "پیشہ ورانہ خط و کتابت، رسمی رپورٹنگ اور مواصلات کے 7 سی پر آپ کی گرفت کا جائزہ۔")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                            {[
                                { l: "Correspondence", d: "Memos, Letters, Emails" },
                                { l: "Report Writing", d: "Structure & Strategy" },
                                { l: "Core Principles", d: "The 7 C's & Logic" },
                            ].map(item => (
                                <div key={item.l} className="p-5 bg-white/10 rounded-[32px] border border-white/10 backdrop-blur-md">
                                    <h6 className="text-[11px] font-black text-white mb-1 uppercase">{t(item.l, item.l)}</h6>
                                    <p className="text-[10px] text-emerald-200 font-medium">{t(item.d, item.d)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm space-y-6">
                            <h5 className="font-black text-gray-900 text-sm tracking-tight flex items-center gap-2">
                                <BookOpen size={18} className="text-emerald-500" />
                                {t("High-Yield Topics", "زیادہ مارکس والے موضوعات")}
                            </h5>
                            <ul className="space-y-4">
                                {[
                                    { t: "The 7 C's", d: "Clarity and Conciseness are prioritized." },
                                    { t: "Memo Headers", d: "Know the standard TO/FROM/DATE/SUBJECT." },
                                    { t: "Adjustment Letters", d: "Buffer technique and positive closing." },
                                    { t: "Executive Summary", d: "Writing for busy stakeholders." },
                                ].map((topic, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                        <div>
                                            <h6 className="font-black text-[11px] text-gray-900">{t(topic.t, topic.t)}</h6>
                                            <p className="text-[9px] text-gray-500 font-medium">{t(topic.d, topic.d)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 bg-gray-50 border border-gray-100 rounded-[40px] space-y-6">
                            <h5 className="font-black text-gray-900 text-sm tracking-tight flex items-center gap-2">
                                <Search size={18} className="text-emerald-500" />
                                {t("Exam Strategy", "امتحان کی حکمت عملی")}
                            </h5>
                            <div className="space-y-4">
                                <div className="p-4 bg-white rounded-2xl border border-gray-200">
                                    <p className="text-[10px] text-gray-600 font-bold leading-relaxed italic">
                                        {t("\"Be objective, be brief, and be gone.\" - The unspoken rule of technical writing exams.", "\"معروضی بنیں، مختصر بنیں، اور آگے بڑھیں۔\"")}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("Timing Breakdown", "وقت کی تقسیم")}</p>
                                    <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                                        <div className="w-1/4 bg-emerald-500" />
                                        <div className="w-1/2 bg-emerald-400" />
                                        <div className="w-1/4 bg-emerald-300" />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black text-gray-400">
                                        <span>MCQs (15m)</span>
                                        <span>Short Ans (30m)</span>
                                        <span>Case (15m)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 9 */}
            <WeekCard
                week={9}
                title="Proposal Writing & RFPs"
                titleUr="پروپوزل رائٹنگ اور آر ایف پیز"
                isExpanded={expandedWeek === 9}
                onToggle={() => setExpandedWeek(expandedWeek === 10 ? 0 : 9)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-linear-to-br from-emerald-900 to-teal-950 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Rocket size={100} />
                        </div>
                        <h4 className="text-2xl font-black mb-4 tracking-tighter">{t("The Persuasive Document", "ترغیب دینے والی دستاویز")}</h4>
                        <p className="text-[11px] text-emerald-100/80 leading-relaxed font-medium mb-6 max-w-lg">
                            {t("A proposal is a request for help or action. Whether you are asking for funding or permission, your proposal must convince the reader that your plan is the best solution.", "پروپوزل مدد یا کارروائی کی درخواست ہے۔ اسے قاری کو اس بات پر قائل کرنا ہوگا کہ آپ کا منصوبہ بہترین ہے۔")}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                                <h6 className="font-black text-[10px] text-emerald-400 uppercase mb-1">{t("Solicited Proposals", "درخواست شدہ پروپوزلز")}</h6>
                                <p className="text-[9px] text-gray-400">{t("Written when a company sends out an RFP. You are competing against others.", "جب کوئی کمپنی RFP بھیجتی ہے تو لکھا جاتا ہے۔")}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                                <h6 className="font-black text-[10px] text-emerald-400 uppercase mb-1">{t("Unsolicited Proposals", "غیر درخواست شدہ پروپوزلز")}</h6>
                                <p className="text-[9px] text-gray-400">{t("Cold calls in document form. You are trying to convince them they have a problem.", "دستاویزی شکل میں کولڈ کالز۔")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white border border-gray-100 rounded-[40px] shadow-sm space-y-4">
                        <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Core Proposal Sections", "پروپوزل کے اہم حصے")}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {[
                                { t: "Summary", d: "A clear overview for busy decision markers." },
                                { t: "Problem Statement", d: "Shows you understand the client's needs." },
                                { t: "Proposed Plan", d: "Your step-by-step solution to the problem." },
                                { t: "Qualifications", d: "Why you/your company are the best fit." },
                                { t: "Budget", d: "Transparent breakdown of costs and ROI." },
                                { t: "Schedule", d: "Realistic timeline for project completion." },
                            ].map(sec => (
                                <div key={sec.t} className="flex gap-4 items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    <div>
                                        <h6 className="font-black text-[10px] text-gray-900">{t(sec.t, sec.t)}</h6>
                                        <p className="text-[9px] text-gray-500 font-medium leading-tight">{t(sec.d, sec.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="Persuasion Strategy"
                        content="Don't just list your features. List the BENEFITS. Instead of 'We have 20 years experience', say 'Our 20 years of experience ensures your project is completed without costly errors.'"
                        icon={Target}
                    />
                </div>
            </WeekCard>

            {/* Week 10 */}
            <WeekCard
                week={10}
                title="Instructions & Manuals"
                titleUr="ہدایات اور مینوئلز"
                isExpanded={expandedWeek === 10}
                onToggle={() => setExpandedWeek(expandedWeek === 10 ? 0 : 10)}
            >
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200"><PenTool size={18} /></div>
                                <h4 className="font-black text-blue-900 text-sm uppercase tracking-tight">{t("Writing for Action", "ایکشن کے لیے لکھنا")}</h4>
                            </div>
                            <p className="text-[10px] text-blue-800/70 font-medium leading-relaxed">
                                {t("Instructions explain how to perform a task. They must be unambiguous, chronological, and focus on the user's success.", "ہدایات بتاتی ہیں کہ ٹاسک کیسے مکمل کرنا ہے۔ انہیں واضح اور ترتیب وار ہونا چاہیے۔")}
                            </p>
                            <div className="space-y-1.5 pt-2">
                                {[
                                    { t: "Imperative Mood", d: "Start with a verb: 'Click', 'Turn', 'Open'." },
                                    { t: "One Action", d: "Only one action per numbered step." },
                                    { t: "Feedback", x: "Tell them what should happen after the step." },
                                ].map(item => (
                                    <div key={item.t} className="flex justify-between items-center p-2.5 bg-white rounded-xl border border-blue-100/50">
                                        <span className="text-[9px] font-black text-blue-900 uppercase">{t(item.t, item.t)}</span>
                                        <div className="w-1 h-1 rounded-full bg-blue-200" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Manual Architecture", "مینوئل آرکیٹیکچر")}</h5>
                            <div className="space-y-3">
                                {[
                                    { t: "Introduction", d: "State the purpose and intended audience." },
                                    { t: "Safety Information", d: "Danger, Warning, Caution, and Note." },
                                    { t: "Parts List", d: "Everything the user needs to start." },
                                    { t: "Troubleshooting", d: "What to do when things go wrong." },
                                ].map(part => (
                                    <div key={part.t} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                        <div>
                                            <h6 className="font-black text-[10px] text-gray-900">{t(part.t, part.t)}</h6>
                                            <p className="text-[9px] text-gray-500 font-medium">{t(part.d, part.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-red-50 rounded-[32px] border border-red-100 flex gap-4 items-center">
                        <AlertCircle className="text-red-500 shrink-0" size={24} />
                        <div className="space-y-1">
                            <h6 className="text-[10px] text-red-900 font-black uppercase tracking-widest leading-tight">{t("Safety Hierarchy", "حفاظتی درجہ بندی")}</h6>
                            <p className="text-[9px] text-red-700/80 font-medium">
                                {t("DANGER: Death/injury likely. WARNING: Injury possible. CAUTION: Equipment damage. NOTE: Extra info.", "خطرہ: موت یا چوٹ کا امکان۔ انتباہ: چوٹ ممکن ہے۔")}
                            </p>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 11 */}
            <WeekCard
                week={11}
                title="Ethics & Professional Integrity"
                titleUr="اخلاقیات اور پیشہ ورانہ سالمیت"
                isExpanded={expandedWeek === 11}
                onToggle={() => setExpandedWeek(expandedWeek === 11 ? 0 : 11)}
            >
                <div className="space-y-8">
                    <div className="flex gap-6 p-6 bg-gray-900 rounded-[32px] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -mr-24 -mt-24" />
                        <ShieldCheck size={40} className="text-emerald-400 shrink-0" />
                        <div className="space-y-3 relative z-10">
                            <h5 className="font-black text-gray-100 text-lg tracking-tight">{t("The Ethical Writer", "اخلاقی مصنف")}</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                                {t("Technical communication is not just about words; it's about trust. Your duty is to provide accurate, unbiased, and safe information to users, even if it conflicts with company profits.", "ٹیکنیکل رائٹنگ صرف الفاظ نہیں بلکہ بھروسہ ہے۔ آپ کا فرض درست اور محفوظ معلومات فراہم کرنا ہے۔")}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { t: "Accuracy", d: "Never suppress or distort data to make a product look better than it is.", icon: <Target size={18} className="text-orange-500" /> },
                            { t: "Plagiarism", d: "Always credit sources. In technical writing, this includes code, diagrams, and text.", icon: <ShieldCheck size={18} className="text-emerald-500" /> },
                        ].map((item, i) => (
                            <div key={i} className="p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm space-y-3 hover:border-emerald-200 transition-colors">
                                {item.icon}
                                <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t(item.t, item.t)}</h5>
                                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{t(item.d, item.d)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 space-y-4">
                        <h6 className="font-black text-xs text-emerald-900 uppercase tracking-widest">{t("STC Code of Ethics", "ایس ٹی سی اخلاقی ضابطہ")}</h6>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {['Legality', 'Honesty', 'Confidentiality', 'Quality', 'Fairness', 'Professionalism'].map(val => (
                                <div key={val} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                    <span className="text-[10px] font-bold text-emerald-800">{t(val, val)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <LectureNote
                        title="Ethical Dilemmas"
                        content="If you are asked to hide a safety defect in a manual, it is your ethical duty to report it. Ethics often supersede legal requirements in professional engineering and writing."
                        icon={AlertCircle}
                    />
                </div>
            </WeekCard>

            {/* Week 12 */}
            <WeekCard
                week={12}
                title="Research & APA 7th Edition"
                titleUr="تحقیق اور اے پی اے 7 واں ایڈیشن"
                isExpanded={expandedWeek === 12}
                onToggle={() => setExpandedWeek(expandedWeek === 12 ? 0 : 12)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-100 flex flex-col md:flex-row gap-8 items-center lg:items-start group">
                        <div className="w-24 h-24 shrink-0 bg-white rounded-3xl shadow-md border border-emerald-100 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Search size={40} className="text-emerald-600" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-emerald-900 text-xl tracking-tight">{t("Technical Documentation", "تکنیکی دستاویزات")}</h4>
                            <p className="text-xs text-emerald-800/70 leading-relaxed font-medium">
                                {t("Research in technical writing involves both primary (interviews, testing) and secondary (journals, reports) sources. Precise documentation is the bedrock of credibility.", "تکنیکی تحریر میں تحقیق میں بنیادی اور ثانوی دونوں ذرائع شامل ہیں۔")}
                            </p>
                            <div className="flex gap-2">
                                {['Primary Research', 'Secondary Research'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white rounded-full border border-emerald-200 text-[10px] font-black text-emerald-600 uppercase tracking-tighter shadow-sm">{t(tag, tag)}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-900 rounded-[40px] text-white space-y-6">
                        <div className="flex items-center justify-between">
                            <h5 className="font-black text-sm text-emerald-400 uppercase tracking-widest">{t("APA 7 Formatting Guide", "اے پی اے 7 گائیڈ")}</h5>
                            <div className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold text-gray-400 border border-white/10">v7.0</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h6 className="text-[10px] font-black text-gray-500 uppercase">{t("In-text Citations", "ان ٹیکسٹ حوالے")}</h6>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-[9px] leading-relaxed">
                                    <p className="text-emerald-200">One Author: (Smith, 2023)</p>
                                    <p className="text-blue-300">Two Authors: (Smith & Doe, 2023)</p>
                                    <p className="text-purple-300">Direct Quote: (Smith, 2023, p. 42)</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h6 className="text-[10px] font-black text-gray-500 uppercase">{t("Reference List", "حوالہ جات کی فہرست")}</h6>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-mono text-[9px] leading-relaxed">
                                    <p className="text-gray-400">Author, A. A. (Year). Title of work. Source. DOI/URL</p>
                                    <p className="mt-2 italic text-emerald-100/50">"Double space, 0.5 inch hanging indent required."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="Citation Value"
                        content="Don't cite just for the sake of it. Cite to give your reader a path to further knowledge and to protect yourself from plagiarism claims. When in doubt, cite it!"
                        icon={Bookmark}
                    />
                </div>
            </WeekCard>

            {/* Week 13 */}
            <WeekCard
                week={13}
                title="Oral Presentations"
                titleUr="زبانی پیشکش"
                isExpanded={expandedWeek === 13}
                onToggle={() => setExpandedWeek(expandedWeek === 13 ? 0 : 13)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-linear-to-br from-indigo-800 to-indigo-950 rounded-[50px] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mb-32 -mr-32" />
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <Presentation size={32} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-black">{t("The Power of Presence", "موجودگی کی طاقت")}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h6 className="font-black text-[10px] text-indigo-300 uppercase tracking-widest">{t("Design Principles", "ڈیزائن کے اصول")}</h6>
                                <p className="text-[11px] text-indigo-100/70 font-medium leading-relaxed">
                                    {t("Your slides are NOT your teleprompter. Use high-quality visuals, minimal text, and focus on one idea per slide.", "آپ کی سلائیڈز آپ کا ٹیلی پرامپٹر نہیں ہیں۔")}
                                </p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { t: "10 Slides", d: "Maximum for a business talk." },
                                    { t: "20 Minutes", d: "To stay within typical attention span." },
                                    { t: "30 Point Font", d: "Minimum to ensure readability for all." },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                                        <span className="text-xs font-black">{t(item.t, item.t)}</span>
                                        <span className="text-[10px] text-indigo-400 font-bold">{t(item.d, item.d)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Vocal & Non-Verbal", "آوازی اور غیر لفظی")}</h5>
                            <div className="space-y-2">
                                {[
                                    { t: "Modulation", d: "Vary your pitch to show enthusiasm." },
                                    { t: "Eye Contact", d: "Scan the room, don't stare at the wall." },
                                    { t: "Gestures", d: "Use open hands to show transparency." },
                                ].map(v => (
                                    <div key={v.t} className="flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                        <div className="flex-1 border-b border-gray-50 pb-2">
                                            <span className="text-[10px] font-black text-gray-800">{t(v.t, v.t)}</span>
                                            <p className="text-[10px] text-gray-500 font-medium">{t(v.d, v.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3">
                                <Users size={24} className="text-indigo-600" />
                                <h5 className="font-black text-indigo-900 text-sm">{t("Audience Analysis", "سامعین کا تجزیہ")}</h5>
                            </div>
                            <p className="text-[10px] text-indigo-800 leading-relaxed font-medium">
                                {t("Determine if your audience is Mixed, Tech-Heavy, or Decision-Makers. Tailor your tone and complexity according to their expertise.", "اپنے لہجے اور پیچیدگی کو سامعین کی مہارت کے مطابق بنائیں۔")}
                            </p>
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Week 14 */}
            <WeekCard
                week={14}
                title="Employment Writing"
                titleUr="ملازمت کے لیے تحریر"
                isExpanded={expandedWeek === 14}
                onToggle={() => setExpandedWeek(expandedWeek === 14 ? 0 : 14)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-white border-2 border-emerald-50 rounded-[40px] shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <UserCheck size={120} className="text-emerald-900" />
                        </div>
                        <h4 className="font-black text-emerald-900 text-xl tracking-tight">{t("Your Career Marketing Portfolio", "آپ کا کیریئر مارکیٹنگ پورٹ فولیو")}</h4>
                        <p className="text-xs text-emerald-800/70 leading-relaxed font-medium">
                            {t("In the professional world, your writing is often your first impression. A resume doesn't just list jobs; it sells your potential to solve an employer's problems.", "پیشہ ورانہ دنیا میں، آپ کی تحریر اکثر آپ کا پہلا تاثر ہوتی ہے۔")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-emerald-900 rounded-[32px] text-white space-y-4">
                            <h5 className="font-black text-xs text-emerald-400 uppercase tracking-widest">{t("The Resume Strategy", "ریزومے کی حکمت عملی")}</h5>
                            <div className="space-y-3">
                                {[
                                    { t: "Keywords", d: "Match words from the job description for ATS." },
                                    { t: "Results", d: "Use numbers (e.g., 'Increased efficiency by 20%')." },
                                    { t: "Layout", d: "Clean headers and ample white space." },
                                ].map(tip => (
                                    <div key={tip.t} className="flex gap-4 items-center">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                        <div>
                                            <h6 className="font-black text-[10px] text-emerald-100">{t(tip.t, tip.t)}</h6>
                                            <p className="text-[9px] text-emerald-100/50">{t(tip.d, tip.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-4">
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("The Power of Cover Letters", "کور لیٹر کی اہمیت")}</h5>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                {t("A cover letter tells the 'story' of your resume. It connects the dots between your background and the company's specific needs.", "کور لیٹر آپ کے ریزومے کی 'کہانی' بتاتا ہے۔")}
                            </p>
                            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-[9px] italic text-gray-500">
                                "{t("Instead of 'I am a hard worker', say 'During my internship at X, I managed 3 projects simultaneously and delivered all ahead of schedule.'", "میں ایک محنتی ہوں کہنے کے بجائے، کہیں 'میں نے ایکس میں اپنی انٹرنشپ کے دوران بیک وقت 3 پروجیکٹس کا انتظام کیا۔'")} "
                            </div>
                        </div>
                    </div>

                    <LectureNote
                        title="The 6-Second Rule"
                        content="Recruiters scan resumes in 6 seconds. If they can't see your key value immediately, you're out. Use bold fonts for job titles and bullet points for achievements."
                        icon={Zap}
                    />
                </div>
            </WeekCard>

            {/* Week 15 */}
            <WeekCard
                week={15}
                title="Advanced Business Plans"
                titleUr="ایڈوانس بزنس پلانز"
                isExpanded={expandedWeek === 15}
                onToggle={() => setExpandedWeek(expandedWeek === 15 ? 0 : 15)}
            >
                <div className="space-y-8">
                    <div className="p-8 bg-linear-to-br from-emerald-600 to-teal-800 rounded-[50px] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <Briefcase size={32} />
                            </div>
                            <h4 className="text-3xl font-black tracking-tighter">{t("The Final Blueprint", "آخری بلیو پرنٹ")}</h4>
                        </div>
                        <p className="text-xs text-emerald-50 leading-relaxed font-medium mb-8 max-w-xl">
                            {t("A business plan is more than just a document; it's a strategic roadmap for a new venture. It combines technical writing, market research, and financial analysis into a single persuasive package.", "بزنس پلان ایک دستاویز سے بڑھ کر ہے؛ یہ ایک نئے منصوبے کے لیے اسٹریٹجک روڈ میپ ہے۔")}
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { t: "Vision", d: "Core values & future goals." },
                                { t: "Market", d: "Competitors & SWOT analysis." },
                                { t: "Operations", d: "How you will deliver value." },
                                { t: "Financials", d: "Break-even and ROI metrics." },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <h6 className="font-black text-[10px] text-emerald-300 uppercase mb-1">{t(stat.t, stat.t)}</h6>
                                    <p className="text-[9px] text-gray-400 font-medium leading-tight">{t(stat.d, stat.d)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-emerald-600">
                            <CheckCircle2 size={24} />
                            <h5 className="font-black text-xs text-gray-900 uppercase tracking-widest">{t("Investor-Ready Checklist", "انویسٹر ریڈی چیک لسٹ")}</h5>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Compelling Executive Summary",
                                "Clear Product Differentiation",
                                "Realistic Market Sizing",
                                "Strong Management Team Profile",
                                "Detailed Revenue Projections",
                                "Exit Strategy for Investors"
                            ].map(check => (
                                <div key={check} className="flex gap-4 items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                                        <ChevronRight size={14} className="text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700">{t(check, check)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </WeekCard>

            {/* Completion Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-10 bg-linear-to-br from-emerald-600 to-teal-800 rounded-[50px] text-white text-center space-y-6 shadow-2xl shadow-emerald-500/30 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mb-32 -mr-32" />

                <div className="w-20 h-20 bg-white/10 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                    <CheckCircle2 size={40} className="text-emerald-200" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white">{t("Master Business Writing!", "بزنس رائٹنگ میں مہارت حاصل کریں!")}</h3>
                    <p className="text-sm text-white/80 font-medium px-4 leading-relaxed max-w-sm mx-auto">
                        {t("Effective communication is the key to corporate success. Learn to write with impact and precision.", "موثر مواصلات کارپوریٹ کامیابی کی کلید ہے۔")}
                    </p>
                </div>

                <div className="pt-4">
                    <button className="w-full py-5 bg-white text-emerald-700 rounded-[24px] font-black text-sm shadow-2xl hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                        {t("Start Week 1", "ہفتہ 1 شروع کریں")}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default TechnicalWritingContent;
