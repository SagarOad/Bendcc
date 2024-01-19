import React from "react";
import EventCard from "./EventCard ";

const EventGridView = ({ events }) => {
  // console.log(events);
  return (
    <div>
      <div className="border-0 px-0 mt-4">
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.event_id} event={event} />
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
    </div>
  );
};

export default EventGridView;
