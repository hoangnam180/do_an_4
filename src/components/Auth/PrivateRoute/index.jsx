import { Navigate } from 'react-router-dom';
import LayoutDefault from 'src/layouts/LayoutDefault';

export default function PrivateRoute({ children }) {
  const auth = { user: false };
  return auth.user ? (
    <LayoutDefault>{children}</LayoutDefault>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
