import webStorage from 'src/utils/webStorage';
import { USER_INFO, IS_AUTH } from '../../constants/configs';
import { Navigate } from 'react-router-dom';
const { createSlice } = require('@reduxjs/toolkit');

const isAuthFromStorage = webStorage.get(IS_AUTH);
const userInfoFromStorage = webStorage.get(USER_INFO);
const initialState = {
  isAuth: isAuthFromStorage,
  isHandle: null,
  redirect: '/',
  userInfo: userInfoFromStorage,
  error: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    actionAuthentication: (state, action) => {
      state.isHandle = action.payload?.isHandle;
      state.redirect = action.payload?.redirect;
    },

    actionLogin: (state, action) => {
      state.isAuth = action.payload?.isAuth;
      state.userInfo = action.payload?.userInfo;
      webStorage.set(IS_AUTH, action.payload?.isAuth);
      webStorage.setToken(action.payload?.token);
      webStorage.set(USER_INFO, action.payload?.userInfo);
    },

    actionLogout: (state) => {
      state.isAuth = false;
      state.userInfo = {};
      state.isHandle = null;
      state.redirect = '/';
      state.error = {};
      webStorage.removeAll();
      <Navigate to="/" replace={true} />;
    },
  },

  extraReducers: {},
});

const { reducer: authReducer } = authSlice;
export const { actionAuthentication, actionLogin, actionLogout } =
  authSlice.actions;
export default authReducer;
