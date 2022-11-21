import { useForm } from 'react-hook-form';
import { loginApi } from 'src/libs/apis/auth';
import { useDispatch } from 'react-redux';
import { actionLoading, actionLogin, actionToast } from 'src/store/authSlice';
import { useNavigate } from 'react-router-dom';

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
      const res = await loginApi(data);
      console.log(res);
      if (res?.errCode === 0) {
        const payload = {
          userInfo: res?.user,
          isAuth: res?.errCode,
        };
        dispatch(actionLogin(payload));
        dispatch(actionLoading({ loading: true }));
        reset();
        dispatch(
          actionToast({ title: 'Login Successfully!', type: 'success' })
        );
        navigation('/');
        dispatch(actionLoading({ loading: false }));
      }
    } catch (err) {
      dispatch(
        actionToast({ title: 'Wrong Password or UserName!', type: 'error' })
      );
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
                  <h2 className="mb-2">Login</h2>
                  <p className="lead">
                    Don’t have an account? <a href="#">Create a free account</a>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="username">Enter username</label>
                    <input
                      {...register('username', { required: true })}
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Enter Username"
                    />
                    {errors.username && (
                      <span className="text-danger">Please type username</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Enter Password</label>
                    <a className="float-right" href="">
                      Forget password?
                    </a>
                    <input
                      {...register('password', { required: true })}
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                    />{' '}
                    {errors.password && (
                      <span className="text-danger">Please type password</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-main mt-3 btn-block">
                    Login
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
