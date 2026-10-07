import { InteractiveConceptLesson, Language, DecayModeInfo } from '../types';

export const decayModesData: DecayModeInfo[] = [
  {
    id: 'alpha',
    name: 'Desintegración Alfa (α)',
    symbol: '⁴₂He / α',
    particle: 'Núcleo de Helio-4 (2 protones + 2 neutrones)',
    description: 'Ocurre en núcleos pesados inestables (Z > 82). El núcleo expulsa un paquete muy masivo y cargado positivamente (+2e) mediante efecto túnel cuántico.',
    charge: '+2e',
    penetrationPower: 'Muy baja (detenida por una hoja de papel o la capa superficial de la piel).',
    blockedBy: 'Hoja de papel / Capa córnea',
    exampleReaction: '²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He (α)',
    biologicalImpact: 'Poco peligrosa externamente, pero extremadamente destructiva si el emisor se inhala o ingiere (alto poder ionizante LET).'
  },
  {
    id: 'beta-minus',
    name: 'Desintegración Beta Menos (β⁻)',
    symbol: 'e⁻ / β⁻',
    particle: 'Electrón relativista de alta velocidad + Antineutrino electrónico',
    description: 'Ocurre cuando un núcleo tiene un exceso de neutrones. Mediante la fuerza nuclear débil, un neutrón se transmuta en un protón, expulsando un electrón de alta velocidad.',
    charge: '-1e',
    penetrationPower: 'Moderada (atraviesa papel y varios milímetros de piel, pero es frenada por láminas de aluminio o plástico denso).',
    blockedBy: 'Lámina de aluminio (3-5 mm)',
    exampleReaction: '¹⁴₆C → ¹⁴₇N + e⁻ + ν̄ₑ',
    biologicalImpact: 'Puede provocar quemaduras de radiación en piel y ojos. Base de la radioterapia dirigida interna (ej. Yodo-131).'
  },
  {
    id: 'beta-plus',
    name: 'Desintegración Beta Más / Positrón (β⁺)',
    symbol: 'e⁺ / β⁺',
    particle: 'Positrón (antimateria del electrón) + Neutrino electrónico',
    description: 'Ocurre en núcleos con exceso de protones. Un protón se transmuta en neutrón, expulsando un positrón positivo que al frenarse colisiona con un electrón del tejido produciendo aniquilación.',
    charge: '+1e',
    penetrationPower: 'Rango tisular corto (~1 mm) antes de la aniquilación mutua en fotones gamma.',
    blockedBy: 'Frenado tisular inmediato → Aniquilación',
    exampleReaction: '¹⁸₉F → ¹⁸₈O + e⁺ + νₑ',
    biologicalImpact: 'Principio físico absoluto de la Tomografía por Emisión de Positrones (PET) en oncología.'
  },
  {
    id: 'gamma',
    name: 'Radiación Gamma (γ)',
    symbol: 'γ',
    particle: 'Fotón electromagnético de altísima energía (onda-partícula sin masa)',
    description: 'Emisión des-excitatoria de un núcleo hijo que quedó en estado metaestable o excitado tras una desintegración alfa o beta. No altera Z ni A, pero libera energía electromagnética pura.',
    charge: '0 (Neutro)',
    penetrationPower: 'Extremadamente alta (atraviesa el cuerpo humano completo; requiere blindajes masivos de plomo u hormigón).',
    blockedBy: 'Blindaje grueso de plomo (varios cm) u hormigón denso (metros)',
    exampleReaction: '⁶⁰Co → ⁶⁰Ni* + β⁻ → ⁶⁰Ni + 2γ (1.17 MeV y 1.33 MeV)',
    biologicalImpact: 'Riesgo biológico severo de irradiación a distancia de cuerpo entero; utilizado en teleterapia Gamma Knife y esterilización médica.'
  }
];

export const conceptLessons: Record<Language, InteractiveConceptLesson[]> = {
  es: [
    {
      id: 'lesson-1',
      badge: 'FUNDAMENTO ATÓMICO 1',
      title: '¿Qué es realmente un Isótopo? El Pegamento Nuclear',
      subtitle: 'La pugna titánica entre la repulsión de Coulomb y la fuerza nuclear fuerte.',
      intuitiveAnalogy: 'Imagina dos imanes idénticos que se repelen violentamente; los protones cargados positivamente quieren despedazarse entre sí. Los neutrones son partículas neutras que actúan como "cemento nuclear": no tienen carga eléctrica, pero aportan atracción de Fuerza Nuclear Fuerte a distancias subatómicas. Un isótopo tiene los mismos protones (la misma química y electrones), pero diferente número de neutrones.',
      deepExplanation: [
        'El número atómico Z (número de protones) define inmutablemente la identidad del elemento químico y la estructura de su corteza electrónica (valencias, enlaces, reactividad química).',
        'El número de neutrones N define la masa y la estabilidad nuclear. El "Cinturón de Estabilidad" nuclear dicta que en elementos ligeros la estabilidad requiere una relación N/Z ≈ 1. A medida que Z aumenta, se necesitan más neutrones (hasta N/Z ≈ 1.5 en el plomo) para contrarrestar la repulsión electrostática acumulada.',
        'Cuando un núcleo tiene demasiados neutrones o demasiados protones, queda fuera del cinturón de estabilidad: se convierte en un RADIOISÓTOPO inestable que decaerá espontáneamente liberando radiación ionizante.'
      ],
      keyFormula: 'A = Z + N  |  Razón de Estabilidad: (N / Z)',
      interactiveType: 'isotope-builder',
      quickFormativeCheck: {
        question: 'Si el Carbono-12 (Z=6, N=6) es 100% estable, ¿por qué el Carbono-14 (Z=6, N=8) es radiactivo?',
        options: [
          { id: '1', text: 'Porque el exceso de 2 neutrones desequilibra la proporción óptima del cinturón de estabilidad nuclear, forzándolo a decaer.' },
          { id: '2', text: 'Porque al tener más masa atrae electrones que colisionan con el núcleo.' }
        ],
        correctId: '1',
        reinforcement: '¡Exacto! El exceso de neutrones sitúa al C-14 por encima de la banda de estabilidad, provocando su decaimiento beta.'
      }
    },
    {
      id: 'lesson-2',
      badge: 'FÍSICA DE EMISIONES 2',
      title: 'Los 4 Modos de Desintegración Radiactiva',
      subtitle: 'Alfa (α), Beta Menos (β⁻), Beta Más (β⁺) y Gamma (γ): Mecanismos y blindajes.',
      intuitiveAnalogy: 'Cada emisión es una bala con diferente calibre y blindaje: Alfa es una bola de cañón pesada y lenta que se detiene con una simple hoja de papel; Beta es una bala de fusil veloz que atraviesa el papel pero choca contra una lámina de aluminio; y Gamma es un rayo láser invisible que atraviesa casi todo y solo se frena con bloques macizos de plomo.',
      deepExplanation: [
        'Desintegración Alfa (α): El núcleo escupe un paquete de 2 protones y 2 neutrones (un núcleo de ⁴He). Ocurre casi exclusivamente en núcleos muy pesados como el Uranio o el Radio.',
        'Desintegración Beta Menos (β⁻): La fuerza débil transmuta un neutrón en un protón. El núcleo expulsa un electrón rápido (e⁻) y un antineutrino. Z aumenta en 1 unidad.',
        'Desintegración Beta Más (β⁺): Un protón se transmuta en neutrón, expulsando un positrón (antimateria). Z disminuye en 1 unidad. Este proceso es la base del escáner PET hospitalario.',
        'Radiación Gamma (γ): Es energía electromagnética pura (fotones de alta frecuencia) liberada cuando el núcleo desciende desde un estado excitado sin cambiar el número de protones ni neutrones.'
      ],
      keyFormula: 'α: (Z-2, A-4) | β⁻: (Z+1, A) | β⁺: (Z-1, A) | γ: (Z, A)* → (Z, A) + hν',
      interactiveType: 'decay-shield',
      quickFormativeCheck: {
        question: '¿Qué tipo de blindaje es indispensable para detener completamente la radiación Gamma (γ)?',
        options: [
          { id: '1', text: 'Un blindaje espeso de plomo o varios metros de hormigón denso' },
          { id: '2', text: 'Una hoja de cartulina blanca común' }
        ],
        correctId: '1',
        reinforcement: '¡Correcto! Los fotones gamma no tienen masa ni carga y requieren materiales densos de alto número atómico como el plomo para ser atenuados.'
      }
    },
    {
      id: 'lesson-3',
      badge: 'CINÉTICA CUÁNTICA 3',
      title: 'El Concepto de Vida Media (t½): Ley del Decaimiento',
      subtitle: '¿Por qué la vida media es constante sin importar la masa inicial de la muestra?',
      intuitiveAnalogy: 'Piensa en una moneda que lanzas al aire cada segundo: la probabilidad de sacar cara es exactamente del 50%, tanto si lanzas 1 millón de monedas como si lanzas 4. A nivel cuántico, cada núcleo radiactivo individual tiene una probabilidad fija e inmutable por segundo de desintegrarse (constante λ). Por eso, exactamente la mitad de los núcleos presentes se desintegran en cada intervalo de tiempo t½.',
      deepExplanation: [
        'La vida media (t½) es el tiempo requerido para que exactamente el 50% de los núcleos radioactivos iniciales (N₀) se desintegren en núcleos hijos estables.',
        'Matemática exponencial: Tras 1 vida media queda el 50% (1/2). Tras 2 vidas medias queda el 25% (1/4). Tras 3 vidas medias queda el 12.5% (1/8). Tras n vidas medias queda (1/2)ⁿ.',
        'La relación con la constante de desintegración cuántica es λ = ln(2) / t½ ≈ 0.693 / t½. La actividad A(t) = λ·N(t) se mide en Becquerels (Bq, 1 desintegración por segundo).'
      ],
      keyFormula: 'N(t) = N₀ · (1/2)^(t / t½) = N₀ · e^(-λt)  |  λ = ln(2) / t½',
      interactiveType: 'half-life-math',
      quickFormativeCheck: {
        question: 'Si una muestra de 100 gramos de un radioisótopo tiene t½ = 4 horas, ¿cuánto queda tras 12 horas?',
        options: [
          { id: '1', text: '12.5 gramos (han transcurrido 3 vidas medias: 100 → 50 → 25 → 12.5 g)' },
          { id: '2', text: '0 gramos (porque decayó 3 veces 33 gramos)' }
        ],
        correctId: '1',
        reinforcement: '¡Magistral! El decaimiento no es lineal sino multiplicativo: (1/2)³ = 1/8 de 100 g = 12.5 g.'
      }
    },
    {
      id: 'lesson-4',
      badge: 'APLICACIÓN ARQUEOLÓGICA 4',
      title: 'Datación por Radiocarbono (Carbono-14)',
      subtitle: 'El cronómetro cósmico que mide la antigüedad de civilizaciones extintas.',
      intuitiveAnalogy: 'Los seres vivos mantienen una suscripción biológica activa con la atmósfera: mientras respiran y comen, renuevan su nivel de Carbono-14 al mismo ritmo en que decae. En el instante exacto en que un árbol se tala o un animal muere, la suscripción se cancela: el reloj de Carbono-14 (t½ = 5,730 años) empieza la cuenta atrás hacia Nitrogeno-14 sin reposición.',
      deepExplanation: [
        'Creación atmosférica continua: Los rayos cósmicos solares bombardean la estratosfera generando neutrones térmicos, los cuales chocan con el Nitrógeno-14: ¹⁴N + n → ¹⁴C + p.',
        'El ¹⁴C se oxida a dióxido de carbono (¹⁴CO₂), es fijado por fotosíntesis en vegetales y entra en toda la cadena trófica global. La proporción ¹⁴C / ¹²C en organismos vivos se mantiene constante (~1.2 átomos de ¹⁴C por cada billón de ¹²C).',
        'Al morir el organismo, cesa el intercambio biológico de carbono. Al medir la actividad residual de ¹⁴C mediante espectrometría de masas con aceleradores (AMS), los arqueólogos calculan con precisión el tiempo transcurrido desde la muerte (válido hasta ~50,000 años).'
      ],
      keyFormula: 't = -5730 · [ ln(Actividad_Muestra / Actividad_Moderna) / ln(2) ]',
      interactiveType: 'carbon-dating-demo',
      quickFormativeCheck: {
        question: '¿Por qué no se puede usar el Carbono-14 para datar un hacha de bronce o un meteorito de hierro?',
        options: [
          { id: '1', text: 'Porque los metales inorgánicos jamás absorbieron carbono atmosférico mediante procesos biológicos vitales.' },
          { id: '2', text: 'Porque el bronce destruye los átomos de carbono al fundirse.' }
        ],
        correctId: '1',
        reinforcement: '¡Exacto! El C-14 solo funciona en restos orgánicos que alguna vez intercambiaron carbono con la biosfera viva.'
      }
    },
    {
      id: 'lesson-5',
      badge: 'APLICACIÓN MÉDICA 5',
      title: 'Medicina Nuclear y Escáner PET con Flúor-18',
      subtitle: 'Antimateria aplicada: cómo los positrones detectan tumores milimétricos.',
      intuitiveAnalogy: 'Visualiza las células cancerosas como glotonas hambrientas de azúcar: consumen glucosa a un ritmo hasta 20 veces superior al tejido sano. Los médicos acoplan Flúor-18 a una molécula de glucosa (¹⁸F-FDG). Cuando el tumor absorbe la trampa de azúcar, el Flúor-18 emite un positrón que choca con un electrón, produciendo dos rayos gamma opuestos disparados en 180° que delatan la posición exacta del tumor en 3D.',
      deepExplanation: [
        'Síntesis en Ciclotrón: Se bombardea Agua rica en Oxígeno-18 con protones de alta energía: ¹⁸O(p, n)¹⁸F. El Flúor-18 resultante se une químicamente a desoxiglucosa para formar ¹⁸F-FDG.',
        'El Efecto Warburg: Las células tumorales tienen un metabolismo glucolítico anaeróbico exacerbado y sobreexpresan transportadores GLUT-1, acumulando ávidamente el radiofármaco.',
        'Aniquilación Positrón-Electrón: El ¹⁸F decae emitiendo un positrón (β⁺). Tras recorrer ~1 mm en tejido, el positrón colisiona con un electrón libre. Ambos se aniquilan instantáneamente (E = mc²), convirtiendo su masa en reposo en dos fotones gamma colineales de exactamente 511 keV emitidos a 180° uno del otro.',
        'La detección temporal en coincidencia por el anillo del escáner PET permite reconstruir imágenes tridimensionales de alta resolución anatómico-metabólica.'
      ],
      keyFormula: 'e⁺ + e⁻ → 2γ  (E_fotón = m_e · c² = 511 keV)  |  t½(¹⁸F) = 109.7 min',
      interactiveType: 'pet-scan-annihilation',
      quickFormativeCheck: {
        question: '¿Qué propiedad física de los fotones gamma resultantes de la aniquilación permite al escáner PET localizar el tumor con precisión milimétrica?',
        options: [
          { id: '1', text: 'Se emiten siempre en parejas exactamente a 180° de diferencia con energía fija de 511 keV.' },
          { id: '2', text: 'Tienen una velocidad menor que la de la luz.' }
        ],
        correctId: '1',
        reinforcement: '¡Brillante! La emisión simultánea a 180° permite trazar una línea de respuesta espacial inequívoca hasta el punto de origen del tumor.'
      }
    },
    {
      id: 'lesson-6',
      badge: 'APLICACIÓN TERAPÉUTICA 6',
      title: 'Terapia con Yodo-131 y Cobalto-60',
      subtitle: 'Destrucción tisular selectiva y teleterapia Gamma Knife.',
      intuitiveAnalogy: 'Es como un caballo de Troya molecular: la glándula tiroides es el único órgano del cuerpo que absorbe yodo ávidamente. Cuando un paciente ingiere Yodo-131, este viaja directo a las células tiroideas cancerosas y descarga partículas beta destructivas a una distancia de apenas 1-2 milímetros, aniquilando el tumor desde adentro sin tocar los demás órganos vitales.',
      deepExplanation: [
        'Yodo-131 (¹³¹I, t½ = 8.02 días): Emisor mixto Beta Menos y Gamma. Las partículas β⁻ tienen un alcance de fracción de milímetro en tejido humano, depositando una dosis masiva localizada que rompe las hebras de ADN tumoral.',
        'Cobalto-60 (⁶⁰Co, t½ = 5.27 años): Utilizado en el "Gamma Knife" (Bisturí de rayos gamma). Hasta 192 haces colimados de rayos gamma convergen simultáneamente en un volumen tumoral cerebral profundo sin abrir el cráneo quirúrgicamente.',
        'Esterilización Industrial: Los rayos gamma del Cobalto-60 esterilizan en frío instrumental quirúrgico, jeringas, apósitos y alimentos eliminando microorganismos patógenos sin alterar las propiedades del material ni dejar residuos tóxicos.'
      ],
      keyFormula: 'Dosis Absorbida D = E_dep / masa  (Grays, Gy = J/kg)',
      interactiveType: 'radiotherapy-target',
      quickFormativeCheck: {
        question: '¿Por qué el Yodo-131 es ideal para tratar el carcinoma de tiroides sin dañar la médula ósea o el corazón?',
        options: [
          { id: '1', text: 'Porque el tejido tiroideo concentra el 90% del yodo corporal y sus partículas beta solo tienen un alcance de 1 a 2 milímetros.' },
          { id: '2', text: 'Porque el Yodo-131 no emite radiación ionizante hasta que llega al cuello.' }
        ],
        correctId: '1',
        reinforcement: '¡Correcto! La absorción bioquímica ultra-selectiva del tiroides sumada al cortísimo alcance tisular de la radiación beta garantiza máxima eficacia y mínima toxicidad sistémica.'
      }
    }
  ],

  en: [
    {
      id: 'lesson-1',
      badge: 'ATOMIC FOUNDATION 1',
      title: 'What is an Isotope, Truly? The Nuclear Glue',
      subtitle: 'The titanic clash between Coulomb repulsion and the strong nuclear force.',
      intuitiveAnalogy: 'Imagine identical magnetic marbles that violently repel each other: positively charged protons want to tear the nucleus apart. Neutrons act as "nuclear cement" carrying zero charge but contributing strong nuclear force attraction. An isotope shares identical protons (same chemistry and electron shells), but possesses differing numbers of neutrons.',
      deepExplanation: [
        'Atomic number Z (protons) strictly dictates the chemical identity and electron valence architecture.',
        'Neutron count N governs nuclear mass and stability. The "Belt of Stability" dictates N/Z ≈ 1 for light nuclei, shifting to ~1.5 for heavier nuclei like lead.',
        'If a nucleus contains an excess or deficit of neutrons outside this belt, it becomes an unstable RADIOISOTOPE that decays spontaneously to reach stability.'
      ],
      keyFormula: 'A = Z + N  |  Stability Ratio: (N / Z)',
      interactiveType: 'isotope-builder',
      quickFormativeCheck: {
        question: 'If Carbon-12 is stable, why is Carbon-14 radioactive?',
        options: [
          { id: '1', text: 'Because having 8 neutrons upsets the optimal stability ratio, driving beta decay.' },
          { id: '2', text: 'Because extra neutrons attract electrons into the nucleus.' }
        ],
        correctId: '1',
        reinforcement: 'Spot on! The neutron excess places C-14 above the stability valley.'
      }
    },
    {
      id: 'lesson-2',
      badge: 'EMISSION PHYSICS 2',
      title: 'The 4 Radioactive Decay Modes',
      subtitle: 'Alpha (α), Beta Minus (β⁻), Beta Plus (β⁺), and Gamma (γ) emissions and shielding.',
      intuitiveAnalogy: 'Each decay emission is like a projectile with different penetration: Alpha is a heavy cannonball stopped by a sheet of paper; Beta is a rifle bullet piercing paper but blocked by aluminum foil; Gamma is an intense electromagnetic beam penetrating almost everything, needing heavy lead to halt.',
      deepExplanation: [
        'Alpha (α): Ejection of a Helium-4 nucleus (2p + 2n) from heavy nuclei like Uranium.',
        'Beta-Minus (β⁻): Weak force transmuting a neutron into a proton, emitting a fast electron (e⁻) and antineutrino.',
        'Beta-Plus (β⁺): Proton transmuting into a neutron, emitting a positron (antimatter!) essential for PET oncology scans.',
        'Gamma (γ): High-frequency electromagnetic photon released as excited nuclei relax.'
      ],
      keyFormula: 'α: (Z-2, A-4) | β⁻: (Z+1, A) | β⁺: (Z-1, A) | γ: (Z, A)* → (Z, A) + hν',
      interactiveType: 'decay-shield',
      quickFormativeCheck: {
        question: 'Which material is essential to shield against high-energy Gamma rays?',
        options: [
          { id: '1', text: 'Dense lead blocks or thick reinforced concrete' },
          { id: '2', text: 'A single piece of printer paper' }
        ],
        correctId: '1',
        reinforcement: 'Correct! Gamma photons lack mass and charge, requiring dense attenuators like lead.'
      }
    },
    {
      id: 'lesson-3',
      badge: 'QUANTUM KINETICS 3',
      title: 'The Concept of Half-Life (t½): Nature\'s Decay Law',
      subtitle: 'Why is half-life constant regardless of starting sample mass?',
      intuitiveAnalogy: 'Think of tossing coins: each coin has exactly a 50% chance of landing heads up, whether you flip a million coins or four. At the quantum scale, every nucleus possesses an immutable decay probability per second (λ). Thus, exactly half the remaining sample decays over each interval t½.',
      deepExplanation: [
        'Half-life (t½) is the time required for 50% of the initial radioactive parent nuclei (N₀) to transform into stable daughter nuclei.',
        'Exponential kinetics: After 1 t½ = 50% remains; 2 t½ = 25%; 3 t½ = 12.5%; n t½ = (1/2)ⁿ.',
        'Decay constant λ = ln(2) / t½ ≈ 0.693 / t½. Radioactive activity A(t) = λ·N(t) is measured in Becquerels (1 Bq = 1 decay/sec).'
      ],
      keyFormula: 'N(t) = N₀ · (1/2)^(t / t½) = N₀ · e^(-λt)',
      interactiveType: 'half-life-math',
      quickFormativeCheck: {
        question: 'If a 100g sample has t½ = 4 hours, how much remains undecayed after 12 hours?',
        options: [
          { id: '1', text: '12.5 grams (3 half-lives: 100 → 50 → 25 → 12.5g)' },
          { id: '2', text: '0 grams' }
        ],
        correctId: '1',
        reinforcement: 'Masterful! Multiplicative decay cuts the sample in half 3 times.'
      }
    },
    {
      id: 'lesson-4',
      badge: 'ARCHAEOLOGY 4',
      title: 'Radiocarbon Dating (Carbon-14)',
      subtitle: 'The cosmic chronometer measuring the age of ancient civilizations.',
      intuitiveAnalogy: 'Living organisms hold an active subscription to the atmosphere: breathing and feeding maintains their C-14 ratio. When death occurs, the subscription is cancelled: the C-14 clock (t½ = 5,730 years) begins its irreversible countdown.',
      deepExplanation: [
        'Cosmic ray neutrons strike atmospheric Nitrogen-14: ¹⁴N + n → ¹⁴C + p.',
        'Incorporated into CO₂ and assimilated into living organic matter at a constant baseline ratio (¹⁴C / ¹²C ≈ 1.2 × 10⁻¹²).',
        'Upon biological death, carbon intake ceases. Measuring residual ¹⁴C activity via Accelerator Mass Spectrometry (AMS) dates organic relics up to ~50,000 years.'
      ],
      keyFormula: 't = -5730 · [ ln(Activity / ModernActivity) / ln(2) ]',
      interactiveType: 'carbon-dating-demo',
      quickFormativeCheck: {
        question: 'Why can C-14 date an ancient papyrus scroll, but not a Roman bronze sword?',
        options: [
          { id: '1', text: 'Metals never absorbed atmospheric biological carbon from the living food chain.' },
          { id: '2', text: 'Bronze destroys carbon atoms.' }
        ],
        correctId: '1',
        reinforcement: 'Exact! Radiocarbon dating strictly applies to organic biological artifacts.'
      }
    },
    {
      id: 'lesson-5',
      badge: 'MEDICAL ONCOLOGY 5',
      title: 'Nuclear Medicine & PET Scans with Fluorine-18',
      subtitle: 'Antimatter in oncology: how positrons pinpoint tumors in 3D.',
      intuitiveAnalogy: 'Cancer cells are sugar gluttons consuming glucose up to 20x faster than normal tissue. Attaching Fluorine-18 to glucose (¹⁸F-FDG) turns it into a molecular tracer: tumors greedily absorb it, and the positrons emitted annihilate with electrons to shoot twin 511 keV gamma rays into detector rings.',
      deepExplanation: [
        'Cyclotron production: ¹⁸O(p, n)¹⁸F. The isotope is synthesized into ¹⁸F-FDG.',
        'Warburg effect: Hyperactive cancer metabolism concentrates the tracer.',
        'Positron-electron annihilation: e⁺ + e⁻ → 2 colinear 511 keV gamma photons shooting at 180° into detector rings for 3D reconstruction.',
        'Half-life of 109.7 min: Ideal clinical window allowing scan completion while leaving patient radiation-free by nightfall.'
      ],
      keyFormula: 'e⁺ + e⁻ → 2γ (511 keV each at 180°) | t½ = 109.7 min',
      interactiveType: 'pet-scan-annihilation',
      quickFormativeCheck: {
        question: 'What physical signature allows the PET scanner to map the tumor location precisely?',
        options: [
          { id: '1', text: 'Opposing twin 511 keV gamma photons emitted simultaneously at exactly 180°.' },
          { id: '2', text: 'Alpha particles escaping the skin.' }
        ],
        correctId: '1',
        reinforcement: 'Spot on! Coincidence detection of colinear 511 keV photons provides pinpoint 3D lines of response.'
      }
    },
    {
      id: 'lesson-6',
      badge: 'THERAPY 6',
      title: 'Therapy with Iodine-131 & Cobalt-60',
      subtitle: 'Targeted beta destruction and Gamma Knife stereotactic surgery.',
      intuitiveAnalogy: 'Like a molecular Trojan horse: the thyroid gland takes up 90% of bodily iodine. Ingested Iodine-131 concentrates exclusively in thyroid cancer cells, releasing short-range (1mm) beta rays that obliterate malignant cells without harming other organs.',
      deepExplanation: [
        'Iodine-131 (t½ = 8.02 days): Mixed beta-minus and gamma emitter. Beta rays travel only 1-2 mm in tissue, delivering high localized radiation dose.',
        'Cobalt-60 (t½ = 5.27 years): Used in Gamma Knife surgery where ~192 colinear gamma beams converge on deep intracranial tumors non-invasively.',
        'Industrial Sterilization: Cobalt-60 gamma rays sterilize surgical tools and pharmaceuticals without chemical residue.'
      ],
      keyFormula: 'Dose = Energy / mass (Grays, Gy = J/kg)',
      interactiveType: 'radiotherapy-target',
      quickFormativeCheck: {
        question: 'Why does Iodine-131 spare other bodily organs during thyroid ablation?',
        options: [
          { id: '1', text: 'The thyroid selectively concentrates iodine and beta rays travel only 1-2 mm.' },
          { id: '2', text: 'Iodine-131 only activates in the throat.' }
        ],
        correctId: '1',
        reinforcement: 'Spot on! Organ-specific biochemical uptake combined with short beta path length minimizes collateral damage.'
      }
    }
  ],

  fr: [
    {
      id: 'lesson-1',
      badge: 'FONDEMENT ATOMIQUE 1',
      title: 'Qu\'est-ce qu\'un Isotope ? La Colle Nucléaire',
      subtitle: 'La lutte titanesque entre la répulsion de Coulomb et l\'interaction forte.',
      intuitiveAnalogy: 'Les protons de même charge électrique se repoussent violemment. Les neutrons jouent le rôle de colle nucléaire : neutres en charge, ils exercent l\'interaction forte qui soude le noyau.',
      deepExplanation: [
        'Le nombre Z (protons) fixe l\'élément chimique et sa chimie.',
        'Le nombre de neutrons N régit la masse et la stabilité nucléaire.',
        'Un ratio N/Z déséquilibré engendre un radioisotope instable qui se désintègre spontanément.'
      ],
      keyFormula: 'A = Z + N',
      interactiveType: 'isotope-builder',
      quickFormativeCheck: {
        question: 'Pourquoi le Carbone 14 est-il radioactif contrairement au Carbone 12 ?',
        options: [
          { id: '1', text: 'L\'excès de 2 neutrons déstabilise le noyau hors de la vallée de stabilité.' },
          { id: '2', text: 'Il attire des électrons dans son noyau.' }
        ],
        correctId: '1',
        reinforcement: 'Exactement ! Le surplus de neutrons induit la désintégration bêta.'
      }
    },
    {
      id: 'lesson-2',
      badge: 'ÉMISSIONS 2',
      title: 'Les 4 Modes de Désintégration Radioactive',
      subtitle: 'Alpha (α), Bêta Moins (β⁻), Bêta Plus (β⁺) et Gamma (γ).',
      intuitiveAnalogy: 'Alpha est un boulet de canon arrêté par une feuille de papier ; Bêta est une balle stoppée par une plaque d\'aluminium ; Gamma est un rayonnement pénétrant exigeant du plomb massif.',
      deepExplanation: [
        'Alpha (α) : Émission d\'un noyau d\'Hélium 4 (2p + 2n).',
        'Bêta Moins (β⁻) : Un neutron devient un proton en expulsant un électron rapide et un antineutrino.',
        'Bêta Plus (β⁺) : Un proton devient un neutron en émettant un positon (antimatière) crucial en TEP.',
        'Gamma (γ) : Photon électromagnétique de haute énergie désexcitant le noyau.'
      ],
      keyFormula: 'α, β⁻, β⁺, γ',
      interactiveType: 'decay-shield',
      quickFormativeCheck: {
        question: 'Quel écran arrête le rayonnement Gamma ?',
        options: [
          { id: '1', text: 'Une épaisse protection de plomb ou de béton dense' },
          { id: '2', text: 'Une simple feuille de papier' }
        ],
        correctId: '1',
        reinforcement: 'Correct ! Sans masse ni charge, les photons gamma nécessitent du plomb.'
      }
    },
    {
      id: 'lesson-3',
      badge: 'CINÉTIQUE 3',
      title: 'Le Concept de Demi-Vie (t½)',
      subtitle: 'Loi exponentielle de décroissance radioactive.',
      intuitiveAnalogy: 'Comme un jeu de pile ou face : chaque noyau a une probabilité quantique constante de se désintégrer. Exactement la moitié de la matière restante disparaît à chaque période t½.',
      deepExplanation: [
        'La demi-vie est la durée nécessaire pour que 50% des noyaux initiaux se désintègrent.',
        'Formule : N(t) = N₀ · (1/2)^(t / t½).',
        'Activité : A(t) = λ·N(t) en Becquerels (Bq).'
      ],
      keyFormula: 'N(t) = N₀ · (1/2)^(t/t½)',
      interactiveType: 'half-life-math',
      quickFormativeCheck: {
        question: 'Combien reste-t-il après 3 demi-vies ?',
        options: [
          { id: '1', text: '1/8 (12.5% de la masse initiale)' },
          { id: '2', text: 'Zéro' }
        ],
        correctId: '1',
        reinforcement: 'Parfait ! (1/2)³ = 1/8.'
      }
    },
    {
      id: 'lesson-4',
      badge: 'ARCHÉOLOGIE 4',
      title: 'Datation au Carbone 14',
      subtitle: 'Le sablier cosmique pour mesurer le temps archéologique.',
      intuitiveAnalogy: 'Les êtres vivants maintiennent leur taux de C-14 via leur métabolisme. À la mort, l\'assimilation s\'arrête et le chronomètre de désintégration se déclenche (t½ = 5 730 ans).',
      deepExplanation: [
        'Création par les rayons cosmiques : ¹⁴N + n → ¹⁴C + p.',
        'Assimilation biologique constante dans les organismes vivants.',
        'La mesure de l\'activité résiduelle date les vestiges organiques jusqu\'à 50 000 ans.'
      ],
      keyFormula: 't = -5730 · [ln(N/N₀) / ln(2)]',
      interactiveType: 'carbon-dating-demo',
      quickFormativeCheck: {
        question: 'Peut-on dater une épée en bronze au C-14 ?',
        options: [
          { id: '1', text: 'Non, les métaux inorganiques n\'ont jamais assimilé de carbone biologique.' },
          { id: '2', text: 'Oui, sans problème.' }
        ],
        correctId: '1',
        reinforcement: 'Exact ! Seule la matière organique peut être datée au C-14.'
      }
    },
    {
      id: 'lesson-5',
      badge: 'ONCOLOGIE 5',
      title: 'Médecine Nucléaire & TEP au Fluor 18',
      subtitle: 'L\'antimatière en imagerie médicale pour déceler les tumeurs.',
      intuitiveAnalogy: 'Les tumeurs avides de glucose absorbent le ¹⁸F-FDG. Le positon émis s\'annihile avec un électron en deux photons gamma opposés à 180° enregistrés par le scanner.',
      deepExplanation: [
        'Production en cyclotron : ¹⁸O(p, n)¹⁸F lié au glucose (¹⁸F-FDG).',
        'Annihilation e⁺ + e⁻ → 2 photons gamma de 511 keV colinéaires.',
        'La demi-vie de 109.7 min permet l\'examen sans irradiation chronique.'
      ],
      keyFormula: 'e⁺ + e⁻ → 2γ (511 keV à 180°)',
      interactiveType: 'pet-scan-annihilation',
      quickFormativeCheck: {
        question: 'Quelle signature permet de localiser précisément la tumeur ?',
        options: [
          { id: '1', text: 'Deux photons gamma de 511 keV émis simultanément à 180°.' },
          { id: '2', text: 'Des rayons X.' }
        ],
        correctId: '1',
        reinforcement: 'Parfait ! L\'émission à 180° trace la ligne de réponse spatiale.'
      }
    },
    {
      id: 'lesson-6',
      badge: 'THÉRAPIE 6',
      title: 'Thérapie à l\'Iode 131 & Cobalt 60',
      subtitle: 'Destruction tissulaire ciblée et chirurgie Gamma Knife.',
      intuitiveAnalogy: 'La thyroïde capte naturellement l\'iode : l\'Iode 131 ingéré se fixe dans les cellules thyroïdiennes et les détruit grâce à ses rayons bêta de 1 mm de portée.',
      deepExplanation: [
        'Iode 131 (t½ = 8.02 j) : Émetteur bêta détruisant sélectivement le tissu thyroïdien.',
        'Cobalt 60 (t½ = 5.27 ans) : Faisceaux gamma convergeant sur les tumeurs cérébrales (Gamma Knife).',
        'Stérilisation industrielle sans résidus chimiques.'
      ],
      keyFormula: 'Dose = Énergie / masse (Gray)',
      interactiveType: 'radiotherapy-target',
      quickFormativeCheck: {
        question: 'Pourquoi l\'Iode 131 épargne-t-il les autres organes ?',
        options: [
          { id: '1', text: 'La thyroïde concentre l\'iode et les rayons bêta n\'ont que 1 à 2 mm de portée.' },
          { id: '2', text: 'Il ne rayonne que dans le cou.' }
        ],
        correctId: '1',
        reinforcement: 'Exact ! Ciblage biologique exclusif et faible portée bêta.'
      }
    }
  ],

  de: [
    {
      id: 'lesson-1',
      badge: 'ATOMARE GRUNDLAGEN 1',
      title: 'Was ist ein Isotop wirklich? Der Kernkleber',
      subtitle: 'Der titanische Kampf zwischen Coulomb-Abstoßung und starker Kernkraft.',
      intuitiveAnalogy: 'Protonen stoßen sich elektrisch stark ab. Neutronen wirken wie ein Kernkleber: Sie tragen keine Ladung, bringen aber starke Kernkraft ein, die den Atomkern zusammenhält.',
      deepExplanation: [
        'Die Kernladungszahl Z (Protonen) definiert das chemische Element und seine Elektronenhülle.',
        'Die Neutronenzahl N bestimmt die Kernmasse und -stabilität.',
        'Weicht das N/Z-Verhältnis vom Stabilitätsband ab, zerfällt das Radioisotop spontan.'
      ],
      keyFormula: 'A = Z + N',
      interactiveType: 'isotope-builder',
      quickFormativeCheck: {
        question: 'Warum ist Kohlenstoff-14 radioaktiv im Gegensatz zu Kohlenstoff-12?',
        options: [
          { id: '1', text: 'Die 2 überschüssigen Neutronen stören das N/Z-Gleichgewicht des Stabilitätstals.' },
          { id: '2', text: 'Es zieht Elektronen in den Kern.' }
        ],
        correctId: '1',
        reinforcement: 'Richtig! Der Neutronenüberschuss zwingt den Kern zum Betazerfall.'
      }
    },
    {
      id: 'lesson-2',
      badge: 'EMISSIONEN 2',
      title: 'Die 4 Radioaktiven Zerfallsmodi',
      subtitle: 'Alpha (α), Beta-Minus (β⁻), Beta-Plus (β⁺) und Gamma (γ).',
      intuitiveAnalogy: 'Alpha ist eine schwere Kanonenkugel, die an einem Blatt Papier stoppt; Beta ist ein Projektil, das erst an Aluminium scheitert; Gamma ist durchdringende elektromagnetische Strahlung, die massives Blei erfordert.',
      deepExplanation: [
        'Alpha (α): Ausstoß eines Helium-4-Kerns (2p + 2n) aus schweren Kernen.',
        'Beta-Minus (β⁻): Ein Neutron wandelt sich in ein Proton um und stößt ein schnelles Elektron aus.',
        'Beta-Plus (β⁺): Ein Proton wandelt sich in ein Neutron um und stößt ein Positron (Antimaterie) aus.',
        'Gamma (γ): Hochenergetisches elektromagnetisches Photon zur Abregung des Kerns.'
      ],
      keyFormula: 'α, β⁻, β⁺, γ',
      interactiveType: 'decay-shield',
      quickFormativeCheck: {
        question: 'Welches Material schirmt Gammastrahlung ab?',
        options: [
          { id: '1', text: 'Dicke Bleiplatten oder dichter Beton' },
          { id: '2', text: 'Ein einfaches Blatt Papier' }
        ],
        correctId: '1',
        reinforcement: 'Korrekt! Masselose Gammastrahlung benötigt schwere Bleiatome.'
      }
    },
    {
      id: 'lesson-3',
      badge: 'KINETIK 3',
      title: 'Das Konzept der Halbwertszeit (t½)',
      subtitle: 'Exponentielles Zerfallsgesetz der Natur.',
      intuitiveAnalogy: 'Wie Münzwürfe: Jeder Atomkern hat zu jedem Moment eine konstante quantenmechanische Zerfallswahrscheinlichkeit. Exakt die Hälfte zerfällt in jeder Periode t½.',
      deepExplanation: [
        'Die Halbwertszeit ist die Zeitspanne, nach der 50% der Ausgangskerne zerfallen sind.',
        'Formel: N(t) = N₀ · (1/2)^(t / t½).',
        'Aktivität A(t) = λ·N(t) in Becquerel (Bq).'
      ],
      keyFormula: 'N(t) = N₀ · (1/2)^(t/t½)',
      interactiveType: 'half-life-math',
      quickFormativeCheck: {
        question: 'Wie viel Ausgangssubstanz verbleibt nach 3 Halbwertszeiten?',
        options: [
          { id: '1', text: '1/8 (12.5% der Ausgangsmenge)' },
          { id: '2', text: 'Null' }
        ],
        correctId: '1',
        reinforcement: 'Exzellent! (1/2)³ ergibt genau 1/8.'
      }
    },
    {
      id: 'lesson-4',
      badge: 'ARCHÄOLOGIE 4',
      title: 'Radiokarbon-Datierung (Kohlenstoff-14)',
      subtitle: 'Die kosmische Uhr zur Altersbestimmung organischer Artefakte.',
      intuitiveAnalogy: 'Lebewesen haben ein aktives Abo mit der Atmosphäre. Mit dem Tod stoppt die C-14-Aufnahme und die Zerfallsuhr (t½ = 5.730 Jahre) beginnt unaufhaltsam zu ticken.',
      deepExplanation: [
        'Entstehung in der Atmosphäre durch kosmische Strahlung: ¹⁴N + n → ¹⁴C + p.',
        'Biologische Aufnahme über Fotosynthese und Nahrungskette.',
        'Altersbestimmung bis ca. 50.000 Jahre anhand verbleibender C-14-Aktivität.'
      ],
      keyFormula: 't = -5730 · [ln(N/N₀) / ln(2)]',
      interactiveType: 'carbon-dating-demo',
      quickFormativeCheck: {
        question: 'Kann man ein Bronzeschwert mit C-14 datieren?',
        options: [
          { id: '1', text: 'Nein, Metalle haben nie biologischen Kohlenstoff ausgetauscht.' },
          { id: '2', text: 'Ja, problemlos.' }
        ],
        correctId: '1',
        reinforcement: 'Richtig! Die C-14-Methode funktioniert nur bei biologisch-organischem Material.'
      }
    },
    {
      id: 'lesson-5',
      badge: 'ONKOLOGIE 5',
      title: 'Nuklearmedizin & PET-Scan mit Fluor-18',
      subtitle: 'Antimaterie zur präzisen Lokalisierung von Tumoren.',
      intuitiveAnalogy: 'Tumorzellen verbrauchen gierig bis zu 20-mal mehr Glukose. Mit Fluor-18 markierte Glukose (¹⁸F-FDG) wandert in den Tumor; Positronen annihilieren mit Elektronen zu zwei entgegengesetzten 511 keV Gammaphotonen.',
      deepExplanation: [
        'Zyklotron-Produktion von ¹⁸F und Koppelung an Glukose.',
        'Positron-Elektron-Annihilation setzt zwei 511 keV Gammaphotonen im 180°-Winkel frei.',
        'Halbwertszeit von 109.7 min schont den Patienten vor dauerhafter Strahlung.'
      ],
      keyFormula: 'e⁺ + e⁻ → 2γ (511 keV bei 180°)',
      interactiveType: 'pet-scan-annihilation',
      quickFormativeCheck: {
        question: 'Welches Signal ermöglicht die millimetergenaue 3D-Ortung des Tumors?',
        options: [
          { id: '1', text: 'Zwei 511 keV Gammaphotonen, die exakt im 180°-Winkel emittiert werden.' },
          { id: '2', text: 'Alphateilchen.' }
        ],
        correctId: '1',
        reinforcement: 'Perfekt! Die kollineare 180°-Emission erlaubt exakte Koinzidenzmessung.'
      }
    },
    {
      id: 'lesson-6',
      badge: 'THERAPIE 6',
      title: 'Therapie mit Iod-131 & Kobalt-60',
      subtitle: 'Gezielte Zerstörung von Schilddrüsenkarzinomen und Gamma Knife.',
      intuitiveAnalogy: 'Die Schilddrüse speichert fast das gesamte Iod des Körpers. Eingenommenes Iod-131 sammelt sich direkt im Tumorgewebe und zerstört es mit ultrakurzen (1 mm) Betastrahlen.',
      deepExplanation: [
        'Iod-131 (t½ = 8.02 Tage): Betastrahler zur gezielten lokalen Ablation von Schilddrüsentumoren.',
        'Kobalt-60 (t½ = 5.27 Jahre): Konvergierende Gammastrahlen im Gamma Knife gegen Hirntumore.',
        'Kalte Sterilisation medizinischer Instrumente.'
      ],
      keyFormula: 'Dosis = Energie / Masse (Gray)',
      interactiveType: 'radiotherapy-target',
      quickFormativeCheck: {
        question: 'Warum schont Iod-131 das umliegende gesunde Gewebe?',
        options: [
          { id: '1', text: 'Die Schilddrüse reichert Iod selektiv an und Betastrahlen haben nur 1-2 mm Reichweite.' },
          { id: '2', text: 'Weil Iod-131 nur nachts strahlt.' }
        ],
        correctId: '1',
        reinforcement: 'Exakt! Spezifische Organaufnahme und minimale Betareichweite garantieren Schutz.'
      }
    }
  ]
};
