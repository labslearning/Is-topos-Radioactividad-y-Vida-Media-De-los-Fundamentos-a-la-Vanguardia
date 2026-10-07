import React, { useState, useEffect } from 'react';
import { MCQQuestion, Language } from '../types';
import { curriculumData } from '../data/curriculum';
import { translations } from '../data/translations';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  HelpCircle, 
  Award,
  Zap,
  RefreshCw,
  Flame,
  Target
} from 'lucide-react';

interface Props {
  language: Language;
  onXPBoost: (amount: number) => void;
  onStreakUpdate: (increment: boolean) => void;
  streak: number;
  onShowMastery: () => void;
  isMastered: boolean;
}

export const ChallengeView: React.FC<Props> = ({
  language,
  onXPBoost,
  onStreakUpdate,
  streak,
  onShowMastery,
  isMastered,
}) => {
  const t = translations[language];
  const questions = curriculumData[language] || curriculumData.es;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Micro-Class State
  const [isInMicroClass, setIsInMicroClass] = useState<boolean>(false);
  const [formativeSelectedId, setFormativeSelectedId] = useState<string | null>(null);
  const [isFormativeResolved, setIsFormativeResolved] = useState<boolean>(false);

  // Dynamic AI generated challenge state
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [dynamicQuestion, setDynamicQuestion] = useState<MCQQuestion | null>(null);

  const currentQ = dynamicQuestion || questions[currentIndex] || questions[0];

  // Reset when language changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setIsInMicroClass(false);
    setDynamicQuestion(null);
  }, [language]);

  // Handle Option Select
  const handleSelectOption = (id: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(id);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const correct = selectedOptionId === currentQ.correctOptionId;
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      onXPBoost(150);
      onStreakUpdate(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#a855f7', '#38bdf8', '#f59e0b'],
      });
    } else {
      sound.playMicroClassCue();
      onStreakUpdate(false);
      // Trigger Micro-Class Protocol
      setIsInMicroClass(true);
    }
  };

  // Keyboard controls (A, B, C, D or 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswerSubmitted || isInMicroClass) return;
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
      } else if (key === '1') handleSelectOption('A');
      else if (key === '2') handleSelectOption('B');
      else if (key === '3') handleSelectOption('C');
      else if (key === '4') handleSelectOption('D');
      else if (e.key === 'Enter' && selectedOptionId) {
        handleSubmitAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOptionId, isAnswerSubmitted, isInMicroClass, currentQ]);

  // Next Question
  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setIsInMicroClass(false);
    setFormativeSelectedId(null);
    setIsFormativeResolved(false);
    setDynamicQuestion(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all questions in Topic 2.3!
      onShowMastery();
    }
  };

  // Generate dynamic question using server-side Gemini 3.8 Flash proxy focused exclusively on Topic 2.3
  const handleGenerateDynamicChallenge = async () => {
    try {
      setIsGeneratingAI(true);
      const res = await fetch('/api/generate-mcq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'Topic 2.3: Isotopes, Radioactivity, Half-life & Real-world Applications (Carbon-14, PET F-18, Iodine-131)',
          language,
        }),
      });

      const data = await res.json();
      if (data.challenge && data.challenge.question) {
        const c = data.challenge;
        const newMCQ: MCQQuestion = {
          id: `ai_${Date.now()}`,
          topic: 'Tema 2.3: Isótopos y Radioactividad',
          subtopic: 'Desafío Dinámico Adaptativo IA',
          difficulty: 'intermedio',
          question: c.question,
          options: c.options,
          correctOptionId: c.correctOptionId,
          reinforcement: c.reinforcement,
          microClass: {
            empatheticValidation: t.microClassEmpatheticIntro,
            analogy: c.microClassAnalogy || 'La desintegración radiactiva es un proceso puramente cuántico gobernado por probabilidades invariantes.',
            formativeQuestion: {
              question: '¿Depende la vida media del tamaño o masa de la muestra?',
              options: [
                { id: '1', text: 'No, la constante λ es una propiedad cuántica intrínseca del núcleo.' },
                { id: '2', text: 'Sí, muestras más grandes decaen más despacio.' }
              ],
              correctId: '1',
              reinforcement: '¡Exacto! La vida media es invariante con la masa.'
            }
          }
        };

        setDynamicQuestion(newMCQ);
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
        setIsCorrect(null);
        setIsInMicroClass(false);
      }
    } catch (err) {
      console.error('Failed to generate dynamic question:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Handle formative check inside Micro-Class
  const handleFormativeAnswer = (optId: string) => {
    setFormativeSelectedId(optId);
    if (optId === currentQ.microClass.formativeQuestion.correctId) {
      setIsFormativeResolved(true);
      sound.playSuccess();
      onXPBoost(75);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Track Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
              TEMA 2.3 EVALUACIÓN
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {currentQ.subtopic}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {t.topicTitle}
          </h2>
        </div>

        {/* Progress & Dynamic Gemini Generator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-bold">{currentIndex + 1}</span>
            <span className="text-slate-500">/ {questions.length}</span>
          </div>

          <button
            onClick={handleGenerateDynamicChallenge}
            disabled={isGeneratingAI}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
          >
            {isGeneratingAI ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>{isGeneratingAI ? t.generatingAI : t.generateDynamicAI}</span>
          </button>
        </div>
      </div>

      {/* Main Single-Question Presentation Card */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-800/90 shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950">
        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              {t.questionIndex} #{currentIndex + 1}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid (A, B, C, D) */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map(opt => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrectOpt = isAnswerSubmitted && opt.id === currentQ.correctOptionId;
              const isWrongOpt = isAnswerSubmitted && isSelected && !isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 select-none ${
                    isCorrectOpt
                      ? 'bg-emerald-500/15 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-500/20'
                      : isWrongOpt
                      ? 'bg-rose-500/15 border-rose-500/80 text-rose-200'
                      : isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono flex-shrink-0 transition-colors ${
                      isCorrectOpt
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : isWrongOpt
                        ? 'bg-rose-500 text-white font-black'
                        : isSelected
                        ? 'bg-cyan-400 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <div className="flex-1 pt-1 text-sm sm:text-base leading-relaxed">
                    {opt.text}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isAnswerSubmitted && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                <span>{t.submitAnswer}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* High-Energy Success Validation Banner */}
          {isAnswerSubmitted && isCorrect && (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-wide">
                    {t.correctAnswer}
                  </h4>
                  <p className="text-xs text-emerald-300/80 font-mono">
                    +150 Quantum XP • Racha: {streak} 🔥
                  </p>
                </div>
              </div>

              {/* Crisp 1-Sentence Physics Law Reinforcement */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30 font-medium text-sm text-slate-100 leading-relaxed">
                <span className="font-bold text-emerald-400 block mb-1">Principio Físico Fundamental:</span>
                "{currentQ.reinforcement}"
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
                >
                  <span>{isLastQuestion ? t.viewCredentialBtn : t.nextChallenge}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADAPTIVE ERROR HANDLING: THE MICRO-CLASS PROTOCOL */}
      {isInMicroClass && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border-2 border-amber-500/40 bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-900 shadow-2xl space-y-6 animate-fadeIn">
          {/* Micro-class badge */}
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">
                {t.microClassBadge}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              QUANTUM-CORE Micro-Pedagogy
            </span>
          </div>

          {/* 1. Deeply empathetic validation */}
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
              {t.microClassTitle}
            </h4>
            <p className="text-sm text-amber-200/90 leading-relaxed italic">
              "{currentQ.microClass.empatheticValidation}"
            </p>
          </div>

          {/* 2. Powerful 3-sentence intuitive analogy */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {t.analogyHeading}
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {currentQ.microClass.analogy}
            </p>
          </div>

          {/* 3. Simplified formative check question */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              {t.formativeCheckHeading}
            </span>
            <p className="text-sm font-semibold text-white">
              {currentQ.microClass.formativeQuestion.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {currentQ.microClass.formativeQuestion.options.map(fOpt => {
                const isSelected = formativeSelectedId === fOpt.id;
                const isCorrectF = fOpt.id === currentQ.microClass.formativeQuestion.correctId;

                return (
                  <button
                    key={fOpt.id}
                    onClick={() => handleFormativeAnswer(fOpt.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      isSelected && isCorrectF
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                        : isSelected && !isCorrectF
                        ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {fOpt.text}
                  </button>
                );
              })}
            </div>

            {/* Formative reinforcement & Return button */}
            {isFormativeResolved && (
              <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-fadeIn">
                <p className="text-xs text-emerald-300 font-medium">
                  ✓ {currentQ.microClass.formativeQuestion.reinforcement}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-amber-400/20"
                  >
                    <span>{t.returnToChallengeBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
