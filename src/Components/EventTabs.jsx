import React from "react";

const EventTabs = () => {
  return (
    <div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link border-0  active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            List
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link border-0"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Grid
          </button>
        </li>
      </ul>
      
    </div>
  );
};

export default EventTabs;
