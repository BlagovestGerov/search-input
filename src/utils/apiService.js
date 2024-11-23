export const fetchFromEndpoint = async (endpoint, query, numOfResults) => {
  if (!endpoint || !query) {
    return [];
  }

  try {
    const response = await fetch(endpoint.replace("{query}", query));
    const json = await response.json();

    return json.items.slice(0, numOfResults).map((item) => ({
      text: item.login || item.text,
      value: item.id || item.value,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
