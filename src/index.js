import React from "react";
import {Toaster} from "react-hot-toast"
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <App />
    <Toaster/>
  </React.StrictMode>
);
