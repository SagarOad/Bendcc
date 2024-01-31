import React from "react";
import { CiLocationOn } from "react-icons/ci";
// import defaultImage from "./default-event-image.jpg"; // Import your default stock image

const EventRow = ({ event }) => {
  const renderEventImage = () => {
    if (event?.event_image) {
      return (
        <img
          className="event-img"
          src={`https://famebusinesssolutions.com/bendcc/public/events/${event.event_image}`}
          alt="Event"
        />
      );
    } else {
      return (
        <img
          className="event-img"
          src="https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
          alt="Default Event"
        />
      );
    }
  };

  return (
    <div className="row event-container mt-4">
      <div className="col-lg-2 py-3 event-day-container">
        <div>
          <h2 className="fs-2 event-date">
            {new Date(event.event_startdate).getDate() + 1}
          </h2>
          <h4 className="fs-2 event-day">{`${
            new Date(event.event_startdate).getMonth() + 1
          } Month`}</h4>
        </div>
      </div>
      <div className="col-lg-6 event-info-container">
        <div>
          <p className="event-timing">{event.event_startdate}</p>
          <h2 className="event-heading">{event.event_title}</h2>
          <p className="event-location">
            <span className=" event-address fw-bold ">Bend Cars & Coffee</span>
            <CiLocationOn className=" fs-5" />
            1001 SW Emkay Dr, Bend, OR, United States
          </p>
          {/* <p className="event-para">{event.event_description}</p> */}
          <p className="event-price fw-bold">{event.event_cost}</p>
        </div>
      </div>
      <div className="col-lg-4 event-img-container">{renderEventImage()}</div>
    </div>
  );
};

export default EventRow;
