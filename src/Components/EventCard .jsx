import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {


  console.log(event);
    return (
    <div className="event-grid-card" key={event.event_id}>
      <div className="card">
        <Link to={'/event'}>
        <img
          src={`https://famebusinesssolutions.com/bendcc/public/events/${event.event_image}`}
          className="card-img-top event-img2"
          alt="Event"
        />
        </Link>
        <div className="card-body">
          <div className=" row">
            <div className="col-lg-2 event-day-container2">
              <div>
                <h2 className="event-date2">{/* Extract day from event date */}</h2>
                <h4 className="event-day2">{/* Extract day name from event date */}</h4>
              </div>
            </div>
            <div className="col-lg-9">
              <p className="event-timing">{event.event_date_time}</p>
              <h2 className="event-heading2">{event.event_title}</h2>
              <p className="event-address2 fw-bold">{/* Provide event address */}</p>
              <p className="event-location2">
                <CiLocationOn className="fs-5" />
                {event.event_city}, {event.event_description}
              </p>
            </div>
          </div>
          <p className="event-para">{event.event_description}</p>
          <p className="event-price fw-bold">{event.event_cost}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
