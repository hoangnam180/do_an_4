import request from "../bases/request";
const prefix = "/v1";

export const getDetailsProductApi = async (slug, context) =>
  request({
    url: `${prefix}/product/${slug}`,
    method: "GET",
    context: context
  });

export const getProductsFavoriteApi = async (context, params) =>
  request({
    url: `${prefix}/favourite-product/me/all`,
    method: "GET",
    context: context,
    params
  });

export const getProductListByKeySearch = async params =>
  request({
    url: `${prefix}/product`,
    method: "GET",
    params
  });

export const favoriteProductApi = async data =>
  request({
    url: `${prefix}/favourite-product/like`,
    method: "POST",
    data,
    tokenClient: true
  });

export const getListProductFavoriteApi = async (context, params) =>
  request({
    url: `${prefix}/favourite-product/me`,
    method: "GET",
    params,
    context: context
  });

export const getListProductOtherApi = async params =>
  request({
    url: `${prefix}/product`,
    method: "GET",
    params
  });

export const getListMyOrderApi = async (context, params) =>
  request({
    url: `${prefix}/order/me`,
    method: "GET",
    params,
    context: context
  });

export const getListCommentApi = async params =>
  request({
    url: `${prefix}/comment`,
    method: "GET",
    params
  });

export const getListCommentClinetApi = async params =>
  request({
    url: `${prefix}/comment`,
    method: "GET",
    params,
    tokenClient: true
  });

export const commentApi = async data =>
  request({
    url: `${prefix}/comment`,
    method: "POST",
    data,
    tokenClient: true
  });
