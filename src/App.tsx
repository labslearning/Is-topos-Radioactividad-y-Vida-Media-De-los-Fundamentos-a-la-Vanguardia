import React, { useState, useEffect } from 'react';
import { Language, UserStats } from './types';
import { translations } from './data/translations';
import { sound } from './utils/sound';
import { CloudChamberSimulator } from './components/CloudChamberSimulator';
import { KineticDecayReactor } from './components/KineticDecayReactor';
import { PetScanAnnihilationSimulator } from './components/PetScanAnnihilationSimulator';
import { CarbonDatingSpectrometer } from './components/CarbonDatingSpectrometer';
import { ConceptsMasterclass } from './components/ConceptsMasterclass';
import { ChallengeView } from './components/ChallengeView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { MasteryCertificate } from './components/MasteryCertificate';
import { WelcomeModal } from './components/WelcomeModal';
import { 
  Atom, 
  Flame, 
  Award, 
  Volume2, 
  VolumeX, 
  Globe, 
  Bot, 
  Activity, 
  BookOpen, 
  Sparkles,
  Target,
  Zap,
  Clock,
  FlaskConical,
  Compass,
  RotateCcw
} from 'lucide-react';

type SimulatorStation = 'chamber' | 'reactor' | 'petScan' | 'amsDating' | 'theory' | 'challenges';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('quantum_core_lang');
    return (saved as Language) || 'es';
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('quantum_core_onboarded') === 'true';
  });

  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('quantum_core_student_name') || 'Dra. Marie Curie';
  });

  // Default active station: start directly inside the interactive Cloud Chamber simulator!
  const [activeStation, setActiveStation] = useState<SimulatorStation>('chamber');

  // Audio mute
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Modals & Drawers
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [isMasteryOpen, setIsMasteryOpen] = useState<boolean>(false);

  // Gamification Stats
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('quantum_core_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      xp: 0,
      streak: 1,
      totalAnswered: 0,
      correctAnswers: 0,
      microClassesCompleted: 0,
      masterclassProgress: 0,
      mastered: false,
      certificateHash: `QC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };
  });

  const t = translations[language] || translations.es;

  // Persist state
  useEffect(() => {
    localStorage.setItem('quantum_core_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('quantum_core_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('quantum_core_stats', JSON.stringify(stats));
  }, [stats]);

  const handleToggleAudio = () => {
    const newMuted = !isAudioMuted;
    setIsAudioMuted(newMuted);
    sound.enabled = !newMuted;
  };

  const handleXPBoost = (amount: number) => {
    setStats(prev => ({
      ...prev,
      xp: prev.xp + amount,
      totalAnswered: prev.totalAnswered + 1,
      correctAnswers: prev.correctAnswers + 1,
    }));
  };

  const handleStreakUpdate = (increment: boolean) => {
    setStats(prev => ({
      ...prev,
      streak: increment ? prev.streak + 1 : 1,
    }));
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('quantum_core_onboarded', 'true');
  };

  const handleResetProgress = () => {
    if (window.confirm(t.resetProgress + '?')) {
      const fresh: UserStats = {
        xp: 0,
        streak: 1,
        totalAnswered: 0,
        correctAnswers: 0,
        microClassesCompleted: 0,
        masterclassProgress: 0,
        mastered: false,
        certificateHash: `QC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      };
      setStats(fresh);
      setActiveStation('chamber');
    }
  };

  const languagesList: { code: Language; name: string; flag: string }[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Welcome & Language Selection Modal on first visit */}
      {!hasCompletedOnboarding && (
        <WelcomeModal
          language={language}
          onSelectLanguage={setLanguage}
          studentName={studentName}
          onSetStudentName={setStudentName}
          onComplete={handleOnboardingComplete}
        />
      )}

      {/* Mastery Certificate Modal */}
      <MasteryCertificate
        language={language}
        studentName={studentName}
        isOpen={isMasteryOpen}
        onClose={() => setIsMasteryOpen(false)}
        certificateHash={stats.certificateHash || 'QC-NOBEL-998'}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        language={language}
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        activeTopic="Tema 2.3: Isótopos y radioactividad básica: Concepto de vida media y aplicaciones"
      />

      {/* Futuristic Command Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveStation('chamber')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-purple-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/30 border border-white/20 animate-pulse-subtle">
              <Atom className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-white">
                  QUANTUM-CORE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  SIMULADOR 2.3
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Laboratorio Cuántico de Alta Precisión • CERN / PET / AMS
              </p>
            </div>
          </div>

          {/* Gamification Stats: XP, Streak, Badges */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak flame */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{stats.streak}</span>
              <span className="hidden md:inline font-normal text-amber-400/80">{t.streakLabel}</span>
            </div>

            {/* Quantum XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{stats.xp}</span>
              <span className="hidden md:inline font-normal text-cyan-400/80">{t.xpLabel}</span>
            </div>

            {/* Language Switcher */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-slate-700 transition-all font-medium"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase font-mono">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 hidden group-hover:block animate-fadeIn z-50">
                {languagesList.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      sound.playQuantumSpin();
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      language === item.code ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span>{item.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition-all text-xs ${
                !isAudioMuted
                  ? 'bg-slate-900 text-cyan-400 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title={!isAudioMuted ? t.soundOn : t.soundOff}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Claim Mastery Certificate Button */}
            <button
              onClick={() => setIsMasteryOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">{t.masteryBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Futuristic Simulator Navigation Deck */}
      <nav className="bg-slate-950/75 border-b border-cyan-500/20 px-4 sm:px-8 py-2.5 sticky top-[61px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Lab Station 1 */}
            <button
              onClick={() => setActiveStation('chamber')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeStation === 'chamber'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>1. Cámara de Niebla & Deflexión</span>
            </button>

            {/* Lab Station 2 */}
            <button
              onClick={() => setActiveStation('reactor')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeStation === 'reactor'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>2. Reactor de Vida Media (t½)</span>
            </button>

            {/* Lab Station 3 */}
            <button
              onClick={() => setActiveStation('petScan')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeStation === 'petScan'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>3. Escáner PET & Aniquilación</span>
            </button>

            {/* Lab Station 4 */}
            <button
              onClick={() => setActiveStation('amsDating')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeStation === 'amsDating'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>4. Espectrómetro Láser C-14</span>
            </button>

            {/* Theory Masterclass */}
            <button
              onClick={() => setActiveStation('theory')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeStation === 'theory'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Manual Teórico 2.3</span>
            </button>

            {/* Evaluation Challenges */}
            <button
              onClick={() => setActiveStation('challenges')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeStation === 'challenges'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Desafíos & Micro-Clases</span>
            </button>
          </div>

          {/* AI Terminal Trigger */}
          <button
            onClick={() => setIsAITutorOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-mono">Terminal IA</span>
          </button>
        </div>
      </nav>

      {/* Main Simulation Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {activeStation === 'chamber' && (
          <CloudChamberSimulator />
        )}

        {activeStation === 'reactor' && (
          <KineticDecayReactor />
        )}

        {activeStation === 'petScan' && (
          <PetScanAnnihilationSimulator />
        )}

        {activeStation === 'amsDating' && (
          <CarbonDatingSpectrometer />
        )}

        {activeStation === 'theory' && (
          <ConceptsMasterclass
            language={language}
            onXPBoost={handleXPBoost}
          />
        )}

        {activeStation === 'challenges' && (
          <ChallengeView
            language={language}
            onXPBoost={handleXPBoost}
            onStreakUpdate={handleStreakUpdate}
            streak={stats.streak}
            onShowMastery={() => setIsMasteryOpen(true)}
            isMastered={stats.mastered}
          />
        )}
      </main>

      {/* Floating Action Button for AI Terminal */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAITutorOpen(true)}
          className="p-3.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
        >
          <Bot className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-mono uppercase tracking-wider text-[11px] font-black">
            TERMINAL CUÁNTICO 2.3
          </span>
        </button>
      </div>

      {/* Futuristic Command Deck Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 sm:px-8 py-6 text-xs text-slate-500 text-center font-mono space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <span>Estación 1: Cámara de Niebla & Blindajes</span>
          <span>•</span>
          <span>Estación 2: Reactor Cinético t½</span>
          <span>•</span>
          <span>Estación 3: Escáner PET & Antimateria</span>
          <span>•</span>
          <span>Estación 4: Espectrómetro Láser AMS C-14</span>
          <span>•</span>
          <button onClick={handleResetProgress} className="text-slate-500 hover:text-slate-300 underline">
            {t.resetProgress}
          </button>
        </div>
        <p className="text-[11px] text-slate-400">
          QUANTUM-CORE AI © 2026. Entorno de Simulación Experimental de Alta Fidelidad.
        </p>
      </footer>
    </div>
  );
}
