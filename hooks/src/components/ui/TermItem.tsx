import { type FC } from 'react';
import type { TermListType } from '../../types/types';

export const TermItem: FC<TermListType> = ({ name, url }) => {
  return (
    <li className="term-item">
      <span className="term-item__name">{name}</span>
      <span className="term-item__desc">{url}</span>
    </li>
  );
};
