import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './slices/colors/colorSlice';
import taskReducer from './slices/tasks/taskSlice';

export default configureStore({
  reducer: {
    color: colorReducer,
    products: taskReducer
  },
});