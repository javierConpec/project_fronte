import { create } from "zustand"

type SidebarStore = {
  visible: boolean
  setVisible: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  visible: false,
  setVisible: () => set((state) => ({ visible: !state.visible })),
}))
