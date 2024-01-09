import React from "react";

const MainSlider = () => {
  return (
    <div>
      <div
        id="carouselExampleControlsNoTouching"
        class="carousel slide"
        data-bs-touch="false"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div className="slider-content">
              <div className="container">
                <h1>Welcome to Bend Car Culture</h1>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://www.bendcc.com/wp-content/uploads/2018/12/slide-2.png"
              class="d-block slider-img w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://www.bendcc.com/wp-content/uploads/2023/09/slide-4.jpg"
              class="d-block slider-img w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default MainSlider;
