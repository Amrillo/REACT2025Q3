import type { FC } from 'react';

export const NotFound: FC = () => {
  return (
    <div className="container">
      <h1 className="main-title">Page Not Found</h1>
      <p className="error-message">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};
