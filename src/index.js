import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {createRoot} from 'react-dom/client';

import "index.css";
import { reducers } from 'reducers';
import App from "App.jsx";

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);