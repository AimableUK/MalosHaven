import { create } from "zustand";

const useTenantStore = create((set) => ({
  tenants: [],


  // delete Tenant:
  deleteTenant: (id) => 
    set((state) => {
        
    }),
}));
