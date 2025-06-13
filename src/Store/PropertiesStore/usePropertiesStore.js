import { create } from "zustand";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const usePropertiesStore = create((set) => ({
  properties: [...propertiesList],

  // setting properties - Maintenance Page - Mark As Done
  setProperties: (updatedProperties) =>
    set(() => ({
      properties: updatedProperties,
    })),
}));

export default usePropertiesStore;
