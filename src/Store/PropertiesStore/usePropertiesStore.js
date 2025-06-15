import { create } from "zustand";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const usePropertiesStore = create((set, get) => ({
  properties: [...propertiesList],

  // setting properties - Maintenance Page - Mark As Done
  setProperties: (updatedProperties) =>
    set(() => ({
      properties: updatedProperties,
    })),

  addTenantToProperty: (newTenant) => {
    const tenantId = `TNT-${Date.now()}`;
    const { properties } = get();

    const updatedProperties = properties.map((property) => {
      if (property.id !== newTenant.propertyId) return property;

      return {
        ...property,
        units: property.units.map((unit) => {
          if (unit.UnitNumber === newTenant.unit) {
            return {
              ...unit,
              tenant: { ...newTenant, tenant_id: tenantId },
            };
          }
          return unit;
        }),
      };
    });

    set({ properties: updatedProperties });
    return tenantId;
  },
}));

export default usePropertiesStore;
