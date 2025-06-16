import { create } from "zustand";
import LodgesList from "../../Data/SiteDataComponent/Lodges";

const useLodgesStore = create((set, get) => ({
  lodges: [...LodgesList],

  // add Lodge:
  addLodge: (newLodge) =>
    set((state) => ({
      lodges: [...state.lodges, newLodge],
    })),

  // Edit Lodge:
  editLodge: (updatedLodge) =>
    set((state) => ({
      lodges: state.lodges.map((lodge) =>
        lodge.id === updatedLodge.id ? updatedLodge : lodge
      ),
    })),

  // delete Lodge:
  deleteLodge: (id) =>
    set((state) => ({
      lodges: state.lodges.filter((lodge) => lodge.id !== id),
    })),

  // add room to lodges:
  addRoomToLodge: (lodgeId, newRoom) =>
    set((state) => ({
      lodges: state.lodges.map((lodge) =>
        lodge.id === lodgeId
          ? { ...lodge, rooms: [...lodge.rooms, newRoom] }
          : lodge
      ),
    })),

  // update room in lodge:
  updateRoomInLodge: (updatedRoom) => {
    const { lodges } = get();

    const updatedLodges = lodges.map((lodge) => {
      if (lodge.id === updatedRoom.id) return lodge;

      return {
        ...lodge,
        rooms: lodge.rooms.map((room) => {
          if (room.id === updatedRoom.id) {
            return room;
          }
        }),
      };
    });

    set({ lodges: updatedLodges });
  },
}));

export default useLodgesStore;
