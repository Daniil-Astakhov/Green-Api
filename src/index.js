import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app/App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "./styles/main.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
