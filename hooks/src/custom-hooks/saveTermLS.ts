import { useEffect, useState } from 'react';
import { LocalStorage } from '../utils/localStorageUtils';

export const SaveTermLC = () => {
  const [restoredTerm, setRestoredTerm] = useState<string>('');

  useEffect(() => {
    const savedTerm = LocalStorage.get();
    if (savedTerm) {
      setRestoredTerm(savedTerm);
    }
  }, []);

  return restoredTerm;
};