import React from "react";
import EventCard from "./EventCard ";
import { Link } from "react-router-dom";

const EventGridView = ({ events }) => {
  console.log("sa");
  return (
    <div>
      <div className="border-0 px-0 mt-4">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <Link
              key={event.event_id}
              to={{ pathname: `/event/${event.event_id}`, state: { event } }}
            >
              <EventCard event={event} />
            </Link>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventGridView;
