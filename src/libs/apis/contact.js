import request from "../bases/request";
const prefix = "/v1";

export const sendContactApi = async data =>
  request({
    url: `${prefix}/contact`,
    method: "POST",
    data, 
  });