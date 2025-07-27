import { useState, type FC } from 'react';
import { TermList } from './TermList';
import type { StateProps } from '../types/types';
import { Outlet } from 'react-router';

export const Main: FC<StateProps> = ({ error, items }) => {
  const [testError, setTestError] = useState<boolean>(false);

  if (error || testError) {
    throw new Error('Failed to fetch data');
  }
  return (
    <section className="pokemons">
      <div className="pokemons-galery">
        <TermList items={items} />
        <Outlet />
      </div>
      <button className="btn error-btn" onClick={() => setTestError(true)}>
        Throw an error
      </button>
    </section>
  );
};
