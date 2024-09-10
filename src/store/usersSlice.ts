import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the User type
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
};

// Async thunk for fetching users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Create the users slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<Partial<User>>) => {
      const { name, username, email, phone } = action.payload;
      state.filteredUsers = state.users.filter(user =>
        (name ? user.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (username ? user.username.toLowerCase().includes(username.toLowerCase()) : true) &&
        (email ? user.email.toLowerCase().includes(email.toLowerCase()) : true) &&
        (phone ? user.phone.includes(phone) : true)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
      state.loading = false;
    });
  }
});

export const { filterUsers } = usersSlice.actions;
export default usersSlice.reducer;
