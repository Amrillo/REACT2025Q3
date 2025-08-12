import { type FC } from 'react';
import { Button } from './ui/Button';
import closeIcon from '../assets/icon-close.svg';
import { useNavigate, useParams } from 'react-router';
import { useGetTermByIdQuery } from '../store/features/termsApi';

export const DetailedItem: FC = () => {
  const params = useParams();
  const { data, isError } = useGetTermByIdQuery(params.id as string);
  const navigate = useNavigate();
  if (isError || !data) {
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
