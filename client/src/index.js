import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

//redux
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./redux/reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
