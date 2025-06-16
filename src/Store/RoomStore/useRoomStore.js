import { create } from "zustand";

const useRoomStore = create((set) => ({
  rooms: [],

  setRoomsfromLodges: (lodges) => {
    const allRooms = lodges.flatMap((lodge) =>
      lodge.rooms.map((room) => ({
        ...room,
        lodgeId: lodge.id,
        lodgeName: lodge.name,
      }))
    );

    set({ rooms: allRooms });
  },

  // add Room:
  addRoom: (newRoom) =>
    set((state) => ({
      rooms: [...state.rooms, newRoom],
    })),

  // edit Room:
  editRoom: (updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room
      ),
    })),
}));

export default useRoomStore;
