import React from "react";
import SearchBox from "../Components/SearchBox";
import DateSelect from "../Components/DateSelect";
import EventList from "./EventList";

const SearchEvent = () => {
  return (
    <div className=" search-events ">
      <div className="container">
        <SearchBox />
        <DateSelect />
        <EventList />
      </div>
    </div>
  );
};

export default SearchEvent;
