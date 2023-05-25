import request from '../bases/request';
const prefix = '/api';

export const checkoutPublic = async (data) =>
  request({
    url: `${prefix}/don-hang/create/vnpay`,
    method: 'POST',
    data,
  });
export const checkDirection = async (data) =>
  request({
    url: `${prefix}/vnpay/return`,
    method: 'POST',
    data,
  });
export const loginDirection = async (data) =>
  request({
    url: `${prefix}/redirect-google/login`,
    method: 'POST',
    data,
  });
export const checkoutPrivate = async (data) =>
  request({
    url: `${prefix}/auth/don-hang/0`,
    method: 'POST',
    data,
    tokenClient: true,
  });
export const checkoutPrivatevnPay = async (data) =>
  request({
    url: `${prefix}/auth/don-hang/1`,
    method: 'POST',
    data,
    tokenClient: true,
  });
export const historyCheckout = async (params) =>
  request({
    url: `${prefix}/don-hang/lich-su-don-hang`,
    method: 'GET',
    params,
  });
export const historyCheckoutDetail = async (id) =>
  request({
    url: `${prefix}/don-hang/lich-su-mua-hang/detail/${id}`,
    method: 'GET',
  });
export async function historyCheckoutPrivate() {
  return request({
    url: `${prefix}/auth/lich-su-don-hang`,
    method: 'GET',
    tokenClient: true,
  });
}
