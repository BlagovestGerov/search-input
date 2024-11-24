import { GITHUB_API_URL } from "../consts/index.js";
export const fetchGitHubUsers = async (query, numOfResults) => {
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

    const response = await fetch(
      `${GITHUB_API_URL}/search/users?q=${query}&per_page=${numOfResults}`
    );

    checkRateLimit(response);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items.map((item) => ({
      text: item.login,
      value: item.id,
    }));
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    return [];
  }
};
