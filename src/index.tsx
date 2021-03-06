import { FocusStyleManager } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./web/index";

FocusStyleManager.onlyShowFocusOnTabs();

const webRoot = document.getElementById("r2c-web-root") as HTMLElement;

if (webRoot != null) {
  ReactDOM.render(<App />, webRoot);
}
