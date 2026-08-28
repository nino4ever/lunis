export type UserRole = 'student' | 'teacher' | 'guest';

export type NavigationTab = 'dashboard' | 'lesson' | 'library' | 'assignments' | 'grammar' | 'verbs' | 'dictionary' | 'teacher';

export type GrammarLevel = 'A' | 'B' | 'C' | 'D' | 'Yrke-SVA';

export type VerbGroup = 
  | 'grupp-1'      // -ar, -ade, -at (tala, prata, arbeta)
  | 'grupp-2a'     // -er, -de, -t (ringa, stänga)
  | 'grupp-2b'     // -er, -te, -t (läsa, köpa, åka)
  | 'grupp-3'      // -r, -dde, -tt (tro, bo, sy)
  | 'grupp-4'      // starka/oregelbundna (vara, skriva, gå, dricka)
  | 'hjalpverb'    // modala hjälpverb (ska, vill, kan, måste, brukar)
  | 'reflexiva';   // reflexiva verb (lära sig, skynda sig, tvätta sig)

export interface VerbConjugation {
  id: string;
  level: GrammarLevel;
  verbGroup: VerbGroup;
  groupName: string;
  infinitiv: string;      // t.ex. "att prata"
  presens: string;        // t.ex. "pratar"
  preteritum: string;     // t.ex. "pratade"
  supinum: string;        // t.ex. "har pratat"
  imperativ: string;      // t.ex. "prata!"
  meaningSv: string;
  translations: Record<TranslationLanguage, string>;
  exampleSentence: string;
  exampleTranslation?: Record<TranslationLanguage, string>;
  isIrregular?: boolean;
  isReflexive?: boolean;
  notes?: string;
}

export interface GrammarRuleExample {
  swedish: string;
  note: string;
  translation?: Record<TranslationLanguage, string>;
  highlightWords?: string[];
}

export interface GrammarRule {
  id: string;
  level: GrammarLevel;
  levelTitle: string; // e.g. "SFI Kurs A - Nybörjare"
  category: 'ordfoljd' | 'verb' | 'substantiv' | 'adjektiv' | 'pronomen' | 'satser' | 'sva-formellt';
  categoryLabel: string;
  title: string;
  summary: string;
  formula?: string; // e.g. "Fundament + Finit Verb + Subjekt + Satsadverbial + Infinit Verb"
  explanation: string[];
  examples: GrammarRuleExample[];
  commonMistake?: {
    incorrect: string;
    correct: string;
    explanation: string;
  };
  practiceQuestion?: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  courseLevel: string; // e.g., 'SFI Kurs C'
  school: string;
  studyStreakDays: number;
  weeklyGoalMinutes: number;
  weeklyCompletedMinutes: number;
  totalPoints: number;
  preferredTranslationLang: TranslationLanguage;
}

export type TranslationLanguage = 
  | 'ar' // Arabe (العربية)
  | 'fr' // Français
  | 'it' // Italien (Italiano)
  | 'en'; // Anglais (English)

export interface DictionaryWord {
  id: string;
  swedish: string;
  wordClass: 'substantiv' | 'verb' | 'adjektiv' | 'adverb' | 'preposition' | 'fras';
  article?: 'en' | 'ett';
  forms?: string; // e.g., "boken, böcker, böckerna" or "läser, läste, har läst"
  definitionSv: string;
  exampleSentence: string;
  exampleSentenceTranslation?: Record<TranslationLanguage, string>;
  translations: Record<TranslationLanguage, string>;
  category: string;
}

export type ExerciseType = 
  | 'multiple_choice'
  | 'fill_blank'
  | 'matching'
  | 'speech_pronunciation'
  | 'listening_comprehension'
  | 'writing';

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple_choice';
  prompt: string;
  audioPromptText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FillBlankQuestion {
  id: string;
  type: 'fill_blank';
  sentenceWithBlank: string; // "Han ___ (läsa) tidningen varje morgon."
  correctAnswers: string[]; // ["läser"]
  hint?: string;
  explanation: string;
}

export interface MatchingQuestion {
  id: string;
  type: 'matching';
  prompt: string;
  pairs: { swedish: string; translation: string }[];
}

export interface SpeechQuestion {
  id: string;
  type: 'speech_pronunciation';
  prompt: string;
  phraseToSpeak: string;
  phoneticHint?: string;
  targetTranslation: string;
}

export interface ListeningQuestion {
  id: string;
  type: 'listening_comprehension';
  prompt: string;
  audioScript: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WritingQuestion {
  id: string;
  type: 'writing';
  prompt: string;
  guidingQuestions: string[];
  minWords: number;
  sampleAnswer: string;
}

export type Exercise = 
  | MultipleChoiceQuestion 
  | FillBlankQuestion 
  | MatchingQuestion 
  | SpeechQuestion 
  | ListeningQuestion 
  | WritingQuestion;

export interface ChapterLesson {
  id: string;
  title: string;
  subtitle: string;
  readingText?: {
    title: string;
    paragraphs: string[];
    audioDurationSec?: number;
    vocabularyIds: string[];
  };
  grammarFocus?: {
    ruleTitle: string;
    ruleSummary: string;
    examples: { swedish: string; note: string }[];
  };
  exercises: Exercise[];
}

export interface CourseChapter {
  id: string;
  number: number;
  title: string;
  theme: string;
  iconName: string;
  level: string; // 'A' | 'B' | 'C' | 'D' | 'SVA' | 'Yrkessvenska'
  lessons: ChapterLesson[];
  completedCount?: number;
  totalCount?: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  level: string;
  description: string;
  color: string;
  targetAudience: string;
  chapters: CourseChapter[];
  totalLessons: number;
}

export interface StudentAssignment {
  id: string;
  title: string;
  courseTitle: string;
  chapterTitle: string;
  lessonId: string;
  dueDate: string;
  status: 'ej_paborjad' | 'pagaende' | 'klar';
  score?: number;
  feedback?: string;
  assignedBy: string;
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseTitle: string;
  assignmentTitle: string;
  submittedAt: string;
  status: 'behover_rattas' | 'godkand' | 'komplettering';
  studentTextAnswer?: string;
  score?: number;
  teacherNote?: string;
}
