import request from "../bases/request";
const prefix = "/v1";

export const getImgsBannerApi = async params =>
  request({
    url: `${prefix}/slide`,
    method: "GET",
    params
  });

export const getImgsCategoryApi = async params =>
  request({
    url: `${prefix}/category`,
    method: "GET",
    params
  });

export const getListFeedbackApi = async params =>
  request({
    url: `${prefix}/comment`,
    method: "GET",
    params
  });

export const getListHighViewApi = async params =>
  request({
    url: `${prefix}/product-high-view`,
    method: "GET",
    params
  });
