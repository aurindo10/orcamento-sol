import { PostCreateInput } from "components/organisms/Calendar";
import { create } from "zustand";

type BearStore = {
  propostas: PostCreateInput;
  updatePropostas: (propostas: PostCreateInput) => void;
};
export const useStore = create<BearStore>((set) => ({
  propostas: [],
  updatePropostas: (propostas) => set({ propostas: propostas }),
}));
