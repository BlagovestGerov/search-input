import styles from "./App.module.scss";
import React, { useEffect, useState, useMemo } from "react";
import Autocomplete from "./components/Autocomplete/index.jsx";
import { getDataSourceResults } from "./utils/dataSource.js";
import { filterLocalData } from "./utils/helpers.js";
import { fetchGitHubUsers } from "./utils/api.js";
import { numberOfResults } from "./consts/index.js";

// const usStates = [
//   { text: "New York", value: "NY" },
//   { text: "New Jersey", value: "NJ" },
//   { text: "New Mexico", value: "NM" },
//   { text: "New Hampshire", value: "NH" },
// ];

const App = () => {
  const [usStates, setUsStates] = useState([]);

  useEffect(() => {
    // Fetch the states data
    const fetchStates = async () => {
      try {
        const response = await fetch("/us-states.json");
        const data = await response.json();
        // Transform the data into the required format
        const formattedData = data.map((state) => ({
          text: state.name,
          value: state.abbreviation,
        }));

        console.log("fetchResults -> formattedData", formattedData);

        setUsStates(formattedData);
      } catch (error) {
        console.error("Failed to fetch us-states.json:", error);
      }
    };

    fetchStates();
  }, []);

  // const fetchResults = async (query, numOfResults) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`
  //     );
  //     console.log("fetchResults -> github response", response);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     return data.items.map((item) => ({
  //       text: item.login,
  //       value: item.id,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching results:", error);
  //     return []; // Return an empty array on failure
  //   }
  // };

  // const memoizedStates = useMemo(() => usStates, [usStates]);
  const fetchStateResults = useMemo(
    () => (query, numOfResults) =>
      filterLocalData(usStates, query, numOfResults),
    [usStates]
  );

  return (
    <div>
      <h2>State Search</h2>
      {/* <Autocomplete
        data={usStates}
        numOfResults={10}
        onSelect={(stateCode) => console.log("Selected state:", stateCode)}
      /> */}
      <Autocomplete
        data={usStates}
        // fetchResults={async (query, numOfResults) =>
        //   usStates
        //     .filter((state) =>
        //       state.text.toLowerCase().includes(query.trim().toLowerCase())
        //     )
        //     .slice(0, numOfResults)
        // }
        fetchResults={fetchStateResults}
        numOfResults={numberOfResults}
        onSelect={(stateCode) => console.log("Selected state:", stateCode)}
      />

      <h2>Github User Search</h2>
      {/* <Autocomplete
        endpoint="https://api.github.com/search/users?q={query}&per_page={numOfResults}"
        numOfResults={10}
        onSelect={(userId) => console.log("Selected user:", userId)}
      /> */}
      <Autocomplete
        fetchResults={fetchGitHubUsers}
        numOfResults={numberOfResults}
        onSelect={(value) => console.log("Selected:", value)}
      />
    </div>
  );
};

export default App;
