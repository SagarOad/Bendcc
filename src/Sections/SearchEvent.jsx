// SearchEvent.jsx
import React, { useState } from "react";
import SearchBox from "../Components/SearchBox";
import DateSelect from "../Components/DateSelect";
import EventList from "./EventList";

const SearchEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // State to hold selected date

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSearchQuery(""); // Reset search query
  };
  
  return (
    <div className=" search-events">
      <div className="container">
        <SearchBox onSearch={handleSearch} />
        <DateSelect onDateSelect={handleDateSelect} />
        <EventList searchQuery={searchQuery} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default SearchEvent;
