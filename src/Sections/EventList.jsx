import React, { useState, useEffect } from "react";
import EventGridView from "../Components/EventGridView";
import EventListView from "../Components/EventListView";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const EventList = ({ searchQuery }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {

    const apiUrl = `https://famebusinesssolutions.com/bendcc/searchevent?event_title=${searchQuery}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const eventsData = data?.data?.data || [];
        console.log(eventsData);
        setEvents(eventsData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery]);
  console.log(searchQuery);
  return (
    <div>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          <EventGridView events={events} />
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
        >
          <EventListView events={events} />
        </div>
      </div>
      <div className="pagination-btn pt-4">
        <button className="border-0 p-0 bg-transparent">
          <FaAngleLeft className="pagination-arrow-left" />
          Previous Events
        </button>
        <button className="border-0 p-0 bg-transparent">
          Next Events
          <FaAngleRight className="pagination-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default EventList;
