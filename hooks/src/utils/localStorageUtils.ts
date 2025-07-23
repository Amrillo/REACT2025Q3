// src/utils/localStorageUtils.ts
export const LocalStorage = {
  get(): string {
    return localStorage.getItem('searchTerm') || '';
  },
  set(term: string): void {
    localStorage.setItem('searchTerm', term);
  },
  remove(): void {
    localStorage.removeItem('searchTerm');
  },
};
