import request from '../bases/request';
const prefix = '/api';
export const loginApi = async (data) =>
  request({
    url: `https://02d7-2402-800-629c-666c-1931-a74-4dcf-c12b.ap.ngrok.io/api/auth/login`,
    method: 'POST',
    data,
  });

export const signUpApi = async (data) =>
  request({
    url: `${prefix}/auth/register`,
    method: 'POST',
    data,
  });

export const updateProfileApi = async (data) =>
  request({
    url: '/core/user/me',
    method: 'PUT',
    data,
    tokenClient: true,
  });

export const getMeApi = async () =>
  request({
    url: '/core/user/me',
    method: 'GET',
    tokenClient: true,
  });

export const changePasswordApi = async (data) =>
  request({
    url: '/core/auth/change-password',
    method: 'POST',
    data,
    tokenClient: true,
  });

export const updateInfoApi = async (data) => {
  request({
    url: '/core/user/me',
    method: 'PUT',
    data,
    tokenClient: true,
  });
};

export const sendEmailApi = async (data) =>
  request({
    url: '/core/auth/request-otp',
    method: 'POST',
    data,
  });

export const confirmOptApi = async (data) =>
  request({
    url: '/core/auth/check-otp',
    method: 'POST',
    data,
  });
