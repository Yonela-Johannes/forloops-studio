const routeMiddleware = (isAdmin, navigate) => {
  if (!isAdmin) {
    navigate('/'); // You can customize this route
  }
  return '';
};

export default routeMiddleware;
