export const randomDigitsGenerator = () => {
  const array = new Array<number>(5);
  for (let i = 0; i < 5; i++) {
    while (true) {
      const newRandomDigit = Math.floor(Math.random() * 16 + 1);
      if (!array.includes(newRandomDigit)) {
        array[i] = newRandomDigit;
        break;
      }
    }
  }
  return array;
};
