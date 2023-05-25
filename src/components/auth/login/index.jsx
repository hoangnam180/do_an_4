import { useForm } from 'react-hook-form';
import { loginApi, loginWithGoogle } from 'src/libs/apis/auth';
import { useDispatch } from 'react-redux';
import { actionLoading, actionLogin, actionToast } from 'src/store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import routes from 'src/configs/router';

function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      dispatch(actionLoading({ loading: true }));
      const res = await loginApi(data);
      dispatch(actionLoading({ loading: false }));
      if (res?.status === 'success') {
        const payload = {
          userInfo: res?.user,
          isAuth: true,
          token: res?.access_token,
        };
        dispatch(actionLogin(payload));
        dispatch(
          actionToast({ title: 'Đăng nhập thành công', type: 'success' })
        );
        navigation('/');
        reset();
      } else {
        if (res?.message) {
          dispatch(actionToast({ title: res?.message, type: 'error' }));
        } else {
          dispatch(
            actionToast({
              title: 'UserName hoặc mật khẩu không đúng !',
              type: 'error',
            })
          );
        }
      }
    } catch (err) {
      dispatch(
        actionToast({
          title: 'UserName hoặc mật khẩu không đúng !',
          type: 'error',
        })
      );
      dispatch(actionLoading({ loading: false }));
    }
  };

  const onLoginWithGoogle = async (event) => {
    event.preventDefault();
    const res = await loginWithGoogle();
    if (res?.status === 'success') {
      window.location.href = res?.url;
    } else {
      dispatch(actionToast({ title: 'Failed!', type: 'error' }));
    }
  };
  return (
    <div className="login-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h2 className="mb-2">Đăng nhập</h2>
                  <p className="lead">
                    Bạn chưa có tài khoản?{' '}
                    <Link to={routes.signup}>Đăng ký ngay</Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="username">Nhập UserName</label>
                    <input
                      tabIndex={1}
                      {...register('username', { required: true })}
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Nhập Username"
                    />
                    {errors.username && (
                      <span className="text-danger">
                        Username không được để trống
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Nhập mật khẩu</label>
                    <Link className="float-right" to={routes.forgot}>
                      Quên mật khẩu?
                    </Link>
                    <input
                      tabIndex={2}
                      {...register('password', { required: true })}
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Nhập Password"
                    />{' '}
                    {errors.password && (
                      <span className="text-danger">
                        password không được để trống
                      </span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-main mt-3 btn-block">
                    Đăng nhập
                  </button>
                  <button
                    onClick={onLoginWithGoogle}
                    className="w-100 text-primary border-0 bg-transparent mt-3"
                    to={routes.forgot}
                  >
                    Đăng nhập bằng google
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
export default Login;
