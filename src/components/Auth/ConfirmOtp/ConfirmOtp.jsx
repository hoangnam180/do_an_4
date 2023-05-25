import { useForm } from 'react-hook-form';
import { confirmOptApi } from 'src/libs/apis/auth';
import { useDispatch } from 'react-redux';
import { actionToast } from 'src/store/authSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function ConfirmOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const res = await confirmOptApi(data);
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            title: 'Chính xác!',
            type: 'success',
          })
        );
        reset();
        navigate(`/reset-password/${res?.email || ''}`);
      } else {
        dispatch(
          actionToast({ title: 'Mã OTP không chính xác !', type: 'error' })
        );
      }
    } catch (err) {
      dispatch(actionToast({ title: 'Đã xảy ra lỗi !', type: 'error' }));
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
                    <h3 className="mb-2 h2">Xác nhận OTP</h3>
                  </div>
                  {loading && (
                    <div className="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-4">
                      <label htmlFor="otp">Enter Email Address</label>
                      <input
                        {...register('otp', { required: true })}
                        type="text"
                        className="form-control"
                        placeholder="Enter OTP"
                        name="otp"
                      />
                      {errors.otp && (
                        <span className="text-danger">
                          OTP không được để trống
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-main mt-3 btn-block"
                    >
                      Confirm OTP
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
export default ConfirmOtp;
