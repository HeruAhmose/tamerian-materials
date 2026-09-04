// ═══════════════════════════════════════════════════════════════
// Tamerian Materials — Complete Data Layer
// Design: Cinematic Science Documentary
// All patent data, specs, claims preserved from original
// ═══════════════════════════════════════════════════════════════

export const TECH_CARDS = [
  {
    id: "matrix",
    num: "01",
    title: "Hemp-Carbon Matrix",
    color: "#45e8d8",
    colorName: "teal",
    vol: "40–70 vol%",
    claim: "Claim 1",
    short:
      "Application architecture: hemp fibers pyrolyzed at 700–1400°C with claimed conductivity and geometry ranges.",
    overview:
      "The provisional application defines a carbonaceous structural and electrical backbone made from hemp bast fibers pyrolyzed in an oxygen-depleted atmosphere. The temperatures, durations, gas composition, morphology, and conductivity below are application-defined ranges, not independently validated integrated-composite measurements.",
    specs: [
      ["Conductivity", "10² – 10⁶ S/m"],
      ["Fiber Diameter", "5 – 50 μm"],
      ["Fiber Length", "0.5 – 20 mm"],
      ["Aspect Ratio", "> 100:1"],
      ["Volume Fraction", "40 – 70%"],
      ["Pyrolysis Temp", "700 – 1400°C"],
      ["Atmosphere", "N₂ / Ar / Forming Gas"],
      ["Duration", "0.5 – 6 hours"],
    ],
    claims: [
      "Claim 1: Carbonaceous matrix from pyrolyzed hemp at 40–70% by volume",
      "Claim 2: Pyrolysis at 700–1400°C in oxygen-depleted atmosphere",
      "Claim 3: 900–1200°C in 90–98% N₂ + 2–10% H₂, conductivity 10³–10⁵ S/m",
      "Claim 4: Fibrous morphology retained, fiber Ø 5–50 μm, length 0.5–20 mm, aspect >100:1",
    ],
    insight:
      "The design premise is that a continuous carbon-fiber network can create conductive pathways after a percolation threshold is reached. The threshold and resulting conductivity must be measured for each formulation; this interface does not present those values as completed test results.",
  },
  {
    id: "crystals",
    num: "02",
    title: "Crystalline Phases",
    color: "#a485ff",
    colorName: "purple",
    vol: "Multi-phase",
    claim: "Claim 15",
    short:
      "Claimed multi-scale phase ranges for quartz, tourmaline, magnetite, and rare-earth-doped crystals.",
    overview:
      "The provisional application proposes four crystalline phases distributed through a carbon matrix across millimeter, micrometer, and nanometer scales. This is a claimed architecture awaiting fabrication, microscopy, and integrated performance validation.",
    specs: [
      ["Quartz (SiO₂)", "15–45 vol%, 0.5–100 μm"],
      ["Tourmaline (Schorl)", "3–25 vol%, 50–500 nm"],
      ["Magnetite (Fe₃O₄)", "2–20 vol%, 10–200 nm"],
      ["Rare-Earth Doped", "0.3–10 vol%, 0.1–10 μm"],
      ["Polymer Binder", "5–30% by weight"],
      ["Binder Options", "Epoxy, polyimide, silicone, PU"],
    ],
    claims: [
      "Claim 13: Black tourmaline (schorl), 50–500 nm, 5–15 vol%",
      "Claim 14: Quartz average particle size 5–20 μm, present at 20–35 vol%",
      "Claim 15: Hierarchical microstructure with mm/μm/nm-scale distributions",
    ],
    insight:
      "The proposed hierarchy assigns structural and conductive roles to the carbon fibers and functional roles to particles at interfaces and grain boundaries. Whether those distributions produce the intended multifunctional response remains a testable research question.",
  },
  {
    id: "harvest",
    num: "03",
    title: "Multi-Modal Harvesting",
    color: "#e8c44a",
    colorName: "gold",
    vol: "Claimed 80–800 μW/cm²",
    claim: "Claim 6",
    short:
      "Application target: combine piezoelectric, thermoelectric, and spin-Seebeck mechanisms in one material.",
    overview:
      "The provisional application proposes three simultaneous mechanisms: piezoelectric conversion, thermoelectric conversion at carbon-crystal interfaces, and spin-Seebeck enhancement from magnetite. The numerical ranges below are claimed design targets and require integrated-device measurement.",
    specs: [
      ["Piezoelectric", "50–500 μW/cm²"],
      ["Stress Range", "10–100 MPa cyclic"],
      ["Frequency", "0.1–100 Hz"],
      ["Thermoelectric ZT", "1.0–2.5 at 250–350 K"],
      ["Spin-Seebeck Boost", "+40–60% over conventional"],
      ["Combined Output", "80–800 μW/cm²"],
      ["Tensile Strength", "30–200 MPa"],
      ["Young's Modulus", "3–40 GPa"],
    ],
    claims: [
      "Claim 6(a): Piezoelectric 50–500 μW/cm² under 10–100 MPa at 0.1–100 Hz",
      "Claim 6(b): Thermoelectric ZT 1.0–2.5 at 250–350 K",
      "Claim 6(c): Combined 80–800 μW/cm² under simultaneous mechanical + thermal loading",
    ],
    insight:
      "The research hypothesis is that mechanical stress and a thermal gradient could drive multiple conversion pathways in parallel. Demonstrating additive output, stable interfaces, and a useful net power budget is part of the validation program.",
    hasCharts: true,
  },
  {
    id: "quantum",
    num: "04",
    title: "Quantum Sensing",
    color: "#ff7eb6",
    colorName: "pink",
    vol: "Target T₂ 1–10 μs",
    claim: "Claim 7",
    short:
      "Proposed rare-earth-doped quartz sensing centers with a room-temperature coherence target.",
    overview:
      "The provisional application proposes rare-earth-doped crystalline particles as quantum spin or optical centers, interrogated through optical, microwave, or radio-frequency control. Room-temperature coherence and operation from energy harvested by the same composite are hypotheses, not demonstrated system performance.",
    specs: [
      ["Dopants", "Eu³⁺, Nd³⁺, Er³⁺, Yb³⁺, Ce³⁺"],
      ["Host Matrix", "Quartz (SiO₂)"],
      ["Dopant Concentration", "0.1–5 atomic %"],
      ["Coherence Hypothesis", "> 500 ns at 300K"],
      ["Application Target", "T₂ of 1–10 μs"],
      ["Sensing Targets", "Magnetic field, temperature, strain"],
      ["Self-Power Goal", "Energy from same composite"],
    ],
    claims: [
      "Claim 7: Quantum spin coherence T₂ of 1–10 μs at room temperature",
      "Claim 5: Europium-doped quartz at 0.5–2 atomic % concentration",
      "Claim 24: Device with quantum readout circuit measuring magnetic field, temp, or strain",
    ],
    insight:
      "Rare-earth ions in a crystal host are candidate addressable centers whose response may be sensitive to magnetic field, temperature, and strain. The proposed host, coherence window, readout method, and self-power budget all require experimental validation in the integrated material.",
  },
];

export const MFG_STEPS = [
  {
    n: "710",
    t: "Fiber Preparation",
    d: "The application process begins by sourcing, cleaning, cutting, and pre-conditioning industrial hemp bast fibers. Feedstock selection and its effect on carbon yield and fiber quality require controlled characterization.",
  },
  {
    n: "720",
    t: "Pyrolysis",
    d: "The application specifies heating hemp fibers to 700–1400°C in an oxygen-depleted atmosphere for 0.5–6 hours. Retained morphology and conductivity of 10²–10⁶ S/m are claimed outcomes to be measured for each process window.",
  },
  {
    n: "730",
    t: "Crystal Synthesis",
    d: "The proposed method prepares or procures quartz microcrystals, tourmaline and magnetite nanoparticles, and rare-earth-doped crystals. Phase identity, dopant concentration, and reproducibility require analytical verification.",
  },
  {
    n: "740",
    t: "Dispersion",
    d: "The application proposes solvent dispersion with a compatible surfactant or polymeric agent, followed by ultrasonication within stated frequency, power, and duration windows. Homogeneity must be confirmed by microscopy and sampling.",
  },
  {
    n: "750",
    t: "Binder Addition",
    d: "The proposed process introduces a polymer binder at an application-defined weight fraction, mixes the precursor, and degasses it under vacuum. Uniformity, residual solvent, and void fraction remain process-control measurements.",
  },
  {
    n: "760",
    t: "Forming & Curing",
    d: "The application contemplates casting, molding, extrusion, and multiple curing or consolidation paths for panels, tiles, films, or flexible strips. Geometry-specific process parameters require validation.",
  },
  {
    n: "770",
    t: "QC & Electrodes",
    d: "The proposed final stage adds electrodes and measures electrical, piezoelectric, thermoelectric, and mechanical behavior. Acceptance criteria and rework rules must be established from reproducible experimental data.",
  },
];

export const APPS = [
  {
    icon: "⬡",
    t: "Energy Harvesting Tiles",
    cl: "Claims 19, 20, 22",
    d: "Proposed floor-tile architecture with a composite layer, electrodes, protective layers, and energy management. Claims 19, 20, and 22 define a 10–400 cm² panel intended to harvest foot traffic and thermal gradients; delivered power remains to be measured.",
  },
  {
    icon: "◎",
    t: "Wearable Devices",
    cl: "Claims 11b, 23",
    d: "Proposed integration into flexible bands or garments using an elastomeric binder. Harvesting body motion and heat to support a wearable load is an application goal, not a demonstrated device result.",
  },
  {
    icon: "△",
    t: "Structural Health Monitoring",
    cl: "Claim 25",
    d: "Claim 25 proposes bonding or embedding the composite in infrastructure for vibration and thermal harvesting alongside sensing. Cable-free and battery-free operation depends on a validated energy budget and field testing.",
  },
  {
    icon: "◇",
    t: "Proposed Self-Powered Quantum Sensors",
    cl: "Claim 24",
    d: "Claim 24 proposes rare-earth-doped sensing zones and a readout circuit for magnetic field, temperature, or strain. Room-temperature coherence and same-composite power remain unvalidated targets.",
  },
  {
    icon: "⊡",
    t: "Wireless IoT Nodes",
    cl: "Claim 21",
    d: "Claim 21 proposes a sensor, microcontroller, and wireless transmitter supported by the composite. Battery-free operation is contingent on measured harvesting output, storage losses, duty cycle, and load demand.",
  },
];

export const CLAIMS = {
  composition: [
    "1. Composite: carbonaceous matrix (40–70%) + quartz (15–45%) + tourmaline (3–25%) + magnetite (2–20%) + RE (0.3–10%) + polymer binder (5–30% wt)",
    "2. Matrix produced by pyrolysis of hemp at 700–1400°C in oxygen-depleted atmosphere",
    "3. Pyrolysis at 900–1200°C in forming gas (90–98% N₂ + 2–10% H₂), conductivity 10³–10⁵ S/m",
    "4. Fibrous morphology: Ø 5–50 μm, length 0.5–20 mm, aspect ratio >100:1",
    "5. Rare-earth particles: europium-doped quartz at 0.5–2 atomic percent europium",
    "6. Performance: (a) piezoelectric 50–500 μW/cm², (b) ZT 1.0–2.5 at 250–350K, (c) combined 80–800 μW/cm²",
    "7. Quantum spin coherence time T₂ of 1–10 microseconds at room temperature",
    "8. Mechanical: tensile strength 30–200 MPa, Young's modulus 3–40 GPa, elongation 1–8%",
    "9. Application claim: carbon-negative production with net sequestration >0.5 tons CO₂ per ton composite; lifecycle validation pending",
    "10–11. Binder: epoxy resin for rigid applications, silicone elastomer for flexible wearable applications",
    "12. Magnetite nanoparticles form percolating network enhancing conductivity and spin-Seebeck response",
    "13. Tourmaline is black tourmaline (schorl), 50–500 nm particle size, present at 5–15 vol%",
    "14. Quartz microcrystals: average particle size 5–20 μm, present at 20–35 vol%",
    "15. Hierarchical microstructure: mm-scale fibers, μm-scale crystals at interfaces, nm-scale particles at grain boundaries",
  ],
  methods: [
    "16. Manufacturing method: pyrolyze hemp → procure/synthesize crystals → disperse all in solvent → ultrasonicate (20–40 kHz, 100–1000W, 15–60 min) → add polymer binder → degass under vacuum → form into desired shape → cure/consolidate",
    "17. Solvent selected from water, ethanol, isopropanol, N-methyl-2-pyrrolidone; dispersing agent compatible with polymer binder",
    "18. Post-curing step: attach electrodes to opposed surfaces of cured composite for energy harvesting",
  ],
  devices: [
    "19. Energy harvesting device: composite panel/film + first electrode + second electrode + energy management circuit (rectifier + voltage regulator + energy storage) + load",
    "20. Panel with lateral area of 10–400 cm², configured to harvest from ambient vibration, human motion, and temperature gradients",
    "21. Load comprises wireless sensor node (sensor + microcontroller + wireless transmitter), no external battery required",
    "22. Floor tile configuration: composite installed in building floor, harvests foot traffic + temperature gradients across tile",
    "23. Flexible wearable article: worn on human body, harvests body motion and body heat",
    "24. Quantum sensing device: rare-earth doped regions define quantum sensing zones, quantum readout circuit measures magnetic field, temperature, or strain, powered by composite energy harvesting",
    "25. Structural component for infrastructure monitoring: bonded to/embedded in bridges, beams, pipelines, roadways — self-powered structural health monitoring",
  ],
};

export const COMPOSITION = [
  {
    m: "q",
    n: "Hemp-Carbon Matrix",
    p: "40–70 vol%",
    d: "Claimed structural backbone: pyrolysis at 700–1400°C, fiber Ø 5–50 μm, and conductivity 10²–10⁶ S/m. Hemp is a bio-derived feedstock; lifecycle impact is not yet quantified.",
    w: 60,
    c: "#f0e8d8",
  },
  {
    m: "t",
    n: "Quartz (SiO₂)",
    p: "15–45 vol%",
    d: "Stable piezoelectric phase generating charge under stress. Particle size 0.5–100 μm. d₃₃ ~2.3 pC/N. Host matrix for rare-earth dopants.",
    w: 35,
    c: "#45e8d8",
  },
  {
    m: "m",
    n: "Tourmaline (Schorl)",
    p: "3–25 vol%",
    d: "Enhanced piezoelectric coefficient d₃₃ ~5–10 pC/N plus pyroelectric effect. 50–500 nm particles. Dual mechanical + thermal harvesting.",
    w: 16,
    c: "#a485ff",
  },
  {
    m: "p",
    n: "Magnetite (Fe₃O₄)",
    p: "2–20 vol%",
    d: "Room-temperature ferrimagnetism. Spin-Seebeck thermoelectric enhancement. 10–200 nm particles forming percolating networks.",
    w: 12,
    c: "#e8c44a",
  },
  {
    m: "c",
    n: "Rare-Earth Crystals",
    p: "0.3–10 vol%",
    d: "Proposed europium/neodymium-doped quartz at 0.1–5 atomic percent, with a coherence hypothesis above 500 ns at 300K. Not yet confirmed in the integrated composite.",
    w: 6,
    c: "#ff7eb6",
  },
];

export const ORBITAL_NODES = [
  { a: 0, r: 46, c: "#f0e8d8", m: "q" },
  { a: 72, r: 46, c: "#45e8d8", m: "t" },
  { a: 144, r: 46, c: "#a485ff", m: "m" },
  { a: 216, r: 46, c: "#e8c44a", m: "p" },
  { a: 288, r: 46, c: "#ff7eb6", m: "c" },
  { a: 36, r: 33, c: "#45e8d8", m: "t" },
  { a: 108, r: 33, c: "#f0e8d8", m: "q" },
  { a: 180, r: 33, c: "#a485ff", m: "m" },
  { a: 252, r: 33, c: "#e8c44a", m: "p" },
  { a: 324, r: 33, c: "#ff7eb6", m: "c" },
];

export const IMAGES = {
  hero: "/images/tamerian/hero-material-architecture.svg",
  crystal: "/images/tamerian/crystalline-phases.svg",
  energy: "/images/tamerian/energy-harvesting-concept.svg",
  quantum: "/images/tamerian/quantum-sensing-hypothesis.svg",
  hemp: "/images/tamerian/hemp-carbon-matrix.svg",
};

export const STATS = [
  {
    value: "40–70",
    suffix: "%",
    label: "Claimed Hemp-Carbon Vol",
    countFrom: 40,
    countTo: 70,
  },
  {
    value: "10²–10⁶",
    suffix: "",
    label: "Claimed S/m Range",
    isStatic: true,
  },
  { value: "25", suffix: "", label: "Patent Claims", countTo: 25 },
  { value: "5", suffix: "", label: "Crystal Systems", countTo: 5 },
  {
    value: ">0.5",
    suffix: "",
    label: "LCA Target · Unverified",
    isStatic: true,
  },
];
