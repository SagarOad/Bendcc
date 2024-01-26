// EventTabs.js
import React from "react";

const EventTabs = ({ onTabChange }) => {
  const handleTabClick = (tabName) => {
    onTabChange(tabName); // Notify parent component of tab change
  };

  return (
    <div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link border-0  active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
            onClick={() => handleTabClick("List")} // Notify parent on click
          >
            List
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link border-0"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
            onClick={() => handleTabClick("Grid")} // Notify parent on click
          >
            Grid
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <div className="month-day-tabs">
            <button
              className="nav-link border-0"
              id="month-tab"
              data-bs-toggle="tab"
              data-bs-target="#month-tab-pane"
              type="button"
              role="tab"
              aria-controls="month-tab-pane"
              aria-selected="false"
              onClick={() => handleTabClick("Month")} // Notify parent on click
            >
              Month
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default EventTabs;
