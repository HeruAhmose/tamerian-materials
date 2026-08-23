from pathlib import Path

path = Path('client/src/pages/Home.tsx')
text = path.read_text(encoding='utf-8')

def replace_between(source: str, start: str, end: str, replacement: str) -> str:
    a = source.index(start)
    b = source.index(end, a)
    return source[:a] + replacement.rstrip() + '\n\n' + source[b:]

composition = r'''// ─── Composition Section ───
function CompositionSection() {
  const [active, setActive] = useState(COMPOSITION[0]?.m ?? "q");
  const { play: playSound } = useSound();
  const selected = COMPOSITION.find(item => item.m === active) ?? COMPOSITION[0];

  return (
    <Section
      id="comp"
      eyebrow="Composite Architecture — Claim 15"
      title="Engineered Across Three Scales"
      subtitle="A material architecture instrument: structural carbon, micron-scale crystals, and nanoscale functional phases mapped as one interacting system."
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr]" data-prestige-material-architecture="v1">
        <StaggerReveal>
          <div
            className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border p-6 md:p-8"
            style={{
              borderColor: "rgba(69,232,216,.18)",
              background:
                "radial-gradient(circle at 48% 42%, rgba(69,232,216,.08), transparent 26%), radial-gradient(circle at 68% 64%, rgba(164,133,255,.07), transparent 28%), linear-gradient(145deg,rgba(10,13,21,.96),rgba(4,6,11,.98))",
              boxShadow: "0 34px 100px rgba(0,0,0,.34)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#45e8d8]/80">
                  MATERIAL ATLAS /// LIVE PHASE MAP
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white md:text-3xl">
                  {selected?.n}
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] tracking-[0.16em] text-white/55">
                {selected?.p}
              </div>
            </div>

            <div className="relative mx-auto mt-8 aspect-square w-full max-w-[30rem]">
              <motion.div
                className="absolute inset-[8%] rounded-full border border-[#45e8d8]/18"
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[18%] rounded-full border border-[#a485ff]/18"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[30%] rounded-full border border-[#e8c44a]/18"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[39%] rounded-full bg-[radial-gradient(circle,#fff_0_2%,#45e8d8_4%,rgba(69,232,216,.18)_24%,transparent_70%)] shadow-[0_0_80px_rgba(69,232,216,.22)]" />
              {COMPOSITION.map((item, index) => {
                const angle = (index / COMPOSITION.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 39;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                const chosen = item.m === active;
                return (
                  <motion.button
                    key={item.m}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => {
                      setActive(item.m);
                      playSound("click");
                    }}
                    className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-xs font-bold uppercase backdrop-blur-md md:h-16 md:w-16"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      borderColor: chosen ? "rgba(69,232,216,.75)" : "rgba(255,255,255,.14)",
                      background: chosen
                        ? "radial-gradient(circle,rgba(69,232,216,.22),rgba(6,10,16,.9))"
                        : "rgba(5,8,13,.78)",
                      color: chosen ? "#bffaf3" : "rgba(255,255,255,.58)",
                      boxShadow: chosen ? "0 0 34px rgba(69,232,216,.28)" : undefined,
                    }}
                    animate={chosen ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 1.8, repeat: chosen ? Infinity : 0 }}
                  >
                    {item.m}
                  </motion.button>
                );
              })}
              <div className="pointer-events-none absolute inset-[4%] rounded-full bg-[repeating-conic-gradient(from_0deg,transparent_0_13deg,rgba(255,255,255,.025)_14deg_15deg,transparent_16deg_30deg)] opacity-70" />
            </div>

            <motion.div
              key={selected?.m}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr] md:items-start"
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#45e8d8]/75">FUNCTION</span>
              <p className="text-sm leading-relaxed text-white/68">{selected?.d}</p>
            </motion.div>
          </div>
        </StaggerReveal>

        <StaggerReveal delay={0.1}>
          <div className="space-y-3">
            <div className="mb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">COMPOSITION INSTRUMENTS</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                Select a phase to isolate its role in the hierarchy. The visual field responds as a system, not a list of ingredients.
              </p>
            </div>
            {COMPOSITION.map((item, index) => {
              const chosen = item.m === active;
              return (
                <motion.button
                  key={item.m}
                  type="button"
                  onClick={() => {
                    setActive(item.m);
                    playSound("click");
                  }}
                  aria-pressed={chosen}
                  className="group relative w-full overflow-hidden rounded-2xl border p-5 text-left"
                  style={{
                    borderColor: chosen ? "rgba(69,232,216,.42)" : "rgba(255,255,255,.09)",
                    background: chosen
                      ? "linear-gradient(130deg,rgba(69,232,216,.075),rgba(255,255,255,.018))"
                      : "linear-gradient(130deg,rgba(255,255,255,.025),rgba(255,255,255,.012))",
                    boxShadow: chosen ? "0 20px 54px rgba(69,232,216,.08)" : undefined,
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/25 font-mono text-[10px] text-[#45e8d8]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-serif text-lg font-semibold text-white/90">{item.n}</h4>
                        <span className="font-mono text-[9px] text-white/40">{item.p}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/58">{item.d}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </StaggerReveal>
      </div>
    </Section>
  );
}'''

manufacturing = r'''// ─── Manufacturing Section ───
function ManufacturingSection() {
  const [step, setStep] = useState(0);
  const { play: playSound } = useSound();
  const current = MFG_STEPS[step];

  return (
    <Section
      id="mfg"
      eyebrow="Manufacturing — Claim 16"
      title="Seven Controlled Transformations"
      subtitle="Manufacturing is presented as a state-changing process chain: feedstock becomes conductive architecture, crystals become functional phases, and the composite becomes a qualified device material."
    >
      <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr]" data-prestige-manufacturing="v1">
        <StaggerReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(9,13,20,.96),rgba(4,6,10,.99))] p-5 md:p-6">
            <div className="absolute bottom-6 left-[2.05rem] top-6 w-px bg-gradient-to-b from-[#45e8d8]/55 via-[#a485ff]/35 to-[#e8c44a]/45" />
            <p className="mb-5 pl-12 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">PROCESS SPINE</p>
            <div className="space-y-2">
              {MFG_STEPS.map((item, index) => {
                const active = step === index;
                const complete = index < step;
                return (
                  <button
                    key={item.n}
                    type="button"
                    onClick={() => {
                      setStep(index);
                      playSound("click");
                    }}
                    className="group relative flex w-full items-start gap-4 rounded-2xl p-3 text-left transition"
                    style={{ background: active ? "rgba(69,232,216,.055)" : "transparent" }}
                    aria-pressed={active}
                  >
                    <motion.span
                      className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-[#070b10] font-mono text-[9px]"
                      style={{
                        borderColor: active ? "rgba(69,232,216,.8)" : complete ? "rgba(164,133,255,.55)" : "rgba(255,255,255,.13)",
                        color: active ? "#a9f6ed" : complete ? "#c9baff" : "rgba(255,255,255,.38)",
                        boxShadow: active ? "0 0 24px rgba(69,232,216,.28)" : undefined,
                      }}
                      animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                      transition={{ duration: 1.8, repeat: active ? Infinity : 0 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block font-mono text-[9px] tracking-[0.16em] text-white/34">STEP {item.n}</span>
                      <span className={`mt-1 block text-sm font-semibold ${active ? "text-white" : "text-white/62"}`}>{item.t}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </StaggerReveal>

        <StaggerReveal delay={0.08}>
          <motion.div
            key={current.n}
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative min-h-[38rem] overflow-hidden rounded-[2rem] border border-[#45e8d8]/15 bg-[linear-gradient(145deg,rgba(9,14,22,.97),rgba(3,5,9,.99))] p-6 shadow-[0_35px_110px_rgba(0,0,0,.38)] md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(circle_at_70%_30%,black,transparent_75%)]" />
            <div className="relative flex flex-col gap-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#45e8d8]/75">TRANSFORMATION {current.n}</p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold text-white md:text-5xl">{current.t}</h3>
                </div>
                <span className="font-serif text-6xl font-semibold text-white/[0.045] md:text-8xl">{String(step + 1).padStart(2, "0")}</span>
              </div>

              <div className="relative min-h-[17rem] overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/25">
                <motion.div
                  className="absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#45e8d8]/60 to-transparent"
                  animate={{ scaleX: [0.25, 1, 0.25], opacity: [0.2, 0.9, 0.2] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.i
                    key={i}
                    className="absolute h-2.5 w-2.5 rounded-full bg-[#45e8d8] shadow-[0_0_18px_rgba(69,232,216,.7)]"
                    style={{ left: `${10 + i * 10}%`, top: `${36 + ((i + step) % 3) * 14}%` }}
                    animate={{ y: [0, -10 - (i % 3) * 3, 0], opacity: [0.35, 1, 0.35], scale: [0.7, 1.25, 0.7] }}
                    transition={{ duration: 2.3 + (i % 3) * 0.35, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35 md:inset-x-8">
                  <span>INPUT STATE</span><span>CONTROL WINDOW</span><span>OUTPUT STATE</span>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-[1.85] text-white/68">{current.d}</p>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["PROCESS STATE", `${step + 1} / ${MFG_STEPS.length}`],
                  ["MATERIAL MEMORY", step < 2 ? "FORMATION" : step < 5 ? "INTEGRATION" : "QUALIFICATION"],
                  ["NEXT TRANSITION", step === MFG_STEPS.length - 1 ? "DEVICE READY" : MFG_STEPS[step + 1].t.toUpperCase()],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <div className="font-mono text-[8px] tracking-[0.18em] text-white/35">{label}</div>
                    <div className="mt-2 text-xs font-semibold text-white/75">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </StaggerReveal>
      </div>
    </Section>
  );
}'''

applications = r'''// ─── Applications Section ───
function ApplicationsSection() {
  const [activeApp, setActiveApp] = useState(0);
  const app = APPS[activeApp];

  return (
    <Section
      id="apps"
      eyebrow="Applications — Claims 19–25"
      title="From Material System to Device Architecture"
      subtitle="The composite is not presented as a generic material catalog. Each application is framed as a distinct device topology with a different load, environment, and sensing or energy role."
    >
      <div className="grid gap-7 lg:grid-cols-[1.12fr_.88fr]" data-prestige-device-gallery="v1">
        <StaggerReveal>
          <motion.div
            key={app.t}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,12,19,.97),rgba(3,5,9,.99))] p-6 md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(164,133,255,.09),transparent_26%),radial-gradient(circle_at_28%_70%,rgba(69,232,216,.07),transparent_24%)]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff7eb6]/75">DEVICE TYPOLOGY {String(activeApp + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 max-w-2xl font-serif text-3xl font-semibold text-white md:text-5xl">{app.t}</h3>
                  <p className="mt-3 font-mono text-[9px] tracking-[0.16em] text-white/35">{app.cl}</p>
                </div>
                <div className="text-5xl text-[#45e8d8]/75 md:text-7xl" aria-hidden>{app.icon}</div>
              </div>

              <div className="relative my-9 flex min-h-[14rem] flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/25">
                <motion.div className="absolute h-48 w-48 rounded-full border border-[#45e8d8]/18" animate={{ rotate: 360, scale: [0.92, 1.06, 0.92] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute h-32 w-56 rounded-[50%] border border-[#a485ff]/18" animate={{ rotate: -360 }} transition={{ duration: 13, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute h-20 w-20 rotate-45 border border-[#ff7eb6]/25 bg-[#ff7eb6]/[0.025]" animate={{ rotate: [45, 225, 405], scale: [0.9, 1.12, 0.9] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#45e8d8]/35 bg-[#061116] text-2xl text-[#45e8d8] shadow-[0_0_48px_rgba(69,232,216,.2)]">{app.icon}</div>
                <div className="absolute inset-x-5 bottom-4 flex justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-white/28"><span>HARVEST</span><span>SENSE</span><span>TRANSMIT</span></div>
              </div>

              <p className="max-w-3xl text-base leading-[1.85] text-white/68">{app.d}</p>
            </div>
          </motion.div>
        </StaggerReveal>

        <StaggerReveal delay={0.1}>
          <div className="space-y-3">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/38">APPLICATION ATLAS</p>
            {APPS.map((item, index) => {
              const selected = activeApp === index;
              return (
                <motion.button
                  key={item.t}
                  type="button"
                  onClick={() => setActiveApp(index)}
                  aria-pressed={selected}
                  whileHover={{ x: 4 }}
                  className="w-full rounded-2xl border p-5 text-left"
                  style={{
                    borderColor: selected ? "rgba(255,126,182,.38)" : "rgba(255,255,255,.09)",
                    background: selected ? "linear-gradient(130deg,rgba(255,126,182,.06),rgba(255,255,255,.018))" : "rgba(255,255,255,.018)",
                    boxShadow: selected ? "0 18px 50px rgba(255,126,182,.07)" : undefined,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-2xl ${selected ? "text-[#45e8d8]" : "text-white/35"}`} aria-hidden>{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-serif text-lg font-semibold text-white/88">{item.t}</h4>
                        <span className="font-mono text-[8px] text-white/30">0{index + 1}</span>
                      </div>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#ff7eb6]/60">{item.cl}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </StaggerReveal>
      </div>
    </Section>
  );
}'''

text = replace_between(text, '// ─── Composition Section ───', '// ─── Energy Section ───', composition)
text = replace_between(text, '// ─── Manufacturing Section ───', '// ─── Applications Section ───', manufacturing)
text = replace_between(text, '// ─── Applications Section ───', '// ─── IP / Patents Section ───', applications)

path.write_text(text, encoding='utf-8')
print('TAMERIAN_NATIVE_PRESTIGE_SECTIONS=PASS')
