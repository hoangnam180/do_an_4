import request from '../bases/request';
const prefix = 'https://provinces.open-api.vn/api';
export const getProvinces = () => {
  return request({
    url: `${prefix}/`,
    method: 'GET',
  });
};
export const getProvinceDetail = (id) => {
  return request({
    url: `${prefix}/p/${id}`,
    method: 'GET',
  });
};
export const getDistricts = async (provinceId) => {
  return request({
    url: `${prefix}/p/${provinceId}?depth=2`,
    method: 'GET',
  });
};
export const getDistrictDetail = async (districtId) => {
  return request({
    url: `${prefix}/d/${districtId}`,
    method: 'GET',
  });
};
export const getWards = async (districtId) => {
  return request({
    url: `${prefix}/d/${districtId}?depth=2`,
    method: 'GET',
  });
};
export const getWardDetail = async (wardId) => {
  return request({
    url: `${prefix}/w/${wardId}`,
    method: 'GET',
  });
};
export const getSearch = async (params) =>
  request({
    url: `${prefix}/d/search/?q=${params}`,
    method: 'GET',
  });
