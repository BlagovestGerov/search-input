import React, { useState, useEffect, useRef } from "react";
import "./Autocomplete.css";

const Autocomplete = ({
  data = [],
  fetchResults,
  numOfResults = 10,
  onSelect,
}) => {
  const [query, setQuery] = useState(""); // User's search input
  const [results, setResults] = useState([]); // Search results
  const [selectedIndex, setSelectedIndex] = useState(-1); // Dropdown navigation
  const [lastSearches, setLastSearches] = useState([]); // History of searches
  const resultRefs = useRef([]); // For scrolling to results

  // Effect to fetch results on query change
  useEffect(() => {
    const fetchData = async () => {
      if (!query.trim()) {
        setResults([]); // Clear results if query is empty
        return;
      }

      try {
        const fetchedResults = await fetchResults(query, numOfResults);
        setResults(fetchedResults); // Update results
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]); // Clear results on error
      }
    };

    fetchData();
  }, [query, fetchResults, numOfResults]);

  // Handle user selection
  const handleSelect = (value, text) => {
    setQuery(text); // Set query to the selected text
    setResults([]); // Clear results

    // Update last searches, keeping it unique and limiting to 10
    setLastSearches((prev) => {
      const updatedHistory = [text, ...prev.filter((item) => item !== text)];
      return updatedHistory.slice(0, 10);
    });

    if (onSelect) onSelect(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        const nextIndex = Math.min(prev + 1, results.length - 1);
        scrollToResult(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        const nextIndex = Math.max(prev - 1, 0);
        scrollToResult(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const { value, text } = results[selectedIndex];
      handleSelect(value, text);
    }
  };

  // Scroll to a specific result in the dropdown
  const scrollToResult = (index) => {
    if (resultRefs.current[index]) {
      resultRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div className="autocomplete">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      <ul className="results">
        {results.map((result, index) => (
          <li
            key={result.value}
            ref={(el) => (resultRefs.current[index] = el)}
            className={index === selectedIndex ? "highlighted" : ""}
            onClick={() => handleSelect(result.value, result.text)}
          >
            {result.text}
          </li>
        ))}
      </ul>
      <div className="last-searches">
        <h4>Last Searches</h4>
        <ul>
          {lastSearches.map((search, idx) => (
            <li key={idx}>{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
