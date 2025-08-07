import type { Theme } from '../types/types';

export const getPreferredTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return preferDark ? 'dark' : 'light';
};
