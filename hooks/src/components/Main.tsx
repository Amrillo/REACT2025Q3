import { useMemo, useState, type FC } from 'react';
import { TermList } from './TermList';
import type { TermListType } from '../types/types';
import { Outlet } from 'react-router';
import { Flyout } from './ui/Flyout';
import { useSelectedItems } from '../store/SelectedItemsStore';
import { Button } from './ui/Button';
import { useGetAllTermsQuery } from '../store/features/termsApi';
interface MainProps {
  items: TermListType[];
  page: number;
}
export const Main: FC<MainProps> = ({ items, page }) => {
  const [testError, setTestError] = useState<boolean>(false);
  const selectedItems = useSelectedItems((state) => state.selectedItems);

  const numCheckedItems = useMemo(
    () =>
      selectedItems.reduce((acc, item) => (item.checked ? acc + 1 : acc), 0),
    [selectedItems]
  );
  const removeSelectedItem = useSelectedItems((state) => state.unSelectAll);
  const { refetch } = useGetAllTermsQuery(page);

  if (testError) {
    return (
      <section aria-label="pokemons" className="pokemons">
        <div className="fallback-error">Failed to fetch data</div>
      </section>
    );
  }
  const handleError = () => {
    setTestError(true);
  };
  const handleRefetch = () => {
    refetch();
  };
  return (
    <section aria-label="pokemons" className="pokemons">
      <div className="pokemons-galery">
        <TermList items={items} />
        <Outlet />
      </div>
      <div className="pokemons-actions">
        <Button classname={'btn error-btn'} throwError={handleError}>
          {' '}
          Throw an error
        </Button>
        <Button classname={'refresh-btn'} refresh={handleRefetch}>
          Refresh
        </Button>
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
