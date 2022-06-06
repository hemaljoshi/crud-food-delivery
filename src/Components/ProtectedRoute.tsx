import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

interface props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: props) => {
  const ctx = useUserAuth();
  const token = ctx?.token;
  if (token === undefined) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;
