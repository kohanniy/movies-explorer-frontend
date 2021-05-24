import './ApplicationNavigation.css';
import Menu from '../Menu/Menu';
import ProfileLink from '../ProfileLink/ProfileLink';
import CloseButton from '../CloseButton/CloseButton';

const ApplicationNavigation = (props) => {
  const {
    isHomePage,
    windowWidth,
    applicationLinks,
    handleCloseNavButtonClick,
    navOpened,
  } = props;
  const classes = {
    ul: 'app-nav__list',
    li: 'app-nav__item',
    link: 'app-nav__link',
    linkActive: 'app-nav__link_active'
  };
  let classesNav = 'app-nav';
  const closeButtonClasses = 'app-nav__close-button';

  if (isHomePage && windowWidth > 768) classesNav += ' app-nav_is-home';

  if (navOpened) classesNav += ' app-nav__opened';

  return (
    <nav className={classesNav}>
      <div className='app-nav__wrapper'>
        { windowWidth <= 768
          ? <CloseButton
              handleCloseNavButtonClick={handleCloseNavButtonClick}
              classes={closeButtonClasses}
            />
            : null
          }
        <Menu
          classes={classes}
          links={applicationLinks}
          handleCloseNavButtonClick={handleCloseNavButtonClick}
        />
        <ProfileLink
          parrentClass='app-nav__profile-link'
          handleCloseNavButtonClick={handleCloseNavButtonClick}
        />
      </div>
    </nav>
  );
}

export default ApplicationNavigation;
