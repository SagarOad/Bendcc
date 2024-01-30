import React from "react";
import { Helmet } from "react-helmet";
import map from "../assets/map.png";
import { useEffect, useState } from "react";
import Navbar2 from "../Sections/Navbar2";
import Footer from "../Sections/Footer";
import outlookImg from "../assets/outlookImg.png";
import googleCalender from "../assets/google-calender.png";

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

  function formatDateToGoogleCalendarFormat(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Format the date and time components
    const formattedDateTime = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

    return formattedDateTime;
  }


  function formatDateToOutlookCalendarFormat(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Format the date and time components
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}



  const constructGoogleCalendarLink = () => {
    const googleCalendarLink =
      "https://www.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(events.event_title)}` +
      `&details=${encodeURIComponent(events.event_description)}` +
      `&dates=${encodeURIComponent(
        formattedStartDate + "/" + formattedEndDate
      )}`;

    window.open(googleCalendarLink, "_blank");
  };

  const constructOutlookCalendarLink = () => {
    // Format start and end dates using the new function for Outlook Calendar
    const formattedStartDate = formatDateToOutlookCalendarFormat(events.event_startdate + " " + events.event_starttime);
    const formattedEndDate = formatDateToOutlookCalendarFormat(events.event_enddate + " " + events.event_endtime);

    // Construct the Outlook Calendar link
    const outlook365Link =
        "https://outlook.office.com/calendar/action/compose?subject=" +
        encodeURIComponent(events.event_title) +
        "&body=" +
        encodeURIComponent(events.event_description) +
        "&startdt=" +
        encodeURIComponent(formattedStartDate) +
        "&enddt=" +
        encodeURIComponent(formattedEndDate);

    // Open the Outlook Calendar link in a new window
    window.open(outlook365Link, "_blank");
};
 
const constructOutlookLiveCalendarLink = () => {
  // Format start and end dates using the new function for Outlook Calendar
  const formattedStartDate = formatDateToOutlookCalendarFormat(events.event_startdate + " " + events.event_starttime);
  const formattedEndDate = formatDateToOutlookCalendarFormat(events.event_enddate + " " + events.event_endtime);

  // Construct the Outlook Live Calendar link
  const outlookLiveLink =
      "https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent" +
      "&subject=" +
      encodeURIComponent(events.event_title) +
      "&body=" +
      encodeURIComponent(events.event_description) +
      "&startdt=" +
      encodeURIComponent(formattedStartDate) +
      "&enddt=" +
      encodeURIComponent(formattedEndDate);

  // Open the Outlook Live Calendar link in a new window
  window.open(outlookLiveLink, "_blank");
};

  
  

  const startDateFormatted = new Date(
    `${events.event_startdate} ${events.event_starttime}`
  );
  const endDateFormatted = new Date(
    `${events.event_enddate} ${events.event_endtime}`
  );

  console.log(events.event_startdate);
  console.log(events.event_starttime);

  // Convert start date to Google Calendar format
  const formattedStartDate =
    formatDateToGoogleCalendarFormat(startDateFormatted);

  // Convert end date to Google Calendar format
  const formattedEndDate = formatDateToGoogleCalendarFormat(endDateFormatted);

  // console.log("Start Date (Google Calendar format):", formattedStartDate);
  // console.log("End Date (Google Calendar format):", formattedEndDate);

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
        <div className="row">
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
                <div>
                  <iframe
                    width="100%"
                    height="600"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Bend,%20Oregon,%20USA+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Find Population on Map
                    </a>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn calender-btn search-btn btn m-2"
          onClick={constructGoogleCalendarLink}
        >
          <span>
            <img
              className="rounded-3 calender-icon "
              src={googleCalender}
            />
          </span>
          Add to Google Calendar
        </button>

        <button
          className="btn calender-btn search-btn btn m-2"
          onClick={constructOutlookCalendarLink}
        >
          <span>
            <img
              className="rounded-3 calender-icon "
              src={outlookImg}
            />
          </span>
          Add to Outlook 365
        </button>
        <button
          className="btn calender-btn search-btn btn m-2"
          onClick={constructOutlookCalendarLink}
        >
          <span>
            <img
              className="rounded-3 calender-icon "
              src={outlookImg}
            />
          </span>
          Add to Outlook Live
        </button>
      </div>
      <Footer />
    </>
  );
};

export default EventPage;
