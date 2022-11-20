import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routes from 'src/configs/router';
import LayoutDefault from 'src/layouts/LayoutDefault';

export default function PrivateRoute({ children }) {
  const fakeData = {
    isAuth: 0,
    userInfo: {
      fullName: 'hoangnam',
      age: 20,
    },
  };
  const data = useSelector((state) => state?.authReducer);
  return fakeData.userInfo && Number(fakeData.isAuth) === 0 ? (
    <LayoutDefault>{children}</LayoutDefault>
  ) : (
    <Navigate to={routes.login} replace={true} />
  );
}
