import React from "react";

const SearchHistory = ({ history }) => {
  return (
    <div className="search-history">
      <h4>Last 10 Searches</h4>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
