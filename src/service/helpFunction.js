export const removeEmptyFields = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== '') {
      result[key] = obj[key];
    }
  });
  return result;
};

export const conversionStr = (str, maxLength) => {
  if (!str) {
    return str;
  } else if (str.length > maxLength) {
    let newStr = str.slice(0, maxLength).trim();
    const regexp = /\b\w+$|,$/gm;
    newStr = newStr.replace(regexp, '...');
    return newStr;
  } else return str;
};
