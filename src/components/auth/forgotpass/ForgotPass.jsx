import { useForm } from 'react-hook-form';
import { sendEmailApi } from 'src/libs/apis/auth';
import { useDispatch } from 'react-redux';
import { actionToast } from 'src/store/authSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'src/configs/router';
function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await sendEmailApi(data);
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            title: 'OTP sẽ được gửi đến email của bạn !',
            type: 'success',
          })
        );
        reset();
        navigate(`${routes.confirmOpt}`);
      } else {
        for (let index = 0; index < res.errors.length; index++) {
          const element = res.errors[index][0];
          dispatch(actionToast({ title: element, type: 'error' }));
        }
      }
    } catch (err) {
      dispatch(actionToast({ title: 'Gửi OTP Lỗi !', type: 'error' }));
      setLoading(false);
      reset();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="forgot-password-container">
        <div className="account section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="login-form border p-5">
                  <div className="text-center heading">
                    <h3 className="mb-2 h2">Khôi phục mật khẩu</h3>
                    <p className="lead">
                      Vui lòng nhập địa chỉ email cho tài khoản của bạn. Một mã
                      xác minh sẽ được gửi cho bạn. Một khi bạn có đã nhận được
                      mã xác minh, bạn sẽ có thể chọn một mật khẩu mới cho tài
                      khoản của bạn.
                    </p>
                  </div>
                  {loading && (
                    <div className="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Đang tải...</span>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-4">
                      <label htmlFor="email">Nhập địa chỉ Email</label>
                      <input
                        {...register('email', {
                          required: 'Email không được để trống',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không đúng định dạng',
                          },
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Nhập địa chỉ Email"
                        name="email"
                      />
                      {errors.email && (
                        <span className="text-danger">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-main mt-3 btn-block"
                    >
                      Yêu cầu OTP
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
