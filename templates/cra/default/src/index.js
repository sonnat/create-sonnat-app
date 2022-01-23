import App from "./App";
import CssBaseline from "@sonnat/ui/CssBaseline";
import SonnatInitializer from "@sonnat/ui/styles/SonnatInitializer";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

ReactDOM.render(
  <SonnatInitializer theme={theme}>
    <div id="main-wrapper">
      <CssBaseline />
      <App />
    </div>
  </SonnatInitializer>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
