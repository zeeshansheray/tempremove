import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/global.scss";

import Homepage from "./pages/HomePage";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Homepage />
  </React.StrictMode>
);