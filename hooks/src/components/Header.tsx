import { type FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo" role="logo">
          <img src="src/assets/logo.png" alt="logo" />
        </div>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <a className="navbar-link" href="/">
                Home
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
