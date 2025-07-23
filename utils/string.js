export const capitalize = (stringValue) => {
  if (typeof stringValue !== "string") return stringValue;

  return stringValue[0].toUpperCase() + stringValue.slice(1);
};

export const addLeadingZero = (value) => {
  return value < 10 ? `0${value}` : value;
};
