import request from '../bases/request';
const prefix = '/api';
export const getProducts = async (params) =>
  request({
    url: `${prefix}/home/product`,
    method: 'GET',
  });
export const getProductDetail = async (id) =>
  request({
    url: `${prefix}/detail/product/${id}`,
    method: 'GET',
  });

export const getArrival = async (params) =>
  request({
    url: `${prefix}/home/arrival`,
    method: 'GET',
    params,
  });
