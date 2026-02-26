import { Topic, QuizQuestion } from './types';

export interface Course {
  id: string;
  title: string;
  titleUr: string;
  icon: string;
  color: string;
  chapters: number;
}

export const COURSES: Course[] = [
  { id: 'cndc', title: 'Computer Networks', titleUr: 'کمپیوٹر نیٹ ورکس', icon: 'Network', color: 'bg-pak-green', chapters: 5 },
  { id: 'os', title: 'Operating Systems', titleUr: 'آپریٹنگ سسٹمز', icon: 'Cpu', color: 'bg-blue-600', chapters: 8 },
  { id: 'db', title: 'Database Systems', titleUr: 'ڈیٹا بیس سسٹمز', icon: 'Database', color: 'bg-orange-600', chapters: 6 },
];

export const CHAPTERS = [
  { id: 1, title: 'Introduction', titleUr: 'تعارف', courseId: 'cndc' },
  { id: 2, title: 'Network Models', titleUr: 'نیٹ ورک ماڈلز', courseId: 'cndc' },
  { id: 3, title: 'Gateway & IP', titleUr: 'گیٹ وے اور آئی پی', courseId: 'cndc' },
  { id: 4, title: 'Subnetting', titleUr: 'سب نیٹنگ', courseId: 'cndc' },
  { id: 5, title: 'ARP Protocol', titleUr: 'اے آر پی پروٹوکول', courseId: 'cndc' },
];

export const TOPICS: Topic[] = [
  {
    id: 'intro-components',
    chapter: 1,
    title: '5 Components of Data Communication',
    titleUr: 'ڈیٹا کمیونیکیشن کے 5 اجزاء',
    pageReference: 'Forouzan 5th Ed, Page 3',
    content: 'Data communication components include: Message, Sender, Receiver, Transmission Medium, and Protocol.',
    contentUr: 'ڈیٹا کمیونیکیشن کے اجزاء میں شامل ہیں: پیغام، بھیجنے والا، وصول کرنے والا، ترسیل کا ذریعہ، اور پروٹوکول۔',
  },
  {
    id: 'data-flow',
    chapter: 1,
    title: 'Data Flow Modes',
    titleUr: 'ڈیٹا فلو موڈز',
    pageReference: 'Forouzan 5th Ed, Page 6',
    content: 'Simplex, Half-Duplex, and Full-Duplex are the three modes of data flow.',
    contentUr: 'سمپلیکس، ہاف ڈوپلیکس، اور فل ڈوپلیکس ڈیٹا فلو کے تین طریقے ہیں۔',
  },
  {
    id: 'topologies',
    chapter: 1,
    title: 'Physical Topologies',
    titleUr: 'فزیکل ٹوپولوجیز',
    pageReference: 'Forouzan 5th Ed, Page 8',
    content: 'Mesh, Star, Bus, Ring, Tree, and Hybrid topologies define how devices are connected.',
    contentUr: 'میش، اسٹار، بس، رنگ، ٹری، اور ہائبرڈ ٹوپولوجیز یہ بتاتی ہیں کہ آلات کیسے جڑے ہوئے ہیں۔',
  },
  {
    id: 'osi-model',
    chapter: 2,
    title: 'OSI 7-Layer Model',
    titleUr: 'او ایس آئی 7 لیئر ماڈل',
    pageReference: 'Forouzan 5th Ed, Page 32',
    content: 'The Open Systems Interconnection model defines seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
    contentUr: 'اوپن سسٹم انٹر کنکشن ماڈل سات تہوں کی وضاحت کرتا ہے: فزیکل، ڈیٹا لنک، نیٹ ورک، ٹرانسپورٹ، سیشن، پریزنٹیشن، اور ایپلی کیشن۔',
  },
];

export const OSI_LAYERS = [
  { name: 'Application', nameUr: 'ایپلی کیشن', color: '#FF5252', description: 'User interface and network services.' },
  { name: 'Presentation', nameUr: 'پریزنٹیشن', color: '#FF4081', description: 'Data encryption and formatting.' },
  { name: 'Session', nameUr: 'سیشن', color: '#E040FB', description: 'Managing communication sessions.' },
  { name: 'Transport', nameUr: 'ٹرانسپورٹ', color: '#7C4DFF', description: 'Reliable end-to-end delivery.' },
  { name: 'Network', nameUr: 'نیٹ ورک', color: '#536DFE', description: 'Routing and logical addressing.' },
  { name: 'Data Link', nameUr: 'ڈیٹا لنک', color: '#448AFF', description: 'Error detection and physical addressing.' },
  { name: 'Physical', nameUr: 'فزیکل', color: '#40C4FF', description: 'Bitstream transmission over medium.' },
];
