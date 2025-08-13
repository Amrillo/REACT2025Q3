export type TermListType = {
  name: string;
  url: string;
};
export interface TermItemProps extends TermListType {
  currentPage: number | string;
}
export interface MainState {
  baseUrl: string;
  items: TermListType[];
  loading: boolean;
  error: boolean;
  itemName: string;
  itemUrl: string;
}

export interface StateProps {
  term: string;
  items: TermListType[];
  error: boolean;
  loading: boolean;
  pageNum: number;
  pagesTotal: number;
}

export type SearchProps = {
  sendTerm: (data: string) => void;
};

export type PokemonDetailType = {
  name: string;
  imgSrc: string;
  weight: number;
};

export interface SelectedItemProps {
  id: string;
  name: string;
  url: string;
  checked: boolean;
}
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
export type FetchAllDataResponse = {
  results: TermListType[];
  pagesTotal: number;
};
