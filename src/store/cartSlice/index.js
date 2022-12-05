import { createAsyncThunk } from '@reduxjs/toolkit';
import { DATA_CART, STEP_CART } from 'src/constants/configs';

import { getListProductCarClientApi } from 'src/libs/apis/cart';

const { createSlice } = require('@reduxjs/toolkit');

const stepCart = JSON.parse(localStorage.getItem(STEP_CART));
const dataCart = JSON.parse(localStorage.getItem(DATA_CART));

const initialState = {
  step: stepCart || 0,
  data: dataCart ? dataCart : [],
  totalCart: 0,
  totalPrice: 0,
  pending: false,
  error: {},
};

export const getTotalCart = createAsyncThunk(
  `cart/GET_LIST`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListProductCarClientApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    actionQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data[index].quantity = quantity;
      }
      localStorage.setItem(DATA_CART, state.data);
    },
    actionDelete(state, action) {
      const { id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      state.step = state.step - 1;
      localStorage.setItem(STEP_CART, state.step);
      localStorage.setItem(DATA_CART, state.data);
    },
    actionTotalCart(state, action) {
      state.totalCart = action.payload;
    },
    actionAddToCart: (state, action) => {
      const { data, step } = action.payload;
      const index =
        state.data?.data &&
        state.data?.data.findIndex((item) => item.id === data?.data?.id);
      if (index !== -1 && index) {
        state.data[index].quantity = state.data[index].quantity + step;
      } else {
        state.data.push({ ...data, quantity: step });
      }
      state.step = state.step + step;
      localStorage.setItem(STEP_CART, state.step);
      localStorage.setItem(DATA_CART, JSON.stringify(state.data));
    },
  },

  extraReducers: {
    [getTotalCart.pending]: (state) => {
      state.pending = true;
    },
    [getTotalCart.rejected]: (state, action) => {
      state.pending = false;
    },
    [getTotalCart.fulfilled]: (state, action) => {
      state.totalCart = action.payload.data.cart.item?.length;
      state.pending = false;
    },
  },
});

const { reducer: cartReducer } = cartSlice;
export const {
  actionAddToCart,
  actionDelete,
  actionQuantity,
  actionTotalCart,
} = cartSlice.actions;
export default cartReducer;
