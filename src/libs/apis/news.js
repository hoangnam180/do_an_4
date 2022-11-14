import request from "../bases/request";
const prefix = "/v1";

export const getNewsListApi = async params =>
  request({
    url: `${prefix}/news`,
    method: "GET",
    params
  });

  export const getNewsDetailApi = async (id, params) =>
  request({
    url: `${prefix}/news/${id}`,
    method: "GET",
    params,
  });