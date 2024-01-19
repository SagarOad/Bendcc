import React from "react";
import map from "../assets/map.png";
import { useEffect, useState } from "react";

const EventPage = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://famebusinesssolutions.com/bendcc/eventdetail')
      .then(response => response.json())
      .then(data => setEvents(data.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className=" container">
      <div className=" row">
        <h1 className="event-page-heading mb-5 ">Bend Cars & Coffee</h1>

        <div className=" col-lg-4 ">
          <img
            className=" event-page-image"
            src="https://www.bendcc.com/wp-content/uploads/2023/09/BendCardnCoffee2-2-1536x1536.jpg"
          />
        </div>

        <div className="col-lg-8 ">
          <div className="row">
            <div className="col-lg-8 px-5 ">
                <h2 className="event-description">Event Description</h2>
              <p className="event-page-para">
                Every 2nd & 4th Sunday going year round is Bend Cars & Coffee
                8am at @dillydallycoffeeco on Bends Westside
              </p>
              <div className="event-page-details row">
                <div className=" col-lg-4 ">
                  <h2>Details</h2>
                  <div>
                    <h4>Date:</h4>
                    <p>January 28</p>
                  </div>
                  <div>
                    <h4>Time:</h4>
                    <p>8:00 am - 11:00 am</p>
                  </div>
                  <div className="">
                    <h4>Category:</h4>
                    <p>Cars & Coffee</p>
                  </div>
                  <div className="">
                    <h4>Cost:</h4>
                    <p>Free</p>
                  </div>
                </div>
                <div className=" col-lg-4 ">
                  <h2>Organizer</h2>
                  <div>
                    <p>Aaron Hofferber</p>
                  </div>
                </div>
                <div className=" col-lg-4 ">
                  <h2>Venue</h2>
                  <div>
                    <p>1001 SW Emkay Dr Bend, OR 97702 United States</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-lg-4">
              <img className="event-page-map" src={map} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
