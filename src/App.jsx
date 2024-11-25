import React, { useEffect, useState, useMemo } from "react";
import styles from "./App.module.scss";
import Autocomplete from "./components/Autocomplete/index.jsx";
import { filterLocalData } from "./utils/helpers.js";
import { fetchGitHubUsers } from "./utils/api.js";
import { numberOfResults } from "./consts/index.js";

const App = () => {
  const [usStates, setUsStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("/us-states.json");
        const data = await response.json();
        const formattedData = data.map((state) => ({
          text: state.name,
          value: state.abbreviation,
        }));
        setUsStates(formattedData);
      } catch (error) {
        console.error("Failed to fetch us-states.json:", error);
      }
    };

    fetchStates();
  }, []);

  const fetchStateResults = useMemo(
    () => (query, numOfResults) =>
      filterLocalData(usStates, query, numOfResults),
    [usStates]
  );

  return (
    <div>
      <a
        href="https://github.com/BlagovestGerov/search-input"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubButton}
      >
        View on GitHub
      </a>
      <div className={styles.autocompleteContainer}>
        <div>
          <h2>State Search</h2>
          <Autocomplete
            data={usStates}
            fetchResults={fetchStateResults}
            numOfResults={numberOfResults}
            onSelect={(stateCode) => console.log("Selected state:", stateCode)}
          />
        </div>
        <div>
          <h2>Github User Search</h2>
          <Autocomplete
            fetchResults={fetchGitHubUsers}
            numOfResults={numberOfResults}
            onSelect={(value) => console.log("Selected:", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
