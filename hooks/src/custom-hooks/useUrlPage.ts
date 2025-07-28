import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useUrlPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlArr = location.pathname.split('/');
  let currentPage;
  if (urlArr.length <= 2) {
    currentPage = Number(urlArr.pop()) || 1;
  } else {
    currentPage = Number(urlArr[1]);
  }
  const setPage = useCallback(
    (page: number) => {
      navigate(`/${page}`);
    },
    [navigate]
  );
  return { currentPage, setPage };
};
