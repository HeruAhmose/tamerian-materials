from pathlib import Path


def replace_exact(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    if old not in text:
        raise SystemExit(f"expected text not found in {path}: {old[:140]!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")

replace_exact("client/src/lib/soundEngine.ts", "  private _muted = false;", "  private _muted = true;")
replace_exact(
    "client/src/lib/soundEngine.ts",
    "      this.masterGain.gain.value = this._volume;",
    "      this.masterGain.gain.value = this._muted ? 0 : this._volume;",
)

p = Path("client/src/contexts/SoundContext.tsx")
s = p.read_text(encoding="utf-8")
s = s.replace("  useEffect,\n  useRef,\n", "")
s = s.replace("  muted: false,\n  initialized: false,", "  muted: true,\n  initialized: false,")
s = s.replace("  const [muted, setMuted] = useState(false);", "  const [muted, setMuted] = useState(true);")
s = s.replace("  const initRef = useRef(false);\n\n", "")
start = s.find("  // Initialize on first user interaction")
end = s.find("  const play = useCallback", start)
if start < 0 or end < 0:
    raise SystemExit("SoundContext auto-init block not found")
s = s[:start] + s[end:]
old = """  const toggleMute = useCallback(() => {
    const newMuted = soundEngine.toggleMute();
    setMuted(newMuted);
  }, []);
"""
new = """  const toggleMute = useCallback(() => {
    const activate = async () => {
      if (!soundEngine.initialized) await soundEngine.init();
      setInitialized(soundEngine.initialized);
      const newMuted = soundEngine.toggleMute();
      setMuted(newMuted);
      if (!newMuted) soundEngine.play(\"click\");
    };
    void activate();
  }, []);
"""
if old not in s:
    raise SystemExit("SoundContext toggle block not found")
s = s.replace(old, new, 1)
p.write_text(s, encoding="utf-8")

p = Path("client/src/components/SoundToggle.tsx")
s = p.read_text(encoding="utf-8")
s = s.replace("  if (!initialized) return null;\n\n", "")
s = s.replace(
    "      title={muted ? \"Unmute sounds\" : \"Mute sounds\"}\n",
    "      aria-label={!initialized ? \"Enable sounds\" : muted ? \"Enable sounds\" : \"Mute sounds\"}\n      aria-pressed={!muted}\n      data-tamerian-sound={muted ? \"off\" : \"on\"}\n      title={!initialized ? \"Enable sounds\" : muted ? \"Enable sounds\" : \"Mute sounds\"}\n",
)
p.write_text(s, encoding="utf-8")

p = Path("client/src/components/CinematicIntro.tsx")
s = p.read_text(encoding="utf-8")
s = s.replace(
    'import { motion, AnimatePresence } from "framer-motion";',
    'import { motion, AnimatePresence, useReducedMotion } from "framer-motion";',
    1,
)
s = s.replace(
    "  const continueButtonRef = useRef<HTMLButtonElement>(null);\n  onCompleteRef.current = onComplete;",
    "  const continueButtonRef = useRef<HTMLButtonElement>(null);\n  const shouldReduceMotion = useReducedMotion();\n  onCompleteRef.current = onComplete;",
    1,
)
s = s.replace(
    "  useEffect(() => {\n    try {\n      if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === \"true\") {",
    "  useEffect(() => {\n    if (shouldReduceMotion) {\n      setShow(false);\n      onCompleteRef.current();\n      return;\n    }\n\n    try {\n      if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === \"true\") {",
    1,
)
old_intro = """    // Initialize sound on first user interaction during intro
    const initAndPlay = async () => {
      await soundEngine.init();
      soundEngine.play(\"intro_rumble\");
    };

    // Try to init sound immediately (may need user gesture)
    const handleInteraction = () => {
      initAndPlay();
      window.removeEventListener(\"click\", handleInteraction);
      window.removeEventListener(\"touchstart\", handleInteraction);
    };
    window.addEventListener(\"click\", handleInteraction);
    window.addEventListener(\"touchstart\", handleInteraction);

    // Also try immediately
    initAndPlay().catch(() => {});

    return () => {
      window.removeEventListener(\"click\", handleInteraction);
      window.removeEventListener(\"touchstart\", handleInteraction);
    };
"""
new_intro = """    // Sound remains dormant throughout the cinematic introduction.
    // The dedicated sound control is the only authority allowed to create
    // and enable Web Audio for this session.
"""
if old_intro not in s:
    raise SystemExit("CinematicIntro audio auto-init block not found")
s = s.replace(old_intro, new_intro, 1)
marker = new_intro + "  }, []);\n"
if marker not in s:
    raise SystemExit("CinematicIntro effect dependency marker not found")
s = s.replace(marker, new_intro + "  }, [shouldReduceMotion]);\n", 1)
p.write_text(s, encoding="utf-8")

print("TAMERIAN_EXPERIENCE_PATCH=APPLIED")
