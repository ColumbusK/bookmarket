import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";
import taskService from "../tasks/taskService";


const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreateSuccess: false,
  message: ''
};



export const bookSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccess: (state) => {
      state.isCreateSuccess = false;
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getBooksByTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooksByTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBooksByTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 添加 fetchAllTE 的 extraReducers
      .addCase(fetchAllTE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(fetchAllTE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});


export const getBooksByTag = createAsyncThunk(
  'books/getBooksByTag',
  async (tag, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(tag);
      return await bookService.getAllBooksByTag(tag, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// 异步获取所有经济学人杂志
export const fetchAllTE = createAsyncThunk(
  'books/fetchAllTE',
  async (_, thunkAPI) => {
    try {
      const response = await bookService.getAllTE();
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const { reset, resetSuccess } = bookSlice.actions;
export default bookSlice.reducer;

