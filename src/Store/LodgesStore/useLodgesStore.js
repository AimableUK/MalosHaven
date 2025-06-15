import { create } from "zustand";
import LodgesList from "../../Data/SiteDataComponent/Lodges";

const useLodgesStore = create((set) => ({
  lodges: [...LodgesList],

  // delete Lodge:
  deleteLodge: (id) =>
    set((state) => ({
      lodges: state.lodges.filter((lodge) => lodge.id !== id),
    })),
}));

export default useLodgesStore;
