import { useCallback, useEffect, useState, type FC } from 'react';
import { SearchPanel } from '../components/ui/SearchPanel';
import { ErrorBoundary } from '../components/Error-boundary';
import { Main } from '../components/Main';
import { fetchAllData, fetchData } from '../api/fetchApi';
import { Pagination } from '../components/Pagination';
import { useUrlPage } from '../custom-hooks/useUrlPage';
import { useItemStore } from '../store/itemStore';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/reduxStore';
import { decrement, increment } from '../store/features/counterPages';

export const HomePage: FC = () => {
  const { setPage } = useUrlPage();
  const [term, setTerm] = useState<string>('');
  const { myItems, setItems } = useItemStore();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagesTotal, setPagesTotal] = useState<number>(0);

  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const receiveIdTerm = useCallback(
    (newTerm: string) => {
      setTerm(newTerm);
    },
    [term]
  );

  useEffect(() => {
    const fetchDataOnPageTermChange = async () => {
      setLoading(true);
      setError(false);
      try {
        if (term === '') {
          const data = await fetchAllData(count);
          if (!data) throw new Error('No data received from API');
          setItems(data.results);
          setPagesTotal(data.pagesTotal);
          setLoading(false);
        } else {
          const data = await fetchData(term);
          if (data?.name) {
            setItems([data]);
            setLoading(false);
          } else {
            throw new Error('Invalid data received');
          }
        }
      } catch (e) {
        setError(true);
        setLoading(false);
        console.error('Error fetching data:', e);
      }
    };
    fetchDataOnPageTermChange();
  }, [term, count, setItems]);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      dispatch(decrement());
      setPage(count - 1);
    } else {
      dispatch(increment());
      setPage(count + 1);
    }
  };
  return (
    <div className="container">
      <h1 className="main-title">Explore pokemons</h1>
      <SearchPanel sendTerm={receiveIdTerm} />

      <ErrorBoundary
        key={`${term}-${myItems.length}`}
        fallback={
          <div className="error-message" data-testid="error-message">
            ❌ Failed to fetch data
          </div>
        }
      >
        {loading ? (
          <div className="spinner" data-testid="spinner"></div>
        ) : (
          <>
            <Main error={error} items={myItems} />
            <Pagination
              page={count}
              totalpages={pagesTotal}
              setPageChange={handlePageChange}
            />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};
