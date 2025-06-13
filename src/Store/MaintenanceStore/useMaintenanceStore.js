import { create } from "zustand";

const useMaintenanceStore = create((set, get) => ({
  requests: [],
  pendingRequests: [],
  solvedRequests: [],
  filterView: "all",

  // Set all maintenance requests by processing properties
  setRequestsFromProperties: (properties) => {
    const allRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant?.maintenanceRequests?.length > 0) {
          tenant.maintenanceRequests.forEach((request) => {
            allRequests.push({
              ...request,
              tenantName: tenant.name,
              tenantPhone: tenant.phone,
              tenantImage: tenant.image,
              propertyTitle: property.title,
              unit: unit.UnitNumber,
            });
          });
        }
      });
    });

    set({
      requests: allRequests,
      pendingRequests: allRequests.filter((r) => r.status === "pending"),
      solvedRequests: allRequests.filter((r) => r.status === "done"),
    });
  },

  markAsDone: (requestId) => {
    const { requests } = get();

    const updatedRequests = requests.map((req) => {
      if (req.requestId === requestId) {
        const newStatus = req.status === "done" ? "pending" : "done";
        return { ...req, status: newStatus };
      }
      return req;
    });

    set({
      requests: updatedRequests,
      pendingRequests: updatedRequests.filter((r) => r.status === "pending"),
      solvedRequests: updatedRequests.filter((r) => r.status === "done"),
    });
  },

  setFilterView: (view) => set({ filterView: view }),

  getDisplayedRequests: () => {
    const { requests, pendingRequests, solvedRequests, filterView } = get();

    if (filterView === "pending") return pendingRequests;
    if (filterView === "done") return solvedRequests;
    return requests;
  },
}));

export default useMaintenanceStore;
