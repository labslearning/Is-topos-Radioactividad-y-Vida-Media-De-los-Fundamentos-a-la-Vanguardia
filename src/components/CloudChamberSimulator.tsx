import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shield, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Zap, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'alpha' | 'beta-minus' | 'beta-plus' | 'gamma';
  charge: number; // +2 for alpha, -1 for beta-, +1 for beta+, 0 for gamma
  mass: number;
  energy: number;
  color: string;
  history: { x: number; y: number; opacity: number }[];
  alive: boolean;
  age: number;
}

export const CloudChamberSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation Controls
  const [selectedIsotope, setSelectedIsotope] = useState<'u238' | 'c14' | 'f18' | 'co60'>('u238');
  const [bFieldStrength, setBFieldStrength] = useState<number>(0.6); // -1 to 1 (Magnetic Field in Teslas)
  const [emissionRate, setEmissionRate] = useState<number>(3); // particles per second
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [geigerAudio, setGeigerAudio] = useState<boolean>(true);

  // Active Shields
  const [shieldPaper, setShieldPaper] = useState<boolean>(false);
  const [shieldAluminum, setShieldAluminum] = useState<boolean>(false);
  const [shieldLead, setShieldLead] = useState<boolean>(false);

  // Stats
  const [particlesEmitted, setParticlesEmitted] = useState<number>(0);
  const [particlesBlocked, setParticlesBlocked] = useState<number>(0);
  const [annihilationsCount, setAnnihilationsCount] = useState<number>(0);

  // Internal state refs for animation loop
  const particlesRef = useRef<Particle[]>([]);
  const lastEmitTime = useRef<number>(0);
  const animFrameId = useRef<number | null>(null);

  // Isotope characteristics
  const isotopeData = {
    u238: {
      name: 'Uranio-238 (²³⁸U)',
      decay: 'Alfa (α)',
      particleName: 'Núcleo de Helio-4 (⁴₂He²⁺)',
      charge: 2,
      velocity: 'Baja-Media (~15,000 km/s)',
      trackStyle: 'Trazas gruesas, densas y rectas (alta ionización)',
      color: '#f59e0b',
    },
    c14: {
      name: 'Carbono-14 (¹⁴C)',
      decay: 'Beta Menos (β⁻)',
      particleName: 'Electrón Relativista (e⁻)',
      charge: -1,
      velocity: 'Muy Alta (~200,000 km/s)',
      trackStyle: 'Trazas finas y sinuosas con gran curvatura magnética',
      color: '#06b6d4',
    },
    f18: {
      name: 'Flúor-18 (¹⁸F)',
      decay: 'Beta Más / Positrón (β⁺)',
      particleName: 'Positrón / Antimateria (e⁺)',
      charge: 1,
      velocity: 'Muy Alta (~200,000 km/s)',
      trackStyle: 'Curva hacia el polo opuesto y genera aniquilación (2γ)',
      color: '#a855f7',
    },
    co60: {
      name: 'Cobalto-60 (⁶⁰Co)',
      decay: 'Gamma (γ)',
      particleName: 'Fotón Electromagnético (hν)',
      charge: 0,
      velocity: 'Velocidad de la luz (c = 300,000 km/s)',
      trackStyle: 'Línea recta perfecta, indiferente al campo magnético',
      color: '#ec4899',
    },
  };

  const currentIso = isotopeData[selectedIsotope];

  // Particle emission helper
  const emitParticle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sourceX = 90;
    const sourceY = canvas.height / 2;

    const spreadAngle = (Math.random() - 0.5) * 0.45; // directional cone
    const speed = selectedIsotope === 'u238' ? 3.5 : selectedIsotope === 'co60' ? 8.5 : 6.0;

    let type: Particle['type'] = 'alpha';
    let charge = 2;
    let color = '#f59e0b';
    let mass = 4;

    if (selectedIsotope === 'c14') {
      type = 'beta-minus';
      charge = -1;
      color = '#06b6d4';
      mass = 1;
    } else if (selectedIsotope === 'f18') {
      type = 'beta-plus';
      charge = 1;
      color = '#a855f7';
      mass = 1;
    } else if (selectedIsotope === 'co60') {
      type = 'gamma';
      charge = 0;
      color = '#ec4899';
      mass = 0.01;
    }

    const p: Particle = {
      x: sourceX,
      y: sourceY,
      vx: Math.cos(spreadAngle) * speed,
      vy: Math.sin(spreadAngle) * speed,
      type,
      charge,
      mass,
      energy: 100,
      color,
      history: [],
      alive: true,
      age: 0,
    };

    particlesRef.current.push(p);
    setParticlesEmitted(prev => prev + 1);

    if (geigerAudio) {
      sound.playGeigerClick();
    }
  };

  // Main simulation canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (timestamp: number) => {
      // 1. Clear background with dark vapor chamber aesthetic
      ctx.fillStyle = 'rgba(2, 6, 23, 0.22)'; // trail fading
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle Chamber Grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Magnetic Field Vector Indicator
      ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.font = '10px monospace';
      ctx.fillText(`B-FIELD: ${bFieldStrength > 0 ? '⊙ SALIENTE (+Z)' : bFieldStrength < 0 ? '⊗ ENTRANTE (-Z)' : 'OFF'} (${bFieldStrength.toFixed(2)} T)`, 20, 25);

      // 2. Draw Radiation Shields
      const paperX = 260;
      const aluminumX = 400;
      const leadX = 550;

      // Paper Shield
      if (shieldPaper) {
        ctx.fillStyle = 'rgba(254, 240, 138, 0.7)';
        ctx.fillRect(paperX, 40, 8, canvas.height - 80);
        ctx.fillStyle = '#fef08a';
        ctx.font = '9px monospace';
        ctx.fillText('PAPEL (0.1mm)', paperX - 18, 32);
      } else {
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.15)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(paperX, 40, 8, canvas.height - 80);
        ctx.setLineDash([]);
      }

      // Aluminum Shield
      if (shieldAluminum) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.fillRect(aluminumX, 40, 14, canvas.height - 80);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '9px monospace';
        ctx.fillText('ALUMINIO (3mm)', aluminumX - 20, 32);
      } else {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(aluminumX, 40, 14, canvas.height - 80);
        ctx.setLineDash([]);
      }

      // Lead Shield
      if (shieldLead) {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.85)';
        ctx.fillRect(leadX, 40, 26, canvas.height - 80);
        ctx.fillStyle = '#c084fc';
        ctx.font = '9px monospace';
        ctx.fillText('PLOMO (10cm)', leadX - 16, 32);
      } else {
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(leadX, 40, 26, canvas.height - 80);
        ctx.setLineDash([]);
      }

      // 3. Draw Radioactive Source Container
      const srcX = 90;
      const srcY = canvas.height / 2;
      ctx.beginPath();
      ctx.arc(srcX, srcY, 16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(srcX, srcY, 6, 0, Math.PI * 2);
      ctx.fillStyle = currentIso.color;
      ctx.fill();

      // Label source
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(currentIso.name.split(' ')[0], srcX, srcY + 30);
      ctx.textAlign = 'start';

      // 4. Particle emission rate check
      if (isRunning && timestamp - lastEmitTime.current > 1000 / emissionRate) {
        emitParticle();
        lastEmitTime.current = timestamp;
      }

      // 5. Update & Draw Particles (Lorentz force: F = q * (v x B))
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;

        // Save position history for cloud chamber vapor track
        p.history.push({ x: p.x, y: p.y, opacity: 1 });
        if (p.history.length > (p.type === 'alpha' ? 50 : 70)) {
          p.history.shift();
        }

        // Apply Lorentz Magnetic Force: a_y = q * v_x * B / mass
        if (p.charge !== 0 && bFieldStrength !== 0) {
          const lorentzFactor = 0.045 * (p.charge / p.mass) * bFieldStrength;
          // Perpendicular acceleration
          const perpVx = -p.vy;
          const perpVy = p.vx;
          p.vx += perpVx * lorentzFactor;
          p.vy += perpVy * lorentzFactor;
        }

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Check Shield Collisions
        // A) Paper Shield (stops Alpha)
        if (shieldPaper && p.x >= paperX && p.x <= paperX + 8 && p.y >= 40 && p.y <= canvas.height - 40) {
          if (p.type === 'alpha') {
            p.alive = false;
            setParticlesBlocked(prev => prev + 1);
            // Impact spark
            drawSpark(ctx, p.x, p.y, '#f59e0b');
          }
        }

        // B) Aluminum Shield (stops Beta- and Beta+)
        if (shieldAluminum && p.x >= aluminumX && p.x <= aluminumX + 14 && p.y >= 40 && p.y <= canvas.height - 40) {
          if (p.type === 'beta-minus' || p.type === 'beta-plus') {
            p.alive = false;
            setParticlesBlocked(prev => prev + 1);
            drawSpark(ctx, p.x, p.y, '#38bdf8');
          }
        }

        // C) Lead Shield (stops Gamma and whatever reached it)
        if (shieldLead && p.x >= leadX && p.x <= leadX + 26 && p.y >= 40 && p.y <= canvas.height - 40) {
          p.alive = false;
          setParticlesBlocked(prev => prev + 1);
          drawSpark(ctx, p.x, p.y, '#ec4899');
        }

        // D) Positron Annihilation Event (Special physics for Beta+)
        if (p.type === 'beta-plus' && p.age > 45 && Math.random() < 0.04 && p.alive) {
          // Positron finds an electron -> Annihilation!
          p.alive = false;
          setAnnihilationsCount(prev => prev + 1);
          sound.playQuantumSpin();

          // Flash burst
          drawAnnihilationBurst(ctx, p.x, p.y);

          // Emit two collinear 511 keV gamma rays at 180°
          const angle = Math.random() * Math.PI;
          const gammaSpeed = 9;
          particles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * gammaSpeed,
            vy: Math.sin(angle) * gammaSpeed,
            type: 'gamma',
            charge: 0,
            mass: 0.01,
            energy: 511,
            color: '#ec4899',
            history: [],
            alive: true,
            age: 0,
          });
          particles.push({
            x: p.x,
            y: p.y,
            vx: -Math.cos(angle) * gammaSpeed,
            vy: -Math.sin(angle) * gammaSpeed,
            type: 'gamma',
            charge: 0,
            mass: 0.01,
            energy: 511,
            color: '#ec4899',
            history: [],
            alive: true,
            age: 0,
          });
        }

        // Out of bounds
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.alive = false;
        }

        // Draw track
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.strokeStyle = p.color;
          // Alpha has thick dense droplet track; beta is thin erratic
          ctx.lineWidth = p.type === 'alpha' ? 4.5 : p.type === 'gamma' ? 1.5 : 2.0;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw current particle head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.type === 'alpha' ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Remove dead
        if (!p.alive && p.history.length === 0) {
          particles.splice(i, 1);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isRunning, selectedIsotope, bFieldStrength, emissionRate, shieldPaper, shieldAluminum, shieldLead, geigerAudio]);

  const drawSpark = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  const drawAnnihilationBurst = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.restore();
  };

  const handleClearChamber = () => {
    particlesRef.current = [];
    setParticlesEmitted(0);
    setParticlesBlocked(0);
    setAnnihilationsCount(0);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Station Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                LABORATORIO 1: CÁMARA DE NIEBLA & DEFLEXIÓN MAGNÉTICA
              </span>
              <span className="text-xs text-slate-400 font-mono">F = q(v × B)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Acelerador y Cámara de Niebla Cuántica
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Observa las trazas de condensación en tiempo real. Ajusta el electroimán para desviar partículas cargadas y despliega blindajes reales para comprobar su poder de detención.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Emitidas</span>
              <span className="text-lg font-bold text-cyan-400">{particlesEmitted}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Bloqueadas</span>
              <span className="text-lg font-bold text-amber-400">{particlesBlocked}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Aniquilaciones (2γ)</span>
              <span className="text-lg font-bold text-purple-400">{annihilationsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Chamber Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Visual Hardware Canvas */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-4 border border-slate-800 space-y-4 bg-slate-950/80">
          <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={750}
              height={400}
              className="w-full h-auto block aspect-[75/40] cursor-crosshair"
            />

            {/* Chamber HUD Overlays */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => setGeigerAudio(!geigerAudio)}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 backdrop-blur-md transition-all ${
                  geigerAudio ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300' : 'bg-slate-900/80 border-slate-800 text-slate-500'
                }`}
                title="Audio del contador Geiger"
              >
                {geigerAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
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
                onClick={handleClearChamber}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all backdrop-blur-md"
                title="Limpiar vapor de la cámara"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Legend at bottom of canvas */}
            <div className="absolute bottom-2 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Alfa (α, +2e)
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Beta- (β⁻, -1e)
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" /> Beta+ (β⁺, +1e)
                </span>
                <span className="flex items-center gap-1 text-pink-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block" /> Gamma (γ, 0)
                </span>
              </div>
              <span className="text-slate-400">Lorentz: F = q(v × B)</span>
            </div>
          </div>

          {/* Real-time physical explanation panel */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-200 font-semibold font-mono">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Comportamiento de {currentIso.name}:
              </span>
              <span className="text-purple-300">{currentIso.particleName}</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              <strong>Trazas en la niebla:</strong> {currentIso.trackStyle}. Carga: <strong className="text-white font-mono">{currentIso.charge > 0 ? `+${currentIso.charge}e` : `${currentIso.charge}e`}</strong>. Velocidad inicial: <strong className="text-white font-mono">{currentIso.velocity}</strong>.
            </p>
          </div>
        </div>

        {/* Right: Tactical Command Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Isotope Fuel Selector */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              1. Cargar Muestra Radiactiva
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedIsotope('u238')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedIsotope === 'u238'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-sm">²³⁸U Alfa</div>
                <div className="text-[10px] text-slate-500">t½ = 4.5 Ga (α)</div>
              </button>

              <button
                onClick={() => setSelectedIsotope('c14')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedIsotope === 'c14'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-sm">¹⁴C Beta-</div>
                <div className="text-[10px] text-slate-500">t½ = 5,730 a (β⁻)</div>
              </button>

              <button
                onClick={() => setSelectedIsotope('f18')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedIsotope === 'f18'
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-md shadow-purple-500/20 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-sm">¹⁸F Positrón</div>
                <div className="text-[10px] text-slate-500">t½ = 110 min (β⁺)</div>
              </button>

              <button
                onClick={() => setSelectedIsotope('co60')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedIsotope === 'co60'
                    ? 'bg-pink-500/20 border-pink-400 text-pink-200 shadow-md shadow-pink-500/20 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-sm">⁶⁰Co Gamma</div>
                <div className="text-[10px] text-slate-500">t½ = 5.27 a (γ)</div>
              </button>
            </div>
          </div>

          {/* 2. Magnetic Field Deflector Dial */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="uppercase text-cyan-400 font-bold">2. Electroimán (Campo B)</span>
              <span className="font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                {bFieldStrength.toFixed(2)} Teslas
              </span>
            </div>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={bFieldStrength}
              onChange={e => setBFieldStrength(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-1.0T (Desvío Abajo)</span>
              <span>0.0T (Apagado)</span>
              <span>+1.0T (Desvío Arriba)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              Observa cómo Alfa y Positrón curvan en sentido opuesto a Beta-, mientras los fotones Gamma jamás se desvían.
            </p>
          </div>

          {/* 3. Shield Insertion Controls */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              3. Desplegar Blindajes en la Cámara
            </span>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setShieldPaper(!shieldPaper)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between font-mono transition-all ${
                  shieldPaper ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>[1] Papel Celulosa (0.1 mm)</span>
                <span className="text-[10px]">{shieldPaper ? 'INSTALADO' : 'RETIRADO'}</span>
              </button>

              <button
                onClick={() => setShieldAluminum(!shieldAluminum)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between font-mono transition-all ${
                  shieldAluminum ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>[2] Aluminio Puro (3 mm)</span>
                <span className="text-[10px]">{shieldAluminum ? 'INSTALADO' : 'RETIRADO'}</span>
              </button>

              <button
                onClick={() => setShieldLead(!shieldLead)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between font-mono transition-all ${
                  shieldLead ? 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>[3] Plomo Masivo (10 cm)</span>
                <span className="text-[10px]">{shieldLead ? 'INSTALADO' : 'RETIRADO'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
