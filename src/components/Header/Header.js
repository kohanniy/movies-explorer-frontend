import './Header.css';
import Container from '../Container/Container';
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
  let headerContainerClasses = 'header__container';
  let navigation = null;

  if (isHomePage) headerClasses += ' header_pages_home';

  if (isAuthPage) {
    headerClasses += ' header_padding_auth';
    headerContainerClasses += ' header__container_pages_auth';
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
      <Container
        isAuthPage={isAuthPage}
        additionalClass={headerContainerClasses}
      >
        <Logo className='header__logo' />
        {windowWidth <= 768 && loggedIn
          ? <OpenNavButton
              isHomePage={isHomePage}
              handleOpenNavButtonClick={handleOpenNavButtonClick}
            />
          : null}
        {navigation}
      </Container>
    </header>
  );
}

export default Header;
