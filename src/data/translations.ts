import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  selectLanguagePrompt: string;
  studentNamePrompt: string;
  studentNamePlaceholder: string;
  enterSimulatorBtn: string;
  
  // Navigation tabs
  tabMasterclass: string;
  tabLab: string;
  tabChallenges: string;
  tabAITutor: string;
  
  // Header & Stats
  xpLabel: string;
  streakLabel: string;
  masteryBtn: string;
  soundOn: string;
  soundOff: string;
  resetProgress: string;
  
  // Topic
  topicTitle: string;
  topicDesc: string;
  
  // Challenge Runner
  questionIndex: string;
  correctAnswer: string;
  incorrectAnswer: string;
  submitAnswer: string;
  nextChallenge: string;
  generateDynamicAI: string;
  generatingAI: string;
  allCompletedTitle: string;
  allCompletedDesc: string;
  viewCredentialBtn: string;
  
  // Micro-Class Protocol
  microClassBadge: string;
  microClassTitle: string;
  microClassEmpatheticIntro: string;
  analogyHeading: string;
  formativeCheckHeading: string;
  formativeCorrectReinforce: string;
  returnToChallengeBtn: string;
  
  // Lab: Half-life
  halfLifeLabTitle: string;
  halfLifeLabDesc: string;
  selectIsotope: string;
  halfLifeDuration: string;
  decayStepBtn: string;
  resetSimBtn: string;
  autoPlay: string;
  pause: string;
  remainingNuclei: string;
  decayedNuclei: string;
  elapsedTime: string;
  halfLivesPassed: string;
  theoreticalPercent: string;
  geigerSoundToggle: string;
  
  // Real world applications
  realWorldApplications: string;
  carbonDatingTool: string;
  petScanTool: string;
  nuclearEnergyTool: string;
  relicAgeCalc: string;
  measuredC14: string;
  estimatedAge: string;
  petInitialDose: string;
  transitHours: string;
  effectiveDose: string;
  
  // AI Tutor Drawer
  aiTutorTitle: string;
  aiTutorSubtitle: string;
  askPlaceholder: string;
  sendBtn: string;
  quickQuestionsTitle: string;
  quickQ1: string;
  quickQ2: string;
  quickQ3: string;
  quickQ4: string;
  
  // Mastery Certificate
  credentialTitle: string;
  credentialSubtitle: string;
  certRecipient: string;
  certHonors: string;
  certHash: string;
  certDate: string;
  closeBtn: string;
  printCertBtn: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    appName: 'QUANTUM-CORE AI',
    tagline: 'Simulador Élite: Isótopos, Radioactividad y Vida Media',
    welcomeTitle: 'QUANTUM-CORE AI: TEMA 2.3 EN LÍNEA',
    welcomeSubtitle: '¡Bienvenido, pionero del conocimiento! Soy QUANTUM-CORE AI — tu copiloto pedagógico de nivel Nobel. Aquí nos enfocamos al 100% en el Tema 2.3: Isótopos y radioactividad básica: Concepto de vida media y aplicaciones reales (C-14, escáner PET, radioterapia y energía). Nada de teoría aburrida; construyamos intuición visual.',
    selectLanguagePrompt: 'Selecciona tu matriz lingüística:',
    studentNamePrompt: 'Ingresa tu nombre o código de investigador:',
    studentNamePlaceholder: 'ej. Dra. Marie Curie',
    enterSimulatorBtn: 'Iniciar Inmersión en Tema 2.3',
    
    tabMasterclass: 'Masterclass Dinámica 2.3',
    tabLab: 'Laboratorio Cinético & Aplicaciones',
    tabChallenges: 'Desafíos Activos & Micro-Clases',
    tabAITutor: 'Terminal Cuántico IA',
    
    xpLabel: 'XP',
    streakLabel: 'Racha',
    masteryBtn: 'Credencial de Maestría',
    soundOn: 'Audio FX Activo',
    soundOff: 'Audio Silenciado',
    resetProgress: 'Reiniciar Progreso',
    
    topicTitle: 'Tema 2.3: Isótopos y Radioactividad Básica',
    topicDesc: 'Concepto de vida media (t½), cinética cuántica exponencial, cinturón de estabilidad nuclear y aplicaciones reales (Datación C-14, trazadores PET F-18 y radioterapia).',
    
    questionIndex: 'Desafío',
    correctAnswer: '¡DEDUCCIÓN MAGISTRAL!',
    incorrectAnswer: 'FLUCTUACIÓN CUÁNTICA DETECTADA',
    submitAnswer: 'Confirmar Respuesta',
    nextChallenge: 'Siguiente Desafío',
    generateDynamicAI: '⚡ Generar Desafío Dinámico 2.3 con IA',
    generatingAI: 'Sintetizando desafío con Gemini 3.8 Flash...',
    allCompletedTitle: '¡Maestría en Tema 2.3 Consolidada!',
    allCompletedDesc: '¡Conquista intelectual formidable! Has dominado los isótopos, la cinética de desintegración y todas las aplicaciones médicas y arqueológicas. Tu credencial está lista.',
    viewCredentialBtn: 'Reclamar Credencial de Nivel Nobel',
    
    microClassBadge: 'MICRO-CLASE ADAPTATIVA ACTIVADA',
    microClassTitle: 'Protocolo de Micro-Clase',
    microClassEmpatheticIntro: '¡Totalmente normal! Este es uno de los saltos conceptuales más abstractos de la física nuclear. Reajustemos tu modelo mental:',
    analogyHeading: 'La Analogía Intuitiva',
    formativeCheckHeading: 'Chequeo Formativo de Intuición',
    formativeCorrectReinforce: '¡Pivote genial! Intuición consolidada. Volviendo a la ruta principal.',
    returnToChallengeBtn: 'Fijar Aprendizaje y Volver a la Ruta',
    
    halfLifeLabTitle: 'Simulador Cinético de Partículas y Red Nuclear',
    halfLifeLabDesc: 'Visualiza la desintegración estocástica en una red de 100 núcleos. Experimenta con C-14, F-18, Co-60, I-131 y U-235 con contador Geiger en tiempo real.',
    selectIsotope: 'Seleccionar Isótopo de Muestra',
    halfLifeDuration: 'Vida Media',
    decayStepBtn: 'Desintegrar 1 Vida Media (t½)',
    resetSimBtn: 'Reiniciar Red Nuclear',
    autoPlay: 'Simular Tiempo Real',
    pause: 'Pausar Simulación',
    remainingNuclei: 'Núcleos Padre Sin Desintegrar',
    decayedNuclei: 'Núcleos Hijos Estables',
    elapsedTime: 'Tiempo Simulado Transcurrido',
    halfLivesPassed: 'Vidas Medias Transcurridas',
    theoreticalPercent: 'Teórico Restante',
    geigerSoundToggle: 'Audio Contador Geiger',
    
    realWorldApplications: 'Laboratorio de Física Nuclear Aplicada',
    carbonDatingTool: 'Datación Arqueológica (Carbono-14)',
    petScanTool: 'Trazador Oncológico PET (Flúor-18)',
    nuclearEnergyTool: 'Fisión Nuclear (Uranio-235)',
    relicAgeCalc: 'Analizador Cinético de Reliquias Orgánicas (C-14)',
    measuredC14: 'Actividad de C-14 Medida (% respecto a la atmósfera):',
    estimatedAge: 'Edad Arqueológica Calculada:',
    petInitialDose: 'Dosis Objetivo Requerida en Escáner (MBq):',
    transitHours: 'Horas de Transporte desde el Ciclotrón:',
    effectiveDose: 'Dosis de Producción Inicial Requerida:',
    
    aiTutorTitle: 'Terminal QUANTUM-CORE: Tema 2.3',
    aiTutorSubtitle: 'Enlace directo con tu IA pedagógica de nivel Nobel especializada en radioactividad, vida media e isótopos.',
    askPlaceholder: 'Pregunta sobre C-14, Flúor-18 en PET, cinética t½, partículas alfa/beta/gamma...',
    sendBtn: 'Transmitir',
    quickQuestionsTitle: 'Consultas Clave del Tema 2.3',
    quickQ1: '¿Por qué la vida media es constante sin importar la masa?',
    quickQ2: '¿Cómo funciona la aniquilación de positrones del F-18 en un PET?',
    quickQ3: '¿Por qué el C-14 no sirve para datar objetos de metal?',
    quickQ4: '¿Qué diferencia a las partículas alfa, beta y rayos gamma?',
    
    credentialTitle: 'CERTIFICADO DE MAESTRÍA EN FÍSICA NUCLEAR',
    credentialSubtitle: 'Otorgado por el Instituto de Física Interactiva QUANTUM-CORE AI',
    certRecipient: 'En Reconocimiento de la Excelencia Científica de:',
    certHonors: 'Por haber demostrado dominio impecable del Tema 2.3: Isótopos, Cinética Cuántica de Vida Media (t½), Desintegraciones Alfa/Beta/Gamma y Aplicaciones en Datación por C-14 y Medicina Nuclear PET.',
    certHash: 'Token Criptográfico:',
    certDate: 'Conferido el:',
    closeBtn: 'Cerrar',
    printCertBtn: 'Exportar / Imprimir Credencial',
  },

  en: {
    appName: 'QUANTUM-CORE AI',
    tagline: 'Elite Simulator: Isotopes, Radioactivity & Half-Life',
    welcomeTitle: 'QUANTUM-CORE AI: TOPIC 2.3 ONLINE',
    welcomeSubtitle: 'Welcome, pioneer! I am QUANTUM-CORE AI — your Nobel-level pedagogical co-pilot. We focus 100% on Topic 2.3: Isotopes and basic radioactivity: Concept of half-life and real-world applications (C-14, PET scans, radiotherapy, and energy). Zero rote memorization; let\'s forge unbreakable intuitive models.',
    selectLanguagePrompt: 'Choose your linguistic matrix:',
    studentNamePrompt: 'Enter your Researcher callsign:',
    studentNamePlaceholder: 'e.g. Dr. Marie Curie',
    enterSimulatorBtn: 'Initiate Topic 2.3 Immersion',
    
    tabMasterclass: 'Dynamic Masterclass 2.3',
    tabLab: 'Kinetic Lab & Applications',
    tabChallenges: 'Active Challenges & Micro-Classes',
    tabAITutor: 'Quantum Core AI Terminal',
    
    xpLabel: 'XP',
    streakLabel: 'Streak',
    masteryBtn: 'Mastery Credential',
    soundOn: 'Audio FX On',
    soundOff: 'Audio Muted',
    resetProgress: 'Reset Progress',
    
    topicTitle: 'Topic 2.3: Isotopes & Basic Radioactivity',
    topicDesc: 'Concept of half-life (t½), quantum exponential kinetics, nuclear stability belt, and real-world applications (C-14 dating, PET tracer F-18, and radiotherapy).',
    
    questionIndex: 'Challenge',
    correctAnswer: 'MASTERFUL DEDUCTION!',
    incorrectAnswer: 'QUANTUM FLUCTUATION DETECTED',
    submitAnswer: 'Confirm Quantum State',
    nextChallenge: 'Next Challenge',
    generateDynamicAI: '⚡ Generate Topic 2.3 Challenge with AI',
    generatingAI: 'Synthesizing with Gemini 3.8 Flash...',
    allCompletedTitle: 'Topic 2.3 Mastery Consolidated!',
    allCompletedDesc: 'Outstanding intellectual conquest! You have mastered isotopes, decay kinetics, and diagnostic medical and archaeological applications.',
    viewCredentialBtn: 'Claim Nobel-Grade Credential',
    
    microClassBadge: 'ADAPTIVE MICRO-CLASS TRIGGERED',
    microClassTitle: 'Micro-Class Protocol',
    microClassEmpatheticIntro: 'Totally natural! This represents one of the most abstract conceptual leaps in nuclear physics. Let us rewire your mental model:',
    analogyHeading: 'The Intuitive Analogy',
    formativeCheckHeading: 'Formative Intuition Check',
    formativeCorrectReinforce: 'Brilliant pivot! Intuition solidified. Returning to the main trajectory.',
    returnToChallengeBtn: 'Lock In Insight & Return to Track',
    
    halfLifeLabTitle: 'Kinetic Particle Lattice & Nucleus Simulator',
    halfLifeLabDesc: 'Visualize stochastic decay across a lattice of 100 nuclei. Experiment with C-14, F-18, Co-60, I-131, and U-235 with real-time Geiger counter audio.',
    selectIsotope: 'Select Isotope Specimen',
    halfLifeDuration: 'Half-Life',
    decayStepBtn: 'Decay 1 Half-Life (t½)',
    resetSimBtn: 'Reset Nuclei Lattice',
    autoPlay: 'Simulate Real-Time',
    pause: 'Pause Simulation',
    remainingNuclei: 'Undecayed Parent Nuclei',
    decayedNuclei: 'Decayed Daughter Nuclei',
    elapsedTime: 'Simulated Elapsed Time',
    halfLivesPassed: 'Half-lives Elapsed',
    theoreticalPercent: 'Theoretical Remaining',
    geigerSoundToggle: 'Geiger Counter Audio',
    
    realWorldApplications: 'Applied Nuclear Physics Lab',
    carbonDatingTool: 'Radiocarbon Dating (Carbon-14)',
    petScanTool: 'Medical PET Scan Tracer (Fluorine-18)',
    nuclearEnergyTool: 'Fission Energy (Uranium-235)',
    relicAgeCalc: 'Organic Relic Carbon-14 Analyzer',
    measuredC14: 'Measured % of Modern C-14 Activity:',
    estimatedAge: 'Calculated Archaeological Age:',
    petInitialDose: 'Target Scan Dose Required (MBq):',
    transitHours: 'Transit Time from Cyclotron (hours):',
    effectiveDose: 'Required Production Dose at Cyclotron:',
    
    aiTutorTitle: 'QUANTUM-CORE Terminal: Topic 2.3',
    aiTutorSubtitle: 'Direct link with your Nobel-level pedagogical AI assistant specialized in radioactivity, half-life, and isotopes.',
    askPlaceholder: 'Ask about C-14 dating, F-18 PET scans, t½ kinetics, alpha/beta/gamma rays...',
    sendBtn: 'Transmit',
    quickQuestionsTitle: 'Core Topic 2.3 Inquiries',
    quickQ1: 'Why is half-life constant regardless of starting mass?',
    quickQ2: 'How does F-18 positron annihilation work in a PET scan?',
    quickQ3: 'Why can\'t C-14 date inorganic bronze weapons?',
    quickQ4: 'What distinguishes alpha, beta, and gamma radiation?',
    
    credentialTitle: 'CERTIFICATE OF NUCLEAR PHYSICS MASTERY',
    credentialSubtitle: 'Awarded by QUANTUM-CORE AI Interactive Physics Institute',
    certRecipient: 'Recognizing Academic Excellence In:',
    certHonors: 'Having demonstrated flawless mastery of Topic 2.3: Nuclear Isotopes, Quantum Decay Kinetics (t½), Alpha/Beta/Gamma Modes, Radiocarbon Dating, and Medical PET Tracers.',
    certHash: 'Cryptographic Token:',
    certDate: 'Conferred On:',
    closeBtn: 'Close Inspector',
    printCertBtn: 'Export / Print Credential',
  },

  fr: {
    appName: 'QUANTUM-CORE AI',
    tagline: 'Simulateur Élite : Isotopes, Radioactivité & Demi-Vie',
    welcomeTitle: 'QUANTUM-CORE AI : THÈME 2.3 EN LIGNE',
    welcomeSubtitle: 'Bienvenue, pionnier de la science ! Je suis QUANTUM-CORE AI — votre copilote de calibre Nobel. Nous nous concentrons à 100% sur le Thème 2.3 : Isotopes et radioactivité de base : Concept de demi-vie et applications (C-14, TEP, radiothérapie).',
    selectLanguagePrompt: 'Choisissez votre langue :',
    studentNamePrompt: 'Entrez votre nom de chercheur :',
    studentNamePlaceholder: 'ex. Dr. Marie Curie',
    enterSimulatorBtn: 'Démarrer l\'Immersion Thème 2.3',
    
    tabMasterclass: 'Masterclass Dynamique 2.3',
    tabLab: 'Laboratoire Cinétique & Applications',
    tabChallenges: 'Défis Actifs & Micro-Classes',
    tabAITutor: 'Terminal Quantique IA',
    
    xpLabel: 'XP',
    streakLabel: 'Série',
    masteryBtn: 'Certificat de Maîtrise',
    soundOn: 'Audio Activé',
    soundOff: 'Audio Muet',
    resetProgress: 'Réinitialiser',
    
    topicTitle: 'Thème 2.3 : Isotopes et Radioactivité de Base',
    topicDesc: 'Concept de demi-vie (t½), cinétique exponentielle, vallée de stabilité et applications concrètes (Carbone 14, TEP au Fluor 18 et radiothérapie).',
    
    questionIndex: 'Défi',
    correctAnswer: 'DÉDUCTION MAGISTRALE !',
    incorrectAnswer: 'FLUCTUATION DÉTECTÉE',
    submitAnswer: 'Confirmer la Réponse',
    nextChallenge: 'Défi Suivant',
    generateDynamicAI: '⚡ Générer un Défi Thème 2.3 avec l\'IA',
    generatingAI: 'Synthèse en cours avec Gemini 3.8 Flash...',
    allCompletedTitle: 'Maîtrise du Thème 2.3 Validée !',
    allCompletedDesc: 'Accomplissement intellectuel remarquable ! Vous maîtrisez les isotopes et les applications médicales et archéologiques.',
    viewCredentialBtn: 'Réclamer le Certificat',
    
    microClassBadge: 'MICRO-CLASSE ADAPTATIVE',
    microClassTitle: 'Protocole de Micro-Classe',
    microClassEmpatheticIntro: 'Tout à fait normal ! Ce saut conceptuel est l\'un des plus abstraits de la physique nucléaire :',
    analogyHeading: 'L\'Analogie Intuitive',
    formativeCheckHeading: 'Vérification Formative',
    formativeCorrectReinforce: 'Pivot brillant ! Intuition solidifiée.',
    returnToChallengeBtn: 'Valider et Continuer',
    
    halfLifeLabTitle: 'Simulateur Cinétique & Réseau de Noyaux',
    halfLifeLabDesc: 'Visualisez la désintégration stochastique sur un réseau de 100 noyaux avec compteur Geiger.',
    selectIsotope: 'Sélectionner l\'Isotope',
    halfLifeDuration: 'Demi-Vie',
    decayStepBtn: 'Décroître d\'une Demi-Vie (t½)',
    resetSimBtn: 'Réinitialiser le Réseau',
    autoPlay: 'Simuler en Temps Réel',
    pause: 'Pause',
    remainingNuclei: 'Noyaux Pères Résiduels',
    decayedNuclei: 'Noyaux Fils Produits',
    elapsedTime: 'Temps Écoulé',
    halfLivesPassed: 'Demi-Vies Écoulées',
    theoreticalPercent: 'Théorique Restant',
    geigerSoundToggle: 'Compteur Geiger Audio',
    
    realWorldApplications: 'Laboratoire de Physique Appliquée',
    carbonDatingTool: 'Datation au Carbone 14',
    petScanTool: 'Traceur Médical TEP (Fluor 18)',
    nuclearEnergyTool: 'Énergie de Fission (Uranium 235)',
    relicAgeCalc: 'Analyseur de Reliques Organiques (C-14)',
    measuredC14: 'Activité en C-14 (% atmosphérique) :',
    estimatedAge: 'Âge Archéologique Estimé :',
    petInitialDose: 'Dose Cible pour l\'Examen (MBq) :',
    transitHours: 'Délai de Transport depuis le Cyclotron (heures) :',
    effectiveDose: 'Dose Initiale Requise au Cyclotron :',
    
    aiTutorTitle: 'Terminal QUANTUM-CORE : Thème 2.3',
    aiTutorSubtitle: 'Lien direct avec votre tuteur IA Nobel spécialisé en radioactivité et demi-vie.',
    askPlaceholder: 'Interrogez l\'IA sur le C-14, le TEP, la cinétique t½...',
    sendBtn: 'Transmettre',
    quickQuestionsTitle: 'Questions Clés du Thème 2.3',
    quickQ1: 'Pourquoi la demi-vie est-elle constante quelle que soit la masse ?',
    quickQ2: 'Comment fonctionne l\'annihilation positon-électron en TEP ?',
    quickQ3: 'Pourquoi le C-14 est-il inefficace sur les métaux ?',
    quickQ4: 'Quelle est la différence entre rayons alpha, bêta et gamma ?',
    
    credentialTitle: 'CERTIFICAT DE MAÎTRISE EN PHYSIQUE NUCLÉAIRE',
    credentialSubtitle: 'Décerné par l\'Institut QUANTUM-CORE AI',
    certRecipient: 'Décerné pour Excellence Scientifique à :',
    certHonors: 'Pour avoir démontré une maîtrise sans faille du Thème 2.3 : Isotopes, Cinétique de Demi-Vie, Désintégrations et Applications.',
    certHash: 'Token de Validation :',
    certDate: 'Conféré le :',
    closeBtn: 'Fermer',
    printCertBtn: 'Imprimer le Certificat',
  },

  de: {
    appName: 'QUANTUM-CORE AI',
    tagline: 'Elite-Simulator: Isotope, Radioaktivität & Halbwertszeit',
    welcomeTitle: 'QUANTUM-CORE AI: THEMA 2.3 ONLINE',
    welcomeSubtitle: 'Willkommen, Wissenschaftspionier! Ich bin QUANTUM-CORE AI. Wir widmen uns zu 100% Thema 2.3: Isotope und grundlegende Radioaktivität: Konzept der Halbwertszeit und reale Anwendungen (C-14, PET-Scan, Strahlentherapie). Kein trockenes Auswendiglernen!',
    selectLanguagePrompt: 'Wähle deine Sprache:',
    studentNamePrompt: 'Gib deinen Forschernamen ein:',
    studentNamePlaceholder: 'z.B. Dr. Marie Curie',
    enterSimulatorBtn: 'Thema 2.3 Immersion Starten',
    
    tabMasterclass: 'Dynamische Masterclass 2.3',
    tabLab: 'Kinetik-Labor & Anwendungen',
    tabChallenges: 'Aktive Challenges & Mikro-Klassen',
    tabAITutor: 'Quanten-AI-Terminal',
    
    xpLabel: 'XP',
    streakLabel: 'Serie',
    masteryBtn: 'Meister-Zertifikat',
    soundOn: 'Audio An',
    soundOff: 'Audio Stumm',
    resetProgress: 'Zurücksetzen',
    
    topicTitle: 'Thema 2.3: Isotope & Grundlegende Radioaktivität',
    topicDesc: 'Halbwertszeit-Konzept (t½), exponentielle Kinetik, Kernstabilitätsband und reale Anwendungen (C-14 Datierung, PET-Tracer F-18 und Radiotherapie).',
    
    questionIndex: 'Herausforderung',
    correctAnswer: 'MEISTERHAFTE DEDUKTION!',
    incorrectAnswer: 'QUANTENFLUKTUATION DETEKTIERT',
    submitAnswer: 'Antwort Bestätigen',
    nextChallenge: 'Nächste Herausforderung',
    generateDynamicAI: '⚡ Thema 2.3 KI-Challenge Generieren',
    generatingAI: 'Synthese mit Gemini 3.8 Flash...',
    allCompletedTitle: 'Thema 2.3 Meisterschaft Erreicht!',
    allCompletedDesc: 'Hervorragende intellektuelle Leistung! Du hast Isotope, Halbwertszeiten und alle medizinischen und archäologischen Anwendungen gemeistert.',
    viewCredentialBtn: 'Zertifikat Einsehen',
    
    microClassBadge: 'ADAPTIVE MIKRO-KLASSE',
    microClassTitle: 'Mikro-Klassen-Protokoll',
    microClassEmpatheticIntro: 'Völlig normal! Das ist einer der denkbar abstraktesten Schritte der Kernphysik:',
    analogyHeading: 'Die Intuitive Analogie',
    formativeCheckHeading: 'Formativer Check',
    formativeCorrectReinforce: 'Brillante Wende! Intuition gefestigt.',
    returnToChallengeBtn: 'Erkenntnis Sichern & Weiter',
    
    halfLifeLabTitle: 'Kinetischer Kerngitter-Simulator',
    halfLifeLabDesc: 'Erlebe den stochastischen Zerfall in einem Gitter von 100 Kernen mit Echtzeit-Geigerzähler.',
    selectIsotope: 'Isotopenprobe Wählen',
    halfLifeDuration: 'Halbwertszeit',
    decayStepBtn: '1 Halbwertszeit zerfallen (t½)',
    resetSimBtn: 'Kerngitter Zurücksetzen',
    autoPlay: 'Echtzeit-Simulation',
    pause: 'Pause',
    remainingNuclei: 'Verbleibende Mutterkerne',
    decayedNuclei: 'Zerfallene Tochterkerne',
    elapsedTime: 'Verstrichene Zeit',
    halfLivesPassed: 'Halbwertszeiten',
    theoreticalPercent: 'Theoretisch Verbleibend',
    geigerSoundToggle: 'Geigerzähler-Audio',
    
    realWorldApplications: 'Angewandte Kernphysik Labor',
    carbonDatingTool: 'Radiokarbon-Datierung (Kohlenstoff-14)',
    petScanTool: 'Medizinischer PET-Scan-Tracer (Fluor-18)',
    nuclearEnergyTool: 'Spaltungsenergie (Uran-235)',
    relicAgeCalc: 'Organische C-14-Artefakt-Analyse',
    measuredC14: 'Gemessene C-14 Restaktivität (% von modern):',
    estimatedAge: 'Geschätztes Archäologisches Alter:',
    petInitialDose: 'Erforderliche Zieldosis im Scanner (MBq):',
    transitHours: 'Transportdauer ab Zyklotron (Stunden):',
    effectiveDose: 'Erforderliche Zyklotron-Anfangsdosis:',
    
    aiTutorTitle: 'QUANTUM-CORE Terminal: Thema 2.3',
    aiTutorSubtitle: 'Direktverbindung zur pädagogischen Nobel-KI für Radioaktivität und Halbwertszeiten.',
    askPlaceholder: 'Frage zu C-14, PET-Scans, t½-Kinetik, Strahlungsarten...',
    sendBtn: 'Senden',
    quickQuestionsTitle: 'Schlüsselfragen zu Thema 2.3',
    quickQ1: 'Warum ist die Halbwertszeit unabhängig von der Masse?',
    quickQ2: 'Wie funktioniert die Positronenannihilation bei F-18 im PET?',
    quickQ3: 'Warum funktioniert C-14 nicht bei Bronzewaffen?',
    quickQ4: 'Wie unterscheiden sich Alpha-, Beta- und Gammastrahlen?',
    
    credentialTitle: 'ZERTIFIKAT FÜR KERNPHYSIK-MEISTERSCHAFT',
    credentialSubtitle: 'Verliehen vom QUANTUM-CORE AI Institute',
    certRecipient: 'In Anerkennung wissenschaftlicher Exzellenz von:',
    certHonors: 'Für die fehlerfreie Demonstration von Thema 2.3: Isotope, Zerfallskinetik (t½), Strahlungsmodi und Anwendungen in C-14 Datierung und Nuklearmedizin.',
    certHash: 'Verifizierungstoken:',
    certDate: 'Verliehen am:',
    closeBtn: 'Schließen',
    printCertBtn: 'Zertifikat Drucken',
  }
};
