import request from "../bases/request";
const prefix = "/v1";

export const getCountryApi = async () =>
  request({
    url: `${prefix}/country`,
    method: "GET",
    tokenClient: true
  });

export const getStateApi = async params =>
  request({
    url: `${prefix}/state`,
    method: "GET",
    tokenClient: true,
    params
  });

export const getAddresDefaultApi = async () =>
  request({
    url: `${prefix}/delivery-address/me`,
    method: "GET",
    tokenClient: true
  });

export const updateAddressApi = async (data, id) =>
  request({
    url: `${prefix}/delivery-address/${id}`,
    method: "PUT",
    data,
    tokenClient: true
  });
