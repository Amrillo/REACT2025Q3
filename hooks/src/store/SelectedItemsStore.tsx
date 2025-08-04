import { create } from "zustand";

interface SelectedItem {
  id: string;
  done: boolean;
}

interface SelectedItemsStore {
  selectedItems: SelectedItem[];
  addItem: (item: SelectedItem) => void;
}

export const useSelectedItems = create<SelectedItemsStore>((set) => ({
  selectedItems: [],
  addItem: (item) =>
    set((state) => ({
      selectedItems: [...state.selectedItems, item],
    })),
}));