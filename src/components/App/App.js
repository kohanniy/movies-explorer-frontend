import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import LoginPage from '../Pages/LoginPage/LoginPage';
import MainPage from '../Pages/MainPage/MainPage';
import MoviesPage from '../Pages/MoviesPage/MoviesPage';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import SavedMoviesPage from '../Pages/SavedMoviesPage/SavedMoviesPage';
import useWindowWidth from '../../hooks/useWindowWidth';
import { moviesLinks, homePageLink } from '../../utils/constants';

function App() {
  const [ isHomePage, setIsHomePage ] = React.useState();
  const [ isAuthPage, setIsAuthPage ] = React.useState();
  const [ loggedIn, setLoggedIn ] = React.useState(true);
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

  return (
    <>
      <Header
        isHomePage={isHomePage}
        isAuthPage={isAuthPage}
        windowWidth={windowWidth}
        loggedIn={loggedIn}
        applicationLinks={applicationLinks}
        handleOpenNavButtonClick={handleOpenNavButtonClick}
        handleCloseNavButtonClick={handleCloseNavButtonClick}
        navOpened={navOpened}
      />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
        <Route path="/saved-movies">
          <SavedMoviesPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/signin">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <RegisterPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
