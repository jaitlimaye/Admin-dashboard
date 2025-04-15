import { create } from "zustand";

interface SnackbarState {
    delay: number;
    setDelay: (delay: number) => void;
}

export const useSettingsStore = create<SnackbarState>((set) => ({
    delay: 0,
    setDelay: (delay) => set({ delay })
}));