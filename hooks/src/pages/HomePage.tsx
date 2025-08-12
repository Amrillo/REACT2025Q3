import { useEffect, useState, type FC } from 'react';
import { SearchPanel } from '../components/ui/SearchPanel';
import { Main } from '../components/Main';
import { Pagination } from '../components/Pagination';
import { useUrlPage } from '../custom-hooks/useUrlPage';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/reduxStore';
import { decrement, increment, setCount } from '../store/features/counterPages';
import {
  useGetAllTermsQuery,
  useGetTermByNameQuery,
} from '../store/features/termsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { Loader } from '../components/ui/Loading';
import { getErrorMessage } from '../utils/handleErrors';

export const HomePage: FC = () => {
  const { currentPage, setPage } = useUrlPage();
  const [term, setTerm] = useState<string>('');
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage !== count) {
      dispatch(setCount(currentPage));
    }
  }, [currentPage, count, dispatch]);

  const {
    data: allData,
    error: isAllError,
    isLoading: isAllLoading,
  } = useGetAllTermsQuery(count);

  const {
    data: singleData,
    error: isSingleError,
    isLoading: isSingleLoading,
  } = useGetTermByNameQuery(term || skipToken);

  const isError = isAllError || isSingleError;
  const isLoading = isAllLoading || isSingleLoading;
  const data = term ? (singleData ? [singleData] : []) : allData?.results || [];
  const errorMessage =
    getErrorMessage(isAllError) || getErrorMessage(isSingleError);

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
      <SearchPanel sendTerm={setTerm} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="error-message" data-testid="error-message">
          {errorMessage}
        </div>
      ) : (
        <>
          <Main items={data} page={count} />
          <Pagination
            page={count}
            totalpages={allData?.pagesTotal || 0}
            setPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
