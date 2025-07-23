export type TermListType = {
  name: string;
  url: string;
};
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
}

export type SearchProps = {
  sendTerm: (data: string) => void;
};
