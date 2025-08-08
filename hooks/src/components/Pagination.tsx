import { type FC } from 'react';

type PaginationPropsType = {
  setPageChange: (direction: 'prev' | 'next') => void;
  page: number;
  totalpages: number;
};
export const Pagination: FC<PaginationPropsType> = ({
  setPageChange,
  page,
  totalpages,
}) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={page === 1}
        onClick={() => setPageChange('prev')} 
      >
        Prev
      </button>
      <button className="pagination-page">{page}</button>
      <button
        className="pagination-btn"
        onClick={() => setPageChange('next')}
        disabled={page === totalpages}
      >
        Next
      </button>
    </div>
  );
};
