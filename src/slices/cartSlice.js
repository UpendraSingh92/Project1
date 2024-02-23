import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index > -1) {
        // cart mai course already exist
        toast.error("course already exist in cart");
        return;
      }

      // if not exist then push
      state.cart.push(course);
      state.totalItems++;
      state.totalPrice += course.price;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

      toast.success("course added in cart sucessfully");
    },

    // remove to cart
    removeCart: (state, action) => {
      const courseID = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseID);

      if (index > -1) {
        // cart mai course exist so delete this
    
        state.totalItems--;
        state.totalPrice -= state.cart[index].price;
        state.cart.splice(index);

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

        toast.success("course from cart sucessfully");
      }
    },

    // reset to cart
    resetCart: (state)=>{
        state.cart = []
        state.totalItems = 0
        state.totalPrice = 0

        // update in locol Storage
        localStorage.removeItem("cart");
        localStorage.removeItem("totalItems");
        localStorage.removeItem("totalPrice");
    }
  },
});

export const { addToCart,removeCart,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
