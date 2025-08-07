import { useContext } from 'react';
import type { ThemeContextType } from '../types/types';
import { ThemeContext } from './ThemeContext';

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
