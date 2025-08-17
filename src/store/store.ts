import { create } from "zustand";

type Mode = "session" | "break";

interface Settings {
  breakLength: number;
  sessionLength: number;
  displayTime: number;
  isPlaying: boolean;
  currentMode: Mode;
  notificationEnabled: boolean;
}

interface Actions {
  resetState: () => void;
  togglePlay: () => void;
  setDisplayTime: (time: number) => void;
  setCurrentMode: (mode: Mode) => void;
  incrementTime: (mode: Mode) => void;
  decrementTime: (mode: Mode) => void;
  setTime: (mode: Mode, value: number) => void;
  toggleNotification: () => void;
}

interface MobileCheck {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

type State = Settings & Actions & MobileCheck;

const defaultSettings: Omit<Settings, "notificationEnabled"> = {
  breakLength: 5,
  sessionLength: 25,
  displayTime: 25 * 60,
  isPlaying: false,
  currentMode: "session",
};

export const useStore = create<State>((set) => ({
  ...defaultSettings,

  notificationEnabled: true,

  isMobile: false,

  setIsMobile: (value) => set(() => ({ isMobile: value })),

  resetState: () => set(() => ({ ...defaultSettings })),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setDisplayTime: (time) => set(() => ({ displayTime: time })),

  setCurrentMode: (mode) => set(() => ({ currentMode: mode })),

  toggleNotification: () => set((state) => ({ notificationEnabled: !state.notificationEnabled})),

  incrementTime: (mode) =>
    set((state) => {
      const newState = { ...state };
      if (mode === "session") {
        newState.sessionLength += 1;
        if (state.currentMode === "session") {
          newState.displayTime = newState.sessionLength * 60;
        }
      } else if (mode === "break") {
        newState.breakLength += 1;
        if (state.currentMode === "break") {
          newState.displayTime = newState.breakLength * 60;
        }
      }
      return newState;
    }),

  decrementTime: (mode) =>
    set((state) => {
      const newState = { ...state };
      if (mode === "session" && state.sessionLength > 1) {
        newState.sessionLength -= 1;
        if (state.currentMode === "session") {
          newState.displayTime = newState.sessionLength * 60;
        }
      } else if (mode === "break" && state.breakLength > 1) {
        newState.breakLength -= 1;
        if (state.currentMode === "break") {
          newState.displayTime = newState.breakLength * 60;
        }
      }
      return newState;
    }),

  setTime: (mode, value) =>
    set((state) => {
      const newState = { ...state };
      if (mode === "session") {
        newState.sessionLength = value;
        if (state.currentMode === "session") {
          newState.displayTime = value * 60;
        }
      } else if (mode === "break") {
        newState.breakLength = value;
        if (state.currentMode === "break") {
          newState.displayTime = value * 60;
        }
      }
      return newState;
    }),
}));
