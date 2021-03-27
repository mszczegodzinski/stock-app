import dashboardReducer from './reducers/dashboardReducer';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  dashboardReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)

export default store;