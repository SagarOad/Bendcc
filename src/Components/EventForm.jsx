import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";

const EventForm = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [isRecurringEvent, setIsRecurringEvent] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState("daily");
  const [recurrenceEvery, setRecurrenceEvery] = useState(1);
  const [recurrenceEnds, setRecurrenceEnds] = useState("on");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(new Date());
  const [weeklyRecurrenceEvery, setWeeklyRecurrenceEvery] = useState(1);
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
  const [weeklyRecurrenceEnds, setWeeklyRecurrenceEnds] = useState("on");
  const [weeklyRecurrenceEndDate, setWeeklyRecurrenceEndDate] = useState(
    new Date()
  );

  const [monthlyRecurrenceEvery, setMonthlyRecurrenceEvery] = useState(1);
  const [monthlyRecurrenceOption, setMonthlyRecurrenceOption] = useState("on");
  const [monthlyRecurrenceEnds, setMonthlyRecurrenceEnds] = useState("on");

  const [yearlyRecurrenceEvery, setYearlyRecurrenceEvery] = useState(1);
  const [yearlyRecurrenceOption, setYearlyRecurrenceOption] = useState("on");
  const [yearlyRecurrenceEnds, setYearlyRecurrenceEnds] = useState("on");
  const [yearlyRecurrenceWeekday, setYearlyRecurrenceWeekday] =
    useState("first");

  const [yearlyRecurrenceMonth, setYearlyRecurrenceMonth] = useState(
    selectedStartDate.getMonth()
  );
  const [yearlyRecurrenceDate, setYearlyRecurrenceDate] = useState(
    selectedStartDate.getDate()
  );

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

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

  const handleRecurrenceTypeChange = (e) => {
    setRecurrenceType(e.target.value);
  };

  const handleRecurrenceEveryChange = (e) => {
    setRecurrenceEvery(parseInt(e.target.value, 10));
  };

  const handleRecurrenceEndsChange = (e) => {
    setRecurrenceEnds(e.target.value);
  };

  const handleRecurrenceEndDateChange = (date) => {
    setRecurrenceEndDate(date);
  };

  const handleWeeklyRecurrenceEveryChange = (e) => {
    setWeeklyRecurrenceEvery(parseInt(e.target.value, 10));
  };

  const handleDaysOfWeekChange = (e) => {
    const selectedDay = e.target.value;
    setSelectedDaysOfWeek((prevSelectedDays) => {
      if (prevSelectedDays.includes(selectedDay)) {
        return prevSelectedDays.filter((day) => day !== selectedDay);
      } else {
        return [...prevSelectedDays, selectedDay];
      }
    });
  };

  const handleWeeklyRecurrenceEndsChange = (e) => {
    setWeeklyRecurrenceEnds(e.target.value);
  };

  const handleWeeklyRecurrenceEndDateChange = (date) => {
    setWeeklyRecurrenceEndDate(date);
  };

  const handleMonthlyRecurrenceEveryChange = (e) => {
    setMonthlyRecurrenceEvery(parseInt(e.target.value, 10));
  };

  const handleMonthlyRecurrenceOptionChange = (e) => {
    setMonthlyRecurrenceOption(e.target.value);
  };

  const handleMonthlyRecurrenceEndsChange = (e) => {
    setMonthlyRecurrenceEnds(e.target.value);
  };

  const handleMonthlyRecurrenceWeekdayChange = (e) => {
    setMonthlyRecurrenceWeekday(e.target.value);
  };

  const handleYearlyRecurrenceEveryChange = (e) => {
    setYearlyRecurrenceEvery(parseInt(e.target.value, 10));
  };

  const handleYearlyRecurrenceOptionChange = (e) => {
    setYearlyRecurrenceOption(e.target.value);
  };

  const handleYearlyRecurrenceEndsChange = (e) => {
    setYearlyRecurrenceEnds(e.target.value);
  };

  const handleYearlyRecurrenceWeekdayChange = (e) => {
    setYearlyRecurrenceWeekday(e.target.value);
  };

  const handleYearlyRecurrenceMonthChange = (e) => {
    setYearlyRecurrenceMonth(parseInt(e.target.value, 10));
  };

  const handleYearlyRecurrenceDateChange = (date) => {
    setYearlyRecurrenceDate(date.getDate());
  };

  const renderEventScheduleSummary = () => {
    if (!isRecurringEvent) {
      return ""; // No summary for non-recurring events
    }

    const endsText =
      recurrenceEnds === "on"
        ? `repeating until ${recurrenceEndDate.toLocaleDateString()}`
        : recurrenceEnds === "after"
        ? `repeating for ${recurrenceEvery} occurrences`
        : "never ending";
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
    event_date_time: new Date(),
    is_event_allday: "",
    recurrence_event: "",
    recurrence_type: "",
    recurrence_every: "",
    recurrence_in: "",
    recurrence_end: "",
    event_image: "",
    event_description: "",
  });

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setFormData({
      ...formData,
      event_date_time: date,
    });
  };
  const [submitResponse, setSubmitResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the API
      const response = await axios.post(
        "https://famebusinesssolutions.com/bendcc/submitevent",
        formData
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

      // Set the error response in state
      setSubmitResponse(error.response.data);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: file,
      }));
    } else {
      let value = e.target.value;

      // If the field should be an integer, convert the value to an integer
      if (
        e.target.name === "event_tags" ||
        e.target.name === "event_city" ||
        e.target.name === "venue_detail" ||
        e.target.name === "organizer_detail"
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
                        <label htmlFor="recurrenceType">Recurrence Type</label>
                        <select
                          id="recurrenceType"
                          name="recurrenceType"
                          className="form-control"
                          onChange={handleRecurrenceTypeChange}
                          value={recurrenceType}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      {recurrenceType === "daily" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="recurrenceEvery">Every</label>
                              <select
                                id="recurrenceEvery"
                                name="recurrenceEvery"
                                className="form-control"
                                onChange={handleRecurrenceEveryChange}
                                value={recurrenceEvery}
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num}>
                                    {num} days
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="recurrenceEnds">Ends</label>
                              <select
                                id="recurrenceEnds"
                                name="recurrenceEnds"
                                className="form-control"
                                onChange={handleRecurrenceEndsChange}
                                value={recurrenceEnds}
                              >
                                <option value="on">On</option>
                                <option value="after">After</option>
                                <option value="never">Never</option>
                              </select>
                              {recurrenceEnds === "on" && (
                                <DatePicker
                                  selected={recurrenceEndDate}
                                  onChange={handleRecurrenceEndDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  className="form-control mt-2"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {recurrenceType === "weekly" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEvery">
                                Every
                              </label>
                              <select
                                id="weeklyRecurrenceEvery"
                                name="weeklyRecurrenceEvery"
                                className="form-control"
                                onChange={handleWeeklyRecurrenceEveryChange}
                                value={weeklyRecurrenceEvery}
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num}>
                                    {num} weeks
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="daysOfWeek">Days of Week</label>
                              <select
                                id="daysOfWeek"
                                name="daysOfWeek"
                                className="form-control"
                                onChange={handleDaysOfWeekChange}
                                multiple
                              >
                                {[
                                  "Sunday",
                                  "Monday",
                                  "Tuesday",
                                  "Wednesday",
                                  "Thursday",
                                  "Friday",
                                  "Saturday",
                                ].map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="weeklyRecurrenceEnds">Ends</label>
                              <select
                                id="weeklyRecurrenceEnds"
                                name="weeklyRecurrenceEnds"
                                className="form-control"
                                onChange={handleWeeklyRecurrenceEndsChange}
                                value={weeklyRecurrenceEnds}
                              >
                                <option value="on">On</option>
                                <option value="after">After</option>
                                <option value="never">Never</option>
                              </select>
                              {weeklyRecurrenceEnds === "on" && (
                                <DatePicker
                                  selected={weeklyRecurrenceEndDate}
                                  onChange={handleWeeklyRecurrenceEndDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  className="form-control mt-2"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {recurrenceType === "monthly" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="monthlyRecurrenceEvery">
                                Every
                              </label>
                              <select
                                id="monthlyRecurrenceEvery"
                                name="monthlyRecurrenceEvery"
                                className="form-control"
                                onChange={handleMonthlyRecurrenceEveryChange}
                                value={monthlyRecurrenceEvery}
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num}>
                                    {num} months
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="monthlyRecurrenceOption">
                                On the
                              </label>
                              <select
                                id="monthlyRecurrenceOption"
                                name="monthlyRecurrenceOption"
                                className="form-control"
                                onChange={handleMonthlyRecurrenceOptionChange}
                                value={monthlyRecurrenceOption}
                              >
                                <option value="on">On the</option>
                                <option value="first">First</option>
                                <option value="second">Second</option>
                                <option value="third">Third</option>
                                <option value="fourth">Fourth</option>
                                <option value="last">Last</option>
                              </select>
                              {monthlyRecurrenceOption === "on" && (
                                <DatePicker
                                  selected={selectedStartDate}
                                  onChange={handleStartDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  className="form-control mt-2"
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="monthlyRecurrenceEnds">
                                Ends
                              </label>
                              <select
                                id="monthlyRecurrenceEnds"
                                name="monthlyRecurrenceEnds"
                                className="form-control"
                                onChange={handleMonthlyRecurrenceEndsChange}
                                value={monthlyRecurrenceEnds}
                              >
                                <option value="on">On</option>
                                <option value="after">After</option>
                                <option value="never">Never</option>
                              </select>
                              {monthlyRecurrenceEnds === "on" && (
                                <DatePicker
                                  selected={recurrenceEndDate}
                                  onChange={handleRecurrenceEndDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  className="form-control mt-2"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {recurrenceType === "yearly" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="yearlyRecurrenceEvery">
                                Every
                              </label>
                              <select
                                id="yearlyRecurrenceEvery"
                                name="yearlyRecurrenceEvery"
                                className="form-control"
                                onChange={handleYearlyRecurrenceEveryChange}
                                value={yearlyRecurrenceEvery}
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num}>
                                    {num} years
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="yearlyRecurrenceOption">In</label>
                              <select
                                id="yearlyRecurrenceOption"
                                name="yearlyRecurrenceOption"
                                className="form-control"
                                onChange={handleYearlyRecurrenceOptionChange}
                                value={yearlyRecurrenceOption}
                              >
                                <option value="on">On the</option>
                                <option value="first">First</option>
                                <option value="second">Second</option>
                                <option value="third">Third</option>
                                <option value="fourth">Fourth</option>
                                <option value="last">Last</option>
                              </select>
                              {yearlyRecurrenceOption === "on" && (
                                <DatePicker
                                  selected={selectedStartDate}
                                  onChange={handleStartDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  className="form-control mt-2"
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="yearlyRecurrenceEnds">Ends</label>
                              <select
                                id="yearlyRecurrenceEnds"
                                name="yearlyRecurrenceEnds"
                                className="form-control"
                                onChange={handleYearlyRecurrenceEndsChange}
                                value={yearlyRecurrenceEnds}
                              >
                                <option value="on">On</option>
                                <option value="after">After</option>
                                <option value="never">Never</option>
                              </select>
                              {yearlyRecurrenceEnds === "on" && (
                                <DatePicker
                                  selected={recurrenceEndDate}
                                  onChange={handleRecurrenceEndDateChange}
                                  dateFormat="MM/dd/yyyy"
                                  className="form-control mt-2"
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
                    value={formData.event_image}
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
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
