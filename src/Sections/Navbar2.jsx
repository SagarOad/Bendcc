import React from "react";
import { Link } from "react-router-dom";


const Navbar2 = () => {
  return (
    <div>
      <nav class="nav2 navbar navbar-expand-lg bg-body-tertiary">
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
                <Link to="/" className=" d-flex text-decoration-none  ">
              <buttton
                  type="button"
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalFullscreen">
                     Home
                </buttton>
                </Link>
              </li>
         
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar2;
