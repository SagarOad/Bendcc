import React, { useState } from "react";
import SearchBox from "../Components/SearchBox";
import DateSelect from "../Components/DateSelect";
import EventList from "./EventList";
import EventTabs from "../Components/EventTabs";
import CalenderFilter from "../Components/CalenderFilter"; // Import CalenderFilter component

const SearchEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateSelect, setShowDateSelect] = useState(true); // State to show/hide DateSelect
  const [activeTab, setActiveTab] = useState("List"); // State to track active tab

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSearchQuery("");
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName); // Update active tab
    if (tabName === "Month") {
      setShowDateSelect(false); // Hide DateSelect for "Month" tab
    } else {
      setShowDateSelect(true);
    }
  };

  return (
    <div className="search-events">
      <div className="container">
        <EventTabs onTabChange={handleTabChange} /> {/* Pass handleTabChange as prop */}
        <SearchBox onSearch={handleSearch} />
        {showDateSelect && (
          <DateSelect
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        )}
        {/* Conditionally render CalenderFilter based on activeTab */}
        {activeTab === "Month" && <CalenderFilter />}
        <EventList searchQuery={searchQuery} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default SearchEvent;
