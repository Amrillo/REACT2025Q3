import { type FC } from 'react';

type PaginationPropsType = {
  setPage: (page: number) => void;
  page: number;
  totalpages: number;
};
export const Pagination: FC<PaginationPropsType> = ({
  setPage,
  page,
  totalpages,
}) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <button className="pagination-page">{page}</button>
      <button
        className="pagination-btn"
        onClick={() => setPage(page + 1)}
        disabled={page === totalpages}
      >
        Next
      </button>
    </div>
  );
};
