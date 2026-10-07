import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';
import { 
  Play, 
  RotateCcw, 
  Scale, 
  Compass, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  History,
  Activity
} from 'lucide-react';

interface RelicCase {
  id: string;
  name: string;
  category: 'organic' | 'inorganic';
  material: string;
  residualC14: number; // percentage
  knownEra: string;
  expectedAgeYears: number;
  description: string;
}

const RELIC_PRESETS: RelicCase[] = [
  {
    id: 'scrolls',
    name: 'Rollos del Mar Muerto (Qumrán)',
    category: 'organic',
    material: 'Pergamino de piel animal orgánica',
    residualC14: 78.4,
    knownEra: 'Periodo Heleno-Romano (~siglo I a.C.)',
    expectedAgeYears: 2010,
    description: 'Manuscritos bíblicos preservados en vasijas de arcilla en el desierto de Judea.',
  },
  {
    id: 'oetzi',
    name: 'Ötzi el Hombre de Hielo (Alpes)',
    category: 'organic',
    material: 'Tejido muscular y cuero neolítico',
    residualC14: 52.8,
    knownEra: 'Calcolítico / Edad del Cobre (~3300 a.C.)',
    expectedAgeYears: 5300,
    description: 'Momia natural congelada intacta en un glaciar de los Alpes de Ötztal.',
  },
  {
    id: 'mammoth',
    name: 'Fémur de Mamut Lanudo (Siberia)',
    category: 'organic',
    material: 'Colágeno de hueso fósil',
    residualC14: 24.5,
    knownEra: 'Final del Pleistoceno / Última Glaciación',
    expectedAgeYears: 11600,
    description: 'Megafauna del Ártico preservada en el permafrost siberiano.',
  },
  {
    id: 'lascaux',
    name: 'Carbón de Pinturas de Lascaux (Francia)',
    category: 'organic',
    material: 'Carbón vegetal de antorcha paleolítica',
    residualC14: 1.5,
    knownEra: 'Paleolítico Superior (Magdaleniense)',
    expectedAgeYears: 34800,
    description: 'Pigmento orgánico utilizado por cazadores-recolectores en la cueva de Lascaux.',
  },
  {
    id: 'bronze_sword',
    name: 'Espada de Bronce / Hierro Forjado',
    category: 'inorganic',
    material: 'Aleación metálica inorgánica',
    residualC14: 0.0,
    knownEra: 'Edad de los Metales',
    expectedAgeYears: 0,
    description: '¡Trampa científica! Los minerales y metales inorgánicos jamás absorbieron C-14 metabólico.',
  },
];

export const CarbonDatingSpectrometer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedRelic, setSelectedRelic] = useState<RelicCase>(RELIC_PRESETS[0]);
  const [isFiringLaser, setIsFiringLaser] = useState<boolean>(false);
  const [ionBeamProgress, setIonBeamProgress] = useState<number>(0);
  const [measuredC14, setMeasuredC14] = useState<number | null>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  const animFrameRef = useRef<number | null>(null);

  // Run Accelerator Mass Spectrometry (AMS) Beam Simulation
  const handleFireSpectrometer = () => {
    setIsFiringLaser(true);
    setIonBeamProgress(0);
    setMeasuredC14(null);
    setCalculatedAge(null);
    sound.playQuantumSpin();
  };

  // Canvas animation of the magnetic mass separator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear vacuum chamber background
      ctx.fillStyle = 'rgba(2, 6, 23, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Chamber Architecture
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // 1. Draw Laser Ion Source Chamber (Left)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.fillRect(20, 150, 70, 80);
      ctx.strokeRect(20, 150, 70, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('LÁSER AMS', 28, 175);
      ctx.fillText('IONIZADOR', 28, 190);

      // 2. Draw 100 kV Electrostatic Acceleration Tube
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.fillRect(90, 175, 120, 30);
      ctx.strokeRect(90, 175, 120, 30);
      ctx.fillStyle = '#06b6d4';
      ctx.font = '9px monospace';
      ctx.fillText('+100,000 VOLTIOS ACELERADOR', 95, 170);

      // 3. Draw B-Field Deflection Dipole Magnet (Center)
      ctx.fillStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(310, 190, 85, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('ELECTROIMÁN DE SEPARACIÓN (B)', 230, 100);

      // 4. Draw Faraday Detector Cups (Right)
      // Cup 1: Carbon-12 (Mass 12 - tightest curve)
      ctx.fillStyle = 'rgba(34, 197, 94, 0.25)';
      ctx.strokeStyle = '#22c55e';
      ctx.fillRect(510, 90, 60, 24);
      ctx.strokeRect(510, 90, 60, 24);
      ctx.fillStyle = '#22c55e';
      ctx.fillText('COPA ¹²C (98.9%)', 515, 106);

      // Cup 2: Carbon-13 (Mass 13 - medium curve)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(510, 180, 60, 24);
      ctx.strokeRect(510, 180, 60, 24);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('COPA ¹³C (1.1%)', 515, 196);

      // Cup 3: Carbon-14 (Mass 14 - widest curve)
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.strokeStyle = '#f59e0b';
      ctx.fillRect(510, 270, 60, 24);
      ctx.strokeRect(510, 270, 60, 24);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('COPA ¹⁴C (Reloj)', 515, 286);

      // Draw Beam Beams if laser is active
      if (isFiringLaser) {
        setIonBeamProgress(prev => {
          if (prev >= 100) {
            setIsFiringLaser(false);
            // Settle readings
            if (selectedRelic.category === 'inorganic') {
              setMeasuredC14(0.0);
              setCalculatedAge(0);
            } else {
              setMeasuredC14(selectedRelic.residualC14);
              const age = Math.round(-5730 * (Math.log(selectedRelic.residualC14 / 100) / Math.LN2));
              setCalculatedAge(age);
              sound.playSuccess();
            }
            return 100;
          }
          return prev + 2.5;
        });

        // Ion beam drawing
        const p = ionBeamProgress / 100;

        // Laser flash in source
        ctx.beginPath();
        ctx.arc(55, 190, 18 * Math.random(), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Unified beam up to magnet entrance
        ctx.beginPath();
        ctx.moveTo(90, 190);
        const curX = 90 + p * 140;
        ctx.lineTo(Math.min(230, curX), 190);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Magnetic Splitting Curves after x=230
        if (p > 0.4) {
          const splitFactor = Math.min(1, (p - 0.4) / 0.6);

          // C-12 trajectory (bends sharply up to y=102)
          ctx.beginPath();
          ctx.moveTo(230, 190);
          ctx.quadraticCurveTo(340, 140, 230 + splitFactor * 280, 190 - splitFactor * 88);
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 3;
          ctx.stroke();

          // C-13 trajectory (middle to y=192)
          ctx.beginPath();
          ctx.moveTo(230, 190);
          ctx.lineTo(230 + splitFactor * 280, 190 + (Math.random() - 0.5) * 2);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();

          // C-14 trajectory (bends down to y=282 due to heavier inertia!)
          if (selectedRelic.category === 'organic') {
            ctx.beginPath();
            ctx.moveTo(230, 190);
            ctx.quadraticCurveTo(340, 240, 230 + splitFactor * 280, 190 + splitFactor * 92);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isFiringLaser, ionBeamProgress, selectedRelic]);

  const handleSelectRelic = (relic: RelicCase) => {
    setSelectedRelic(relic);
    setIsFiringLaser(false);
    setIonBeamProgress(0);
    setMeasuredC14(null);
    setCalculatedAge(null);
    sound.playQuantumSpin();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                LABORATORIO 4: ESPECTRÓMETRO AMS & DATACIÓN POR C-14
              </span>
              <span className="text-xs text-slate-400 font-mono">t = -5730 · [ln(N/N₀) / ln(2)]</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Espectrómetro de Masas con Acelerador (AMS)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Carga reliquias históricas genuinas, dispara el ionizador láser y separa los isótopos de carbono por inercia magnética para descifrar el reloj cósmico de la biosfera.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFireSpectrometer}
              disabled={isFiringLaser}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFiringLaser ? 'ACELERANDO IONES...' : 'DISPARAR HAZ LÁSER AMS'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Mass Spectrometer Canvas */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-4 border border-slate-800 space-y-4 bg-slate-950/80">
          <div className="relative rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={600}
              height={380}
              className="w-full h-auto block aspect-[60/38]"
            />

            {/* In-Canvas Status HUD */}
            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Muestra Activa: </span>
              <span className="text-amber-300 font-bold">{selectedRelic.name}</span>
            </div>
          </div>

          {/* Results Analysis Console */}
          {measuredC14 !== null && (
            <div className={`p-5 rounded-2xl border transition-all animate-fadeIn ${
              selectedRelic.category === 'inorganic'
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            }`}>
              {selectedRelic.category === 'inorganic' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-400 font-mono">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>¡ALERTA FÍSICA: OBJETO INORGÁNICO DETECTADO!</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    Los detectores registraron <strong>0.00% de ¹⁴C metabólico</strong>. Los metales forjados en fraguas (como el bronce y el hierro) y las piedras minerales jamás realizaron fotosíntesis ni respiraron carbono atmosférico. <strong className="text-white">El método de radiocarbono solo puede fechar materia que alguna vez estuvo viva.</strong>
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Datación Espectrométrica Concluida
                    </span>
                    <span className="text-xs font-mono text-slate-400">{selectedRelic.knownEra}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center font-mono">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">¹⁴C Residual Medido</span>
                      <span className="text-2xl font-black text-amber-400">{measuredC14}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40">
                      <span className="text-[10px] text-slate-500 block uppercase">Antigüedad Determinada</span>
                      <span className="text-2xl font-black text-white">~{calculatedAge?.toLocaleString()} <span className="text-sm text-emerald-400">años AP</span></span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    <strong>Verificación Histórica:</strong> La relación de supervivencia es compatible con el registro estratigráfico: {selectedRelic.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Specimen Selector and Theory */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Seleccionar Espécimen Arqueológico
            </span>
            <div className="space-y-2">
              {RELIC_PRESETS.map(relic => (
                <button
                  key={relic.id}
                  onClick={() => handleSelectRelic(relic)}
                  className={`w-full p-3 rounded-xl border text-left transition-all text-xs ${
                    selectedRelic.id === relic.id
                      ? 'bg-amber-500/20 border-amber-400 text-white font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-sm">{relic.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{relic.material}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Principle explanation */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/50 space-y-3 text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-white uppercase font-mono block">
              La Ecuación del Cronómetro Cósmico:
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 text-center font-mono text-amber-300 text-xs font-bold">
              t = -5,730 · [ ln(N / N₀) / ln(2) ]
            </div>
            <p>
              El Carbono-14 se produce en la atmósfera por rayos cósmicos sobre el Nitrógeno-14. Mientras un ser vive, ingiere C-14. Al morir, la asimilación se congela y el ¹⁴C decae a nitrógeno a un ritmo constante de t½ = 5,730 años.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
