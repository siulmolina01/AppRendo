const indices = [7291, 7027, 7283, 7005, 6979, 7241, 7248, 7189, 7188, 7025];
const arasaacUrl = 'https://api.arasaac.org/api/pictograms/';

export const useArasaacIndex = (n: number) => {
  if (n >= 0 && n < indices.length) {
    return `${arasaacUrl}${indices[n]}`;
  } else {
    return null;
  }
};
