import logo from '../../../image/header-logo.svg';
import {useNavigate} from 'react-router-dom';

function Header({colorDark, children}) {
  const navigate = useNavigate();
  return (
    <header
      className={
        colorDark ? 'header header_type_content' : 'header header_type_dialog'
      }
    >
      <img
        src={logo}
        alt="logo"
        className="header__logo"
        onClick={() => navigate('/')}
      />
      {children}
    </header>
  );
}

export default Header;
