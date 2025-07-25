import { useEffect, useState } from 'react';
import searchIcon from '../../assets/search-icon.svg';
import closeIcon from '../../assets/icon-close.svg';
import { LocalStorage } from '../../utils/localStorageUtils';
import type { SearchProps } from '../../types/types';

export const SearchPanel = ({ sendTerm }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [close, setClose] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const savedTerm = LocalStorage.get();
    if (savedTerm) {
      setSearchTerm(savedTerm);
      setClose(true);
    }
  }, []);

  const handleChangeTerm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value.trim();
    setSearchTerm(inputValue);
    setClose(inputValue !== '');
    setError(false);
  };
  const validate = (word: string): boolean => {
    const regEx = /^[a-z]+$/;
    return regEx.test(word);
  };

  const handleSearchTerm = (): void => {
    if (validate(searchTerm)) {
      sendTerm(searchTerm);
      setSearchTerm(searchTerm);
    } else {
      setError(true);
    }
  };
  const clearInput = (): void => {
    setSearchTerm('');
    setClose(false);
    setError(false);
    sendTerm('');
    localStorage.removeItem('searchTerm');
  };
  return (
    <>
      <div className="search-panel">
        <input
          value={searchTerm}
          onChange={handleChangeTerm}
          className="search-input"
          type="text"
          placeholder="Search Pokemon by name"
        />

        <button
          type="button"
          className="btn search-btn"
          onClick={handleSearchTerm}
        >
          <img src={searchIcon} alt="search button" />
        </button>
        {close && (
          <button type="button" className="btn close-btn" onClick={clearInput}>
            <img src={closeIcon} alt="close icon" />
          </button>
        )}
      </div>
      {error && (
        <div className="show-error">
          No capital letters , characters and empty spaces are allowed
        </div>
      )}
    </>
  );
};
