import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cartItems.find((item) => {
        return item[0].id === action.payload[0].id;
      });

      if (existingItem) {
        state.quantity += 1;
        state.totalPrice += action.payload[0].price;
      } else {
        console.log("else trigerred");
        state.cartItems.push(action.payload);
        state.quantity += 1;
        state.totalPrice += action.payload[0].price;
      }
    },
    removeFromCart(state, action) {
      state.cartItems = action.payload;
    },
    resetCart(state) {
      state.cartItems = [];
      state.quantity = 0;
    },
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
