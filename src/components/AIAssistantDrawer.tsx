import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage } from '../types';
import { translations } from '../data/translations';
import { sound } from '../utils/sound';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  CornerDownLeft, 
  Maximize2, 
  Minimize2,
  Atom,
  Terminal
} from 'lucide-react';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  activeTopic?: string;
}

export const AIAssistantDrawer: React.FC<Props> = ({
  language,
  isOpen,
  onClose,
  activeTopic,
}) => {
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init',
      role: 'assistant',
      content: getInitialGreeting(language),
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getInitialGreeting(lang: Language) {
    switch (lang) {
      case 'es':
        return '¡Saludos, colega investigador! Soy QUANTUM-CORE AI. Mi núcleo está sintonizado para resolver cualquier enigma sobre física nuclear o mecánica cuántica. ¿Qué concepto desafiante examinamos hoy?';
      case 'fr':
        return 'Salutations, pionnier de la physique ! Je suis QUANTUM-CORE AI. Ma matrice est prête à élucider tout mystère de désintégration nucléaire ou d\'architecture quantique. Quelle question souhaitez-vous sonder ?';
      case 'de':
        return 'Sei gegrüßt, Quantenforscher! Ich bin QUANTUM-CORE AI. Mein Rechenkern steht bereit, um jedes Rätsel der Kernphysik und Quantenmechanik aufzudecken. Welche physikalische Frage untersuchen wir?';
      default:
        return 'Greetings, researcher! I am QUANTUM-CORE AI. My processor is calibrated to unravel any nuclear decay mystery or quantum orbital architecture. What physical enigma shall we demystify today?';
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  // Fallback physics tutor logic
  const getOfflineFallbackResponse = (query: string, lang: Language): string => {
    const q = query.toLowerCase();
    if (q.includes('bus') || q.includes('hund') || q.includes('asiento') || q.includes('siège')) {
      return `🚌 **Hund's Rule (The Bus Seat Analogy):**\nWhen passengers enter a public bus with empty twin seats, everyone takes their own window seat first before anyone sits next to a stranger. Electrons are all negatively charged and strongly repel each other via Coulomb's law. By singly occupying separate degenerate orbitals (px, py, pz) with parallel spins first, electrons maximize distance and minimize potential energy!`;
    }
    if (q.includes('pet') || q.includes('fluor') || q.includes('f-18') || q.includes('18')) {
      return `⚛️ **Fluorine-18 & PET Scans:**\nFluorine-18 is tagged to glucose as ¹⁸F-FDG. Because cancer cells metabolize glucose at hyperactive rates, the tracer aggregates in tumors. As ¹⁸F decays with a half-life of ~110 minutes, it emits a positron (antimatter!) that immediately annihilates with a tissue electron, yielding two colinear 511 keV gamma rays captured in 360° by the scanner!`;
    }
    if (q.includes('4s') || q.includes('3d') || q.includes('aufbau')) {
      return `🪜 **Why 4s fills before 3d (The Madelung Rule):**\nIn ground-state atoms, orbital energy follows the sum (n + l). For 4s: n=4, l=0, so (n + l) = 4. For 3d: n=3, l=2, so (n + l) = 5. Even though the 3d shell is spatially closer to the nucleus, the spherical 4s orbital has high nuclear penetration with lower screening, making 4s lower in energy and filled first!`;
    }
    return `✨ **Quantum Core Insight:**\nAtomic systems are governed by the minimization of total potential energy and quantum uniqueness. Particles behave according to precise probabilistic wavefunctions Ψ. Whether dealing with exponential decay kinetics ($N(t) = N_0 \\cdot 2^{-t/t_{1/2}}$) or electron quantum coordinates $(n, l, m_l, m_s)$, nature is rigorously mathematical yet beautifully intuitive when grounded in spatial models!`;
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          language,
          topic: activeTopic || 'Atomic Physics & Quantum Numbers',
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const replyText = data.reply || getOfflineFallbackResponse(text, language);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMsg]);
      sound.playQuantumSpin();
    } catch (err) {
      console.warn('Using offline pedagogical fallback:', err);
      const fallbackText = getOfflineFallbackResponse(text, language);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl h-full bg-slate-950 border-l border-cyan-500/30 flex flex-col shadow-2xl">
        {/* Terminal Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm tracking-wide">
                  {t.aiTutorTitle}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Powered by Gemini 3.8 Flash • {language.toUpperCase()} Matrix
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-slate-900/50 border-b border-slate-800/80 overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-cyan-400 whitespace-nowrap uppercase">
              Prompts:
            </span>
            <button
              onClick={() => handleSend(t.quickQ1)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-cyan-300 border border-slate-700/60 whitespace-nowrap transition-all"
            >
              {t.quickQ1}
            </button>
            <button
              onClick={() => handleSend(t.quickQ2)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-purple-300 border border-slate-700/60 whitespace-nowrap transition-all"
            >
              {t.quickQ2}
            </button>
            <button
              onClick={() => handleSend(t.quickQ3)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-amber-300 border border-slate-700/60 whitespace-nowrap transition-all"
            >
              {t.quickQ3}
            </button>
            <button
              onClick={() => handleSend(t.quickQ4)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-emerald-300 border border-slate-700/60 whitespace-nowrap transition-all"
            >
              {t.quickQ4}
            </button>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-1">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs font-mono p-2">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>QUANTUM-CORE AI computing quantum states...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={t.askPlaceholder}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>{t.sendBtn}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
