import { create } from "zustand";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const usePropertiesStore = create((set, get) => ({
  properties: [...propertiesList],

  // add Property:
  addProperty: (newProp) =>
    set((state) => ({
      properties: [...state.properties, newProp],
    })),

  // edit Property:
  editProperty: (updatedProperty) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      ),
    })),

  // delete Property:
  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    })),

  // setting properties - Maintenance Page - Mark As Done
  setProperties: (updatedProperties) =>
    set(() => ({
      properties: updatedProperties,
    })),

  // adding a tenant ~ useTenantStore
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

  // editting a tenant ~ useTenantStore
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

  // add unit to properties:
  addUnitToProperty: (propertyId, newUnit) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === propertyId
          ? { ...property, units: [...property.units, newUnit] }
          : property
      ),
    })),
}));

export default usePropertiesStore;
