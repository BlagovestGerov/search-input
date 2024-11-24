import { fetchGitHubUsers } from "../../../../utils/api";
import { GITHUB_API_URL, numberOfResults } from "../../../../consts";

global.fetch = jest.fn();

describe("fetchGitHubUsers", () => {
  it("fetches data from the GitHub API and formats results", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          { login: "user1", id: "1" },
          { login: "user2", id: "2" },
        ],
      }),
    });

    const results = await fetchGitHubUsers("test", 10);

    expect(results).toEqual([
      { text: "user1", value: "1" },
      { text: "user2", value: "2" },
    ]);
    expect(fetch).toHaveBeenCalledWith(
      `${GITHUB_API_URL}/search/users?q=test&per_page=${numberOfResults}`
    );
  });

  it("handles errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));
    const results = await fetchGitHubUsers("test", 2);
    expect(results).toEqual([]);
  });
});
