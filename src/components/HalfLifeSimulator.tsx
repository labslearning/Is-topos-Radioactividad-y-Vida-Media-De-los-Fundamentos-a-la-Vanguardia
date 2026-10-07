import React, { useState, useEffect, useRef } from 'react';
import { isotopePresets } from '../data/curriculum';
import { Language, IsotopeInfo } from '../types';
import { translations } from '../data/translations';
import { sound } from '../utils/sound';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Activity, Clock, ShieldAlert, FlaskConical } from 'lucide-react';

interface Props {
  language: Language;
}

interface AtomState {
  id: number;
  decayed: boolean;
  decayStep?: number;
}

export const HalfLifeSimulator: React.FC<Props> = ({ language }) => {
  const t = translations[language];
  const [selectedIsotope, setSelectedIsotope] = useState<IsotopeInfo>(isotopePresets[0]);
  
  // Grid of 100 atoms
  const TOTAL_ATOMS = 100;
  const [atoms, setAtoms] = useState<AtomState[]>(() => 
    Array.from({ length: TOTAL_ATOMS }, (_, i) => ({ id: i, decayed: false }))
  );
  
  const [halfLivesElapsed, setHalfLivesElapsed] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [geigerAudio, setGeigerAudio] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'sandbox' | 'carbonDating' | 'petScan' | 'thyroidTherapy'>('sandbox');

  // Radiocarbon dating interactive calculator state
  const [measuredC14Percent, setMeasuredC14Percent] = useState<number>(37.5);

  // PET Scan dose calculator state
  const [targetPetDoseMBq, setTargetPetDoseMBq] = useState<number>(370); // standard 370 MBq (10 mCi)
  const [transitMinutes, setTransitMinutes] = useState<number>(120); // 2 hours

  // Thyroid I-131 therapy calculator state
  const [administeredI131DoseMBq, setAdministeredI131DoseMBq] = useState<number>(3700); // 100 mCi = 3700 MBq
  const [daysElapsed, setDaysElapsed] = useState<number>(16); // 2 half-lives approx

  const intervalRef = useRef<number | null>(null);

  // Remaining and decayed counts
  const remainingCount = atoms.filter(a => !a.decayed).length;
  const decayedCount = TOTAL_ATOMS - remainingCount;

  // Single step of half-life decay
  const handleDecayStep = () => {
    setAtoms(prev => {
      const undecayedIndices = prev.map((atom, idx) => (!atom.decayed ? idx : -1)).filter(idx => idx !== -1);
      if (undecayedIndices.length === 0) return prev;

      // Half of remaining should decay stochastically
      const targetToDecay = Math.ceil(undecayedIndices.length / 2);
      
      // Shuffle undecayed
      const shuffled = [...undecayedIndices].sort(() => Math.random() - 0.5);
      const toDecay = new Set(shuffled.slice(0, targetToDecay));

      if (geigerAudio) {
        // Play quick flurry of Geiger clicks
        for (let i = 0; i < Math.min(targetToDecay, 12); i++) {
          setTimeout(() => sound.playGeigerClick(), i * 35 + Math.random() * 20);
        }
      }

      return prev.map((atom, idx) => {
        if (toDecay.has(idx)) {
          return { ...atom, decayed: true, decayStep: halfLivesElapsed + 1 };
        }
        return atom;
      });
    });

    setHalfLivesElapsed(prev => prev + 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAtoms(Array.from({ length: TOTAL_ATOMS }, (_, i) => ({ id: i, decayed: false })));
    setHalfLivesElapsed(0);
  };

  useEffect(() => {
    handleReset();
  }, [selectedIsotope]);

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setAtoms(prev => {
          const undecayed = prev.filter(a => !a.decayed);
          if (undecayed.length <= 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev;
        });
        handleDecayStep();
      }, 1800);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, halfLivesElapsed, geigerAudio]);

  // Theoretical decay formula
  const theoreticalRemainingPercent = Math.pow(0.5, halfLivesElapsed) * 100;

  // Calculate simulated real time
  const formatElapsedTime = () => {
    const totalTimeVal = halfLivesElapsed * selectedIsotope.halfLifeValue;
    return `${totalTimeVal.toLocaleString()} ${selectedIsotope.halfLifeUnit}`;
  };

  // Archaeology formula: t = -t½ * ln(N/N0) / ln(2)
  const calculateArchaeologicalAge = (fractionPercent: number) => {
    const fraction = fractionPercent / 100;
    if (fraction <= 0) return 'Exceeds measurable threshold (~55,000 years)';
    const age = -5730 * (Math.log(fraction) / Math.LN2);
    return Math.round(age);
  };

  // PET dose formula: N0 = N(t) * 2^(t / t½)
  const calculateInitialPetDose = (targetDose: number, transitMins: number) => {
    const tHalf = 109.7;
    const factor = Math.pow(2, transitMins / tHalf);
    return Math.round(targetDose * factor);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and isotope selector */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                TOPIC 2.3 LABORATORY
              </span>
              <span className="text-xs text-slate-400 font-mono">N(t) = N₀ · (½)^(t/t½)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t.halfLifeLabTitle}</h2>
            <p className="text-sm text-slate-300 max-w-2xl">{t.halfLifeLabDesc}</p>
          </div>

          {/* Sub-tabs for applications */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'sandbox' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Kinetic Sandbox
            </button>
            <button
              onClick={() => setActiveTab('carbonDating')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'carbonDating' ? 'bg-amber-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {t.carbonDatingTool}
            </button>
            <button
              onClick={() => setActiveTab('petScan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'petScan' ? 'bg-purple-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              {t.petScanTool}
            </button>
            <button
              onClick={() => setActiveTab('thyroidTherapy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'thyroidTherapy' ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Terapia Tiroides (I-131)
            </button>
          </div>
        </div>

        {/* Isotope spec chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap">{t.selectIsotope}:</span>
          {isotopePresets.map(iso => (
            <button
              key={iso.id}
              onClick={() => setSelectedIsotope(iso)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-2 ${
                selectedIsotope.id === iso.id
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="font-bold text-sm text-cyan-400">{iso.symbol}</span>
              <span>{iso.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">({iso.halfLifeDisplay})</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 100-Atom Stochastic Lattice Grid */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                <span className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                  Nucleus Lattice Specimen ({selectedIsotope.symbol})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGeigerAudio(!geigerAudio)}
                  title={geigerAudio ? t.soundOn : t.soundOff}
                  className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
                    geigerAudio
                      ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/50'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  {geigerAudio ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  <span className="hidden sm:inline font-mono">Geiger</span>
                </button>
              </div>
            </div>

            {/* 10x10 Grid */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 my-2">
              <div className="grid grid-cols-10 gap-1.5 sm:gap-2 max-w-md mx-auto aspect-square">
                {atoms.map(atom => (
                  <div
                    key={atom.id}
                    className={`relative rounded-md flex items-center justify-center transition-all duration-500 text-[10px] font-mono font-bold select-none ${
                      !atom.decayed
                        ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-slate-950 shadow-sm shadow-cyan-500/50 scale-100 hover:scale-105'
                        : 'bg-slate-900 text-purple-400/70 border border-purple-500/20 scale-90 opacity-70'
                    }`}
                  >
                    {!atom.decayed ? (
                      <span className="text-[9px] drop-shadow-sm">{selectedIsotope.atomicNumber}</span>
                    ) : (
                      <span className="text-[8px] text-purple-400/60">●</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecayStep}
                  disabled={remainingCount === 0 || isPlaying}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  {t.decayStepBtn}
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={remainingCount === 0}
                  className={`px-3 py-2.5 rounded-xl border font-medium text-xs flex items-center gap-1.5 transition-all ${
                    isPlaying
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? t.pause : t.autoPlay}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-100 transition-all"
                  title={t.resetSimBtn}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-cyan-400 shadow-sm shadow-cyan-400 inline-block" />
                  <span className="text-slate-300">Parent: {remainingCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-purple-900 border border-purple-500/40 inline-block" />
                  <span className="text-slate-400">Daughter: {decayedCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Exponential Decay Mathematical Visualizer */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Realtime stats card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Decay Dynamics & Kinetics
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-mono block mb-1">{t.halfLivesPassed}</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">{halfLivesElapsed} <span className="text-xs text-slate-500 font-normal">t½</span></span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-mono block mb-1">{t.elapsedTime}</span>
                  <span className="text-lg font-bold font-mono text-slate-100">{formatElapsedTime()}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-mono block mb-1">{t.remainingNuclei}</span>
                  <span className="text-xl font-bold font-mono text-cyan-300">{remainingCount}% <span className="text-xs text-slate-500">simulated</span></span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-mono block mb-1">{t.theoreticalPercent}</span>
                  <span className="text-xl font-bold font-mono text-amber-300">{theoreticalRemainingPercent.toFixed(2)}%</span>
                </div>
              </div>

              {/* Dynamic SVG Plot of Exponential Decay */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 relative">
                <div className="text-[11px] font-mono text-slate-400 mb-2 flex justify-between">
                  <span>Theoretical Exponential Decay Curve</span>
                  <span className="text-cyan-400">N(t) = N₀ · 2^(-t/t½)</span>
                </div>
                
                <svg viewBox="0 0 300 130" className="w-full h-32 overflow-visible">
                  {/* Grid Lines */}
                  <line x1="30" y1="10" x2="290" y2="10" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="30" y1="37.5" x2="290" y2="37.5" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="30" y1="65" x2="290" y2="65" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="30" y1="92.5" x2="290" y2="92.5" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="30" y1="110" x2="290" y2="110" stroke="#475569" strokeWidth="1" />
                  <line x1="30" y1="10" x2="30" y2="110" stroke="#475569" strokeWidth="1" />

                  {/* Axis labels */}
                  <text x="25" y="15" fill="#64748b" fontSize="8" textAnchor="end">100%</text>
                  <text x="25" y="68" fill="#64748b" fontSize="8" textAnchor="end">50%</text>
                  <text x="25" y="95" fill="#64748b" fontSize="8" textAnchor="end">25%</text>
                  <text x="30" y="122" fill="#64748b" fontSize="8" textAnchor="middle">0</text>
                  <text x="95" y="122" fill="#64748b" fontSize="8" textAnchor="middle">1 t½</text>
                  <text x="160" y="122" fill="#64748b" fontSize="8" textAnchor="middle">2 t½</text>
                  <text x="225" y="122" fill="#64748b" fontSize="8" textAnchor="middle">3 t½</text>
                  <text x="290" y="122" fill="#64748b" fontSize="8" textAnchor="middle">4 t½</text>

                  {/* Smooth curve: (30,10) to (95, 60) to (160, 85) to (225, 97.5) to (290, 103.75) */}
                  <path
                    d="M 30,10 C 60,35 75,52 95,60 C 125,72 145,80 160,85 C 190,92 210,95 225,97.5 C 255,101 270,102.5 290,103.75"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  />

                  {/* Current Position Marker */}
                  {halfLivesElapsed <= 4 && (
                    <circle
                      cx={30 + Math.min(halfLivesElapsed, 4) * 65}
                      cy={110 - (theoreticalRemainingPercent / 100) * 100}
                      r="5"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="animate-pulse"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Isotope Physical Details */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/40 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <ShieldAlert className="w-4 h-4" />
                  {selectedIsotope.applicationTitle}
                </span>
                <span className="font-mono text-purple-300">{selectedIsotope.decayType}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedIsotope.applicationDescription}</p>
              <div className="pt-2 border-t border-slate-800 text-slate-400">
                <span className="font-semibold text-slate-300">Target Daughter: </span>
                <span className="text-purple-300 font-mono">{selectedIsotope.daughterNucleus}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Radiocarbon Dating Tool */}
      {activeTab === 'carbonDating' && (
        <div className="glass-panel rounded-2xl p-8 border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 space-y-6">
          <div className="max-w-2xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ARCHAEOLOGICAL CARBON-14 CHRONOLOGY
            </span>
            <h3 className="text-2xl font-bold text-white mt-2 mb-2">{t.relicAgeCalc}</h3>
            <p className="text-sm text-slate-300">
              When an ancient organism dies, its ¹⁴C intake drops to zero. With t½ = 5,730 years, measuring the residual ¹⁴C activity unlocks the exact biological epoch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950/70 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-slate-300">{t.measuredC14}</label>
                <span className="text-xl font-bold font-mono text-amber-400">{measuredC14Percent}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="100"
                step="0.5"
                value={measuredC14Percent}
                onChange={e => setMeasuredC14Percent(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0.5% (~43,000 yrs ago)</span>
                <span>50% (5,730 yrs ago)</span>
                <span>100% (Present day)</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-xl border border-amber-500/30 text-center space-y-2">
              <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block">{t.estimatedAge}</span>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
                {calculateArchaeologicalAge(measuredC14Percent)} <span className="text-base text-amber-400">years BP</span>
              </div>
              <p className="text-xs text-slate-400">
                Formula: t = -5,730 × [ln(N/N₀) / ln(2)]
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PET Scan Tracer Delivery Tool */}
      {activeTab === 'petScan' && (
        <div className="glass-panel rounded-2xl p-8 border border-purple-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/20 space-y-6">
          <div className="max-w-2xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              NUCLEAR MEDICINE RADIO-PHARMACEUTICAL LOGISTICS
            </span>
            <h3 className="text-2xl font-bold text-white mt-2 mb-2">{t.petScanTool}</h3>
            <p className="text-sm text-slate-300">
              Fluorine-18 (t½ = 109.7 min) decays rapidly during transport from the cyclotron bunker to the patient's oncology suite. Calculate production activity so the scan succeeds!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950/70 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">{t.petInitialDose}</label>
                  <span className="text-sm font-bold font-mono text-purple-400">{targetPetDoseMBq} MBq</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="740"
                  step="10"
                  value={targetPetDoseMBq}
                  onChange={e => setTargetPetDoseMBq(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">Transit Duration (Minutes):</label>
                  <span className="text-sm font-bold font-mono text-cyan-400">{transitMinutes} min ({(transitMinutes / 60).toFixed(1)} hrs)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={transitMinutes}
                  onChange={e => setTransitMinutes(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-xl border border-purple-500/30 text-center space-y-2">
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest block">{t.effectiveDose}</span>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
                {calculateInitialPetDose(targetPetDoseMBq, transitMinutes)} <span className="text-base text-purple-400">MBq</span>
              </div>
              <p className="text-xs text-slate-400">
                At t = {transitMinutes} min, decay factor is {(Math.pow(2, transitMinutes / 109.7)).toFixed(2)}x
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Thyroid Therapy Tool */}
      {activeTab === 'thyroidTherapy' && (
        <div className="glass-panel rounded-2xl p-8 border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/20 space-y-6">
          <div className="max-w-2xl">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              TERAPIA TIROIDEA METABÓLICA CON YODO-131
            </span>
            <h3 className="text-2xl font-bold text-white mt-2 mb-2">Simulador de Dosimetría y Decaimiento Tisular (¹³¹I)</h3>
            <p className="text-sm text-slate-300">
              El Yodo-131 tiene t½ = 8.02 días y emite radiación beta destructiva que recorre 1-2 mm en la glándula tiroides. Calcula la retención y la actividad residual tras la administración oral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950/70 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">Dosis Administrada Inicialmente (MBq):</label>
                  <span className="text-sm font-bold font-mono text-emerald-400">{administeredI131DoseMBq} MBq (~{(administeredI131DoseMBq / 37).toFixed(0)} mCi)</span>
                </div>
                <input
                  type="range"
                  min="370"
                  max="7400"
                  step="370"
                  value={administeredI131DoseMBq}
                  onChange={e => setAdministeredI131DoseMBq(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">Días Transcurridos desde la Dosis:</label>
                  <span className="text-sm font-bold font-mono text-cyan-400">{daysElapsed} días ({(daysElapsed / 8.02).toFixed(1)} vidas medias)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="64"
                  step="2"
                  value={daysElapsed}
                  onChange={e => setDaysElapsed(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-xl border border-emerald-500/30 text-center space-y-2">
              <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest block">Actividad Residual en Tiroides</span>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
                {Math.round(administeredI131DoseMBq * Math.pow(0.5, daysElapsed / 8.02))} <span className="text-base text-emerald-400">MBq</span>
              </div>
              <p className="text-xs text-slate-400">
                Porcentaje restante: {(Math.pow(0.5, daysElapsed / 8.02) * 100).toFixed(1)}% de la dosis terapéutica
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
