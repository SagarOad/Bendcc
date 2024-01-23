import React, { useState } from "react";
import SearchBox from "../Components/SearchBox";
import DateSelect from "../Components/DateSelect";
import EventList from "./EventList";

const SearchEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className=" search-events">
      <div className="container">
        <SearchBox onSearch={handleSearch} />
        <DateSelect />
        <EventList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default SearchEvent;
