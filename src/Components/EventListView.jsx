import React from "react";
import { CiLocationOn } from "react-icons/ci";

const EventListView = () => {
  return (
    <div>
      <div>
        <div className="row event-container mt-4">
          <div className=" col-lg-2 py-3 event-day-container ">
            <div>
              <h2 className=" fs-2 event-date">10</h2>
              <h4 className=" fs-2 event-day">SUN</h4>
            </div>
          </div>
          <div className=" col-lg-6 event-info-container ">
            <div>
              <p className="event-timing">January 14 @ 8:00 am - 10:00 am</p>
              <h2 className="event-heading">Bend Cars & Coffee</h2>
              <p className="event-location">
                <span className=" event-address fw-bold ">
                  Bend Cars & Coffee
                </span>
                <CiLocationOn className=" fs-5" />
                1001 SW Emkay Dr, Bend, OR, United States
              </p>

              <p className="event-para">
                Every 2nd & 4th Sunday going year round is Bend Cars & Coffee
                8am at @dillydallycoffeeco on Bends Westside #inbend
                #bendcarsandcoffee #backyardbend #carculture
              </p>

              <p className="event-price fw-bold ">Free</p>
            </div>
          </div>
          <div className=" col-lg-4 event-img-container">
            <img
              className="event-img"
              src="https://www.bendcc.com/wp-content/uploads/2023/09/BendCardnCoffee-1.jpg"
            />
          </div>
        </div>
        <div className="row event-container mt-4">
          <div className=" col-lg-2 py-3 event-day-container ">
            <div>
              <h2 className=" fs-2 event-date">10</h2>
              <h4 className=" fs-2 event-day">SUN</h4>
            </div>
          </div>
          <div className=" col-lg-6 event-info-container ">
            <div>
              <p className="event-timing">January 14 @ 8:00 am - 10:00 am</p>
              <h2 className="event-heading">Bend Cars & Coffee</h2>
              <p className="event-location">
                <span className=" event-address fw-bold ">
                  Bend Cars & Coffee
                </span>
                <CiLocationOn className=" fs-5" />
                1001 SW Emkay Dr, Bend, OR, United States
              </p>

              <p className="event-para">
                Every 2nd & 4th Sunday going year round is Bend Cars & Coffee
                8am at @dillydallycoffeeco on Bends Westside #inbend
                #bendcarsandcoffee #backyardbend #carculture
              </p>

              <p className="event-price fw-bold ">Free</p>
            </div>
          </div>
          <div className=" col-lg-4 event-img-container">
            <img
              className="event-img"
              src="https://www.bendcc.com/wp-content/uploads/2023/09/BendCardnCoffee-1.jpg"
            />
          </div>
        </div>
        <div className="row event-container mt-4">
          <div className=" col-lg-2 py-3 event-day-container ">
            <div>
              <h2 className=" fs-2 event-date">10</h2>
              <h4 className=" fs-2 event-day">SUN</h4>
            </div>
          </div>
          <div className=" col-lg-6 event-info-container ">
            <div>
              <p className="event-timing">January 14 @ 8:00 am - 10:00 am</p>
              <h2 className="event-heading">Bend Cars & Coffee</h2>
              <p className="event-location">
                <span className=" event-address fw-bold ">
                  Bend Cars & Coffee
                </span>
                <CiLocationOn className=" fs-5" />
                1001 SW Emkay Dr, Bend, OR, United States
              </p>

              <p className="event-para">
                Every 2nd & 4th Sunday going year round is Bend Cars & Coffee
                8am at @dillydallycoffeeco on Bends Westside #inbend
                #bendcarsandcoffee #backyardbend #carculture
              </p>

              <p className="event-price fw-bold ">Free</p>
            </div>
          </div>
          <div className=" col-lg-4 event-img-container">
            <img
              className="event-img"
              src="https://www.bendcc.com/wp-content/uploads/2023/09/BendCardnCoffee-1.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListView;
