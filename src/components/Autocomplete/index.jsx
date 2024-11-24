import React, { useState, useEffect, useRef } from "react";
import styles from "./Autocomplete.module.scss";

const Autocomplete = ({
  data = [],
  fetchResults,
  numOfResults = 10,
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [lastSearches, setLastSearches] = useState([]);
  const resultRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const fetchedResults = await fetchResults(query, numOfResults);
        setResults(fetchedResults);
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]);
      }
    };

    fetchData();
  }, [query, fetchResults, numOfResults]);

  const handleSelect = (value, text) => {
    setQuery(text);
    setResults([]);

    setLastSearches((prev) => {
      const updatedHistory = [text, ...prev.filter((item) => item !== text)];
      return updatedHistory.slice(0, 10);
    });

    if (onSelect) onSelect(value);
  };

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

  const scrollToResult = (index) => {
    if (resultRefs.current[index]) {
      resultRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div className={styles.autocomplete}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      <ul className={styles.results}>
        {results.map((result, index) => (
          <li
            key={result.value}
            ref={(el) => (resultRefs.current[index] = el)}
            className={index === selectedIndex ? styles.highlighted : ""}
            onClick={() => handleSelect(result.value, result.text)}
          >
            {result.text}
          </li>
        ))}
      </ul>
      <div className={styles.lastSearches}>
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
