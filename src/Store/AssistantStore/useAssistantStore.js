import { create } from "zustand";
import assistantsList from "../../Data/SiteDataComponent/Assistants";

const useAssistantStore = create((set) => ({
  assistants: [...assistantsList],

  //   add assistant:
  addAssistant: (assistant) =>
    set((state) => ({
      assistants: [...state.assistants, assistant],
    })),

  // edit assistant:
  editAssistant: (updatedAssistant) =>
    set((state) => ({
      assistants: state.assistants.map((assistant) =>
        assistant.id === updatedAssistant.id ? updatedAssistant : assistant
      ),
    })),

  // delete assistant:
  deleteAssistant: (id) =>
    set((state) => ({
      assistants: state.assistants.filter((assistant) => assistant.id !== id),
    })),
}));

export default useAssistantStore;
