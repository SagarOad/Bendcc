import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import Calender from "./Calender";

const DateSelect = () => {
  return (
    <div>
      <div className="date-container">
        <div className="">
          <button className=" border-0 p-0  bg-transparent  ">
            <FaAngleLeft className="date-arrow" />
          </button>
          <button className="border-0 p-0  bg-transparent ">
            <FaAngleRight className="date-arrow" />
          </button>
        </div>
        <div>
          {/* <button className="date-btn">Today</button> */}
        </div>
        <div>
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
