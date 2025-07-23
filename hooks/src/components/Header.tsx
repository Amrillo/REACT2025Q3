import { type FC } from 'react';
import { SearchPanel } from './ui/SearchPanel';
import type { SearchProps } from '../types/types';

export const Header: FC<SearchProps> = ({ sendTerm }) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">Find the pokemons you want</h1>
        <SearchPanel sendTerm={sendTerm} />
      </div>
    </header>
  );
};
