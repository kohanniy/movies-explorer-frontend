import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import LoginPage from '../Pages/LoginPage';
import MainPage from '../Pages/MainPage';
import MoviesPage from '../Pages/MoviesPage';
import ProfilePage from '../Pages/ProfilePage';
import RegisterPage from '../Pages/RegisterPage';
import SavedMoviesPage from '../Pages/SavedMoviesPage';
import useWindowWidth from '../../hooks/useWindowWidth';
import { moviesLinks, homePageLink } from '../../utils/constants';
import NotFoundPage from '../Pages/NotFoundPage';

function App() {
  const [ isHomePage, setIsHomePage ] = React.useState();
  const [ isAuthPage, setIsAuthPage ] = React.useState();
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ applicationLinks, setApplicationLinks ] = React.useState(moviesLinks);
  const [ navOpened, setNavOpened ] = React.useState(false);

  const windowWidth = useWindowWidth();
  const location = useLocation();

  const handleOpenNavButtonClick = () => {
    setNavOpened(true);
  }

  const handleCloseNavButtonClick = () => {
    setNavOpened(false);
  }

  React.useEffect(() => {
    windowWidth <= 768
      ? setApplicationLinks([homePageLink, ...moviesLinks])
      : setApplicationLinks(moviesLinks)
  }, [windowWidth]);

  React.useEffect(() => {
    location.pathname === '/'
      ? setIsHomePage(true)
      : setIsHomePage(false);

    location.pathname === '/signin' || location.pathname === '/signup'
      ? setIsAuthPage(true)
      : setIsAuthPage(false);
  }, [location.pathname]);

  const header = (<Header
                  isHomePage={isHomePage}
                  isAuthPage={isAuthPage}
                  windowWidth={windowWidth}
                  loggedIn={loggedIn}
                  applicationLinks={applicationLinks}
                  handleOpenNavButtonClick={handleOpenNavButtonClick}
                  handleCloseNavButtonClick={handleCloseNavButtonClick}
                  navOpened={navOpened}
                />);

  return (
    <Switch>
      <Route exact path='/'>
        {header}
        <MainPage />
      </Route>
      <Route path='/movies'>
        {header}
        <MoviesPage />
      </Route>
      <Route path='/saved-movies'>
        {header}
        <SavedMoviesPage />
      </Route>
      <Route path='/profile'>
        {header}
        <ProfilePage />
      </Route>
      <Route path='/signin'>
        {header}
        <LoginPage
          isAuthPage={isAuthPage}
        />
      </Route>
      <Route path='/signup'>
        {header}
        <RegisterPage
          isAuthPage={isAuthPage}
        />
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
