import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import routes from 'src/configs/router';
import { changePasswordApi } from 'src/libs/apis/auth';
import { actionToast } from 'src/store/authSlice';

function ResetPassWord() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await changePasswordApi({
        ...data,
        email: id,
      });
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            title: 'Thành công!',
            type: 'success',
          })
        );
        reset();
        navigate(`${routes.login}`);
      } else {
        dispatch(
          actionToast({ title: 'Reset password thất bại!', type: 'error' })
        );
      }
    } catch (err) {
      dispatch(
        actionToast({ title: 'Reset password thất bại!', type: 'error' })
      );
      setLoading(false);
      reset();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signUp-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center">
                  <h3 className="mb-2">Đặt lại mật khẩu</h3>
                  {loading && (
                    <div className="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Đang tải...</span>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Nhập mật khẩu</label>
                    <input
                      {...register('password', {
                        required: 'Email không được để trống',
                        minLength: {
                          value: 5,
                          message: 'Password phải có ít nhất 5 ký tự',
                        },
                      })}
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Nhập password"
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="re_password">Nhập lại mật khẩu</label>
                    <input
                      {...register('re_password', {
                        required: 'confirm password không được để trống',
                        minLength: {
                          value: 5,
                          message: 'Password phải có ít nhất 5 ký tự',
                        },
                        validate: (val) => {
                          if (watch('password') !== val) {
                            return 'confirm password khác với password';
                          }
                        },
                      })}
                      id="confirm"
                      type="password"
                      className="form-control"
                      placeholder="Nhập confirm password"
                    />

                    {errors.confirm?.message && (
                      <span className="text-danger">
                        {errors.re_password?.message}
                      </span>
                    )}
                    {errors.re_password && (
                      <span className="text-danger">
                        {errors.re_password.message}
                      </span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-main mt-3 btn-block">
                    Thay đổi mật khẩu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassWord;
