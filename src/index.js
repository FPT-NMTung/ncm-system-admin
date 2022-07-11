import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider disableBaseline={true}>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
