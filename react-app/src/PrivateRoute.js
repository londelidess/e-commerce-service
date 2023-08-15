import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ roles, ...props }) {
  const user = useSelector(state => state.session.user);

  if (!user || !roles.includes(user.role)) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}

export default PrivateRoute;
