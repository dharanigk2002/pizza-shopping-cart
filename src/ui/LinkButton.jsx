import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = "mb-5 text-blue-600 hover:text-blue-800 hover:underline";
  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
