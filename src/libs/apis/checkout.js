import request from '../bases/request';
const prefix = '/api';

export const checkoutPublic = async (data) =>
  request({
    url: `${prefix}/don-hang/create`,
    method: 'POST',
    data,
  });
