import React from "react";
import MainSlider from "../Sections/MainSlider";
import Navbar from "../Sections/Navbar";
import MainCards from "../Sections/MainCards";
import SearchEvent from "../Sections/SearchEvent";
import EventSubmission from "../Sections/EventSubmission";
import Sponsors from "../Sections/Sponsors";
import Contact from "../Sections/Contact";
import Footer from "../Sections/Footer";
import CalenderFilter from "../Components/CalenderFilter";

const Home = () => {
  return (
    <div>
      <Navbar />
      <MainSlider />
      <MainCards />
      <SearchEvent />
      <EventSubmission />
      <Sponsors />
      <Contact />
      <Footer />
      <CalenderFilter />
    </div>
  );
};

export default Home;
