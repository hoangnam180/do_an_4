import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routes from 'src/configs/router';
import { updateProfileApi } from 'src/libs/apis/auth';
import {
  getDistrictDetail,
  getDistricts,
  getProvinceDetail,
  getProvinces,
  getWardDetail,
  getWards,
} from 'src/libs/apis/location';
import { actionToast, actionUpdateMe } from 'src/store/authSlice';

const EditProfile = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [location, setLocation] = useState({});
  const { userInfo } = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const dataResult = {
      ho_ten: data.full_name,
      dia_chi: `${location.province} - ${location.district} - ${location.ward} - ${data?.apartment}`,
      sdt: data?.phone,
    };
    const res = await updateProfileApi(dataResult);
    if (res.status === 'success') {
      const payload = {
        userInfo: {
          ...res?.data,
        },
      };
      dispatch(actionUpdateMe(payload));
      dispatch(
        actionToast({
          title: 'Cập nhật thông tin thành công!',
          type: 'success',
        })
      );
      reset();
      navigate(`${routes.profile}`);
    }
  };
  const handleGetDistricts = async (e) => {
    const provinceId = e;
    const res = await getProvinceDetail(provinceId);
    if (res?.name) {
      setLocation({
        ...location,
        province: res.name,
      });
    }
    const districts = await getDistricts(provinceId);
    setDistricts(districts.districts);
  };

  const handleGetWards = async (e) => {
    const districtId = e;
    const res = await getDistrictDetail(districtId);
    if (res?.name) {
      setLocation({
        ...location,
        district: res.name,
      });
    }
    const wards = await getWards(districtId);
    setWards(wards.wards);
  };

  const handleGetValueResult = async (id) => {
    const res = await getWardDetail(id);
    if (res?.name) {
      setLocation({
        ...location,
        ward: res.name,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchData();
  }, []);
  return (
    <div className="edit-profile">
      <div className="checkout-container">
        <div className="page-wrapper p-0">
          <div className="checkout shopping">
            <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 pr-2">
                    <div className="billing-details mt-5">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="full_name">Họ và tên</label>
                            <input
                              type="text"
                              className="form-control"
                              id="full_name"
                              placeholder="Họ và tên"
                              {...register('full_name', {
                                required: true,
                              })}
                              defaultValue={userInfo?.fullname || ''}
                            />
                          </div>
                        </div>
                        {errors.full_name && (
                          <p
                            style={{ marginLeft: '18px' }}
                            className="text-danger"
                          >
                            Vui lòng nhập họ tên
                          </p>
                        )}
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="province">Tỉnh</label>
                            <select
                              id="province"
                              className="form-control"
                              {...register('province', {
                                required: true,
                                onChange: (e) =>
                                  handleGetDistricts(e.target.value),
                              })}
                            >
                              <option value="">chọn tỉnh</option>
                              {provinces?.map((province, index) => (
                                <option key={index} value={province?.code}>
                                  {province?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors.province && (
                          <p
                            style={{ marginLeft: '18px' }}
                            className="text-danger"
                          >
                            Vui lòng chọn Tỉnh/Thành phố
                          </p>
                        )}
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="districts">Quận</label>
                            <select
                              id="districts"
                              className="form-control"
                              {...register('districts', {
                                required: true,
                                onChange: (e) => handleGetWards(e.target.value),
                              })}
                            >
                              <option value="">Chọn quận</option>
                              {districts?.map((province, index) => (
                                <option key={index} value={province?.code}>
                                  {province?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors.districts && (
                          <p
                            style={{ marginLeft: '18px' }}
                            className="text-danger"
                          >
                            Vui lòng chọn Quận/Huyện
                          </p>
                        )}
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="wards">Phường</label>
                            <select
                              id="wards"
                              className="form-control"
                              {...register('wards', {
                                required: true,
                                onChange: (e) =>
                                  handleGetValueResult(e.target.value),
                              })}
                            >
                              <option value="">Chọn phường</option>
                              {wards?.map((province, index) => (
                                <option key={index} value={province?.code}>
                                  {province?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {errors.wards && (
                          <p
                            style={{ marginLeft: '18px' }}
                            className="text-danger"
                          >
                            Vui lòng chọn Phường/Xã
                          </p>
                        )}
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="first_name">
                              Căn hộ, dãy phòng, đơn vị, v.v. (tùy chọn) (tùy
                              chọn)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="apartment"
                              placeholder="Nhập số nhà, tên đường"
                              {...register('apartment', {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                        {errors.apartment && (
                          <p
                            style={{ marginLeft: '18px' }}
                            className="text-danger"
                          >
                            Vui lòng nhập số nhà, tên đường
                          </p>
                        )}

                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="first_name">Số điện thoại </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="Your phone number"
                              {...register('phone', {
                                required: 'Vui lòng nhập số điện thoại',
                                minLength: {
                                  value: 10,
                                  message: 'Số điện thoại phải đúng 10 số',
                                },
                                maxLength: {
                                  value: 10,
                                  message: 'Số điện thoại phải đúng 10 số',
                                },
                              })}
                              defaultValue={userInfo?.sdt || ''}
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <span className="text-danger">
                            {errors.phone.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container d-flex justify-content-end">
                <button type="submit" className="btn btn-main btn-small">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
