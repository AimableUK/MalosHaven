import { create } from "zustand";
import notificationsList from "../../Data/SiteDataComponent/Notifications";

const useNotificationStore = create((set) => ({
  notifications: [...notificationsList],

  //   deletenotification:
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),

  // markAsRead:
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      ),
    })),
}));

export default useNotificationStore;
