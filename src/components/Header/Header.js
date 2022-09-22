import logo from "../../image/header-logo.svg";
import { useNavigate } from "react-router-dom";

function Header({ colorDark, loggedIn, children }) {
  const navigate = useNavigate();
  return (
    <div
      className={
        colorDark ? "header header_type_content" : "header header_type_dialog"
      }
    >
      <img
        src={logo}
        alt="logo"
        className="header__logo"
        onClick={() => navigate("/")}
      />
      {children}
    </div>
  );
}

export default Header;
