import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DisplayProvider } from "./Context";

ReactDOM.render(
	<React.StrictMode>
		<DisplayProvider>
			<App />
		</DisplayProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
