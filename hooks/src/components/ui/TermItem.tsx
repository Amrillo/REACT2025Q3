import { useMemo, type FC } from 'react';
import type { TermItemProps } from '../../types/types';
import { Link } from 'react-router';
import { Checkbox } from './Checkbox';
import { useSelectedItems } from '../../store/SelectedItemsStore';

export const TermItem: FC<TermItemProps> = ({
  name,
  url,
  currentPage,
}: TermItemProps) => {
  const id = useMemo(() => url.match(/\/(\d+)\/?$/)?.[1] as string, [url]);
  const isItemChecked = useSelectedItems((state) => state.isItemChecked(id));
  const toggleItem = useSelectedItems((state) => state.toggleItem);
  const toggleCheck = () => {
    toggleItem({ id, name, url });
  };
  return (
    <li className="term-item">
      <Link
        to={`/${currentPage}/details/${id}`}
        onClick={toggleCheck}
        className={isItemChecked ? 'term-item-link--crossed' : ''}
      >
        {name}
        <span className="term-item-desc" aria-label="url name">
          {url}
        </span>
      </Link>
      <Checkbox id={id} checked={isItemChecked} onChange={toggleCheck} />
    </li>
  );
};
