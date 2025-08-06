import { type FC } from 'react';
import type { TermListType } from '../../types/types';
import { Link } from 'react-router';
import { useUrlPage } from '../../custom-hooks/useUrlPage';
import { Checkbox } from './Checkbox';
import { useSelectedItems } from '../../store/SelectedItemsStore';

export const TermItem: FC<TermListType> = ({ name, url }) => {
  const { currentPage } = useUrlPage();
  const id = url.match(/\/(\d+)\/?$/)?.[1] as string;
  const isChecked = useSelectedItems((state) => state.isItemChecked(id));
  const toggleItem = useSelectedItems((state) => state.toggleItem);

  const toggleCheck = () => {
    toggleItem({ id, name, url });
  };
  return (
    <li className="term-item">
      <Link
        to={`/${currentPage}/details/${id}`}
        onClick={toggleCheck}
        className={isChecked ? 'term-item-link--crossed' : ''}
      >
        {name}
        <span className="term-item-desc" aria-label="url name">
          {url}
        </span>
      </Link>
      <Checkbox id={id} checked={isChecked} onChange={toggleCheck} />
    </li>
  );
};
