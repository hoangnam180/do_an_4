import request from "../bases/request";

export const loginApi = async data =>
  request({
    url: "/core/auth/sign-in",
    method: "POST",
    data
  });

export const signUpApi = async data =>
  request({
    url: "/core/auth/sign-up",
    method: "POST",
    data
  });

export const updateProfileApi = async data =>
  request({
    url: "/core/user/me",
    method: "PUT",
    data,
    tokenClient: true
  });

export const getMeApi = async () =>
  request({
    url: "/core/user/me",
    method: "GET",
    tokenClient: true
  });

export const changePasswordApi = async data =>
  request({
    url: "/core/auth/change-password",
    method: "POST",
    data,
    tokenClient: true
  });

export const updateInfoApi = async data => {
  request({
    url: "/core/user/me",
    method: "PUT",
    data,
    tokenClient: true
  });
};

export const sendEmailApi = async data =>
  request({
    url: "/core/auth/request-otp",
    method: "POST",
    data
  });

export const confirmOptApi = async data =>
  request({
    url: "/core/auth/check-otp",
    method: "POST",
    data
  });
