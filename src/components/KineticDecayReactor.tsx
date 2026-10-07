import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';
import { isotopePresets } from '../data/curriculum';
import { IsotopeInfo } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Thermometer, 
  Gauge, 
  Activity, 
  Volume2, 
  VolumeX, 
  Zap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface NuclearAtom {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  decayed: boolean;
  decayTime: number | null;
  transmuting: boolean;
  transmuteFrame: number;
}

export const KineticDecayReactor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Isotope Specimen
  const [selectedIsotope, setSelectedIsotope] = useState<IsotopeInfo>(isotopePresets[0]); // C-14 default

  // Reactor Controls
  const [totalNucleiCount, setTotalNucleiCount] = useState<number>(150);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x, 2x, 5x
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Environmental Stress Test Dials
  const [temperatureKelvin, setTemperatureKelvin] = useState<number>(300); // 300K room temp
  const [pressureAtm, setPressureAtm] = useState<number>(1); // 1 atm

  // Real-time HUD Metrics
  const [elapsedSimulationSeconds, setElapsedSimulationSeconds] = useState<number>(0);
  const [currentUndecayed, setCurrentUndecayed] = useState<number>(150);
  const [currentDecayed, setCurrentDecayed] = useState<number>(0);
  const [historyData, setHistoryData] = useState<{ time: number; remaining: number; theoretical: number }[]>([]);

  // Internal physics refs
  const atomsRef = useRef<NuclearAtom[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTickTime = useRef<number>(Date.now());

  // Initialize nuclei
  const initReactorAtoms = (count: number) => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 600;
    const height = canvas ? canvas.height : 380;

    const list: NuclearAtom[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        x: 30 + Math.random() * (width - 60),
        y: 30 + Math.random() * (height - 60),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 6.5,
        decayed: false,
        decayTime: null,
        transmuting: false,
        transmuteFrame: 0,
      });
    }

    atomsRef.current = list;
    setCurrentUndecayed(count);
    setCurrentDecayed(0);
    setElapsedSimulationSeconds(0);
    setHistoryData([{ time: 0, remaining: count, theoretical: count }]);
  };

  useEffect(() => {
    initReactorAtoms(totalNucleiCount);
  }, [selectedIsotope, totalNucleiCount]);

  // Main canvas animation and stochastic decay loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTickTime.current) / 1000;
      lastTickTime.current = now;

      // Clear containment vessel
      ctx.fillStyle = 'rgba(2, 6, 23, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Magnetic Containment Grid Lines
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Containment Force Field Ring
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

      const atoms = atomsRef.current;
      let undecayedCount = 0;
      let decayedCount = 0;

      // Effective half-life duration in simulated seconds
      const simulatedHalfLifeSeconds = 12 / simSpeed;
      const decayProbabilityPerSec = Math.LN2 / simulatedHalfLifeSeconds;

      if (isRunning) {
        setElapsedSimulationSeconds(prev => prev + dt * simSpeed);
      }

      // Thermal velocity multiplier based on temperature (demonstrating invariance of t½)
      const thermalSpeedMultiplier = Math.sqrt(temperatureKelvin / 300);

      // Update & Draw Each Atom
      for (let i = 0; i < atoms.length; i++) {
        const atom = atoms[i];

        if (isRunning) {
          // Move atom with thermal Brownian motion
          atom.x += atom.vx * thermalSpeedMultiplier;
          atom.y += atom.vy * thermalSpeedMultiplier;

          // Wall bounce
          if (atom.x - atom.radius < 20) { atom.x = 20 + atom.radius; atom.vx *= -1; }
          if (atom.x + atom.radius > canvas.width - 20) { atom.x = canvas.width - 20 - atom.radius; atom.vx *= -1; }
          if (atom.y - atom.radius < 20) { atom.y = 20 + atom.radius; atom.vy *= -1; }
          if (atom.y + atom.radius > canvas.height - 20) { atom.y = canvas.height - 20 - atom.radius; atom.vy *= -1; }

          // Stochastic quantum decay check: P = 1 - e^(-lambda * dt)
          if (!atom.decayed) {
            const shouldDecay = Math.random() < decayProbabilityPerSec * dt;
            if (shouldDecay) {
              atom.decayed = true;
              atom.transmuting = true;
              atom.transmuteFrame = 15;
              if (audioEnabled && Math.random() < 0.6) {
                sound.playGeigerClick();
              }
            }
          }
        }

        // Count states
        if (atom.decayed) {
          decayedCount++;
        } else {
          undecayedCount++;
        }

        // Draw atom
        ctx.save();
        if (atom.transmuting && atom.transmuteFrame > 0) {
          // Flash burst when decaying into daughter
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 20;
          ctx.fill();
          atom.transmuteFrame--;
          if (atom.transmuteFrame <= 0) atom.transmuting = false;
        } else if (!atom.decayed) {
          // Parent radioactive nucleus: Glowing Cyan
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 8;
          ctx.fill();

          // Subatomic core
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else {
          // Decayed stable daughter nucleus: Deep Purple
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.radius * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = '#a855f7';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 3;
          ctx.fill();
        }
        ctx.restore();
      }

      setCurrentUndecayed(undecayedCount);
      setCurrentDecayed(decayedCount);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, simSpeed, temperatureKelvin, pressureAtm, audioEnabled]);

  // Periodic history logger for graph
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setHistoryData(prev => {
        const time = prev.length;
        const theoretical = totalNucleiCount * Math.pow(0.5, time / 6);
        return [...prev.slice(-35), { time, remaining: currentUndecayed, theoretical }];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isRunning, currentUndecayed, totalNucleiCount]);

  // Reset or inject more fuel
  const handleInjectFuel = () => {
    atomsRef.current = atomsRef.current.map(a => ({
      ...a,
      decayed: false,
      transmuting: false,
    }));
    sound.playQuantumSpin();
  };

  const handleReset = () => {
    initReactorAtoms(totalNucleiCount);
    sound.playQuantumSpin();
  };

  // Activity calculation in Becquerels (Bq)
  const simulatedActivityBq = Math.round(currentUndecayed * (Math.LN2 / (12 / simSpeed)) * 10);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                LABORATORIO 2: REACTOR CINÉTICO & CRISOL ESTOCÁSTICO
              </span>
              <span className="text-xs text-slate-400 font-mono">N(t) = N₀ · 2^(-t/t½)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Reactor de Confinamiento y Cinética Cuántica
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Prueba experimentalmente la invariancia de la vida media. Altera la temperatura y la presión ambiental para comprobar en vivo que el decaimiento radiactivo es inmune a factores químicos y térmicos.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Padre Radiactivo</span>
              <span className="text-lg font-bold text-cyan-400">{currentUndecayed}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Hijo Estable</span>
              <span className="text-lg font-bold text-purple-400">{currentDecayed}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Actividad Estimada</span>
              <span className="text-lg font-bold text-emerald-400">{simulatedActivityBq} <span className="text-xs font-normal">Bq</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 2D Particle Physics Containment Vessel */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-4 border border-slate-800 space-y-4 bg-slate-950/80">
          <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={700}
              height={380}
              className="w-full h-auto block aspect-[70/38]"
            />

            {/* In-Vessel HUD controls */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 backdrop-blur-md transition-all ${
                  audioEnabled ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300' : 'bg-slate-900/80 border-slate-800 text-slate-500'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="font-mono text-[10px]">Geiger</span>
              </button>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-md transition-all ${
                  isRunning ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'PAUSAR' : 'ACTIVAR'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all backdrop-blur-md"
                title="Reiniciar reactor"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom HUD info in canvas */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400" />
                  Padre: {selectedIsotope.name} ({currentUndecayed})
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                  Hijo: {selectedIsotope.daughterNucleus.split(' ')[0]} ({currentDecayed})
                </span>
              </div>
              <span className="text-amber-400 font-bold">
                Restante: {((currentUndecayed / totalNucleiCount) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Real-time Oscilloscope Curve */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-cyan-400 flex items-center gap-1.5 font-bold uppercase">
                <Activity className="w-4 h-4" />
                Osciloscopio Cinético: Curva Estocástica vs Teórica
              </span>
              <span className="text-slate-400">N(t) = N₀ · e^(-λt)</span>
            </div>

            {/* SVG mini graph */}
            <div className="h-24 w-full bg-slate-950 rounded-lg p-2 border border-slate-800/80 relative">
              <svg viewBox="0 0 400 80" className="w-full h-full overflow-visible">
                {/* Horizontal guide lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#1e293b" strokeDasharray="2,2" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#1e293b" strokeDasharray="2,2" />

                {/* Theoretical Smooth Curve */}
                <path
                  d="M 10,10 Q 150,55 390,75"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />

                {/* Simulated Real Points */}
                {historyData.map((d, idx) => {
                  const x = 10 + (idx / Math.max(1, historyData.length - 1)) * 380;
                  const y = 80 - (d.remaining / totalNucleiCount) * 70;
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill="#06b6d4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Quantum Invariance Experiment Dials */}
        <div className="lg:col-span-4 space-y-6">
          {/* Specimen selector */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              1. Cargar Isótopo de Prueba
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {isotopePresets.slice(0, 4).map(iso => (
                <button
                  key={iso.id}
                  onClick={() => setSelectedIsotope(iso)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedIsotope.id === iso.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono text-sm block">{iso.symbol}</span>
                  <span className="text-[10px] text-slate-500 block">{iso.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Environmental Stress Test (Temperature & Pressure) */}
          <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-gradient-to-b from-slate-900 to-amber-950/20 space-y-4">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase font-mono">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span>2. Test de Invarianza Ambiental</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
              Prueba someter los átomos a frío criogénico o calor estelar. Las partículas rebotarán violentamente, pero <strong className="text-amber-300">la vida media jamás variará</strong>.
            </p>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Temperatura del Núcleo:</span>
                <span className="font-bold text-amber-300">{temperatureKelvin} K</span>
              </div>
              <input
                type="range"
                min="5"
                max="3000"
                step="50"
                value={temperatureKelvin}
                onChange={e => setTemperatureKelvin(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>5 K (Criogénico)</span>
                <span>300 K (Ambiente)</span>
                <span>3,000 K (Estelar)</span>
              </div>
            </div>

            {/* Pressure Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Presión Atmosférica:</span>
                <span className="font-bold text-cyan-300">{pressureAtm} atm</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="200"
                value={pressureAtm}
                onChange={e => setPressureAtm(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Invarianza cuántica confirmada: λ y t½ permanecen 100% inalterables.</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              3. Operaciones de Combustible
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleInjectFuel}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Recargar Núcleos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
