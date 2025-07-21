export const capitalize = (stringValue) => {
  if (typeof stringValue !== "string") return stringValue;

  return stringValue[0].toUpperCase() + stringValue.slice(1);
};
