import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
import logger from 'redux-logger'
import { BrowserRouter } from "react-router-dom"

import './index.css';
import App from './App';

import {default as reducer} from "./reducers"
 
// Logger with default options
const store = createStore(
  reducer,
  applyMiddleware(logger)
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App /> 
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
)