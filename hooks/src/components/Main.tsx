import { useState, type FC } from 'react';
import { TermList } from './TermList';
import type { StateProps } from '../types/types';

export const Main: FC<StateProps> = ({ error, items }) => {
  const [testError, setTestError] = useState<boolean>(false);

  if (error || testError) {
    throw new Error('Failed to fetch data');
  }
  return (
    <section className="pokemons">
        <h2 className="pokemons-title">
          <span className="title">Item name</span>
          <span className="title">Item description</span>
        </h2>
        <TermList items={items} />
        <button className="btn error-btn" onClick={() => setTestError(true)}>
          Throw an error
        </button>
    </section>
  );
};
