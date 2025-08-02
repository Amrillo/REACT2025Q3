export const validate = (word: string): boolean => {
  const regEx = /^[a-z]+$/;
  return regEx.test(word);
};
