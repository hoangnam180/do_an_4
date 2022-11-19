import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LayoutDefault from 'src/layouts/LayoutDefault';

export default function PrivateRoute({ children }) {
  const data = useSelector((state) => state?.authReducer);
  return data.userInfo && Number(data.isAuth) === 0 ? (
    <LayoutDefault>{children}</LayoutDefault>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
