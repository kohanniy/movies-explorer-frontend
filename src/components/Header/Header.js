import { Link } from 'react-router-dom';
import './Header.css';
import Section from '../Section/Section';
import logo from '../../images/logo.svg';

const Header = ({ isHomePage, isAuthPage }) => {
  let headerClasses = 'header page_header';
  let headerSectionClasses = 'header__section'

  if (isHomePage) headerClasses += ' header_pages_home';

  if (isAuthPage) {
    headerClasses += ' header_padding_auth';
    headerSectionClasses += ' header__section_pages_auth'
  } else {
    headerClasses += ' header_padding_all';
  }

  return (
    <header className={headerClasses}>
      <Section
        isAuthPage={isAuthPage}
        additionalClass={headerSectionClasses}
      >
        <Link to='/'>
          <img src={logo} alt='логотип' className='header__logo' />
        </Link>
      </Section>
    </header>
  );
}

export default Header;
