import React, { useState } from 'react';
import { conceptLessons, decayModesData } from '../data/concepts23';
import { Language, InteractiveConceptLesson } from '../types';
import { sound } from '../utils/sound';
import { 
  Sparkles, 
  Atom, 
  Shield, 
  Activity, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Flame,
  Zap,
  Info,
  Scale
} from 'lucide-react';

interface Props {
  language: Language;
  onXPBoost: (amount: number) => void;
}

export const ConceptsMasterclass: React.FC<Props> = ({ language, onXPBoost }) => {
  const lessons = conceptLessons[language] || conceptLessons.es;
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const currentLesson = lessons[activeLessonIndex];

  // Dynamic Isotope Builder state
  const [protons, setProtons] = useState<number>(6); // Carbon Z=6
  const [neutrons, setNeutrons] = useState<number>(6); // C-12 default

  // Radiation Chamber state
  const [selectedRay, setSelectedRay] = useState<'alpha' | 'beta-minus' | 'gamma'>('alpha');
  const [activeShields, setActiveShields] = useState<{ paper: boolean; aluminum: boolean; lead: boolean }>({
    paper: true,
    aluminum: true,
    lead: true,
  });

  // Carbon dating sample presets
  const [selectedRelic, setSelectedRelic] = useState<'scrolls' | 'oetzi' | 'chauvet' | 'custom'>('scrolls');
  const [customC14Percent, setCustomC14Percent] = useState<number>(78);

  // Formative check state
  const [formativeAnswer, setFormativeAnswer] = useState<string | null>(null);
  const [formativeDone, setFormativeDone] = useState<boolean>(false);

  // Calculate isotope properties
  const massNumber = protons + neutrons;
  const nzRatio = parseFloat((neutrons / protons).toFixed(2));
  
  // Element symbol helper
  const getElementSymbol = (z: number) => {
    switch (z) {
      case 1: return 'H';
      case 6: return 'C';
      case 7: return 'N';
      case 8: return 'O';
      case 9: return 'F';
      case 53: return 'I';
      case 92: return 'U';
      default: return 'X';
    }
  };

  const getElementName = (z: number) => {
    switch (z) {
      case 1: return 'Hidrógeno';
      case 6: return 'Carbono';
      case 7: return 'Nitrógeno';
      case 8: return 'Oxígeno';
      case 9: return 'Flúor';
      case 53: return 'Yodo';
      case 92: return 'Uranio';
      default: return 'Elemento';
    }
  };

  // Stability evaluator
  const evaluateStability = (z: number, n: number) => {
    if (z === 1) {
      if (n === 0) return { stable: true, desc: 'Protio (¹H) - 99.98% de abundancia, 100% estable.' };
      if (n === 1) return { stable: true, desc: 'Deuterio (²H) - 0.015% de abundancia, estable (agua pesada).' };
      if (n === 2) return { stable: false, desc: 'Tritio (³H) - Inestable radiactivo (t½ = 12.3 años, emisor β⁻).' };
      return { stable: false, desc: 'Altamente inestable, desintegración por emisión neutrónica instantánea.' };
    }
    if (z === 6) {
      if (n === 6) return { stable: true, desc: 'Carbono-12 (¹²C) - 98.9% de abundancia, nuclearmente 100% estable.' };
      if (n === 7) return { stable: true, desc: 'Carbono-13 (¹³C) - 1.1% de abundancia natural, estable (espin nuclear 1/2).' };
      if (n === 8) return { stable: false, desc: 'Carbono-14 (¹⁴C) - Radioisótopo inestable (t½ = 5,730 años, emisor β⁻).' };
      return { stable: false, desc: 'Fuera del cinturón de estabilidad nuclear.' };
    }
    if (z === 9) {
      if (n === 10) return { stable: true, desc: 'Flúor-19 (¹⁹F) - 100% estable, único isótopo natural.' };
      if (n === 9) return { stable: false, desc: 'Flúor-18 (¹⁸F) - Radioisótopo inestable (t½ = 109.7 min, emisor β⁺ de positrones para PET).' };
      return { stable: false, desc: 'Radioisótopo inestable.' };
    }
    return { stable: nzRatio >= 1 && nzRatio <= 1.5, desc: nzRatio >= 1 && nzRatio <= 1.5 ? 'Dentro de la zona de estabilidad' : 'Fuera del cinturón de estabilidad nuclear' };
  };

  const stabilityInfo = evaluateStability(protons, neutrons);

  // Relic age calculation
  const getRelicDetails = () => {
    switch (selectedRelic) {
      case 'scrolls':
        return { name: 'Rollos del Mar Muerto (Qumrán)', c14: 78.5, age: 2050, desc: 'Manuscritos bíblicos en pergamino orgánico.' };
      case 'oetzi':
        return { name: 'Ötzi el Hombre de Hielo (Alpes)', c14: 52.8, age: 5300, desc: 'Momia natural congelada en glaciar alpino neolítico.' };
      case 'chauvet':
        return { name: 'Pinturas Rupestres de Chauvet (Francia)', c14: 1.5, age: 36000, desc: 'Carbón vegetal de hogueras en cueva paleolítica.' };
      default:
        const age = Math.round(-5730 * (Math.log(customC14Percent / 100) / Math.LN2));
        return { name: 'Muestra Orgánica Personalizada', c14: customC14Percent, age: age > 0 ? age : 0, desc: 'Cálculo cinético en tiempo real.' };
    }
  };

  const relicData = getRelicDetails();

  // Radiation ray penetration logic
  const checkPenetration = () => {
    if (selectedRay === 'alpha') {
      if (activeShields.paper) return 'DETENIDO POR EL PAPEL (Penetración: < 0.05 mm)';
      if (activeShields.aluminum) return 'DETENIDO POR EL ALUMINIO';
      if (activeShields.lead) return 'DETENIDO POR EL PLOMO';
      return 'ATRAVIESA LIBREMENTE';
    }
    if (selectedRay === 'beta-minus') {
      if (activeShields.paper) {
        if (activeShields.aluminum) return 'ATRAVIESA EL PAPEL → DETENIDO POR EL ALUMINIO';
        if (activeShields.lead) return 'ATRAVIESA EL PAPEL → DETENIDO POR EL PLOMO';
        return 'ATRAVIESA EL PAPEL Y SIGUE ADELANTE';
      }
      if (activeShields.aluminum) return 'DETENIDO POR EL ALUMINIO';
      if (activeShields.lead) return 'DETENIDO POR EL PLOMO';
      return 'ATRAVIESA LIBREMENTE';
    }
    if (selectedRay === 'gamma') {
      if (activeShields.lead) return 'ATRAVIESA PAPEL Y ALUMINIO → DETENIDO POR EL PLOMO';
      return 'ATRAVIESA PAPEL Y ALUMINIO SIN DETENERSE (REQUIERE PLOMO DENSO)';
    }
    return '';
  };

  const handleLessonChange = (idx: number) => {
    setActiveLessonIndex(idx);
    setFormativeAnswer(null);
    setFormativeDone(false);
    sound.playQuantumSpin();
  };

  const handleFormativeSubmit = (optId: string) => {
    setFormativeAnswer(optId);
    if (optId === currentLesson.quickFormativeCheck.correctId) {
      setFormativeDone(true);
      sound.playSuccess();
      onXPBoost(100);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Masterclass Hero Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>TEMA 2.3: MASTERCLASS TEÓRICA DINÁMICA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Isótopos, Radioactividad y Vida Media: De los Fundamentos a la Vanguardia
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explora visual e interactivamente la arquitectura del núcleo, el cinturón de estabilidad, las 4 partículas de desintegración y sus aplicaciones clave en arqueología y oncología nuclear.
            </p>
          </div>

          {/* Quick chapter navigator pill track */}
          <div className="flex flex-wrap lg:flex-col gap-2">
            <span className="text-xs font-mono text-slate-400">Capítulos de Aprendizaje:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonChange(idx)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center ${
                    activeLessonIndex === idx
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40 scale-110'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                  title={lesson.title}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Concept Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Deep Pedagogical Lesson & Analogy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 bg-slate-900/60">
            {/* Lesson Title & Badge */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                {currentLesson.badge}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {currentLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {currentLesson.subtitle}
              </p>
            </div>

            {/* Intuitive Nobel Analogy Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase font-mono">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>La Analogía Intuitiva del Profesor</span>
              </div>
              <p className="text-sm text-amber-100/90 leading-relaxed italic">
                "{currentLesson.intuitiveAnalogy}"
              </p>
            </div>

            {/* Deep Conceptual Points */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Principios Físicos Rigurosos:
              </h3>
              {currentLesson.deepExplanation.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    {pIdx + 1}
                  </span>
                  <div>{point}</div>
                </div>
              ))}
            </div>

            {/* Key Formula Box */}
            {currentLesson.keyFormula && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 uppercase">Ecuación Fundamental:</span>
                <span className="text-cyan-300 font-bold text-sm tracking-wide">
                  {currentLesson.keyFormula}
                </span>
              </div>
            )}

            {/* Formative Intuition Check */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                <HelpCircle className="w-4 h-4" />
                <span>Chequeo Rápido de Intuición</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {currentLesson.quickFormativeCheck.question}
              </p>
              <div className="space-y-2 pt-1">
                {currentLesson.quickFormativeCheck.options.map(opt => {
                  const isSelected = formativeAnswer === opt.id;
                  const isCorrect = opt.id === currentLesson.quickFormativeCheck.correctId;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleFormativeSubmit(opt.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                        isSelected && isCorrect
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                          : isSelected && !isCorrect
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono font-bold text-slate-400">{opt.id})</span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {formativeDone && (
                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{currentLesson.quickFormativeCheck.reinforcement} (+100 XP)</span>
                </div>
              )}
            </div>

            {/* Next Chapter Button */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handleLessonChange(Math.max(0, activeLessonIndex - 1))}
                disabled={activeLessonIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-300 transition-all"
              >
                ← Capítulo Anterior
              </button>

              <button
                onClick={() => handleLessonChange(Math.min(lessons.length - 1, activeLessonIndex + 1))}
                disabled={activeLessonIndex === lessons.length - 1}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20"
              >
                <span>Siguiente Capítulo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Demos according to the active chapter */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. DYNAMIC ISOTOPE BUILDER & STABILITY BELT */}
          {activeLessonIndex === 0 && (
            <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-slate-900/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Atom className="w-4 h-4" />
                  Laboratorio de Isótopos y Cinturón de Estabilidad
                </span>
                <span className="text-[10px] font-mono text-slate-400">Interactúa en Vivo</span>
              </div>

              {/* Element Preset Chooser */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Elemento:</span>
                <button
                  onClick={() => { setProtons(1); setNeutrons(0); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${protons === 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
                >
                  Hidrógeno (Z=1)
                </button>
                <button
                  onClick={() => { setProtons(6); setNeutrons(6); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${protons === 6 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
                >
                  Carbono (Z=6)
                </button>
                <button
                  onClick={() => { setProtons(9); setNeutrons(10); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${protons === 9 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
                >
                  Flúor (Z=9)
                </button>
              </div>

              {/* Nuclear Subatomic Sliders */}
              <div className="space-y-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-cyan-400">Protones (Z - Carga positiva):</span>
                    <span className="font-bold text-white">{protons}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={protons}
                    onChange={e => setProtons(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-purple-400">Neutrones (N - Cemento nuclear):</span>
                    <span className="font-bold text-white">{neutrons}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    value={neutrons}
                    onChange={e => setNeutrons(parseInt(e.target.value))}
                    className="w-full accent-purple-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Visual Nuclear Specimen Card */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
                <div className="inline-block px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30">
                  <div className="text-4xl font-extrabold font-mono text-white tracking-wider">
                    <sup className="text-cyan-400 text-xl">{massNumber}</sup>
                    <sub className="text-slate-400 text-xl">{protons}</sub>
                    {getElementSymbol(protons)}
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  Isótopo: <strong className="text-white">{getElementName(protons)}-{massNumber}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Razón N/Z</span>
                    <span className="font-bold text-cyan-400">{nzRatio}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Estado Nuclear</span>
                    <span className={`font-bold ${stabilityInfo.stable ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {stabilityInfo.stable ? 'ESTABLE' : 'RADIOISÓTOPO'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  {stabilityInfo.desc}
                </p>
              </div>
            </div>
          )}

          {/* 2. DYNAMIC RADIATION PENETRATION SHIELD CHAMBER */}
          {activeLessonIndex === 1 && (
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/30 bg-slate-900/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Cámara de Penetración y Blindaje
                </span>
                <span className="text-[10px] font-mono text-slate-400">Simulación Física</span>
              </div>

              {/* Ray selection buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedRay('alpha')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    selectedRay === 'alpha'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Alfa (α)
                </button>
                <button
                  onClick={() => setSelectedRay('beta-minus')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    selectedRay === 'beta-minus'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Beta (β⁻)
                </button>
                <button
                  onClick={() => setSelectedRay('gamma')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    selectedRay === 'gamma'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Gamma (γ)
                </button>
              </div>

              {/* Shield Toggles */}
              <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 block mb-1">Barreras de Blindaje Activas:</span>
                <div className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={activeShields.paper}
                      onChange={e => setActiveShields({ ...activeShields, paper: e.target.checked })}
                      className="accent-cyan-400"
                    />
                    Papel (0.1 mm)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={activeShields.aluminum}
                      onChange={e => setActiveShields({ ...activeShields, aluminum: e.target.checked })}
                      className="accent-purple-400"
                    />
                    Aluminio (3 mm)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={activeShields.lead}
                      onChange={e => setActiveShields({ ...activeShields, lead: e.target.checked })}
                      className="accent-amber-400"
                    />
                    Plomo (5 cm)
                  </label>
                </div>
              </div>

              {/* Visual Ray Simulation Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="h-24 bg-slate-900/90 rounded-lg border border-slate-800/80 p-3 relative flex items-center justify-between overflow-hidden">
                  {/* Source Emitter */}
                  <div className="w-10 h-10 rounded-lg bg-red-600/30 border border-red-500/50 flex items-center justify-center text-[10px] font-mono text-red-300 font-bold">
                    Fuente
                  </div>

                  {/* Barriers */}
                  <div className={`w-3 h-16 rounded transition-all ${activeShields.paper ? 'bg-amber-200/80 border border-amber-300' : 'bg-slate-800/40 border-dashed border border-slate-700'}`} title="Papel" />
                  <div className={`w-4 h-16 rounded transition-all ${activeShields.aluminum ? 'bg-cyan-400/80 border border-cyan-300' : 'bg-slate-800/40 border-dashed border border-slate-700'}`} title="Aluminio" />
                  <div className={`w-6 h-16 rounded transition-all ${activeShields.lead ? 'bg-purple-400/80 border border-purple-300' : 'bg-slate-800/40 border-dashed border border-slate-700'}`} title="Plomo" />

                  {/* Target sensor */}
                  <div className="w-8 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-400">
                    Sensor
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-center font-mono text-xs font-bold text-cyan-300">
                  {checkPenetration()}
                </div>
              </div>
            </div>
          )}

          {/* 3. DYNAMIC HALF-LIFE MATH & EXPONENTIAL DECAY */}
          {activeLessonIndex === 2 && (
            <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-slate-900/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Calculadora Cinética de Decaimiento
                </span>
                <span className="text-[10px] font-mono text-slate-400">N(t) = N₀ · (½)^(t/t½)</span>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between items-center text-slate-300 font-mono">
                  <span>Masa Inicial (N₀):</span>
                  <span className="font-bold text-cyan-400">100.00 gramos</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center font-mono pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">0 t½</span>
                    <span className="font-bold text-white">100 g</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30">
                    <span className="text-[10px] text-slate-500 block">1 t½</span>
                    <span className="font-bold text-cyan-300">50 g</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-purple-500/30">
                    <span className="text-[10px] text-slate-500 block">2 t½</span>
                    <span className="font-bold text-purple-300">25 g</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/30">
                    <span className="text-[10px] text-slate-500 block">3 t½</span>
                    <span className="font-bold text-amber-300">12.5 g</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <span className="font-bold text-white block">La Invariancia Cuántica:</span>
                <p>
                  No importa si tienes 100 kg o 1 nanogramo de muestra: la constante λ jamás cambia. Cada átomo es gobernado por la mecánica probabilística pura, no por el volumen circundante.
                </p>
              </div>
            </div>
          )}

          {/* 4. DYNAMIC CARBON-14 RELIC INVESTIGATION */}
          {activeLessonIndex === 3 && (
            <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 bg-slate-900/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  Investigador Arqueológico de C-14
                </span>
                <span className="text-[10px] font-mono text-slate-400">t½ = 5,730 años</span>
              </div>

              {/* Real Archaeological Case Studies */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">Selecciona Caso Histórico:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedRelic('scrolls')}
                    className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedRelic === 'scrolls' ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Rollos del Mar Muerto
                  </button>
                  <button
                    onClick={() => setSelectedRelic('oetzi')}
                    className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedRelic === 'oetzi' ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Ötzi el Hombre de Hielo
                  </button>
                  <button
                    onClick={() => setSelectedRelic('chauvet')}
                    className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedRelic === 'chauvet' ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Cueva de Chauvet
                  </button>
                </div>
              </div>

              {/* Case Results Box */}
              <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3 text-center">
                <h4 className="font-bold text-white text-sm">{relicData.name}</h4>
                <p className="text-xs text-slate-400 italic">{relicData.desc}</p>
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">C-14 Medido</span>
                    <span className="text-lg font-bold text-amber-400">{relicData.c14}%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Edad Determinada</span>
                    <span className="text-lg font-bold text-white">~{relicData.age.toLocaleString()} años</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. DYNAMIC PET SCAN ANNIHILATION LAB */}
          {activeLessonIndex === 4 && (
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/30 bg-slate-900/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Mecanismo de Aniquilación en Escáner PET
                </span>
                <span className="text-[10px] font-mono text-slate-400">e⁺ + e⁻ → 2γ (511 keV)</span>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-purple-500/30 text-center space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed">
                  El radiofármaco <strong className="text-purple-400">¹⁸F-FDG</strong> se concentra en el tumor. El positrón emitido colisiona con un electrón del tejido:
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center gap-4 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                    Positrón (e⁺)
                  </span>
                  <span className="text-white font-bold">+</span>
                  <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                    Electrón (e⁻)
                  </span>
                  <span className="text-amber-400 font-bold">→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                    2 Fotones γ (511 keV, 180°)
                  </span>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed font-sans text-left bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <span className="text-purple-300 font-bold block mb-1">Detección en Coincidencia:</span>
                  Los detectores en anillo registran simultáneamente ambos fotones gamma a 180°. La línea de respuesta espacial reconstruye la posición exacta del foco tumoral.
                </div>
              </div>
            </div>
          )}

          {/* 6. DYNAMIC IODINE & COBALT THERAPY LAB */}
          {activeLessonIndex === 5 && (
            <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 bg-slate-900/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Comparador Terapéutico: Yodo-131 vs Cobalto-60
                </span>
                <span className="text-[10px] font-mono text-slate-400">Radioterapia Dirigida</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-cyan-400 block font-mono">Yodo-131 (¹³¹I)</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Emisor β⁻ dirigido internamente. Destruye células tiroideas neoplásicas con un radio de alcance celular de 1 a 2 milímetros.
                  </p>
                  <span className="text-slate-500 font-mono text-[10px] block">t½ = 8.02 días</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-purple-400 block font-mono">Cobalto-60 (⁶⁰Co)</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Emisor γ externo de alta energía (1.17 y 1.33 MeV). Empleado en Gamma Knife y esterilización en frío de instrumental médico.
                  </p>
                  <span className="text-slate-500 font-mono text-[10px] block">t½ = 5.27 años</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
