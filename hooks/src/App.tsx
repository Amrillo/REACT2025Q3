import { Outlet } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import type { FC } from 'react';

export const App: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
