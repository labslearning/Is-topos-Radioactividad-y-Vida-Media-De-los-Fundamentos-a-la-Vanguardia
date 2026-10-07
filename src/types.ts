export type Language = 'en' | 'es' | 'fr' | 'de';

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface FormativeQuestion {
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  reinforcement: string;
}

export interface MicroClass {
  empatheticValidation: string;
  analogy: string; // Powerful intuitive analogy
  formativeQuestion: FormativeQuestion;
}

export interface MCQQuestion {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: 'fundamentos' | 'intermedio' | 'avanzado';
  question: string;
  options: MCQOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  reinforcement: string; // Crisp 1-sentence scientific validation
  microClass: MicroClass;
}

export interface IsotopeInfo {
  id: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  neutrons: number;
  massNumber: number;
  halfLifeValue: number;
  halfLifeUnit: 'minutes' | 'hours' | 'days' | 'years' | 'millions-years';
  halfLifeDisplay: string;
  decayType: 'alpha' | 'beta-minus' | 'beta-plus' | 'gamma';
  decayLabel: string;
  daughterNucleus: string;
  applicationType: 'archaeology' | 'medicine' | 'energy' | 'industry';
  applicationTitle: string;
  applicationDescription: string;
  realWorldUseCase: string;
  penetrationShield: 'paper' | 'aluminum' | 'lead';
}

export interface DecayModeInfo {
  id: 'alpha' | 'beta-minus' | 'beta-plus' | 'gamma';
  name: string;
  symbol: string;
  particle: string;
  description: string;
  charge: string;
  penetrationPower: string;
  blockedBy: string;
  exampleReaction: string;
  biologicalImpact: string;
}

export interface InteractiveConceptLesson {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  intuitiveAnalogy: string;
  deepExplanation: string[];
  keyFormula?: string;
  interactiveType: 'isotope-builder' | 'decay-shield' | 'half-life-math' | 'carbon-dating-demo' | 'pet-scan-annihilation' | 'radiotherapy-target';
  quickFormativeCheck: FormativeQuestion;
}

export interface UserStats {
  xp: number;
  streak: number;
  totalAnswered: number;
  correctAnswers: number;
  microClassesCompleted: number;
  masterclassProgress: number; // percentage
  mastered: boolean;
  earnedBadgeDate?: string;
  certificateHash?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
