import { useNavigate, useParams } from 'react-router';

export const useUrlPage = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;
  const setPage = (newPage: number) => {
    navigate(`/${newPage}`);
  };
  return { currentPage, setPage };
};
