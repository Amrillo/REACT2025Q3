import { create } from 'zustand';
import type { SelectedItemProps } from '../types/types';

interface SelectedItemsStore {
  selectedItems: SelectedItemProps[];
  toggleItem: (item: { id: string; name: string; url: string }) => void;
  isItemChecked: (itemId: string) => boolean;
  unSelectAll: () => void;
}

export const useSelectedItems = create<SelectedItemsStore>((set, get) => ({
  selectedItems: [],
  toggleItem: ({ id, name, url }) =>
    set((state) => {
      const item = state.selectedItems.find((i) => i.id === id);
      if (item) {
        return {
          selectedItems: state.selectedItems.map((i) =>
            i.id === id ? { ...i, checked: !i.checked } : i
          ),
        };
      } else {
        return {
          selectedItems: [
            ...state.selectedItems,
            { id, name, url, checked: true },
          ],
        };
      }
    }),
  isItemChecked: (itemId) => {
    const item = get().selectedItems.find((item) => item.id === itemId);
    return item?.checked ?? false;
  },
  unSelectAll: () => {
    const current = get().selectedItems;
    const updated = current.map((item) =>
      item.checked ? { ...item, checked: false } : item
    );
    set({ selectedItems: updated });
  },
}));
