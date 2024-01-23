import React from "react";
import { Helmet } from "react-helmet";
import map from "../assets/map.png";
import { useEffect, useState } from "react";
import Navbar2 from "../Sections/Navbar2";
import Footer from "../Sections/Footer";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [path, setPath] = useState("");
  const extractPostIdFromUrl = (url) => {
    const parts = url.split("?");
    return parts[parts.length - 1];
  };
  useEffect(() => {
    const url = window.location.href;
    const postId = extractPostIdFromUrl(url);

    // Fetch data from the API
    fetch(
      `https://famebusinesssolutions.com/bendcc/eventdetail?event_id=${postId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.data), setPath(data?.imagepath);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(events);
  return (
    <>
    <Helmet>
        <title>{events.event_title}</title>
        <meta name="description" content={events.event_description} />
        <meta property="og:title" content={events.event_title} />
        <meta property="og:image" content={`${path}/${events?.event_image}`} />
        {/* Add more meta tags as needed */}
      </Helmet>
      <Navbar2 />
      <div className=" container event-main">
        <div className=" row">
          <h1 className="event-page-heading mb-5 ">{events.event_title}</h1>

          <div className=" col-lg-4 ">
            <img
              className=" event-page-image"
              src={`${path}/${events?.event_image}`}
            />
          </div>

          <div className="col-lg-8 ">
            <div className="row">
              <div className="col-lg-8 px-5 ">
                <h2 className="event-description">Event Description</h2>
                <p className="event-page-para">{events.event_description}</p>
                <div className="event-page-details row">
                  <div className=" col-lg-4 ">
                    <h2>Details</h2>
                    <div>
                      <h4>Date:</h4>
                      <p>{events.event_startdate}</p>
                    </div>
                    <div>
                      <h4>Time:</h4>
                      <p>{events.event_starttime}</p>
                    </div>
                    <div className="">
                      <h4>Category:</h4>
                      <p>{events.event_categories}</p>
                    </div>
                    <div className="">
                      <h4>Cost:</h4>
                      <p>{events.event_cost}</p>
                    </div>
                  </div>
                  <div className=" col-lg-4 ">
                    <h2>Organizer</h2>
                    <div>
                      <p>{events.organizer_detail}</p>
                    </div>
                  </div>
                  <div className=" col-lg-4 ">
                    <h2>Venue</h2>
                    <div>
                      <p>{events.venue_detail}</p>
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
      <Footer />
    </>
  );
};

export default EventPage;
