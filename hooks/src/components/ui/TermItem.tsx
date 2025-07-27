import { type FC } from 'react';
import type { TermListType } from '../../types/types';
import { Link } from 'react-router';
import { useUrlPage } from '../../custom-hooks/useUrlPage';

export const TermItem: FC<TermListType> = ({ name, url }) => {
  const { currentPage } = useUrlPage();
  const id = url.match(/\/(\d+)\/?$/)?.[1];
  return (
    <li className="term-item">
      <Link to={`/${currentPage}/details/${id}`}>{name}</Link>
      <span className="term-item__desc" aria-label="url name">
        {url}
      </span>
    </li>
  );
};
