import React from "react";
import map from "../assets/map.png";

const Contact = () => {
  return (
    <div>
      <div className=" contact-us container ">
        <div className=" contact-logo-container">
          <div className=" contact ">
            <img
              className=" contact-img"
              src="https://www.bendcc.com/wp-content/uploads/2023/08/cropped-363349849_105490852647476_9164973380307774635_n-300x300.jpg"
            />
            <div>
              <h2>CONTACT US AT:</h2>
              <h3>INFORMATION@BENDCC.COM</h3>
            </div>
          </div>
        </div>
        
      </div>
      <div className="map-container">
              {/* <img className=" w-100 " src={map} /> */}
              <div>
                <iframe
                  width="100%"
                  height="600"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Bend,%20Oregon,%20USA+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.maps.ie/population/">
                    Find Population on Map
                  </a>
                </iframe>
              </div>
            </div>
    </div>
  );
};

export default Contact;
