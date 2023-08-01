import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orders`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
const initialState = {
  orders: [],
  filteredOrders: [],
  isLoading: false,
  isError: false,
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    filterOrders: (state, action) => {
      state.filteredOrders = state.orders.filter((order) =>
        order.placed_at.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOrders.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
      state.isError = false;
      state.isLoading = false;
    });

    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = true;
    });
  },
});

export const {} = orders.actions;
export const selectFilteredOrders = (state) => state.orders.filterOrders;

export const selectAllOrders = (state) => state.orders.orders;
export default orders.reducer;
export const selectOrdersIsError = (state) => state.orders.isError;
export const selectOrdersIsLoading = (state) => state.orders.isLoading;
