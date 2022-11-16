import request from "../bases/request";
const prefix = "/v1";

export const addToCartApi = async data =>
  request({
    url: `${prefix}/cart`,
    method: "POST",
    data,
    tokenClient: true
  });

export const getListProductCartApi = async (context, params) =>
  request({
    url: `${prefix}/cart/me`,
    method: "GET",
    params,
    context: context
  });

export const getListProductCarClientApi = async () =>
  request({
    url: `${prefix}/cart/me`,
    method: "GET",
    tokenClient: true
  });

export const updateProductInCartApi = async data =>
  request({
    url: `${prefix}/cart/update-product`,
    method: "PUT",
    data,
    tokenClient: true
  });

export const createOrderPendingApi = async data =>
  request({
    url: `${prefix}/delivery-address`,
    method: "POST",
    data,
    tokenClient: true
  });

export const getListProductCartByOrderIdApi = async (context, id) =>
  request({
    url: `${prefix}/order/${id}`,
    method: "GET",
    context: context
  });

export const createInfoDeliveryApi = async data =>
  request({
    url: `${prefix}/delivery-address`,
    method: "POST",
    data,
    tokenClient: true
  });

export const deleteProductInCartApi = async data =>
  request({
    url: `${prefix}/cart/update-product`,
    method: "PUT",
    data,
    tokenClient: true
  });

export const orderApi = async data =>
  request({
    url: `${prefix}/order`,
    method: "POST",
    data,
    tokenClient: true
  });

export const orderUpdateApi = async (data, id) =>
  request({
    url: `${prefix}/order/${id}`,
    method: "PUT",
    data,
    tokenClient: true
  });