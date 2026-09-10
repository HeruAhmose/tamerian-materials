/*
 * Sound Context — Global sound management with mute toggle
 */
import { createContext, useContext, useCallback, useState } from "react";
import { soundEngine, type SoundType } from "@/lib/soundEngine";

interface SoundContextValue {
  play: (type: SoundType) => void;
  toggleMute: () => void;
  muted: boolean;
  initialized: boolean;
}

const SoundContext = createContext<SoundContextValue>({
  play: () => {},
  toggleMute: () => false,
  muted: true,
  initialized: false,
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const play = useCallback((type: SoundType) => {
    soundEngine.play(type);
  }, []);

  const toggleMute = useCallback(() => {
    const activate = async () => {
      if (!soundEngine.initialized) await soundEngine.init();
      setInitialized(soundEngine.initialized);
      const newMuted = soundEngine.toggleMute();
      setMuted(newMuted);
      if (!newMuted) soundEngine.play("click");
    };
    void activate();
  }, []);

  return (
    <SoundContext.Provider value={{ play, toggleMute, muted, initialized }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
