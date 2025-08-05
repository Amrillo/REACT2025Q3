import { create } from "zustand";

interface SelectedItem {
  id: string;
  checked: boolean;
}

interface SelectedItemsStore {
  selectedItems: SelectedItem[];
  removeItem: (itemId: SelectedItem['id']) => void;
  toggleItem: (itemId: string) => void;
  isItemChecked: (itemId: string) => boolean;
}

export const useSelectedItems = create<SelectedItemsStore>((set,get) => ({
  selectedItems: [],
  removeItem: (itemId:string) => {  
    set((state) => ({
      selectedItems: state.selectedItems.filter((item)=> item.id !== itemId)
    }))
  },
  toggleItem: (itemId:string) =>
    set((state) => {
      const item = state.selectedItems.find((i) => i.id === itemId);
      if (item) {
        return {
          selectedItems: state.selectedItems.map((i) =>
            i.id === itemId ? { ...i, checked: !i.checked } : i
          ),
        };
      } else {
        return {
          selectedItems: [...state.selectedItems, { id: itemId, checked: true }],
        };
      }
    }),
  isItemChecked: (itemId: string) => {  
    const item = get().selectedItems.find((item) => item.id === itemId);
    return item?.checked ?? false;
  }
}));