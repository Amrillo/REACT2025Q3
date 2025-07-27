import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useUrlPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const setPage = useCallback(
    (page: number) => {
      setSearchParams({ page: page.toString() });
    },
    [setSearchParams]
  );
  return { currentPage, setPage };
};
