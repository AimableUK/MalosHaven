import { create } from "zustand";
import LodgesList from "../../Data/SiteDataComponent/Lodges";

const useLodgesStore = create((set) => ({
  lodges: [...LodgesList],

  // add Lodge:
  addLodge: (newLodge) =>
    set((state) => ({
      lodges: [...state.lodges, newLodge],
    })),

  // delete Lodge:
  deleteLodge: (id) =>
    set((state) => ({
      lodges: state.lodges.filter((lodge) => lodge.id !== id),
    })),
}));

export default useLodgesStore;
