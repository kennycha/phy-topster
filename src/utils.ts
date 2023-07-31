export const getRandomNumberBetween = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};
