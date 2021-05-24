import './Header.css';
import Section from '../Section/Section';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import OpenNavButton from '../OpenNavButton/OpenNavButton';

const Header = (props) => {
  const {
    isHomePage,
    isAuthPage,
    loggedIn,
    windowWidth,
    applicationLinks,
    handleOpenNavButtonClick,
    handleCloseNavButtonClick,
    navOpened,
  } = props;
  let headerClasses = 'page__header header';
  let headerSectionClasses = 'header__section';
  let navigation = null;

  if (isHomePage) headerClasses += ' header_pages_home';

  if (isAuthPage) {
    headerClasses += ' header_padding_auth';
    headerSectionClasses += ' header__section_pages_auth';
    navigation = null;
  } else {
    headerClasses += ' header_padding_all';
    navigation = <Navigation
                   isHomePage={isHomePage}
                   windowWidth={windowWidth}
                   loggedIn={loggedIn}
                   applicationLinks={applicationLinks}
                   handleCloseNavButtonClick={handleCloseNavButtonClick}
                   navOpened={navOpened}
                 />
  }

  return (
    <header className={headerClasses}>
      <Section
        isAuthPage={isAuthPage}
        additionalClass={headerSectionClasses}
      >
        <Logo className='header__logo' />
        {windowWidth <= 768
          ? <OpenNavButton
              isHomePage={isHomePage}
              handleOpenNavButtonClick={handleOpenNavButtonClick}
            />
          : null}
        {navigation}
      </Section>
    </header>
  );
}

export default Header;
