import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Pages/Home";
import EventPage from "./Pages/EventPage";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/event/:eventId", element: <EventPage /> },
  ]);

  return routes;
}

export default App;
