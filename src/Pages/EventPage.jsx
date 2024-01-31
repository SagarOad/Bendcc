import React from "react";
import { Helmet } from "react-helmet";
import map from "../assets/map.png";
import { useEffect, useState } from "react";
import Navbar2 from "../Sections/Navbar2";
import Footer from "../Sections/Footer";
import outlookImg from "../assets/outlookImg.png";
import googleCalender from "../assets/google-calender.png";
import outlookLive from "../assets/outlookLive.png";
import icalender from "../assets/icalender.png";

const EventPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    switch (option) {
      case "google":
        constructGoogleCalendarLink();
        break;
      case "outlook360":
        constructOutlookCalendarLink();
        break;
      case "outlookLive":
        constructOutlookLiveCalendarLink();
        break;
      default:
        break;
    }
  };

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
    const formattedStartDate = formatDateToOutlookCalendarFormat(
      events.event_startdate + " " + events.event_starttime
    );
    const formattedEndDate = formatDateToOutlookCalendarFormat(
      events.event_enddate + " " + events.event_endtime
    );

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
    const formattedStartDate = formatDateToOutlookCalendarFormat(
      events.event_startdate + " " + events.event_starttime
    );
    const formattedEndDate = formatDateToOutlookCalendarFormat(
      events.event_enddate + " " + events.event_endtime
    );

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

  const formatDateForICal = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const generateICalLink = () => {
    // Splitting the time and checking if it's in AM or PM format
    const startTimeParts = events.event_starttime.split(" ");
    const isPM = startTimeParts[1].toLowerCase() === "pm";
    // Splitting the time into hours, minutes, and seconds
    const timeParts = startTimeParts[0].split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    // Adjusting hours if it's PM
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    // Constructing the start date and time
    const startDate = new Date(
      `${events.event_startdate}T${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
    const endDate = new Date(
      `${events.event_enddate}T${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
    // Format dates in ISO string format without milliseconds
    const formattedStartDate = startDate.toISOString().slice(0, -5);
    const formattedEndDate = endDate.toISOString().slice(0, -5);

    // Create an iCalendar event string
    const iCalEvent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formattedStartDate}
DTEND:${formattedEndDate}
SUMMARY:${events.event_summary}
DESCRIPTION:${events.event_description}
END:VEVENT
END:VCALENDAR`;

    // Base64 encode the iCalendar event
    const encodedICalEvent = btoa(iCalEvent);

    // Create a webcal URL with the encoded iCalendar event
    const webcalURL = `webcal://icalendar.org/subscribe/${encodedICalEvent}`;

    // Open the webcal URL to add the event to the calendar
    window.open(webcalURL);
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
      <Helmet>{/* Helmet meta tags... */}</Helmet>
      <Navbar2 />
      <div className="container event-main">
        <div className="row">
          <div className="col-lg-12"></div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <img
              className="event-page-image"
              src={`${path}/${events?.event_image}`}
              alt={events.event_title}
            />
          </div>
          <div className="col-lg-8 ">
            <div className="">
              <div className=" px-5 ">
                <h1 className="event-page-heading mb-3">
                  {events.event_title}
                </h1>
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
            </div>
            <div className="dropdown calender-dropdown-btn">
              <button
                className="btn dropdown-toggle calender-btn search-btn btn m-2"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Add to Calendar
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button
                    className="dropdown-item"
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
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={constructOutlookCalendarLink}
                  >
                    <span>
                      <img
                        className="rounded-3 calender-icon "
                        src={outlookImg}
                      />
                    </span>
                    Outlook 360
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={constructOutlookLiveCalendarLink}
                  >
                    <span>
                      <img
                        className="rounded-3 calender-icon "
                        src={outlookLive}
                      />
                    </span>
                    Outlook Live
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={generateICalLink}>
                    <span>
                      <img
                        className="rounded-3 calender-icon "
                        src={icalender}
                      />
                    </span>
                    iCalender
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="map-container">
              <iframe
                width="100%"
                height="400"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  events.event_city
                )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
              >
                <a href="https://www.maps.ie/population/">
                  Find Population on Map
                </a>
              </iframe>
            </div>
          </div>
          
        </div>
        <div className="row">
        
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventPage;
