import { create } from "zustand";

const useUnitStore = create((set) => ({
  units: [],

  setUnitsfromProperties: (properties) => {
    const allUnits = properties.flatMap((property) =>
      property.units.map((unit) => ({
        ...unit,
        propertyId: property.id,
        propertyTitle: property.title,
      }))
    );

    set({ units: allUnits });
  },

  // add unit:
  // addUnit: (newUnit) =>
  //   set((state) => ({
  //     units: [...state.units, newUnit],
  //   })),
}));

export default useUnitStore;
