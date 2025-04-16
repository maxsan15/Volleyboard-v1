import { create } from 'zustand';

type RotationStore = {
  rotation: number; // 1-6
  setRotation: (rot: number) => void;
};

export const useRotationStore = create<RotationStore>((set) => ({
  rotation: 1,
  setRotation: (rot) => set({ rotation: rot }),
}));