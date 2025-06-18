import { create } from "zustand";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const usePropertiesStore = create((set, get) => ({
  properties: [...propertiesList],

  addProperties: (newProp) => 
    set((state) => ({
      properties: [...state.properties, newProp]
    })),

  // setting properties - Maintenance Page - Mark As Done
  setProperties: (updatedProperties) =>
    set(() => ({
      properties: updatedProperties,
    })),

  addTenantToProperty: (newTenant) => {
    const { properties } = get();

    const updatedProperties = properties.map((property) => {
      if (property.id !== newTenant.propertyId) return property;

      return {
        ...property,
        units: property.units.map((unit) => {
          if (unit.UnitNumber === newTenant.unit) {
            return {
              ...unit,
              tenant: newTenant,
            };
          }
          return unit;
        }),
      };
    });

    set({ properties: updatedProperties });
  },

  updateTenantInProperty: (updatedTenant) => {
    const { properties } = get();

    const updatedProperties = properties.map((property) => {
      if (property.id !== updatedTenant.propertyId) return property;

      return {
        ...property,
        units: property.units.map((unit) => {
          if (unit.UnitNumber === updatedTenant.unit) {
            return {
              ...unit,
              tenant: updatedTenant,
            };
          }
          return unit;
        }),
      };
    });

    set({ properties: updatedProperties });
  },
}));

export default usePropertiesStore;
