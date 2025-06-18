import { create } from "zustand";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const usePropertiesStore = create((set) => ({
  properties: [...propertiesList],

  // -------- Property --------

  addProperty: (newProp) =>
    set((state) => ({
      properties: [...state.properties, newProp],
    })),

  editProperty: (updatedProperty) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      ),
    })),

  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    })),

  // -------- Maintenance (for full property replacement) --------

  setProperties: (updatedProperties) =>
    set(() => ({
      properties: updatedProperties,
    })),

  // -------- Tenant --------

  addTenantToProperty: (newTenant) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === newTenant.propertyId
          ? {
              ...property,
              units: property.units.map((unit) =>
                unit.UnitNumber === newTenant.unit
                  ? { ...unit, tenant: newTenant }
                  : unit
              ),
            }
          : property
      ),
    })),

  updateTenantInProperty: (updatedTenant) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === updatedTenant.propertyId
          ? {
              ...property,
              units: property.units.map((unit) =>
                unit.UnitNumber === updatedTenant.unit
                  ? { ...unit, tenant: updatedTenant }
                  : unit
              ),
            }
          : property
      ),
    })),

  deleteTenantFromProperty: (tenantId) =>
    set((state) => ({
      properties: state.properties.map((property) => ({
        ...property,
        units: property.units.map((unit) =>
          unit.tenant?.tenant_id === tenantId
            ? { ...unit, tenant: null }
            : unit
        ),
      })),
    })),

  // -------- Unit --------

  addUnitToProperty: (propertyId, newUnit) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === propertyId
          ? { ...property, units: [...property.units, newUnit] }
          : property
      ),
    })),

  editUnitInProperty: (propertyId, updatedUnit) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              units: property.units.map((unit) =>
                unit.id === updatedUnit.id ? updatedUnit : unit
              ),
            }
          : property
      ),
    })),

  deleteUnitFromProperty: (propertyId, unitId) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              units: property.units.filter((unit) => unit.id !== unitId),
            }
          : property
      ),
    })),
}));

export default usePropertiesStore;
