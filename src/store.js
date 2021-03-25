import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboardReducer';

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
