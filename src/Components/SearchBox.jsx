import React from "react";
import EventTabs from "./EventTabs";

const SearchBox = () => {
  return (
    <div className="input-container border-2 border  ">
      <div class="input-group  ">
        <input
          type="search"
          class="form-control border-0  search-input rounded"
          placeholder="Search for events"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button
          type="button"
          class="btn btn m-2"
          data-mdb-ripple-init
        >
          FIND EVENTS
        </button>
        <div className=" event-tabs-wrapper ">
          <EventTabs />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
