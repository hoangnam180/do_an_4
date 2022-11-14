import request from "../bases/request";
const prefix = "/v1";

export const getProductByTypeCategoryApi = async (params, context) =>
  request({
    url: `${prefix}/product`,
    method: "GET",
    params,
    context: context
  });
