import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children }) => {
  const location = useLocation();
  const {_id, email } = useSelector((state) => state.auth);
  if (!_id || !email) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;
