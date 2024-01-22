import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";
import Select from "react-select";
import DaysData from "../DaysData";
import MonthDatesData from "../MonthsData";
import TargetMonths from "../TargerMonths";

const EventForm = () => {
  // console.log(DaysData);

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const [selectedStartDateOnce, setSelectedStartDateOnce] = useState(null);
  const [selectedEndDateOnce, setSelectedEndDateOnce] = useState(null);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
  };

  const [selectedMonthValues, setSelectedMonthValues] = useState([]);

  const handleSelectMonthChange = (selectedOptions) => {
    setSelectedMonthValues(selectedOptions);
  };

  const [selectedTargetMonthValues, setSelectedTargetMonthValues] = useState(
    []
  );

  const handleSelectTargetMonthChange = (selectedOptions) => {
    setSelectedTargetMonthValues(selectedOptions);
  };

  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [isRecurringEvent, setIsRecurringEvent] = useState(false);
  const [eventType, setEventType] = useState("");
  const [weeklyRecurrenceEnds, setWeeklyRecurrenceEnds] = useState("on");

  const handleAllDayEventChange = (e) => {
    setIsAllDayEvent(e.target.checked);
    const isChecked = e.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      is_event_allday: isChecked ? "1" : "0", // Use string values
    }));
  };

  const handleRecurringEventChange = () => {
    setIsRecurringEvent(!isRecurringEvent);
  };

  const [selectedCities, setSelectedCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  const handleAddCity = () => {
    if (newCity && !selectedCities.includes(newCity)) {
      setSelectedCities([...selectedCities, newCity]);
      setNewCity("");
    }
  };

  const handleRemoveCity = (city) => {
    const updatedCities = selectedCities.filter((c) => c !== city);
    setSelectedCities(updatedCities);
  };

  // form data api integration

  const [formData, setFormData] = useState({
    event_title: "",
    event_description: "",
    event_tags: 1,
    event_status: "",
    event_city: 1,
    venue_detail: 1,
    organizer_detail: 1,
    event_Website: "",
    event_cost: "",
    // event_date_time: new Date(),
    is_event_allday: "",
    recurrence_event: "",
    // recurrence_type: "",
    event_type: "",
    recurrence_every: "",
    recurrence_in: "",
    recurrence_end: "",
    event_image: "",
    event_description: "",

    event_startdate: new Date(),
    event_enddate: new Date(),

    recurrence_startdate: new Date(),
    recurrence_enddate: new Date(),

    formData: [],
  });

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    setFormData({
      ...formData,
      event_type: e.target.value,
    });
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setFormData({
      ...formData,
      event_startdate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setFormData({
      ...formData,
      event_enddate: date,
    });
  };

  // testing

  const handleStartDateChangeOnce = (date) => {
    setSelectedStartDateOnce(date);
    setFormData({
      ...formData,
      recurrence_startdate: date,
    });
  };

  const handleEndDateChangeOnce = (date) => {
    setSelectedEndDateOnce(date);
    setFormData({
      ...formData,
      recurrence_enddate: date,
    });
  };

  const handleCheckboxChange = (day) => {
    setFormData((prevFormData) => {
      const updatedDays = prevFormData.daydate.includes(day)
        ? prevFormData.daydate.filter((selectedDay) => selectedDay !== day)
        : [...prevFormData.daydate, day];

      return {
        ...prevFormData,
        daydate: updatedDays,
      };
    });
  };

  const [submitResponse, setSubmitResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Extract integer values from selected options
      const selectedDays = selectedValues.map((option) => option.value);
      const selectedMonthDays = selectedMonthValues.map(
        (option) => option.value
      );
      const selectedTargetMonthDays = selectedTargetMonthValues.map(
        (option) => option.value
      );

      // Include selectedDays in the formData
      const updatedFormData = {
        ...formData,
        daydate: selectedDays,
        month_day: selectedMonthDays,
        targetmonth: selectedTargetMonthDays,
      };

      // http://192.168.18.244:8888/submitevent
      // https://famebusinesssolutions.com/bendcc/submitevent
      // Make a POST request to the API
      const response = await axios.post(
        "https://famebusinesssolutions.com/bendcc/submitevent",
        updatedFormData
      );

      // Handle successful response
      console.log("Response:", response.data);

      // Reset form data if needed
      setFormData({
        event_title: "",
        event_description: "",
        // Reset other form fields here
      });
    } catch (error) {
      // Handle error
      console.error("Error:", error.response.data);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
    const file = e.target.files[0];
    // console.log("Selected file:", file);
    setFormData((prevData) => ({
      ...prevData,
      event_image: file,
    }));
    } else {
      let value = e.target.value;

      // If the field should be an integer, convert the value to an integer
      if (
        e.target.name === "event_tags" ||
        e.target.name === "event_city" ||
        e.target.name === "event_type" ||
        e.target.name === "event_status" ||
        e.target.name === "venue_detail" ||
        e.target.name === "organizer_detail" ||
        e.target.name === "daydate"
      ) {
        value = parseInt(value, 10);
      }

      // Update the corresponding field in the form data
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: value,
      }));
    }
  };

  return (
    <div onSubmit={handleSubmit} className="event-form">
      <div className="container">
        <h1 className="text-center my-3 modal-form-title">Add New Event</h1>
        <div className="form-wrap">
          <form id="survey-form">
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="event-title">Event Title</label>
                  <input
                    type="text"
                    name="event_title"
                    className="form-control"
                    id="event-title"
                    placeholder="Enter event title"
                    value={formData.event_title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Event Categories</label>
                  <input
                    type="text"
                    name="eventCategories"
                    id="eventCategories"
                    placeholder="Enter event categories"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="event_tags">Event Tags</label>
                  <select
                    id="event_tags"
                    name="event_tags"
                    value={formData.event_tags}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="1">Tag 1</option>
                    <option value="2">Tag 2</option>
                    <option value="3">Tag 3</option>
                    <option value="4">Tag 4</option>
                    <option value="5">Tag 5</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="event_status">Event Status</label>
                  <select
                    id="event_status"
                    name="event_status"
                    value={formData.event_status}
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="1">Live</option>
                    <option value="2">End</option>
                    <option value="3">Postponed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="venue_detail">Venue Details</label>
                  <select
                    id="venue_detail"
                    name="venue_detail"
                    className="form-control"
                    value={formData.venue_detail}
                    onChange={handleChange}
                  >
                    <option value="1">Hall</option>
                    <option value="2">Banquet</option>
                    <option value="3">Home Event</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="organizer_detail">Organizer Details</label>
                  <select
                    id="organizer_detail"
                    name="organizer_detail"
                    className="form-control"
                    value={formData.organizer_detail}
                    onChange={handleChange}
                  >
                    <option value="1">Organizer 1</option>
                    <option value="2">Organizer 2</option>
                    <option value="3">Organizer 3</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="event_Website">Event Website</label>
                  <input
                    type="text"
                    name="event_Website"
                    id="event_Website"
                    value={formData.event_Website}
                    onChange={handleChange}
                    placeholder="Enter event website"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="event_cost">Event Cost</label>
                  <input
                    type="text"
                    name="event_cost"
                    id="event_cost"
                    value={formData.event_cost}
                    onChange={handleChange}
                    placeholder="Event Cost"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="dateTime">Time and Date</label>
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={handleStartDateChange}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="h:mm aa"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="is_event_allday"
                      name="is_event_allday"
                      className="form-check-input"
                      onChange={handleAllDayEventChange}
                      checked={isAllDayEvent}
                    />
                    <label htmlFor="allDayEvent">All Day Event</label>
                  </div>
                  {isAllDayEvent ? (
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeSelect
                      timeFormat="h:mm aa"
                      className="form-control mt-2"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* Multi select for cities */}

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">Select Cities</label>
                  <input
                    type="text"
                    id="city"
                    className="form-control"
                    placeholder="Enter city"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  />
                  <small className="form-text text-muted">
                    Type a city name and press "Add" to select.
                  </small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Selected Cities</label>
                  <div>
                    <ul className="list-group">
                      {selectedCities.map((city) => (
                        <li
                          key={city}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {city}
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRemoveCity(city)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCity}
                >
                  Add City
                </button>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="recurringEvent"
                      className="form-check-input"
                      onChange={handleRecurringEventChange}
                      checked={isRecurringEvent}
                    />
                    <label
                      htmlFor="recurringEvent"
                      className="form-check-label"
                    >
                      Recurring Event
                    </label>
                  </div>
                  {isRecurringEvent && (
                    <>
                      <div className="form-group mt-2">
                        <label htmlFor="event_type">Recurrence Type</label>
                        <select
                          id="event_type"
                          name="event_type"
                          className="form-control"
                          onChange={handleEventTypeChange}
                          value={eventType}
                        >
                          <option value="once">Once</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      {eventType === "once" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="recurrenceEvery">
                                Start Date
                              </label>
                              <DatePicker
                                selected={selectedStartDateOnce}
                                onChange={handleStartDateChangeOnce}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeSelect
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="recurrenceEvery">End Date</label>
                              <br />
                              <DatePicker
                                selected={selectedEndDateOnce}
                                onChange={handleEndDateChangeOnce}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeSelect
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      )}


                      {eventType === "daily" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="recurrenceEvery">
                                Start Date
                              </label>
                              <DatePicker
                                selected={selectedStartDateOnce}
                                onChange={handleStartDateChangeOnce}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeSelect
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="recurrenceEvery">End Date</label>
                              <br />
                              <DatePicker
                                selected={selectedEndDateOnce}
                                onChange={handleEndDateChangeOnce}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeSelect
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {eventType === "weekly" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEvery">
                                Start Date
                              </label>
                              <DatePicker
                                selected={selectedStartDateOnce}
                                onChange={handleStartDateChangeOnce}
                                dateFormat="MM/dd/yyyy"
                                showTimeSelect={false}
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="daysOfWeek">End Date</label>
                              <br />
                              <DatePicker
                                selected={selectedEndDateOnce}
                                onChange={handleEndDateChangeOnce}
                                dateFormat="MM/dd/yyyy"
                                showTimeSelect={false}
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEnds">
                                Ends{" "}
                              </label>
                              <label>Select Options:</label>

                              {weeklyRecurrenceEnds === "on" && (
                                <Select
                                  defaultValue={[DaysData[0], DaysData[1]]}
                                  isMulti
                                  name="days"
                                  options={DaysData}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleSelectChange}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {eventType === "monthly" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEvery">
                                Start Date
                              </label>
                              <DatePicker
                                selected={selectedStartDateOnce}
                                onChange={handleStartDateChangeOnce}
                                dateFormat="MM/dd/yyyy"
                                showTimeSelect={false}
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="daysOfWeek">End Date</label>
                              <br />
                              <DatePicker
                                selected={selectedEndDateOnce}
                                onChange={handleEndDateChangeOnce}
                                dateFormat="MM/dd/yyyy"
                                showTimeSelect={false}
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEnds">
                                Month Day{" "}
                              </label>

                              {weeklyRecurrenceEnds === "on" && (
                                <Select
                                  defaultValue={[
                                    MonthDatesData[0],
                                    MonthDatesData[1],
                                  ]}
                                  isMulti
                                  name="days"
                                  options={MonthDatesData}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleSelectMonthChange}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {eventType === "yearly" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEvery">
                                Start Date
                              </label>
                              <DatePicker
                                selected={selectedStartDateOnce}
                                onChange={handleStartDateChangeOnce}
                                dateFormat="MM/dd/yyyy"
                                showTimeSelect={false}
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="daysOfWeek">End Date</label>
                              <br />
                              <DatePicker
                                selected={selectedEndDateOnce}
                                onChange={handleEndDateChangeOnce}
                                dateFormat="MM/dd/yyyy"
                                showTimeSelect={false}
                                timeFormat="h:mm aa"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEnds">
                                Month Day{" "}
                              </label>

                              {weeklyRecurrenceEnds === "on" && (
                                <Select
                                  defaultValue={[
                                    MonthDatesData[0],
                                    MonthDatesData[1],
                                  ]}
                                  isMulti
                                  name="days"
                                  options={MonthDatesData}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleSelectMonthChange}
                                />
                              )}
                            </div>

                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEnds">
                                Target Month{" "}
                              </label>

                              {weeklyRecurrenceEnds === "on" && (
                                <Select
                                  defaultValue={[
                                    TargetMonths[0],
                                    TargetMonths[1],
                                  ]}
                                  isMulti
                                  name="days"
                                  options={TargetMonths}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleSelectTargetMonthChange}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="event_image">Event Image</label>
                  <input
                    type="file"
                    id="event_image"
                    name="event_image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {/* <input
                    type="file"
                    value={formData.event_image}
                    id="event_image"
                    name="event_image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  /> */}
                  <small className="form-text text-muted">
                    Upload an image for your event.
                  </small>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="event-description">EVENT DISCRIPTION</label>
                  <textarea
                    id="event-description"
                    className="form-control"
                    name="event_description"
                    value={formData.event_description}
                    onChange={handleChange}
                    placeholder="Enter your comment here..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-primary btn-block"
                >
                  Submit Event
                </button>
              </div>
            </div>
            {/* Display the response */}
            {submitResponse && (
              <div>
                <h2>Form Submission Response</h2>
                <pre>{JSON.stringify(submitResponse, null, 2)}</pre>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
