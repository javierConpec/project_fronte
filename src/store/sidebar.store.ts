import { create } from "zustand"

type SidebarStore = {
  sidebars: Record<string, boolean>
  toggle: (id: string) => void
  closeAll: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebars: {},
  toggle: (id) =>
    set((state) => ({
      sidebars: {
        ...state.sidebars,
        [id]: !state.sidebars[id],
      },
    })),
  closeAll: () => set({ sidebars: {} }),
}))
