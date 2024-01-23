import React, { useState } from "react";
import EventTabs from "./EventTabs";

const SearchBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="input-container border-2 border">
      <div className="input-group">
        <input
          type="search"
          className="form-control border-0 search-input rounded"
          placeholder="Search for events"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn m-2"
          data-mdb-ripple-init
          onClick={handleSearch}
        >
          FIND EVENTS
        </button>
        <div className="event-tabs-wrapper">
          <EventTabs />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
