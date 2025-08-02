import { TermItem } from './ui/TermItem';
import type { TermListType } from '../types/types';
import { useUrlPage } from '../custom-hooks/useUrlPage';

interface TermListProps {
  items: TermListType[];
}
export const TermList: React.FC<TermListProps> = ({ items }: TermListProps) => {
  const { currentPage } = useUrlPage();
  const pokemonItems = items.map((item) => (
    <TermItem
      key={item.name}
      name={item.name}
      url={item.url}
      currentPage={currentPage}
    />
  ));
  return <ul className="terms-list">{pokemonItems}</ul>;
};
