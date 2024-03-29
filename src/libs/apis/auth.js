import request from '../bases/request';
const prefix = '/api';
export const loginApi = async (data) =>
  request({
    url: `${prefix}/auth/login`,
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
    url: `${prefix}/auth/update-profile`,
    method: 'PUT',
    data,
    tokenClient: true,
  });

export const getMeApi = async () =>
  request({
    url: `${prefix}/auth/me`,
    method: 'GET',
    tokenClient: true,
  });

export const changePasswordApi = async (data) =>
  request({
    url: `${prefix}/reset-password`,
    method: 'POST',
    data,
    tokenClient: true,
  });

export const loginWithGoogle = async (data) => {
  return request({
    url: `${prefix}/google/login`,
    method: 'GET',
    data,
    tokenClient: true,
  });
};

export const sendEmailApi = async (data) =>
  request({
    url: `${prefix}/forget-password`,
    method: 'POST',
    data,
  });

export const confirmOptApi = async (data) =>
  request({
    url: `${prefix}/confirm`,
    method: 'POST',
    data,
  });
