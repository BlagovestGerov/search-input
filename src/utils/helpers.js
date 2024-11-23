export const filterLocalData = (data, query, numOfResults) => {
  if (!query) return [];
  return data
    .filter((item) => item.text.toLowerCase().includes(query.toLowerCase()))
    .slice(0, numOfResults);
};
