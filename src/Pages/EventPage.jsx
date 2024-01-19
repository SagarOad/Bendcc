import React from "react";
import map from "../assets/map.png";
import { useLocation } from "react-router-dom";

const EventPage = () => {
    const location = useLocation();
    const { state } = location;
    const event = state ? state.event : null;
  
    if (!event) {
     
      return <p>Event not found</p>;
    }
  
  return (
    <div className="container">
      <div className="row">
        <h1 className="event-page-heading mb-5">{event.event_title}</h1>

        <div className="col-lg-4">
          <img className="event-page-image" src={event.image_url} alt="Event" />
        </div>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-8 px-5">
              <h2 className="event-description">Event Description</h2>
              <p className="event-page-para">{event.event_description}</p>
              <div className="event-page-details row">
                <div className="col-lg-4">
                  <h2>Details</h2>
                  <div>
                    <h4>Date:</h4>
                    <p>{event.event_date}</p>
                  </div>
                  <div>
                    <h4>Time:</h4>
                    <p>{event.event_time}</p>
                  </div>
                  <div className="">
                    <h4>Category:</h4>
                    <p>{event.event_category}</p>
                  </div>
                  <div className="">
                    <h4>Cost:</h4>
                    <p>{event.event_cost}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <h2>Organizer</h2>
                  <div>
                    <p>{event.organizer_name}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <h2>Venue</h2>
                  <div>
                    <p>{event.venue_address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <img className="event-page-map" src={map} alt="Map" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
