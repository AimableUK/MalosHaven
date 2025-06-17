import { create } from "zustand";
import LodgesList from "../../Data/SiteDataComponent/Lodges";

const useLodgesStore = create((set) => ({
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
    set((state) => ({
      lodges: state.lodges.map((lodge) => ({
        ...lodge,
        rooms: lodge.rooms.map((room) =>
          room.id === updatedRoom.id ? updatedRoom : room
        ),
      })),
    }));
  },

  // Delete room in lodge:
  deleteRoomFromLodge: (roomId) => {
    set((state) => ({
      lodges: state.lodges.map((lodge) => ({
        ...lodge,
        rooms: lodge.rooms.filter((room) => room.id !== roomId),
      })),
    }));
  },
}));

export default useLodgesStore;
