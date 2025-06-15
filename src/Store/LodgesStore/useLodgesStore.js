import { create } from "zustand";
import LodgesList from "../../Data/SiteDataComponent/Lodges";

const useLodgesStore = create((set) => ({
  Lodges: [...LodgesList],
}));
