import React from "react";
import map from "../assets/map.png";

const Contact = () => {

  return (
    <div>
      <div className=" contact-us container ">
        <div className=" row">
          <div className=" col-lg-4 contact ">
            <img
              className=" contact-img"
              src="https://www.bendcc.com/wp-content/uploads/2023/08/cropped-363349849_105490852647476_9164973380307774635_n-300x300.jpg"
            />
            <div>
              <h2>CONTACT US AT:</h2>
              <h3>INFORMATION@BENDCC.COM</h3>
            </div>
          </div>
          <div className=" col-lg-8 ">
            <div className="map-container">
                <img className=" w-100 " src={map} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
