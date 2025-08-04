import { create } from "zustand";
import type { TermListType } from "../types/types";

interface ItemsStore {  
    myItems: TermListType[];
    setItems: (items: TermListType[]) => void;
}

export const useItemStore = create<ItemsStore>((set) => ({
    myItems: [],
    setItems: (items) => set({myItems: items}), 
}));

