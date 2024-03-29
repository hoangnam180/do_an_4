import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';
import { signUpApi } from 'src/libs/apis/auth';
import { actionLoading, actionToast } from 'src/store/authSlice';

function SignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      dispatch(actionLoading({ loading: true }));
      const res = await signUpApi(data);
      dispatch(actionLoading({ loading: false }));
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            title: 'Please go to mail to authenticate !',
            type: 'success',
          })
        );
      } else {
        for (let index = 0; index < res.errors.length; index++) {
          const element = res.errors[index][0];
          dispatch(actionToast({ title: element, type: 'error' }));
        }
      }
      reset();
    } catch (err) {
      dispatch(actionToast({ title: 'Đăng ký thất bại!', type: 'error' }));
      dispatch(actionLoading({ loading: false }));
      reset();
    }
  };
  return (
    <div className="signUp-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h2 className="mb-2">Đăng ký</h2>
                  <p className="lead">
                    Bạn đã có tài khoản? <Link to="/login"> Đăng nhập</Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="email">Nhập Email</label>
                    <input
                      {...register('email', {
                        required: 'Email không được để trống',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email không đúng định dạng',
                        },
                      })}
                      id="email"
                      type="text"
                      className="form-control"
                      placeholder="Nhập Email"
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="username">Nhập tên đăng nhập</label>
                    <Link className="float-right" to={routes.forgot}></Link>
                    <input
                      {...register('username', { required: true })}
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Nhập username"
                    />
                    {errors.username && (
                      <span className="text-danger">
                        Username không được để trống
                      </span>
                    )}
                  </div>
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
                    Đăng ký
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
export default SignUp;
