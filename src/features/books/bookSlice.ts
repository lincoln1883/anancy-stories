import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_API_KEY;

interface Book {
  id: string | number;
  category: string;
  title: string;
  author: string;
}

interface BookState {
  books: Book[];
  singleBook: Book | null;
  loading: boolean;
  error: string | null;
}

type Error = {
  message: string;
};

type Key = string | number;

const initialState: BookState = {
  books: [],
  singleBook: null,
  loading: false,
  error: null,
};

export const getBooks = createAsyncThunk<Book[],void, {rejectValue: string}>(
  'books/getBooks',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books`,
      );
      return response.data;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getBookById = createAsyncThunk<Book, number>(
  'books/getBookById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books/${id}`,
      );
      return response.data;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue(error.message || 'Unable to fetch book');
    }
  },
);

export const addBook = createAsyncThunk<Book, Object>(
  'books/addBook',
  async (data, thunAPI) => {
    console.log('Payload to addBook:', data);
    const item_id = Math.floor(Math.random() * 1000).toString();
    try {
      const response = await axios.post(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books`,{item_id,...data});
      return response.data;
    } catch (error: Error | any) {
      return thunAPI.rejectWithValue(error.message || 'Unable to add book');
    }
  },
);

export const deleteBook = createAsyncThunk<Book, Object | any>(
  'books/deleteBook',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${apiKey}/books/${id}`,
      );
      return response.data.bookId;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getBooks.pending, (state) => {state.loading = true})
    .addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        const bookObj = action.payload;
        const books = Object.keys(bookObj).map((key: Key) => {
          const bookItem = bookObj[key][0];
          return {
            id: Number(key),
            author: bookItem.author,
            title: bookItem.title,
            category: bookItem.category,
          };
        });
        state.books = books;
        state.loading = false;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to fetch books';
      }).addCase(addBook.pending, (state) => {
        state.loading = true;
      }).addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
        state.error = null;
      }).addCase(addBook.rejected, (state,action) => {
        console.error('Error adding book:', action.error.message);
        state.loading = false;
        state.error = 'Unable to add book';
      }).addCase(getBookById.pending, (state) => {
        state.loading = true;
      }).addCase(getBookById.fulfilled, (state, action) => {
        state.singleBook = action.payload;
        state.loading = false;
        state.error = null;
      }).addCase(getBookById.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to fetch book';
      }).addCase(deleteBook.pending, (state) => {
        state.loading = true;
      }).addCase(deleteBook.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      }).addCase(deleteBook.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to delete book';
      });
  },
});

export default bookSlice.reducer;
export const selectBooks = (state: { books: { books: Book[] } }) => state.books.books;
export const selectLoading = (state: { books: { loading: boolean } }) => state.books.loading;
export const selectError = (state: { books: { error: string | null } }) => state.books.error;
