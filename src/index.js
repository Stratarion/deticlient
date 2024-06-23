import React from "react";
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import moment from "moment";
import ru_RU from "antd/lib/locale/ru_RU";
import {createRoot} from 'react-dom/client';

import { ConfigProvider } from "antd";
import "index.css";
import { reducers } from 'reducers';
import App from "App.jsx";
dayjs.locale('ru')
moment.locale("ru");

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ConfigProvider locale={ru_RU}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);