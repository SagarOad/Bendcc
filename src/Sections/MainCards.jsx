import React from "react";
import { AiFillTool } from "react-icons/ai";



const MainCards = () => {
  return (
    <div className=" container card-container">
      <div className=" d-flex justify-content-between align-items-center ">
        <div className="card1 d-flex flex-column justify-content-between ">
          <div className="">
            <AiFillTool className="card-icon" />
          </div>
          <div>
            <h1 className="card-heading">AD</h1>
            <h1 className=" card-para">SPOT 1</h1>
          </div>
        </div>
        <div className="card2 d-flex flex-column justify-content-between ">
          <div className="">
            <AiFillTool className="card-icon" />
          </div>
          <div>
            <h1 className="card-heading">AD</h1>
            <h1 className=" card-para">SPOT 1</h1>
          </div>
        </div>
        <div className="card3 d-flex flex-column justify-content-between ">
          <div className="">
            <AiFillTool className="card-icon" />
          </div>
          <div>
            <h1 className="card-heading">AD</h1>
            <h1 className=" card-para">SPOT 1</h1>
          </div>
        </div>
        <div className="card4 d-flex flex-column justify-content-between ">
          <div className="">
            <AiFillTool className="card-icon" />
          </div>
          <div>
            <h1 className="card-heading">AD</h1>
            <h1 className=" card-para">SPOT 1</h1>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default MainCards;
