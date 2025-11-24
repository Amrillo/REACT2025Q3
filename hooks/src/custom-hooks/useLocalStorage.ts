import { useState, useEffect } from 'react';
import { LocalStorage } from '../utils/localStorageUtils';

export const useLocalStorageSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return LocalStorage.get() || '';
  });

  useEffect(() => {
    if (searchTerm) {
      LocalStorage.set(searchTerm);
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};
