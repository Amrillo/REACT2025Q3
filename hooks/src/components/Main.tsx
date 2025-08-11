import { useState, type FC } from 'react';
import { TermList } from './TermList';
import type { TermListType } from '../types/types';
import { Outlet } from 'react-router';
import { Flyout } from './ui/Flyout';
import { useSelectedItems } from '../store/SelectedItemsStore';
interface MainProps {
  items: TermListType[];
}
export const Main: FC<MainProps> = ({ items }) => {
  const [testError, setTestError] = useState<boolean>(false);
  const numCheckedItems = useSelectedItems((state) =>
    state.selectedItems.reduce((acc, item) => (item.checked ? acc + 1 : acc), 0)
  );
  const removeSelectedItem = useSelectedItems((state) => state.unSelectAll);
  const selectedItems = useSelectedItems((state) => state.selectedItems);

if (testError) {
  return (
    <section aria-label="pokemons" className="pokemons">
      <div className="fallback-error">Failed to fetch data</div>
    </section>
  );
}
  return (
    <section aria-label="pokemons" className="pokemons">
      <div className="pokemons-galery">
        <TermList items={items} />
        <Outlet />
      </div>
      <div className="pokemons-actions">
        <button className="btn error-btn" onClick={() => setTestError(true)}>
          Throw an error
        </button>
        {numCheckedItems > 0 && (
          <Flyout
            countSelected={numCheckedItems}
            unSelectAll={removeSelectedItem}
            selectedItems={selectedItems}
          />
        )}
      </div>
    </section>
  );
};
