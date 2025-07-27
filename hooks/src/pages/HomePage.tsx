import { useCallback, useEffect, useState, type FC } from 'react';
import { SearchPanel } from '../components/ui/SearchPanel';
import { ErrorBoundary } from '../components/Error-boundary';
import { Main } from '../components/Main';
import type { StateProps } from '../types/types';
import { fetchAllData, fetchData } from '../api/fetchApi';
import { Pagination } from '../components/Pagination';
import { useUrlPage } from '../custom-hooks/useUrlPage';

export const HomePage: FC = () => {
  const { currentPage, setPage } = useUrlPage();
  const [state, setState] = useState<StateProps>({
    term: '',
    items: [],
    error: false,
    loading: false,
    pageNum: currentPage,
    pagesTotal: 0,
  });

  const receiveIdTerm = useCallback((newTerm: string) => {
    setState((prev) => ({ ...prev, term: newTerm, pageNum: 1 }));
  }, []);

  useEffect(() => {
    const fetchDataOnPageTermChange = async () => {
      setState((prev) => ({ ...prev, loading: true, error: false }));
      try {
        if (state.term === '') {
          const data = await fetchAllData(state.pageNum);
          console.log(data);
          if (!data) throw new Error('No data received from API');
          setState((prev) => ({
            ...prev,
            items: data.results,
            loading: false,
            pagesTotal: data.pagesTotal,
          }));
        } else {
          const data = await fetchData(state.term);
          if (data?.name) {
            setState((prev) => ({ ...prev, items: [data], loading: false }));
          } else {
            throw new Error('Invalid data received');
          }
        }
      } catch (e) {
        setState((prev) => ({ ...prev, error: true, loading: false }));
        console.error('Error fetching data:', e);
      }
    };
    fetchDataOnPageTermChange();
  }, [state.term, state.pageNum]);

  useEffect(() => {
    setState((prev) => ({ ...prev, pageNum: currentPage }));
    setPage(currentPage);
  }, [currentPage, setPage]);

  const handlePageChange = (page: number) => {
    setState((prev) => ({ ...prev, pageNum: page }));
    setPage(page);
  };
  return (
    <div className="container">
      <h1 className="main-title">Explore pokemons</h1>
      <SearchPanel sendTerm={receiveIdTerm} />

      <ErrorBoundary
        key={`${state.term}-${state.items.length}`}
        fallback={<div className="error-message">❌ Failed to fetch data</div>}
      >
        {state.loading ? (
          <div className="spinner" data-testid="spinner"></div>
        ) : (
          <>
            <Main {...state} />
            <Pagination
              setPage={handlePageChange}
              page={state.pageNum}
              totalpages={state.pagesTotal}
            />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};
