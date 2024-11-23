export const getDataSourceResults = async ({
  endpoint,
  query,
  data,
  numOfResults,
}) => {
  if (!query) return [];

  if (endpoint) {
    try {
      const checkRateLimit = (response) => {
        if (response.status === 403) {
          const resetTime = response.headers.get("X-RateLimit-Reset");
          const resetDate = new Date(resetTime * 1000);
          console.warn(
            `Rate limit exceeded. Try again at ${resetDate.toLocaleTimeString()}`
          );
        }
      };

      const response = await fetch(endpoint.replace("{query}", query));

      checkRateLimit(response);

      const json = await response.json();
      const items = json.items || [];
      return items.slice(0, numOfResults).map((item) => ({
        text: item.login || item.text,
        value: item.id || item.value,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  } else {
    return data
      .filter((item) => item.text.toLowerCase().includes(query.toLowerCase()))
      .slice(0, numOfResults);
  }
};
