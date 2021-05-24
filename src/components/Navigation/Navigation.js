import './Navigation.css';
import UserNavigation from '../UserNavigation/UserNavigation';
import ApplicationNavigation from '../ApplicationNavigation/ApplicationNavigation';

const Navigation = (props) => {
  const {
    loggedIn,
    isHomePage,
    windowWidth,
    applicationLinks,
    handleCloseNavButtonClick,
    navOpened
  } = props;
  return (
    loggedIn
      ? <ApplicationNavigation
          isHomePage={isHomePage}
          windowWidth={windowWidth}
          applicationLinks={applicationLinks}
          handleCloseNavButtonClick={handleCloseNavButtonClick}
          navOpened={navOpened}
        />
      : <UserNavigation />
  );
}

export default Navigation;
