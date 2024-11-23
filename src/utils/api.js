export const fetchGitHubUsers = async (query, numOfResults) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`
    );
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
