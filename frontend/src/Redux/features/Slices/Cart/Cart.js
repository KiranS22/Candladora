import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllCartItems = createAsyncThunk(
  "cart/fetchAllCartItems",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/cart`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartCount: 0,
    cartTotal: 0.0,
    isLoading: false,
    isError: false,
  },
  reducers: {
    addToCart: (state, action) => {
      let item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.cartCount++;
      state.cartTotal += Number(action.payload.price);
    },
    updateQty: (state, action) => {
      console.log("Update qty action.payload", action.payload.id);
      state.cart = state.cart.map((cartItem) => {
        if (Number(cartItem.id) === Number(action.payload.id)) {
          console.log("inside if");
          return { ...cartItem, quantity: Number(action.payload.value) };
        } else {
          return cartItem;
        }
      });
      //Update Cart Count
      let cartItemsCount = 0;

      state.cart.forEach((element) => {
        cartItemsCount += element.quantity;
      });

      state.cartCount = cartItemsCount;
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((cItem) => {
        if (cItem.id === action.payload) {
          state.cartCount = state.cartCount - cItem.quantity;
        }
        return cItem.id !== action.payload;
        // action.payload is the id recieveed from dispatch
      });

      //set cartCount tp cartCount - quantity
    },
    findCartItemsTotal: (state) => {
      console.log("cart in redux ", state.cart);
      let cartTotal = 0.0;
      //Run a Loop.
      console.log("cart total running");
      state.cart.forEach((element) => {
        cartTotal += Number(element.price) * Number(element.quantity);
      });

      console.log("cart total ", cartTotal);

      state.cartTotal = cartTotal.toFixed(2);
      state.cartTotal = Number(state.cartTotal);
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartCount = 0;
      state.cartTotal = 0.0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartItems.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(fetchAllCartItems.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      let cartCount = 0;
      let cartTotal = 0.0;
      state.cart = action.payload.map(
        ({ user_id, price, product_id, product_qty, ...props }) => {
          cartCount += Number(product_qty);
          cartTotal += Number(price) * Number(product_qty);
          return {
            ...props,
            price: Number(price),
            quantity: Number(product_qty),
          };
        }
      );

      state.cartCount = cartCount;
      state.cartTotal = cartTotal;
    });

    builder.addCase(fetchAllCartItems.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = true;
    });
  },
});

export const {
  addToCart,
  deleteFromCart,
  updateQty,
  findCartItemsTotal,
  clearCart,
} = cartSlice.actions;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectCart = (state) => {
  return state.cart.cart;
};
export const selectCartTotal = (state) => state.cart.cartTotal;
export const selectCartIsError = (state) => state.cart.isError;
export const selectCartIsLoading = (state) => state.cart.isLoading;

export default cartSlice.reducer;
