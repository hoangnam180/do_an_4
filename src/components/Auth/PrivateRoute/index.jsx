import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routes from 'src/configs/router';
import LayoutDefault from 'src/layouts/LayoutDefault';

export default function PrivateRoute({ children }) {
  const data = useSelector((state) => state?.authReducer);
  console.log(data?.isAuth);
  return data.userInfo && data.isAuth === true && data?.redirect === '/' ? (
    <LayoutDefault>{children}</LayoutDefault>
  ) : (
    <Navigate to={routes.login} replace={true} />
  );
}
