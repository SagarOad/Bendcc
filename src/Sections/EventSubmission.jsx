import React from "react";
import EventSubmitModal from "../Components/EventSubmitModal";

const EventSubmission = () => {
  return (
    <div className="submit-event-container">
      <div className="container">
        <h2>
          ARE YOU HOSTING AN EVENT? WANT TO ADD IT TO OUR CALENDAR? SUMIT IT
          BELOW
        </h2>

        <div>
        <EventSubmitModal />
        </div>
       
      </div>
    </div>
  );
};

export default EventSubmission;
