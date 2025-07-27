import { type FC } from 'react';
import { Button } from './ui/Button';
import closeIcon from '../assets/icon-close.svg';
import { useLoaderData, useNavigate } from 'react-router';
import { type ItemDescriptionType } from '../api/fetchApi';

export const DetailedItem: FC = () => {
  const data = useLoaderData() as ItemDescriptionType[] | undefined;
  const navigate = useNavigate();
  if (!data) {
    return <div className="term-detailed">No data found</div>;
  }
  const handleClose = () => {
    navigate(`/`);
  };
  return (
    <div className="term-detailed">
      <h2 className="term-detailed-title">Pikachu</h2>
      <p className="term-detailed-description">{data[7].description}</p>
      <Button
        closeIcon={closeIcon}
        classname={'term-detailed-close'}
        onCloseItem={handleClose}
      />
    </div>
  );
};
