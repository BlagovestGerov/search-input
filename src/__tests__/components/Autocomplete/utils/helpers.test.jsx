import { filterLocalData } from "../../../../utils/helpers";

describe("filterLocalData", () => {
  const mockData = [
    { text: "Alabama", value: "AL" },
    { text: "Alaska", value: "AK" },
    { text: "Arizona", value: "AZ" },
  ];

  it("filters data correctly based on query", () => {
    const results = filterLocalData(mockData, "al", 2);
    expect(results).toEqual([
      { text: "Alabama", value: "AL" },
      { text: "Alaska", value: "AK" },
    ]);
  });

  it("limits results to the specified number", () => {
    const results = filterLocalData(mockData, "a", 2);
    expect(results.length).toBe(2);
  });

  it("returns an empty array for no matches", () => {
    const results = filterLocalData(mockData, "zz", 2);
    expect(results).toEqual([]);
  });
});
