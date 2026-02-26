export type Language = 'en' | 'ur';

export interface Topic {
  id: string;
  title: string;
  titleUr: string;
  chapter: number;
  content: string;
  contentUr: string;
  pageReference: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionUr: string;
  options: string[];
  optionsUr: string[];
  correctIndex: number;
  explanation: string;
  explanationUr: string;
}

export interface UserProgress {
  completedTopics: string[];
  quizScores: Record<string, number>;
  streak: number;
  lastActive: string;
}
