import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MdClear } from "react-icons/md";

const DateSelect = ({ onDateSelect, selectedDate }) => {
  const handleDateChange = (date) => {
    onDateSelect(date); // Pass selected date to parent component
  };

  const handleClearDate = () => {
    onDateSelect(null); // Pass null to clear the selected date
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(inputProps) => ( // Corrected: 'inputProps' instead of 'props'
          <>
            <input {...inputProps} className="form-control" />
            {selectedDate && (
              <IconButton onClick={handleClearDate} size="small">
                <ClearIcon />
              </IconButton>
            )}
          </>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateSelect;
