import { router } from 'next/router';
import { createAsyncThunk } from '@reduxjs/toolkit';

import webStorage from 'src/utils/webStorage';

import { getListProductCarClientApi } from 'src/libs/apis/cart';

import { USER_INFO, IS_AUTH, ORDER_PENDING } from '../../constants/configs';

const { createSlice } = require('@reduxjs/toolkit');

const orderPendingId = webStorage.get(ORDER_PENDING);

const initialState = {
  step: 0,
  orderPendingId: orderPendingId || null,
  totalCart: 0,
  pedding: false,
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
    actionStepCart: (state, action) => {
      state.step = action.payload.step;
    },
    actionUpdateOrderPendingId: (state, action) => {
      state.orderPendingId = action.payload.orderPendingId;
    },
  },

  extraReducers: {
    [getTotalCart.pending]: (state) => {
      state.pedding = true;
    },
    [getTotalCart.rejected]: (state, action) => {
      state.pedding = false;
    },
    [getTotalCart.fulfilled]: (state, action) => {
      state.totalCart = action.payload.data.cart.item?.length;
      state.pedding = false;
    },
  },
});

const { reducer: cartReducer } = cartSlice;
export const { actionStepCart, actionUpdateOrderPendingId } = cartSlice.actions;
export default cartReducer;
