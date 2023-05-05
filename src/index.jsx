import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/800.css";
import "@fontsource/public-sans";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/public-sans/800.css";
import "./index.css";
import App from "./app/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
