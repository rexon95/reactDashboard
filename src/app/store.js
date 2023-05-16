import { configureStore } from '@reduxjs/toolkit';
import siginReducer from '../features/signin/siginSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice'


export const store = configureStore({
  reducer: {
    auth: siginReducer,
    dashboard:dashboardReducer
  },
});
