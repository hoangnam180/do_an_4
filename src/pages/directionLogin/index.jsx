import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { loginDirection } from "src/libs/apis/checkout";
import { actionLogin, actionToast } from "src/store/authSlice";

const DirectionLogin = (props) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  useEffect(() => {
    const checkoutDirection = async () => {
        const res = await loginDirection({
          email : obj.email,
          name: obj.name,
        });
          if (res?.status === 'success') {
            const payload = {
              userInfo: res?.user,
              isAuth: true,
              token: res?.token,
            };
            dispatch(actionLogin(payload));
            dispatch(
              actionToast({ title: 'Đăng nhập thành công', type: 'success' })
            );
            navigation('/');
      }
    };
    checkoutDirection();
  }, []);
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="spinner-border text-primary" role="stat``us">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default DirectionLogin;
