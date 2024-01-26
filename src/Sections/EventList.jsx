import React, { useState, useEffect } from "react";
import EventGridView from "../Components/EventGridView";
import EventListView from "../Components/EventListView";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import CalenderFilter from "../Components/CalenderFilter";

const EventList = ({ searchQuery, selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let apiUrl = `https://famebusinesssolutions.com/bendcc/searchevent?event_title=${searchQuery}&page=${currentPage}`;

        // Append selected date to API URL if available
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
          apiUrl = `https://famebusinesssolutions.com/bendcc/eventbydate?event_date=${formattedDate}&page=${currentPage}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        const eventsData = data?.data?.data || data?.events || [];
        setEvents(eventsData.length > 0 ? eventsData : [{ id: 1, title: "Default Event" }]);
        
        // Set total pages based on API response
        setTotalPages(data?.data?.last_page || 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, selectedDate, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className=" ">
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          <EventGridView events={events} />
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
        >
          <EventListView events={events} />
        </div>
        <div
          className="tab-pane fade"
          id="month-tab-pane"
          role="tabpanel"
          aria-labelledby="month-tab"
          tabIndex="0"
        >
          
        </div>
        <div>
            <CalenderFilter />
          </div>
      </div>
      <div className="pagination-btn pt-4">
        <button className="border-0 p-0 bg-transparent" onClick={handlePrevPage}>
          <FaAngleLeft className="pagination-arrow-left" />
          Previous Events
        </button>
        <button className="border-0 p-0 bg-transparent" onClick={handleNextPage}>
          Next Events
          <FaAngleRight className="pagination-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default EventList;
