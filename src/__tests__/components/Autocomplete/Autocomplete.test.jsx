import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Autocomplete from "../../../components/Autocomplete/index.jsx";

describe("Autocomplete Component", () => {
  const mockFetchResults = jest.fn();
  const mockOnSelect = jest.fn();

  it("renders the input field", () => {
    render(
      <Autocomplete
        data={[]}
        fetchResults={mockFetchResults}
        numOfResults={10}
        onSelect={mockOnSelect}
      />
    );
    expect(
      screen.getByPlaceholderText("Type to search...")
    ).toBeInTheDocument();
  });

  it("calls fetchResults when typing in the input", async () => {
    render(
      <Autocomplete
        data={[]}
        fetchResults={mockFetchResults}
        numOfResults={10}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Type to search..."), {
      target: { value: "test" },
    });

    expect(mockFetchResults).toHaveBeenCalledWith("test", 10);
  });

  it("displays results returned by fetchResults", async () => {
    mockFetchResults.mockResolvedValueOnce([
      { text: "Result 1", value: "1" },
      { text: "Result 2", value: "2" },
    ]);

    render(
      <Autocomplete
        data={[]}
        fetchResults={mockFetchResults}
        numOfResults={10}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Type to search..."), {
      target: { value: "test" },
    });

    expect(await screen.findByText("Result 1")).toBeInTheDocument();
    expect(await screen.findByText("Result 2")).toBeInTheDocument();
  });

  it("calls onSelect when a result is clicked", async () => {
    mockFetchResults.mockResolvedValueOnce([{ text: "Result 1", value: "1" }]);

    render(
      <Autocomplete
        data={[]}
        fetchResults={mockFetchResults}
        numOfResults={10}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Type to search..."), {
      target: { value: "test" },
    });

    fireEvent.click(await screen.findByText("Result 1"));

    expect(mockOnSelect).toHaveBeenCalledWith("1");
  });
});
