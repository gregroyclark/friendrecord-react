import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');

  return isAuthenticated ? children : <Navigate to='/Login' />;
};

export default AuthenticatedRoute;
