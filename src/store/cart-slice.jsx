import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  totalPrice:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems = [...state.cartItems, action.payload];
      state.quantity += 1;
    },
    removeFromCart(state, action) {
      // const element = state.cartItems.filter(
      //   (item) => item.id !== action.payload
      // );
      // console.log(element);
      state.cartItems = action.payload;
    },
    // updateCart(state)
    resetCart(state){
        state.cartItems=[];
        state.quantity=0;
    },
   
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
