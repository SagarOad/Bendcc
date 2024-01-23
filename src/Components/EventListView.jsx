import React from "react";
import EventRow from "./EventRow";

const EventListView = ({ events }) => {
  return (
    <div>
      <div>
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <EventRow key={event.event_id} event={event} />
        ))
      ) : (
        <p>No events available</p>
      )}
      </div>
    </div>
  );
};

export default EventListView;
