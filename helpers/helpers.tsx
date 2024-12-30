export const priceRu = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(price);
};

export const declension = (number: number, words: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[Math.min(number % 10, 5)];
  return words[index];
};