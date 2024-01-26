// SearchEvent.js
import React, { useState } from "react";
import SearchBox from "../Components/SearchBox";
import DateSelect from "../Components/DateSelect";
import EventList from "./EventList";
import EventTabs from "../Components/EventTabs";

const SearchEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateSelect, setShowDateSelect] = useState(true); // State to show/hide DateSelect
  const [selectedTab, setSelectedTab] = useState("List"); // State to track selected tab

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSearchQuery("");
  };

  const handleTabChange = (tabName) => {
    if (tabName === "Month") {
      setShowDateSelect(false); // Hide DateSelect for "Month" tab
    } else {
      setShowDateSelect(true);
    }
    setSelectedTab(tabName); // Update selected tab
  };

  return (
    <div className="search-events">
      <div className="container">
        <EventTabs onTabChange={handleTabChange} /> {/* Pass handleTabChange as prop */}
        <SearchBox onSearch={handleSearch} />
        {showDateSelect && selectedTab !== "Month" && ( // Conditionally render DateSelect
          <DateSelect
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        )}
        <EventList searchQuery={searchQuery} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default SearchEvent;
