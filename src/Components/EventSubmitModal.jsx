import React from "react";
import EventForm from "./EventForm";

const EventSubmitModal = () => {
  return (
    <div>
      <div className="event-submit-btn-container">
        <button
          type="button"
          className="btn button-27 btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalFullscreen"
        >
          Submit an Event
        </button>
        <div
          className="modal fade"
          id="exampleModalFullscreen"
          tabIndex="-1"
          aria-labelledby="exampleModalLabelFullscreen"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <nav class="navbar navbar-expand-lg bg-black">
                <div class="container">
                  <a class="navbar-brand" href="#">
                    <img src="https://www.bendcc.com/wp-content/uploads/2022/08/BendccLogoWhite-e1692670404519.png" />
                  </a>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">
                          Submit an Event
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          About Us
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Contact Us
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link">News</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="modal-body">
                {/* Your modal content goes here */}
                <EventForm />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSubmitModal;
