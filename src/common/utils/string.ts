export const getOnlyNumbers = (str) => {
  str = str.replace(/\D/g, '');

  return str;
};
