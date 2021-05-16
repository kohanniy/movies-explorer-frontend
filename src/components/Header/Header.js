import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import Section from '../Section/Section';

const Header = ({ isMainPage, loggedIn }) => {
  let classes = 'header page__header'

  if (isMainPage) classes += ' header_main-page';

  return (
    <header className={classes}>
      <Section
        additionalClass='header__section'
      >
        <Link to="/"><img src={logo} alt="логотип" className="header__logo" /></Link>
        <Navigation
          isMainPage={isMainPage}
          loggedIn={loggedIn}
        />
      </Section>
    </header>
  );
};

export default Header;
