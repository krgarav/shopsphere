import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  currentPageProducts: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const product = state.currentPageProducts[action.payload];
      const existingItem = state.cartItems.find((item, index) => {
        return item.id === product.id;
      });

      if (existingItem) {
        const updatedItem = {
          ...product,
          quantity: existingItem.quantity + 1,
        };
        const indexOfPoduct = state.cartItems.findIndex((item) => {
          return item.id === product.id;
        });
        state.cartItems[indexOfPoduct] = updatedItem;
        state.totalPrice += +existingItem.price * +existingItem.quantity;
      } else {
        const updatedProduct = { ...product, quantity: 1 };

        state.cartItems.push(updatedProduct);
        state.quantity += 1;
        state.totalPrice += updatedProduct.price;
      }
    },
    removeFromCart(state, action) {
      const product = state.cartItems[action.payload];
      const filteredItem = state.cartItems.filter((item, index) => {
        return index !== action.payload;
      });
      state.cartItems = filteredItem;
      state.totalPrice -= +product.price* product.quantity;
    },
    resetCart(state) {
      state.cartItems = [];
      state.quantity = 0;
    },
    addToCurrentPageProduct(state, action) {
      state.currentPageProducts = action.payload;
    },
    incrementCartItem(state, action) {
      const product = state.cartItems[action.payload];
      const updateQuantity = { ...product, quantity: product.quantity + 1 };
      const indexOfPoduct = state.cartItems.findIndex((item) => {
        return item.id === product.id;
      });
      state.cartItems[indexOfPoduct] = updateQuantity;
      state.totalPrice += +product.price;
    },

    decrementCartItem(state, action) {
      const product = state.cartItems[action.payload];
      const updateQuantity = { ...product, quantity: product.quantity - 1 };
      const indexOfPoduct = state.cartItems.findIndex((item) => {
        return item.id === product.id;
      });
      state.cartItems[indexOfPoduct] = updateQuantity;
      state.totalPrice -= +product.price;
    },
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
