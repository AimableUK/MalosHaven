import { create } from "zustand";

const useTenantStore = create((set) => ({
  tenants: [],

  setTenantsFromProperties: (properties) => {
    const allTenants = properties.flatMap((property) =>
      property.units.map((unit) => unit.tenant).filter((tenant) => tenant)
    );
    set({
      tenants: allTenants,
    });
  },

  // delete Tenant:
  deleteTenant: (id) =>
    set((state) => ({
      tenants: state.tenants.filter((tenant) => tenant.tenant_id !== id),
    })),
}));

export default useTenantStore;
