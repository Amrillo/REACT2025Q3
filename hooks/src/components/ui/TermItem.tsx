import { type FC } from 'react';
import type { TermListType } from '../../types/types';
import { Link } from 'react-router';
interface TermItemProps extends TermListType {
  currentPage: number;
}
export const TermItem: FC<TermItemProps> = ({ name, url, currentPage }) => {
 
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
