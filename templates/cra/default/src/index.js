import App from "./App";
import CssBaseline from "@sonnat/ui/CssBaseline";
import SonnatInitializer from "@sonnat/ui/styles/SonnatInitializer";
import ReactDOM from "react-dom";
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
