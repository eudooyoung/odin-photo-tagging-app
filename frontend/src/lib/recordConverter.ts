export const recordConverter = (rawRecord: number) => {
  const hours = Math.floor(rawRecord / 3_600_000);
  const minutes = Math.floor((rawRecord / 60_000) % 60);
  const seconds = Math.floor((rawRecord / 1000) % 60);
  const milliseconds = rawRecord % 1000;
  return { hours, minutes, seconds, milliseconds };
};
