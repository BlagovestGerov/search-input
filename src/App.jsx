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
      <h2>Search Options</h2>
      <div className={styles.autocompleteContainer}>
        <div>
          <h3>State Search</h3>
          <Autocomplete
            data={usStates}
            fetchResults={fetchStateResults}
            numOfResults={numberOfResults}
            onSelect={(stateCode) => console.log("Selected state:", stateCode)}
          />
        </div>
        <div>
          <h3>Github User Search</h3>
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
