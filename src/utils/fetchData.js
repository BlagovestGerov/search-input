export const fetchData = async (url, query) => {
  try {
    const response = await fetch(`${url}?q=${query}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
