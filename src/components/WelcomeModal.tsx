import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { sound } from '../utils/sound';
import { Atom, Sparkles, ArrowRight, Globe, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  studentName: string;
  onSetStudentName: (name: string) => void;
  onComplete: () => void;
}

export const WelcomeModal: React.FC<Props> = ({
  language,
  onSelectLanguage,
  studentName,
  onSetStudentName,
  onComplete,
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [nameInput, setNameInput] = useState<string>(studentName);

  const t = translations[selectedLang];

  const languagesList: { code: Language; name: string; flag: string; native: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
  ];

  const handleStart = () => {
    onSelectLanguage(selectedLang);
    if (nameInput.trim()) {
      onSetStudentName(nameInput.trim());
    }
    sound.playSuccess();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border-2 border-cyan-500/40 p-6 sm:p-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Atom className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>QUANTUM-CORE AI ONLINE</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.welcomeTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto font-sans">
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* Language Selection Grid */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 block text-center font-bold">
            <Globe className="w-3.5 h-3.5 inline mr-1" />
            {t.selectLanguagePrompt}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {languagesList.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang.code);
                  onSelectLanguage(lang.code);
                  sound.playQuantumSpin();
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 select-none ${
                  selectedLang === lang.code
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-105 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-semibold">{lang.native}</span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Student Call-sign Input */}
        <div className="space-y-2 max-w-md mx-auto">
          <label className="text-xs font-mono text-slate-300 block text-center">
            {t.studentNamePrompt}
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder={t.studentNamePlaceholder}
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-center text-white placeholder:text-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Curriculum Preview Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-w-xl mx-auto pt-1">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 space-y-1">
            <span className="font-bold text-cyan-400 block font-mono">Fundamentos Nucleares</span>
            <p className="text-[11px] text-slate-400">Isótopos (Z vs N), cinturón de estabilidad y los 4 modos de desintegración (Alfa, Beta-, Beta+ y Gamma).</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 space-y-1">
            <span className="font-bold text-purple-400 block font-mono">Cinética & Aplicaciones</span>
            <p className="text-[11px] text-slate-400">Concepto de vida media (t½), datación por Carbono-14, escáner PET con Flúor-18 y radioterapia tiroidea con Yodo-131.</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-cyan-500/25 active:scale-95"
          >
            <span>{t.enterSimulatorBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
