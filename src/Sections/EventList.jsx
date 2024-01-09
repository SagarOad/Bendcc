import React from "react";
import EventGridView from "../Components/EventGridView";
import EventListView from "../Components/EventListView";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const EventList = () => {
  return (
    <div>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <EventGridView />
        </div>
        <div
          class="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          <EventListView />
        </div>
      </div>
      <div className=" pagination-btn pt-4 ">
        <button className=" border-0 p-0  bg-transparent  ">
          <FaAngleLeft className="pagination-arrow-left " />
          Previous Events
        </button>
        <button className="border-0 p-0  bg-transparent ">
          Next Events
          <FaAngleRight className="pagination-arrow-right " />
        </button>
      </div>
    </div>
  );
};

export default EventList;
