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
intro_audio_start = s.find("    // Initialize sound on first user interaction during intro")
intro_effect_close = s.find("  }, []);", intro_audio_start)
if intro_audio_start < 0 or intro_effect_close < 0:
    raise SystemExit("CinematicIntro audio effect boundary not found")
new_intro = """    // Sound remains dormant throughout the cinematic introduction.
    // The dedicated sound control is the only authority allowed to create
    // and enable Web Audio for this session.
"""
s = s[:intro_audio_start] + new_intro + s[intro_effect_close:]
intro_effect_close = s.find("  }, []);", intro_audio_start)
if intro_effect_close < 0:
    raise SystemExit("CinematicIntro effect close not found")
s = (
    s[:intro_effect_close]
    + "  }, [shouldReduceMotion]);"
    + s[intro_effect_close + len("  }, []);"):]
)
p.write_text(s, encoding="utf-8")

print("TAMERIAN_EXPERIENCE_PATCH=APPLIED")
