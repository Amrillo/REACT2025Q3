import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { fetchAllData, fetchData } from './api/fetchApi';
import { ErrorBoundary } from './components/Error-boundary';
import type { StateProps } from './types/types';

export const App = () => {
  const [state, setState] = useState<StateProps>({
    term: '',
    items: [],
    error: false,
    loading: false,
  });

  const receiveIdTerm = useCallback((newTerm: string) => {
    setState((prev) => ({ ...prev, term: newTerm }));
  }, []);

  useEffect(() => {
    const fetchInitialDate = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const data = await fetchAllData();
        setState((prev) => ({ ...prev, items: data || [], loading: false }));
      } catch (e) {
        setState((prev) => ({ ...prev, error: true, loading: false }));
        console.error('Error', e);
      }
    };
    fetchInitialDate();
  }, []);

  useEffect(() => {
    const fetchDataOnTermChange = async () => {
      setState((prev) => ({ ...prev, loading: true, error: false }));
      try {
        if (state.term === '') {
          const data = await fetchAllData();
          setState((prev) => ({ ...prev, items: data || [], loading: false }));
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
        console.error('Error', e);
      }
    };

    fetchDataOnTermChange();
  }, [state.term]);

  return (
    <>
      <Header sendTerm={receiveIdTerm} />
      <ErrorBoundary
        key={`${state.term}-${state.items.length}`}
        fallback={<div className="error-message">❌ Failed to fetch data</div>}
      >
        {state.loading ? (
          <div className="spinner" data-testid="spinner"></div>
        ) : (
          <Main {...state} />
        )}
      </ErrorBoundary>
    </>
  );
};
