import { create } from "zustand";

const useTenantStore = create((set) => ({
  tenants: [],

  setTenantsFromProperties: (properties) => {
    const allTenants = properties.flatMap((property) =>
      property.units
        .map((unit) => {
          if (!unit.tenant) return null;

          return {
            ...unit.tenant,
            unit: unit.UnitNumber,
            propertyId: property.id,
            property: property.title,
          };
        })
        .filter(Boolean)
    );

    set({ tenants: allTenants });
  },

  updateTenant: (updatedTenant) =>
    set((state) => ({
      tenants: state.tenants.map((tenant) =>
        tenant.tenant_id === updatedTenant.tenant_id ? updatedTenant : tenant
      ),
    })),

  // delete Tenant:
  deleteTenant: (id) =>
    set((state) => ({
      tenants: state.tenants.filter((tenant) => tenant.tenant_id !== id),
    })),
}));

export default useTenantStore;
