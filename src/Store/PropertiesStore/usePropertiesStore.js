import { create } from "zustand";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const usePropertiesStore = create((set) => ({
  properties: [...propertiesList],
}));

export default usePropertiesStore;
