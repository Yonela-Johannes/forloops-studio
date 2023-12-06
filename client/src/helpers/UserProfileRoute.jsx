import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import User from '../Dashboard/User';

const UserProfileRoute = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const { _id, email } = useSelector((state) => state.auth);

  if (!_id || !email) {
    return children;
  }
  if (_id === id) {
    return <User />
  } else if (_id !== id) {
    return <Navigate to={`/user/${_id}`} state={{ from: location }} ></Navigate>
  }

  return <Navigate to={`/`} state={{ from: location }} replace></Navigate>;
};

export default UserProfileRoute;
