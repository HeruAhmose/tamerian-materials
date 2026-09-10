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

print("TAMERIAN_EXPERIENCE_PATCH=APPLIED")
