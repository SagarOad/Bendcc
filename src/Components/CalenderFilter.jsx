import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarFilter = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;


  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [events, setEvents] = useState([]); // Define setEvents here
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const newDate = new Date(selectedYear, selectedMonth - 1);
      calendarRef.current.getApi().gotoDate(newDate);
    }
    fetchData(selectedMonth, selectedMonth)

  }, [selectedYear, selectedMonth]);

  const handleYearChange = (date) => {
  
    setSelectedYear(date.getFullYear());
    fetchData(selectedMonth, date.getFullYear());
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    fetchData(month);
  };

  const fetchData = async (month) => {

    try {
      const response = await fetch(
        `https://famebusinesssolutions.com/bendcc/eventbymonthyear?event_month=${month}&event_year=${selectedYear}`
      );
      const data = await response.json();
      
      // Format the events data
      const formattedEvents = data.events.map(event => ({
        title: event.event_title,
        date: event.event_startdate // Assuming event_startdate contains the date
      }));
  
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(selectedYear, selectedMonth)
  };

  return (
    <div>
      <div className="calendar-container p-6 bg-white shadow-lg rounded-lg">
        <div className="filter-container flex justify-between items-center mb-4">
          <div className="year-picker mr-4">
            <label className="mr-2">Year:</label>
            <DatePicker
              // selected={new Date(selectedYear, 0, 1)}
              selected={new Date(selectedYear, 0, 1)}
              onChange={handleYearChange}
              dateFormat="yyyy"
              showYearPicker
              scrollableYearDropdown
              yearDropdownItemNumber={30} // Increase the number of years displayed
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>
          <div className="month-picker">
            <label className="mr-2">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(parseInt(e.target.value))}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              {Array.from({ length: 12 }, (v, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(selectedYear, i, 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="calendar">
          <div>
            <FullCalendar
              className="calender"
              ref={calendarRef}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              initialDate={`${selectedYear}-${
                selectedMonth < 10 ? "0" + selectedMonth : selectedMonth
              }-01`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFilter;
