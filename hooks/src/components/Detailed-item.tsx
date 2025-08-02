import { type FC } from 'react';
import { Button } from './ui/Button';
import closeIcon from '../assets/icon-close.svg';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import type { PokemonDetailType } from '../types/types';

export const DetailedItem: FC = () => {
  const params = useParams();
  const data = useLoaderData() as PokemonDetailType | undefined;
  const navigate = useNavigate();
  if (!data?.name) {
    return (
      <div className="term-detailed" data-testid="term-detailed">
        No data found
      </div>
    );
  }
  const { name, imgSrc, weight } = data;

  const handleClose = () => {
    navigate(`/${params.page}`);
  };
  return (
    <div className="term-detailed" data-testid="term-detailed">
      <div className="term-detailed-img">
        <img src={imgSrc} alt={name} />
      </div>
      <h2 className="term-detailed-title">{name}</h2>
      <p className="term-detailed-description">
        Pokemon has a weight of {weight}
      </p>
      <Button
        closeIcon={closeIcon}
        classname={'term-detailed-close'}
        onCloseItem={handleClose}
      />
    </div>
  );
};
