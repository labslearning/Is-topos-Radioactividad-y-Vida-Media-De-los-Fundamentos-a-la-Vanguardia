import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';
import { 
  Zap, 
  Activity, 
  RotateCcw, 
  Play, 
  Pause, 
  Crosshair, 
  FlaskConical, 
  Clock, 
  Sparkles,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';

interface CoincidenceHit {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
}

export const PetScanAnnihilationSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pharmacokinetics Stage Controls
  const [targetDoseMBq, setTargetDoseMBq] = useState<number>(370); // 370 MBq standard scan dose
  const [transitTimeMinutes, setTransitTimeMinutes] = useState<number>(90); // 1.5 hours transit
  const [tumorLocation, setTumorLocation] = useState<{ x: number; y: number }>({ x: 200, y: 170 });
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [detectedCoincidences, setDetectedCoincidences] = useState<number>(0);
  const [tumorResolvedPercent, setTumorResolvedPercent] = useState<number>(0);

  // Internal animation state
  const coincidencesRef = useRef<CoincidenceHit[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastEventTime = useRef<number>(0);

  // Physics calculations for Fluorine-18 (t½ = 109.7 min)
  const tHalf = 109.7;
  const decayFactor = Math.pow(0.5, transitTimeMinutes / tHalf);
  const requiredProductionDoseMBq = Math.round(targetDoseMBq / decayFactor);
  const remainingPercent = Math.round(decayFactor * 100);

  // Main canvas rendering loop for PET detector ring
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ringCenterX = canvas.width / 2;
    const ringCenterY = canvas.height / 2;
    const ringRadius = 140;

    const render = (timestamp: number) => {
      // Background scan sweep
      ctx.fillStyle = 'rgba(2, 6, 23, 0.28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw PET Ring of Scintillator Crystal Detectors (360 degrees)
      const numCrystals = 64;
      for (let i = 0; i < numCrystals; i++) {
        const angle = (i / numCrystals) * Math.PI * 2;
        const cx = ringCenterX + Math.cos(angle) * ringRadius;
        const cy = ringCenterY + Math.sin(angle) * ringRadius;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1;
        ctx.fillRect(-6, -3, 12, 6);
        ctx.strokeRect(-6, -3, 12, 6);
        ctx.restore();
      }

      // Draw Patient Silhouette in scanner bore
      ctx.beginPath();
      ctx.arc(ringCenterX, ringCenterY, 80, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Render Detected Lines of Response (LOR)
      const hits = coincidencesRef.current;
      for (let i = hits.length - 1; i >= 0; i--) {
        const hit = hits[i];
        hit.alpha -= 0.015;

        ctx.beginPath();
        ctx.moveTo(hit.x1, hit.y1);
        ctx.lineTo(hit.x2, hit.y2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, hit.alpha)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (hit.alpha <= 0) {
          hits.splice(i, 1);
        }
      }

      // Spawn Positron Annihilation Event during active scanning
      if (isScanning && timestamp - lastEventTime.current > 120) {
        lastEventTime.current = timestamp;

        // Originates near tumor center with slight Gaussian drift (positron path length ~ 1mm)
        const drift = 12;
        const originX = tumorLocation.x + (Math.random() - 0.5) * drift;
        const originY = tumorLocation.y + (Math.random() - 0.5) * drift;

        // Two collinear photons at 180°
        const theta = Math.random() * Math.PI * 2;
        const hit1X = ringCenterX + Math.cos(theta) * ringRadius;
        const hit1Y = ringCenterY + Math.sin(theta) * ringRadius;
        const hit2X = ringCenterX + Math.cos(theta + Math.PI) * ringRadius;
        const hit2Y = ringCenterY + Math.sin(theta + Math.PI) * ringRadius;

        hits.push({
          x1: hit1X,
          y1: hit1Y,
          x2: hit2X,
          y2: hit2Y,
          alpha: 1.0,
        });

        // Flash burst at annihilation point
        ctx.beginPath();
        ctx.arc(originX, originY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        setDetectedCoincidences(prev => {
          const next = prev + 1;
          setTumorResolvedPercent(Math.min(100, Math.round((next / 80) * 100)));
          return next;
        });

        if (Math.random() < 0.3) {
          sound.playGeigerClick();
        }
      }

      // Render Reconstructed 3D Tumor Hologram
      if (tumorResolvedPercent > 0) {
        const tumorOpacity = tumorResolvedPercent / 100;
        ctx.beginPath();
        ctx.arc(tumorLocation.x, tumorLocation.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${tumorOpacity * 0.75})`;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = tumorOpacity * 22;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Center crosshair
        ctx.strokeStyle = `rgba(255, 255, 255, ${tumorOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tumorLocation.x - 18, tumorLocation.y);
        ctx.lineTo(tumorLocation.x + 18, tumorLocation.y);
        ctx.moveTo(tumorLocation.x, tumorLocation.y - 18);
        ctx.lineTo(tumorLocation.x, tumorLocation.y + 18);
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`TUMOR SUV: ${(tumorOpacity * 12.4).toFixed(1)}`, tumorLocation.x + 18, tumorLocation.y - 10);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isScanning, tumorLocation, tumorResolvedPercent]);

  const handleResetScan = () => {
    setIsScanning(false);
    setDetectedCoincidences(0);
    setTumorResolvedPercent(0);
    coincidencesRef.current = [];
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check bounds inside patient bore
    const ringCenterX = canvas.width / 2;
    const ringCenterY = canvas.height / 2;
    const dist = Math.hypot(clickX - ringCenterX, clickY - ringCenterY);
    if (dist < 65) {
      setTumorLocation({ x: clickX, y: clickY });
      handleResetScan();
      sound.playQuantumSpin();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-purple-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                LABORATORIO 3: ESCÁNER PET & ANIQUILACIÓN DE ANTIMATERIA
              </span>
              <span className="text-xs text-slate-400 font-mono">e⁺ + e⁻ → 2γ (511 keV, 180°)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Tomografía por Emisión de Positrones (Flúor-18)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Calcula la logística de producción en el ciclotrón, observa la aniquilación cuántica de positrones en el tejido tumoral y reconstruye la imagen 3D por coincidencia temporal de fotones gamma a 180°.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Coincidencias γ</span>
              <span className="text-lg font-bold text-purple-400">{detectedCoincidences}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Resolución 3D</span>
              <span className="text-lg font-bold text-cyan-400">{tumorResolvedPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: PET Scanner Ring Canvas Display */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-4 border border-slate-800 space-y-4 bg-slate-950/80">
          <div className="relative rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              onClick={handleCanvasClick}
              className="w-full h-auto block aspect-[50/40] cursor-pointer"
            />

            {/* Over-canvas Controls */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => setIsScanning(!isScanning)}
                className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all shadow-lg ${
                  isScanning
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                    : 'bg-purple-600 hover:bg-purple-500 border-purple-400 text-white shadow-purple-600/30'
                }`}
              >
                {isScanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isScanning ? 'PAUSAR ESCANEO' : 'INICIAR ESCANEO PET'}</span>
              </button>

              <button
                onClick={handleResetScan}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all backdrop-blur-md"
                title="Reiniciar adquisición"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Canvas Prompt */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80">
              <span className="text-slate-400">💡 Haz clic dentro del paciente para reubicar el tumor</span>
              <span className="text-purple-300 font-bold">Anillo Detector: 64 Cristales LSO</span>
            </div>
          </div>

          {/* Clinical Case Synthesis Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-200 font-semibold font-mono">
              <span className="text-purple-400 flex items-center gap-1.5">
                <Crosshair className="w-4 h-4" />
                Diagnóstico Oncológico en Tiempo Real:
              </span>
              <span className="text-emerald-400 font-bold">{tumorResolvedPercent >= 100 ? 'LOCALIZACIÓN EXACTA CONFIRMADA' : 'ADQUIRIENDO DATOS...'}</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              El trazador <strong className="text-white">¹⁸F-FDG</strong> se concentra selectivamente por el Efecto Warburg. Los fotones gamma de 511 keV son detectados en coincidencia temporal estricta de nanosegundos (Líneas de Respuesta LOR), eliminando el ruido de fondo sin colimadores mecánicos pesados.
            </p>
          </div>
        </div>

        {/* Right: Cyclotron Logistics & Annihilation Physics Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Cyclotron Production & Logistics Simulator */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-cyan-950/20 space-y-4">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase font-mono">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>1. Logística de Ciclotrón (t½ = 109.7 min)</span>
            </div>

            {/* Transit Time Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Tiempo de Transporte Hospitalario:</span>
                <span className="font-bold text-cyan-300">{transitTimeMinutes} minutos ({(transitTimeMinutes / 60).toFixed(1)} h)</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="15"
                value={transitTimeMinutes}
                onChange={e => setTransitTimeMinutes(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Dose required calculation card */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 uppercase block">Dosis Paciente Meta</span>
                <span className="text-lg font-bold text-purple-400">{targetDoseMBq} MBq</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-center">
                <span className="text-[10px] text-slate-500 uppercase block">Producción Ciclotrón</span>
                <span className="text-lg font-bold text-cyan-300">{requiredProductionDoseMBq} MBq</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic leading-relaxed">
              Debido a que t½ = 109.7 min, tras {transitTimeMinutes} min de viaje solo queda el <strong className="text-white">{remainingPercent}%</strong> de la actividad original. ¡El ciclotrón debe sobreproducir para compensar el decaimiento!
            </p>
          </div>

          {/* 2. Quantum Annihilation Reaction Card */}
          <div className="glass-panel rounded-2xl p-5 border border-purple-500/30 bg-slate-900/60 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block">
              2. La Ecuación Cuántica de Aniquilación
            </span>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono space-y-1">
              <div className="text-sm font-bold text-white">
                e⁺ (Positrón) + e⁻ (Electrón) → 2γ
              </div>
              <div className="text-xs text-purple-300 font-semibold">
                Energía por Fotón = m_e · c² = 511.0 keV
              </div>
              <div className="text-[10px] text-slate-500">
                Ángulo de Emisión: Exactamente 180.0° (Conservación de Momento)
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Efecto Warburg:</strong> Las células tumorales captan el ¹⁸F-FDG creyendo que es glucosa normal.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Doble Fotón Opuesto:</strong> La aniquilación garantiza que ambos fotones viajen en sentidos opuestos, permitiendo trazar la línea geométrica exacta al detector.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
