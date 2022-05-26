import { useParams, useLocation, useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const param = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    return <Component location={location} param={param} navigate={navigate} {...props} />;
  };

  return Wrapper;
};
