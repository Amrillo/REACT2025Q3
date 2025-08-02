import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useUrlPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location);
    const urlArr = location.pathname.split('/');
    let num = 1;
    if (urlArr.length <= 2) {
      num = Number(urlArr.pop()) || 1;
    } else {
      num = Number(urlArr[1]) || 1;
    }
    setCurrentPage(num); // ✅ only runs once when location changes
  }, [location]);

  const setPage = useCallback(
    (page: number) => {
      navigate(`/${page}`);
    },
    [navigate]
  );
  return { currentPage, setPage };
};
