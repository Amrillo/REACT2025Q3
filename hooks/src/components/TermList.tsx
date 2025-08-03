import { TermItem } from './ui/TermItem';
import type { TermListType } from '../types/types';

interface TermListProps {
  items: TermListType[];
}
export const TermList: React.FC<TermListProps> = ({ items }: TermListProps) => {
  const pokemonItems = items.map((item) => (
    <>
      <TermItem key={item.name} name={item.name} url={item.url} />
    </>
  ));
  return <ul className="terms-list">{pokemonItems}</ul>;
};
