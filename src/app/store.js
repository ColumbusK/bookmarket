import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice';
import bookReducer from '../features/books/bookSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    tasks: taskReducer,
    books: bookReducer,
  },
});
