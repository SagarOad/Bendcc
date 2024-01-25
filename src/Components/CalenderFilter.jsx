import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarFilter = ({ events }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const newDate = new Date(selectedYear, selectedMonth - 1);
      calendarRef.current.getApi().gotoDate(newDate);
    }
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (date) => {
    setSelectedYear(date.getFullYear());
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month + 1);
  };

  return (
    <div className="calendar-container">
      <div className="filter-container">
        <div className="year-picker">
          <label>Year:</label>
          <DatePicker
            selected={new Date(selectedYear, 0, 1)}
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
            scrollableYearDropdown
            yearDropdownItemNumber={30} // Increase the number of years displayed
          />
        </div>
        <div className="month-picker">
          <label>Month:</label>
          <select value={selectedMonth} onChange={(e) => handleMonthChange(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (v, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(selectedYear, i, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          initialDate={`${selectedYear}-${selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}-01`}
        />
      </div>
    </div>
  );
};

export default CalendarFilter;
