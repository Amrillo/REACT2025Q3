import { useCallback, useEffect, useState, type FC } from 'react';
import { SearchPanel } from '../components/ui/SearchPanel';
import { ErrorBoundary } from '../components/Error-boundary';
import { Main } from '../components/Main';
import { fetchAllData, fetchData } from '../api/fetchApi';
import { Pagination } from '../components/Pagination';
import { useUrlPage } from '../custom-hooks/useUrlPage';
import { useItemStore } from '../store/itemStore';

export const HomePage: FC = () => {
  const { currentPage, setPage } = useUrlPage();
  const [term, setTerm] = useState<string>('');
  const {myItems, setItems} = useItemStore();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(0);

  const receiveIdTerm = useCallback(
    (newTerm: string) => {
      setTerm(newTerm);
      setPageNum(currentPage);
    },
    [currentPage]
  );

  useEffect(() => {
    const fetchDataOnPageTermChange = async () => {
      setLoading(true);
      setError(false);
      try {
        if (term === '') {
          const data = await fetchAllData(pageNum);
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
  }, [term, pageNum]);

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setPageNum(page);
    setPage(page);
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
              setPage={handlePageChange}
              page={pageNum}
              totalpages={pagesTotal}
            />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};
