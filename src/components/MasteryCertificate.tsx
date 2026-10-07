import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, ShieldCheck, Printer, X, Atom, Sparkles } from 'lucide-react';

interface Props {
  language: Language;
  studentName: string;
  isOpen: boolean;
  onClose: () => void;
  certificateHash: string;
}

export const MasteryCertificate: React.FC<Props> = ({
  language,
  studentName,
  isOpen,
  onClose,
  certificateHash,
}) => {
  const t = translations[language];

  useEffect(() => {
    if (isOpen) {
      sound.playMasteryFanfare();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#06b6d4', '#a855f7', '#f59e0b', '#10b981'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString(
    language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl glass-panel rounded-3xl border-2 border-cyan-400/40 p-6 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Glow corners */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Emblem */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-xl shadow-cyan-500/30 border-2 border-white/30 animate-pulse-subtle">
            <Atom className="w-12 h-12 text-slate-950" />
          </div>
        </div>

        {/* Titles */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            {t.credentialSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.credentialTitle}
          </h2>
        </div>

        {/* Recipient */}
        <div className="py-4 border-y border-cyan-500/20 max-w-xl mx-auto space-y-2">
          <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">
            {t.certRecipient}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-300">
            {studentName || 'Quantum Pioneer Researcher'}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pt-1">
            {t.certHonors}
          </p>
        </div>

        {/* Mastered competencies badge pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-200">Tema 2.3: Isótopos y Modos de Desintegración (α, β⁻, β⁺, γ)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/30 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-slate-200">Tema 2.3: Cinética de Vida Media y Aplicaciones (C-14, PET F-18, I-131)</span>
          </div>
        </div>

        {/* Hash & Date metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80 max-w-xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.certHash} <strong className="text-cyan-300 font-bold">{certificateHash}</strong></span>
          </div>
          <div>
            <span>{t.certDate} <strong className="text-slate-200">{currentDate}</strong></span>
          </div>
        </div>

        {/* Print / Export buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-cyan-500/25 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printCertBtn}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
