import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/store";
import * as serviceWorker from "./serviceWorker";

//axios config start

axios.defaults.baseURL =
	"https://assistant-qa-server-dot-vera-188811.uc.r.appspot.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
	(request) => {
		return request;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log(response);
		return response;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

//axios config close

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
