import { PostCreateInput } from "components/organisms/Calendar";
import { create } from "zustand";

type BearStore = {
  propostas: PostCreateInput;
  loadingClient: boolean;
  updatePropostas: (propostas: PostCreateInput) => void;
  updateLoading: (state: boolean) => void;
};
export const useStore = create<BearStore>((set) => ({
  propostas: [],
  loadingClient: false,
  updatePropostas: (propostas) => set({ propostas: propostas }),
  updateLoading: (state) => set({ loadingClient: state }),
}));
