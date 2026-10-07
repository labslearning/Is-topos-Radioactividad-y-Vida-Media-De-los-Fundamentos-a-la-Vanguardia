import { MCQQuestion, Language, IsotopeInfo } from '../types';

export const isotopePresets: IsotopeInfo[] = [
  {
    id: 'c14',
    name: 'Carbono-14',
    symbol: '¹⁴C',
    atomicNumber: 6,
    neutrons: 8,
    massNumber: 14,
    halfLifeValue: 5730,
    halfLifeUnit: 'years',
    halfLifeDisplay: '5,730 años',
    decayType: 'beta-minus',
    decayLabel: 'Beta-menos (β⁻) → ¹⁴N',
    daughterNucleus: 'Nitrógeno-14 (Estable)',
    applicationType: 'archaeology',
    applicationTitle: 'Datación por Radiocarbono de Reliquias Orgánicas',
    applicationDescription: 'Los seres vivos absorben ¹⁴C atmosférico mediante la fotosíntesis y la cadena trófica. Con su muerte, la ingesta cesa y el ¹⁴C decae con t½ = 5,730 años, creando un reloj cósmico para fechar restos de hasta 50,000 años.',
    realWorldUseCase: 'Datación de rollos del Mar Muerto, fósiles de mamuts y madera neolítica.',
    penetrationShield: 'aluminum'
  },
  {
    id: 'f18',
    name: 'Flúor-18',
    symbol: '¹⁸F',
    atomicNumber: 9,
    neutrons: 9,
    massNumber: 18,
    halfLifeValue: 109.7,
    halfLifeUnit: 'minutes',
    halfLifeDisplay: '109.7 minutos (~1.83 horas)',
    decayType: 'beta-plus',
    decayLabel: 'Beta-más / Positrón (β⁺) → ¹⁸O',
    daughterNucleus: 'Oxígeno-18 (Estable)',
    applicationType: 'medicine',
    applicationTitle: 'Tomografía por Emisión de Positrones (PET)',
    applicationDescription: 'Unido a la glucosa como ¹⁸F-FDG, se acumula en tumores hipermetabólicos. El positrón emitido colisiona con un electrón tisular y se aniquila liberando dos fotones gamma colineales de 511 keV que detecta el escáner.',
    realWorldUseCase: 'Detección precoz de metástasis oncológicas y mapeo cerebral de glucosa.',
    penetrationShield: 'lead'
  },
  {
    id: 'co60',
    name: 'Cobalto-60',
    symbol: '⁶⁰Co',
    atomicNumber: 27,
    neutrons: 33,
    massNumber: 60,
    halfLifeValue: 5.27,
    halfLifeUnit: 'years',
    halfLifeDisplay: '5.27 años',
    decayType: 'gamma',
    decayLabel: 'Beta-menos y Rayos Gamma Intensos (γ) → ⁶⁰Ni',
    daughterNucleus: 'Níquel-60 (Estable)',
    applicationType: 'industry',
    applicationTitle: 'Radioterapia Externa (Gamma Knife) y Esterilización',
    applicationDescription: 'Emite fotones gamma de 1.17 y 1.33 MeV que destruyen tumores cerebrales profundos sin incisión quirúrgica abierta, y esteriliza material hospitalario en frío.',
    realWorldUseCase: 'Teleterapia estereotáctica y esterilización masiva de instrumental médico.',
    penetrationShield: 'lead'
  },
  {
    id: 'i131',
    name: 'Yodo-131',
    symbol: '¹³¹I',
    atomicNumber: 53,
    neutrons: 78,
    massNumber: 131,
    halfLifeValue: 8.02,
    halfLifeUnit: 'days',
    halfLifeDisplay: '8.02 días',
    decayType: 'beta-minus',
    decayLabel: 'Beta-menos (β⁻) y Gamma → ¹³¹Xe',
    daughterNucleus: 'Xenón-131 (Estable)',
    applicationType: 'medicine',
    applicationTitle: 'Terapia Selectiva de Cáncer de Tiroides',
    applicationDescription: 'La tiroides concentra selectivamente el yodo. El ¹³¹I ingerido emite partículas beta que viajan solo 1-2 mm, destruyendo las células tumorales tiroideas sin dañar órganos vecinos.',
    realWorldUseCase: 'Ablación de tejido tiroideo canceroso e hipertiroidismo refractario.',
    penetrationShield: 'aluminum'
  },
  {
    id: 'u235',
    name: 'Uranio-235',
    symbol: '²³⁵U',
    atomicNumber: 92,
    neutrons: 143,
    massNumber: 235,
    halfLifeValue: 704,
    halfLifeUnit: 'millions-years',
    halfLifeDisplay: '704 millones de años',
    decayType: 'alpha',
    decayLabel: 'Desintegración Alfa (α) / Fisión Inducida',
    daughterNucleus: 'Torio-231 (Natural) / Fragmentos de fisión',
    applicationType: 'energy',
    applicationTitle: 'Fisión Nuclear Controlada y Generación Eléctrica',
    applicationDescription: 'Al ser impactado por un neutrón térmico, se fisiona liberando ~200 MeV por núcleo y 2-3 neutrones libres, sustentando la reacción en cadena de los reactores civiles.',
    realWorldUseCase: 'Generación masiva de electricidad descarbonizada en centrales nucleares.',
    penetrationShield: 'paper'
  }
];

export const curriculumData: Record<Language, MCQQuestion[]> = {
  es: [
    {
      id: 'mcq_23_1',
      topic: 'Tema 2.3: Isótopos y Radioactividad Básica',
      subtopic: 'Estructura Isotópica y Estabilidad Nuclear',
      difficulty: 'fundamentos',
      question: 'El Carbono-12 y el Carbono-14 son isótopos del carbono. ¿Qué diferencia subatómica explica por qué el C-12 es totalmente estable mientras que el C-14 es radiactivo?',
      options: [
        { id: 'A', text: 'Tienen diferente número de protones en el núcleo, lo que cambia sus electrones y enlaces químicos.' },
        { id: 'B', text: 'Comparten 6 protones, pero el C-14 tiene 8 neutrones (2 más que el C-12); este exceso desestabiliza la fuerza nuclear y lo fuerza a decaer.' },
        { id: 'C', text: 'El Carbono-14 tiene dos electrones de valencia adicionales que lo convierten en un ion inestable.' },
        { id: 'D', text: 'El Carbono-12 tiene 6 neutrones y el Carbono-14 tiene 14 neutrones en total.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'El número de protones (Z=6) define el elemento y su química idéntica, mientras que la relación N/Z determina si el núcleo se encuentra dentro del cinturón de estabilidad.',
      microClass: {
        empatheticValidation: '¡Totalmente normal! Es muy común confundir el número másico (protones + neutrones) con los neutrones solos, o pensar que los cambios nucleares alteran la química externa.',
        analogy: 'Imagina dos coches idénticos con el mismo motor y volante (protones y electrones). Uno lleva dos lingotes de plomo extra en el maletero (neutrones adicionales). Conducen químicamente igual, pero el exceso de peso en el núcleo genera tanta tensión que termina por fracturarse con el tiempo.',
        formativeQuestion: {
          question: 'Si dos átomos son isótopos del mismo elemento, ¿cuál de sus propiedades DEBE ser idéntica?',
          options: [
            { id: '1', text: 'Su número atómico Z (número de protones en el núcleo)' },
            { id: '2', text: 'Su masa atómica total A' }
          ],
          correctId: '1',
          reinforcement: '¡Exacto! El número atómico Z es el documento de identidad químico de todo elemento.'
        }
      }
    },
    {
      id: 'mcq_23_2',
      topic: 'Tema 2.3: Isótopos y Radioactividad Básica',
      subtopic: 'Modos de Emisión y Blindaje',
      difficulty: 'intermedio',
      question: '¿Cuál es la naturaleza de la partícula emitida en la desintegración Beta Más (β⁺) del Flúor-18 y qué ocurre milímetros después de ser expulsada?',
      options: [
        { id: 'A', text: 'Es un neutrón libre que se frena con una lámina de parafina.' },
        { id: 'B', text: 'Es un positrón (antipartícula del electrón) que se aniquila con un electrón tisular para liberar dos fotones gamma colineales de 511 keV.' },
        { id: 'C', text: 'Es un núcleo de Helio-4 que perfora la piel.' },
        { id: 'D', text: 'Es un fotón electromagnético puro sin masa que no interactúa con la materia.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'La desintegración β⁺ expulsa un positrón que se aniquila con un electrón libre tisular (e⁺ + e⁻ → 2γ a 511 keV en 180°), fundamento del escáner PET.',
      microClass: {
        empatheticValidation: '¡Concepto fascinante! La creación y aniquilación de antimateria dentro del cuerpo de un paciente suena a ciencia ficción pura.',
        analogy: 'Piensa en el positrón como una llave de antimateria: en cuanto toca a su gemelo opuesto (un electrón normal de una célula vecina), ambos desaparecen en un destello de luz pura, disparando dos rayos gamma en direcciones exactamente opuestas (180°) hacia el anillo detector del escáner.',
        formativeQuestion: {
          question: '¿Qué radiación directa registran los sensores del escáner PET tras la aniquilación del positrón?',
          options: [
            { id: '1', text: 'Dos fotones gamma colineales de 511 keV a 180°' },
            { id: '2', text: 'Partículas alfa pesadas' }
          ],
          correctId: '1',
          reinforcement: '¡Correcto! Los dos fotones gamma colineales a 180° trazan la línea espacial del tumor.'
        }
      }
    },
    {
      id: 'mcq_23_3',
      topic: 'Tema 2.3: Isótopos y Radioactividad Básica',
      subtopic: 'Cinética de Vida Media y Exponenciales',
      difficulty: 'fundamentos',
      question: 'Una muestra clínica de 80 mg de un radioisótopo tiene una vida media (t½) de 6 horas. Exactamente 24 horas después, ¿cuánta masa original queda sin desintegrar?',
      options: [
        { id: 'A', text: '20 mg' },
        { id: 'B', text: '10 mg' },
        { id: 'C', text: '5 mg' },
        { id: 'D', text: '2.5 mg' }
      ],
      correctOptionId: 'C',
      reinforcement: 'En 24 horas transcurren 4 vidas medias (24/6 = 4), reduciendo la muestra a (1/2)⁴ = 1/16 de 80 mg = 5 mg.',
      microClass: {
        empatheticValidation: '¡Completamente comprensible! La mente humana tiende a restar de manera lineal en lugar de dividir por dos de forma multiplicativa.',
        analogy: 'Piensa en un reloj de arena cósmico donde cada giro reduce la arena a la mitad exacta: de 80 pasa a 40 (6h), luego a 20 (12h), luego a 10 (18h) y finalmente a 5 mg a las 24h. No se resta una cucharada fija, se divide a la mitad en cada ciclo.',
        formativeQuestion: {
          question: 'Tras 3 vidas medias transcurridas, ¿qué fracción de la muestra inicial queda sin desintegrar?',
          options: [
            { id: '1', text: '1/8 (es decir, 1/2 × 1/2 × 1/2)' },
            { id: '2', text: '1/6' }
          ],
          correctId: '1',
          reinforcement: '¡Exacto! El decaimiento exponencial divide a la mitad sucesivamente: 1/2 → 1/4 → 1/8.'
        }
      }
    },
    {
      id: 'mcq_23_4',
      topic: 'Tema 2.3: Isótopos y Radioactividad Básica',
      subtopic: 'Datación por Radiocarbono (C-14)',
      difficulty: 'intermedio',
      question: '¿Por qué la datación por Carbono-14 es extraordinariamente precisa para fechar un sarcófago egipcio de cedro, pero resulta inútil para fechar una daga de bronce o un monolito de granito?',
      options: [
        { id: 'A', text: 'El C-14 solo se desintegra en presencia de celulosa de madera.' },
        { id: 'B', text: 'Los seres vivos intercambian C-14 con la atmósfera mientras viven; al morir cesa la ingesta y se inicia el reloj. Los minerales inorgánicos jamás absorbieron C-14 metabólico.' },
        { id: 'C', text: 'El bronce emite una radiación que bloquea al C-14.' },
        { id: 'D', text: 'El granito destruye los átomos de carbono por compresión geológica.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'La datación por radiocarbono requiere la interrupción biológica de la asimilación de C-14 en el momento de la muerte del organismo vivo.',
      microClass: {
        empatheticValidation: '¡Duda muy frecuente! Es tentador creer que cualquier objeto desenterrado en una excavación arqueológica puede datarse directamente con C-14.',
        analogy: 'Imagina que los seres vivos tienen una suscripción activa a la atmósfera: mientras comen y respiran, renuevan su nivel de C-14. En cuanto el árbol se tala, la suscripción se cancela y el reloj de C-14 (t½ = 5,730 años) empieza la cuenta atrás. Una daga de bronce fue forjada en un horno de fuego: ¡jamás tuvo una suscripción biológica!',
        formativeQuestion: {
          question: '¿Qué momento marca el tiempo cero (t = 0) en una muestra datada por radiocarbono?',
          options: [
            { id: '1', text: 'El instante de la muerte biológica del organismo' },
            { id: '2', text: 'El momento en que el arqueólogo descubre la pieza' }
          ],
          correctId: '1',
          reinforcement: '¡Brillante! La muerte biológica detiene el intercambio y activa el cronómetro radiactivo.'
        }
      }
    },
    {
      id: 'mcq_23_5',
      topic: 'Tema 2.3: Isótopos y Radioactividad Básica',
      subtopic: 'Oncología Nuclear y Trazadores (PET y Tiroides)',
      difficulty: 'avanzado',
      question: 'En el tratamiento del cáncer de tiroides con Yodo-131 (t½ = 8.02 días), ¿qué combinación de factores biofísicos permite destruir las células tumorales sin dañar el corazón o los riñones?',
      options: [
        { id: 'A', text: 'La afinidad bioquímica selectiva de la tiroides por el yodo y el cortísimo alcance tisular (1-2 mm) de las partículas beta destructivas emitidas.' },
        { id: 'B', text: 'El Yodo-131 solo emite radiación electromagnética que atraviesa los demás órganos sin interactuar.' },
        { id: 'C', text: 'La glándula tiroides neutraliza la radiactividad antes de que pase a la sangre.' },
        { id: 'D', text: 'El Yodo-131 tiene una vida media tan larga que no emite energía durante los primeros meses.' }
      ],
      correctOptionId: 'A',
      reinforcement: 'El 90% del yodo corporal es captado por las células foliculares tiroideas y sus emisiones β⁻ depositan su energía en un radio de apenas 1-2 mm.',
      microClass: {
        empatheticValidation: '¡Gran salto conceptual! La clave de la medicina nuclear avanzada es el matrimonio perfecto entre bioquímica y física de partículas.',
        analogy: 'Es el caballo de Troya definitivo: la tiroides es el único taller del cuerpo que utiliza yodo para fabricar hormonas. Cuando le suministras Yodo-131, abre sus puertas voluntariamente y absorbe el material. Una vez dentro, las partículas beta actúan como micro-explosiones con un alcance de solo milímetros, destruyendo el tumor desde su interior.',
        formativeQuestion: {
          question: '¿Por qué las partículas beta del Yodo-131 no dañan la médula ósea distante?',
          options: [
            { id: '1', text: 'Porque su alcance en tejido humano se limita a 1-2 milímetros' },
            { id: '2', text: 'Porque la médula ósea repele magnéticamente a los electrones' }
          ],
          correctId: '1',
          reinforcement: '¡Correcto! El cortísimo alcance de la radiación beta garantiza la máxima protección de los órganos vecinos.'
        }
      }
    }
  ],

  en: [
    {
      id: 'mcq_23_1',
      topic: 'Topic 2.3: Isotopes & Radioactivity',
      subtopic: 'Isotopic Structure & Stability',
      difficulty: 'fundamentos',
      question: 'Carbon-12 and Carbon-14 are isotopes of carbon. What fundamental subatomic difference distinguishes them, explaining why C-12 is stable while C-14 is radioactive?',
      options: [
        { id: 'A', text: 'They have different proton counts, altering their outer electron valences.' },
        { id: 'B', text: 'Both have 6 protons, but Carbon-14 has 8 neutrons (vs 6 in C-12); this excess exceeds the nuclear stability belt, causing radioactive beta decay.' },
        { id: 'C', text: 'Carbon-14 possesses 2 additional valence electrons.' },
        { id: 'D', text: 'Carbon-12 has 6 neutrons while Carbon-14 has 14 neutrons.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Identical proton count (Z=6) defines identical chemical properties, while the N/Z ratio dictates nuclear stability.',
      microClass: {
        empatheticValidation: 'Totally natural! Many confuse mass number (A) with neutron count alone or assume nuclear changes alter chemistry.',
        analogy: 'Imagine two identical cars with the same engine and steering (protons and electrons). One carries two heavy lead bricks in the trunk (extra neutrons). They steer chemically alike, but the extra weight stresses the nucleus until it undergoes decay.',
        formativeQuestion: {
          question: 'Which property MUST be identical for two isotopes of the same element?',
          options: [
            { id: '1', text: 'Their atomic number Z (number of protons)' },
            { id: '2', text: 'Their total mass number A' }
          ],
          correctId: '1',
          reinforcement: 'Exact! Proton number Z defines the element in the periodic table.'
        }
      }
    },
    {
      id: 'mcq_23_2',
      topic: 'Topic 2.3: Isotopes & Radioactivity',
      subtopic: 'Emission Modes & PET Scans',
      difficulty: 'intermedio',
      question: 'What is the nature of the particle emitted during the Beta-Plus (β⁺) decay of Fluorine-18, and what occurs millimeters after its ejection?',
      options: [
        { id: 'A', text: 'A thermal neutron stopped by paraffin wax.' },
        { id: 'B', text: 'A positron (antimatter) that collides with a tissue electron to undergo annihilation, releasing twin colinear 511 keV gamma photons at 180°.' },
        { id: 'C', text: 'A Helium-4 alpha particle.' },
        { id: 'D', text: 'A pure massless infrared photon.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Positron-electron annihilation (e⁺ + e⁻ → 2γ at 511 keV in opposite 180° directions) forms the physical foundation of oncology PET scans.',
      microClass: {
        empatheticValidation: 'Fascinating concept! Antimatter annihilation inside a hospital patient sounds like pure science fiction.',
        analogy: 'Think of the positron as an antimatter key: the moment it encounters its opposite twin (a normal tissue electron), both vanish in a flash of pure electromagnetic energy, firing two gamma rays in exactly opposite directions (180°) into the scanner rings.',
        formativeQuestion: {
          question: 'What radiation do PET scanner rings directly detect following positron emission?',
          options: [
            { id: '1', text: 'Opposing pairs of 511 keV gamma photons' },
            { id: '2', text: 'Heavy alpha particles' }
          ],
          correctId: '1',
          reinforcement: 'Bullseye! The twin 511 keV gamma rays define the 3D line of response.'
        }
      }
    },
    {
      id: 'mcq_23_3',
      topic: 'Topic 2.3: Isotopes & Radioactivity',
      subtopic: 'Half-Life Kinetics',
      difficulty: 'fundamentos',
      question: 'A laboratory prepares an 80 mg sample of a radioisotope with a half-life of 6 hours. Exactly 24 hours later, how much remains undecayed?',
      options: [
        { id: 'A', text: '20 mg' },
        { id: 'B', text: '10 mg' },
        { id: 'C', text: '5 mg' },
        { id: 'D', text: '2.5 mg' }
      ],
      correctOptionId: 'C',
      reinforcement: 'In 24 hours, exactly 4 half-lives elapse (24/6 = 4), cutting the sample to (1/2)⁴ = 1/16 of 80 mg = 5 mg.',
      microClass: {
        empatheticValidation: 'Very natural! The human brain instinctively wants to subtract linearly rather than halving multiplicatively.',
        analogy: 'Think of an hourglass where each flip halves the sand remaining: 80 to 40 (6h), 40 to 20 (12h), 20 to 10 (18h), and 10 to 5 mg at 24h. It never subtracts a fixed amount; it halves at each interval.',
        formativeQuestion: {
          question: 'After 3 half-lives, what fraction of any initial radioactive sample remains?',
          options: [
            { id: '1', text: '1/8 (which is 1/2 × 1/2 × 1/2)' },
            { id: '2', text: '1/6' }
          ],
          correctId: '1',
          reinforcement: 'Perfect! Exponential decay halves repeatedly: 1/2 → 1/4 → 1/8.'
        }
      }
    },
    {
      id: 'mcq_23_4',
      topic: 'Topic 2.3: Isotopes & Radioactivity',
      subtopic: 'Radiocarbon Dating',
      difficulty: 'intermedio',
      question: 'Why can Carbon-14 dating accurately determine the age of an ancient Egyptian wooden sarcophagus, but is useless for dating a Roman bronze coin or granite megalith?',
      options: [
        { id: 'A', text: 'C-14 only decays in the presence of tree sap.' },
        { id: 'B', text: 'Living organisms constantly exchange C-14 with the biosphere until death stops the intake; metals and minerals never incorporated metabolic atmospheric C-14.' },
        { id: 'C', text: 'Bronze radiation cancels C-14 detection.' },
        { id: 'D', text: 'Granite compresses carbon atoms out of existence.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Radiocarbon dating relies on the biological cessation of atmospheric ¹⁴C uptake at the precise moment of organism death.',
      microClass: {
        empatheticValidation: 'Classic misconception! It is tempting to think radiocarbon dating applies to all archaeological items found together.',
        analogy: 'Living organisms run a biological subscription: eating and breathing tops up their C-14 ratio. When the tree is felled, the subscription cancels and the C-14 decay timer (t½ = 5,730 years) begins ticking down. A bronze coin was smelted from ore: it never had a biological subscription!',
        formativeQuestion: {
          question: 'What event marks Time Zero (t = 0) for a radiocarbon dating sample?',
          options: [
            { id: '1', text: 'The biological death of the organism' },
            { id: '2', text: 'The archaeological excavation date' }
          ],
          correctId: '1',
          reinforcement: 'Spot on! Biological death terminates carbon intake and starts the clock.'
        }
      }
    },
    {
      id: 'mcq_23_5',
      topic: 'Topic 2.3: Isotopes & Radioactivity',
      subtopic: 'Targeted Radiotherapy (I-131 & Co-60)',
      difficulty: 'avanzado',
      question: 'In the ablation of thyroid cancer using Iodine-131 (t½ = 8.02 days), what biophysical combination destroys malignant cells while sparing the heart and kidneys?',
      options: [
        { id: 'A', text: 'Selective biological thyroid avidity for iodine combined with the short (1-2 mm) tissue path length of emitted destructive beta particles.' },
        { id: 'B', text: 'Iodine-131 only emits non-ionizing waves.' },
        { id: 'C', text: 'The thyroid gland magnetizes radioactive atoms.' },
        { id: 'D', text: 'Iodine-131 delays radiation emission until year two.' }
      ],
      correctOptionId: 'A',
      reinforcement: 'The thyroid takes up over 90% of bodily iodine and the beta rays deposit their destructive ionization within a 1-2 mm local radius.',
      microClass: {
        empatheticValidation: 'High-level synthesis! Nuclear medicine marries organ biochemistry with quantum particle physics.',
        analogy: 'It is a molecular Trojan horse: the thyroid needs iodine to make hormones. When it takes up Iodine-131, it traps the radioisotope. The beta particles act like microscopic localized charges that fire only 1-2 mm away, wiping out the tumor without harming distant vital organs.',
        formativeQuestion: {
          question: 'Why do beta rays from Iodine-131 avoid damaging distant bone marrow?',
          options: [
            { id: '1', text: 'Because their tissue range is limited to 1-2 millimeters' },
            { id: '2', text: 'Because bone marrow repels iodine ions' }
          ],
          correctId: '1',
          reinforcement: 'Correct! The short path length of beta rays ensures precise localized therapy.'
        }
      }
    }
  ],

  fr: [
    {
      id: 'mcq_23_1',
      topic: 'Thème 2.3: Isotopes et Radioactivité',
      subtopic: 'Structure Isotopique',
      difficulty: 'fundamentos',
      question: 'Le Carbone 12 et le Carbone 14 sont deux isotopes du carbone. Quelle différence subatomique fondamentale explique pourquoi le C-12 est stable tandis que le C-14 est radioactif ?',
      options: [
        { id: 'A', text: 'Leur nombre de protons est différent, modifiant leurs électrons.' },
        { id: 'B', text: 'Ils ont 6 protons, mais le C-14 a 8 neutrons (contre 6 pour le C-12) ; ce surplus déséquilibre la vallée de stabilité nucléaire.' },
        { id: 'C', text: 'Le Carbone 14 a 2 électrons de valence supplémentaires.' },
        { id: 'D', text: 'Le Carbone 12 a 6 neutrons et le Carbone 14 a 14 neutrons.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Le nombre de protons (Z=6) définit l\'élément, tandis que le rapport N/Z régit la stabilité nucléaire.',
      microClass: {
        empatheticValidation: 'Tout à fait normal ! On confond souvent le nombre de masse avec les neutrons seuls.',
        analogy: 'Deux voitures identiques avec le même moteur (protons et électrons). L\'une transporte deux lingots de plomb dans son coffre (neutrons en plus). La surcharge finit par disloquer son châssis au fil du temps.',
        formativeQuestion: {
          question: 'Quelle grandeur DOIT être identique pour deux isotopes d\'un même élément ?',
          options: [
            { id: '1', text: 'Le numéro atomique Z (nombre de protons)' },
            { id: '2', text: 'Le nombre de masse A' }
          ],
          correctId: '1',
          reinforcement: 'Exact ! Le numéro atomique Z définit l\'élément chimique.'
        }
      }
    },
    {
      id: 'mcq_23_2',
      topic: 'Thème 2.3: Isotopes et Radioactivité',
      subtopic: 'Émissions Bêta et TEP',
      difficulty: 'intermedio',
      question: 'Quelle particule est émise lors de la désintégration Bêta Plus (β⁺) du Fluor 18 et que produit-elle quelques millimètres plus loin ?',
      options: [
        { id: 'A', text: 'Un neutron thermique.' },
        { id: 'B', text: 'Un positon (antimatière) qui s\'annihile avec un électron pour libérer deux photons gamma colinéaires de 511 keV à 180°.' },
        { id: 'C', text: 'Une particule alpha.' },
        { id: 'D', text: 'Un photon infrarouge.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'L\'annihilation positon-électron produit deux photons gamma opposés de 511 keV détectés par le scanner TEP.',
      microClass: {
        empatheticValidation: 'Concept vertigineux ! L\'annihilation d\'antimatière dans un hôpital ressemble à de la science-fiction.',
        analogy: 'Le positon est une clé d\'antimatière : dès qu\'il rencontre son jumeau ordinaire (un électron), tous deux se volatilisent en deux faisceaux gamma opposés à 180° enregistrés par les capteurs.',
        formativeQuestion: {
          question: 'Que détecte directement l\'anneau du scanner TEP ?',
          options: [
            { id: '1', text: 'Deux photons gamma opposés de 511 keV' },
            { id: '2', text: 'Des particules alpha' }
          ],
          correctId: '1',
          reinforcement: 'Correct ! Les photons gamma à 180° tracent la ligne spatiale du foyer tumoral.'
        }
      }
    },
    {
      id: 'mcq_23_3',
      topic: 'Thème 2.3: Isotopes et Radioactivité',
      subtopic: 'Cinétique de Demi-Vie',
      difficulty: 'fundamentos',
      question: 'Un échantillon de 80 mg a une demi-vie de 6 heures. Au bout de 24 heures, combien reste-t-il d\'isotope non désintégré ?',
      options: [
        { id: 'A', text: '20 mg' },
        { id: 'B', text: '10 mg' },
        { id: 'C', text: '5 mg' },
        { id: 'D', text: '2.5 mg' }
      ],
      correctOptionId: 'C',
      reinforcement: 'En 24 heures, 4 demi-vies s\'écoulent (24/6 = 4), réduisant l\'échantillon à (1/2)⁴ = 1/16 de 80 mg = 5 mg.',
      microClass: {
        empatheticValidation: 'Très naturel ! Le cerveau tend à soustraire une quantité fixe au lieu de diviser par deux.',
        analogy: 'Voyez cela comme un sablier cosmique qui divise le sable restant par deux à chaque cycle : 80 → 40 (6h) → 20 (12h) → 10 (18h) → 5 mg (24h).',
        formativeQuestion: {
          question: 'Après 3 demi-vies, quelle fraction initiale reste-t-il ?',
          options: [
            { id: '1', text: '1/8 (1/2 × 1/2 × 1/2)' },
            { id: '2', text: '1/6' }
          ],
          correctId: '1',
          reinforcement: 'Parfait ! Trois divisions successives par deux donnent 1/8.'
        }
      }
    },
    {
      id: 'mcq_23_4',
      topic: 'Thème 2.3: Isotopes et Radioactivité',
      subtopic: 'Datation Carbone 14',
      difficulty: 'intermedio',
      question: 'Pourquoi la datation au C-14 est-elle efficace sur un sarcophage en bois mais inopérante sur une pièce en bronze ?',
      options: [
        { id: 'A', text: 'Le C-14 ne se désintègre qu\'en présence de sève végétale.' },
        { id: 'B', text: 'Les organismes vivants absorbent le C-14 atmosphérique jusqu\'à leur mort. Les métaux inorganiques n\'en ont jamais assimilé.' },
        { id: 'C', text: 'Le bronze émet une onde bloquant la détection.' },
        { id: 'D', text: 'Le métal détruit le carbone.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'La méthode repose sur l\'arrêt biologique de l\'assimilation du C-14 au moment précis de la mort.',
      microClass: {
        empatheticValidation: 'Confusion classique ! On pourrait croire que tout artéfact extrait d\'un site peut être daté au C-14.',
        analogy: 'Les vivants ont un abonnement actif avec l\'atmosphère. À la mort, l\'abonnement cesse et le chronomètre se déclenche. Une pièce en bronze a été forgée dans un creuset minéral : elle n\'a jamais eu d\'abonnement biologique !',
        formativeQuestion: {
          question: 'Quel événement marque le Temps Zéro de la datation ?',
          options: [
            { id: '1', text: 'La mort biologique de l\'organisme' },
            { id: '2', text: 'La découverte archéologique' }
          ],
          correctId: '1',
          reinforcement: 'Exact ! La mort biologique lance le compte à rebours de désintégration.'
        }
      }
    },
    {
      id: 'mcq_23_5',
      topic: 'Thème 2.3: Isotopes et Radioactivité',
      subtopic: 'Radiothérapie Ciblée (Iode 131)',
      difficulty: 'avanzado',
      question: 'Dans le traitement du cancer de la thyroïde à l\'Iode 131, pourquoi les autres organes vitaux sont-ils épargnés ?',
      options: [
        { id: 'A', text: 'La thyroïde capte naturellement l\'iode et les particules bêta n\'ont qu\'un parcours tissulaire de 1 à 2 millimètres.' },
        { id: 'B', text: 'L\'Iode 131 n\'émet que de la lumière visible.' },
        { id: 'C', text: 'La thyroïde magnétise la radioactivité.' },
        { id: 'D', text: 'L\'iode met des mois à s\'activer.' }
      ],
      correctOptionId: 'A',
      reinforcement: 'L\'avidité biologique thyroïdienne alliée au très faible parcours des particules bêta (1-2 mm) garantit la destruction ciblée.',
      microClass: {
        empatheticValidation: 'Synthèse remarquable ! C\'est l\'alliance de la biochimie et de la physique des particules.',
        analogy: 'Un cheval de Troie moléculaire : la thyroïde absorbe l\'iode sans méfiance. Une fois à l\'intérieur, les particules bêta agissent comme des micro-charges dont le rayon d\'action ne dépasse pas 2 mm.',
        formativeQuestion: {
          question: 'Pourquoi les particules bêta n\'atteignent-elles pas le cœur ?',
          options: [
            { id: '1', text: 'Leur portée dans les tissus est limitée à 1-2 mm' },
            { id: '2', text: 'Le cœur est imperméable aux électrons' }
          ],
          correctId: '1',
          reinforcement: 'Correct ! La courte portée bêta protège les organes distants.'
        }
      }
    }
  ],

  de: [
    {
      id: 'mcq_23_1',
      topic: 'Thema 2.3: Isotope & Radioaktivität',
      subtopic: 'Isotopenstruktur & Stabilität',
      difficulty: 'fundamentos',
      question: 'Kohlenstoff-12 und Kohlenstoff-14 sind Isotope des Kohlenstoffs. Welcher subatomare Unterschied erklärt, warum C-12 stabil ist, während C-14 radioaktiv zerfällt?',
      options: [
        { id: 'A', text: 'Unterschiedliche Protonenzahlen im Kern.' },
        { id: 'B', text: 'Beide besitzen 6 Protonen, aber C-14 hat 8 Neutronen (2 mehr als C-12); dieser Überschuss liegt außerhalb des Stabilitätstals und erzwingt Betazerfall.' },
        { id: 'C', text: 'Kohlenstoff-14 hat 2 zusätzliche Valenzelektronen.' },
        { id: 'D', text: 'C-12 hat 6 Neutronen und C-14 hat 14 Neutronen.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Die identische Protonenzahl (Z=6) bestimmt identische Chemie, während das N/Z-Verhältnis die Kernstabilität steuert.',
      microClass: {
        empatheticValidation: 'Völlig normal! Oft wird die Massenzahl mit den reinen Neutronen verwechselt.',
        analogy: 'Zwei baugleiche Autos mit identischem Motor. Eines hat zwei schwere Bleibarren im Kofferraum. Beide fahren chemisch gleich, aber das Übergewicht im Kern überlastet das Fahrwerk und führt zum Zerfall.',
        formativeQuestion: {
          question: 'Welche Eigenschaft MUSS bei zwei Isotopen desselben Elements identisch sein?',
          options: [
            { id: '1', text: 'Die Kernladungszahl Z (Protonenanzahl)' },
            { id: '2', text: 'Die Massenzahl A' }
          ],
          correctId: '1',
          reinforcement: 'Richtig! Die Protonenzahl Z definiert das chemische Element unumstößlich.'
        }
      }
    },
    {
      id: 'mcq_23_2',
      topic: 'Thema 2.3: Isotope & Radioaktivität',
      subtopic: 'Emissionsmodi & PET-Scan',
      difficulty: 'intermedio',
      question: 'Welches Teilchen wird beim Beta-Plus-Zerfall (β⁺) von Fluor-18 emittiert und was passiert kurz nach dem Ausstoß im Gewebe?',
      options: [
        { id: 'A', text: 'Ein thermisches Neutron.' },
        { id: 'B', text: 'Ein Positron (Antimaterie), das mit einem Gewebeelektron annihiliert und zwei kollineare 511-keV-Gammaphotonen im 180°-Winkel freisetzt.' },
        { id: 'C', text: 'Ein schwerer Alphakern.' },
        { id: 'D', text: 'Ein massearmes Infrarotphoton.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Die Positron-Elektron-Annihilation (e⁺ + e⁻ → 2γ bei 511 keV im 180°-Winkel) ist das physikalische Fundament des PET-Scans.',
      microClass: {
        empatheticValidation: 'Ein faszinierendes Konzept! Antimaterie-Vernichtung im Körper eines Patienten klingt nach reiner Science-Fiction.',
        analogy: 'Das Positron ist ein Antimaterie-Schlüssel: Sobald es auf ein normales Gewebeelektron trifft, lösen sich beide in reiner Gammastrahlung auf und feuern zwei Lichtstrahlen im 180°-Winkel in die Detektoren.',
        formativeQuestion: {
          question: 'Was registriert der Detektorring des PET-Scanners direkt?',
          options: [
            { id: '1', text: 'Zwei entgegengesetzte 511-keV-Gammaphotonen im 180°-Winkel' },
            { id: '2', text: 'Alphateilchen' }
          ],
          correctId: '1',
          reinforcement: 'Treffer! Die kollinearen Gammaphotonen liefern die exakte 3D-Position.'
        }
      }
    },
    {
      id: 'mcq_23_3',
      topic: 'Thema 2.3: Isotope & Radioaktivität',
      subtopic: 'Halbwertszeit-Kinetik',
      difficulty: 'fundamentos',
      question: 'Eine Probe von 80 mg hat eine Halbwertszeit von 6 Stunden. Wie viel unzerfallene Substanz ist nach 24 Stunden noch vorhanden?',
      options: [
        { id: 'A', text: '20 mg' },
        { id: 'B', text: '10 mg' },
        { id: 'C', text: '5 mg' },
        { id: 'D', text: '2.5 mg' }
      ],
      correctOptionId: 'C',
      reinforcement: 'In 24 Stunden vergehen 4 Halbwertszeiten (24/6 = 4), wodurch die Restmenge (1/2)⁴ = 1/16 von 80 mg = 5 mg beträgt.',
      microClass: {
        empatheticValidation: 'Absolut verständlich! Das Gehirn neigt dazu, linear abzuziehen statt exponentiell zu halbieren.',
        analogy: 'Wie eine Sanduhr, die sich bei jedem Umdrehen halbiert: 80 → 40 (6h) → 20 (12h) → 10 (18h) → 5 mg (24h).',
        formativeQuestion: {
          question: 'Welcher Anteil verbleibt nach 3 Halbwertszeiten?',
          options: [
            { id: '1', text: '1/8 (1/2 × 1/2 × 1/2)' },
            { id: '2', text: '1/6' }
          ],
          correctId: '1',
          reinforcement: 'Perfekt! Dreimalige Halbierung ergibt genau 1/8.'
        }
      }
    },
    {
      id: 'mcq_23_4',
      topic: 'Thema 2.3: Isotope & Radioaktivität',
      subtopic: 'Radiokarbon-Datierung',
      difficulty: 'intermedio',
      question: 'Warum funktioniert die C-14-Methode bei einem Holzsarkophag, aber nicht bei einer Bronzemünze?',
      options: [
        { id: 'A', text: 'C-14 zerfällt nur in Pflanzenfasern.' },
        { id: 'B', text: 'Lebewesen tauschen zeitlebens C-14 mit der Atmosphäre aus. Anorganische Metalle haben nie biologisches C-14 aufgenommen.' },
        { id: 'C', text: 'Bronze strahlt zu stark.' },
        { id: 'D', text: 'Granit und Bronze zerstören Kohlenstoffatome.' }
      ],
      correctOptionId: 'B',
      reinforcement: 'Die Methode erfordert den biologischen Stopp der C-14-Aufnahme im Augenblick des Todes.',
      microClass: {
        empatheticValidation: 'Klassischer Trugschluss! Man nimmt leicht an, jedes archäologische Fundstück lasse sich mit C-14 datieren.',
        analogy: 'Lebewesen haben ein aktives Abo mit der Atmosphäre. Stirbt der Organismus, wird das Abo gekündigt und die C-14-Uhr beginnt abzulaufen. Eine Bronzemünze wurde aus Erz geschmolzen – sie hatte nie ein biologisches Abo!',
        formativeQuestion: {
          question: 'Welcher Moment markiert den Zeitpunkt Null (t = 0)?',
          options: [
            { id: '1', text: 'Der Moment des biologischen Todes' },
            { id: '2', text: 'Die archäologische Ausgrabung' }
          ],
          correctId: '1',
          reinforcement: 'Genau! Der biologische Tod startet die Zerfallsuhr.'
        }
      }
    },
    {
      id: 'mcq_23_5',
      topic: 'Thema 2.3: Isotope & Radioaktivität',
      subtopic: 'Zielgerichtete Radiotherapie (Iod-131)',
      difficulty: 'avanzado',
      question: 'Warum zerstört Iod-131 Schilddrüsentumore, ohne Herz oder Knochenmark zu schädigen?',
      options: [
        { id: 'A', text: 'Die Schilddrüse nimmt Iod selektiv auf und die Betateilchen haben eine Reichweite von nur 1 bis 2 mm im Gewebe.' },
        { id: 'B', text: 'Iod-131 strahlt nur nachts.' },
        { id: 'C', text: 'Die Schilddrüse schirmt den Rest des Körpers magnetisch ab.' },
        { id: 'D', text: 'Iod-131 aktiviert sich erst nach Monaten.' }
      ],
      correctOptionId: 'A',
      reinforcement: 'Die biochemische Selektivität der Schilddrüse kombiniert mit der ultrakurzen Betareichweite (1-2 mm) minimiert Kollateralschäden.',
      microClass: {
        empatheticValidation: 'Hervorragende Synthese! Nuklearmedizin verbindet Organbiochemie mit Teilchenphysik.',
        analogy: 'Ein molekulares Trojanisches Pferd: Die Schilddrüse nimmt das Iod gierig auf. Die Betateilchen wirken wie Mikro-Sprengladungen mit nur 1-2 mm Radius, die den Tumor von innen zerstören.',
        formativeQuestion: {
          question: 'Warum erreicht die Betastrahlung das Knochenmark nicht?',
          options: [
            { id: '1', text: 'Weil ihre Reichweite im Gewebe auf 1-2 mm begrenzt ist' },
            { id: '2', text: 'Weil Knochenmark Iod abstößt' }
          ],
          correctId: '1',
          reinforcement: 'Richtig! Die minimale Betareichweite schützt empfindliche Nachbarorgane.'
        }
      }
    }
  ]
};
