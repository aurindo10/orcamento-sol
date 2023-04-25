import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { PostCreateInput } from "components/organisms/Calendar";
import { AppRouter } from "server/api/root";
import { RouterOutputs } from "utils/api";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type BearStore = {
  propostas: PostCreateInput;
  loadingClient: boolean;
  updatePropostas: (propostas: PostCreateInput) => void;
  updateLoading: (state: boolean) => void;
};

export type GetAllPrecifications =
  RouterOutputs["precificaca"]["getAllPrecifications"];

type usePrecificationStore = {
  precifications: GetAllPrecifications;
  setPrecifications: (precifications: GetAllPrecifications) => void;
  addPrecifications: (precifications: GetAllPrecifications[0]) => void;
  deleteOnedPrecification: (precification: GetAllPrecifications[0]) => void;
};

export const useStore = create<BearStore>((set) => ({
  propostas: [],
  loadingClient: false,
  updatePropostas: (propostas) => set({ propostas: propostas }),
  updateLoading: (state) => set({ loadingClient: state }),
}));
export const usePrecificationStore = create(
  immer<usePrecificationStore>((set) => ({
    precifications: [],
    addPrecifications: (precifications) =>
      set((state) => {
        state.precifications.push(precifications);
      }),
    setPrecifications: (precifications) =>
      set({ precifications: precifications }),
    deleteOnedPrecification: (precification) =>
      set((state) => {
        state.precifications = state.precifications.filter((item) => {
          return item.id !== precification.id;
        });
      }),
  }))
);
