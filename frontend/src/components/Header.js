import logo from '../images/logo/header__logo.svg';
import Menu from './Menu';

const Header = ({ onExit, userEmail }) => (
  <header className="header page__header">
    <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
    <Menu onExit={onExit} userEmail={userEmail} />
  </header>
);

export default Header;
