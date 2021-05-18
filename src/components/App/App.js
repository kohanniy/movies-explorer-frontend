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

function App() {
  const [ isHomePage, setIsHomePage ] = React.useState(false);
  const [ isAuthPage, setIsAuthPage ] = React.useState(false);
  const [ loggedIn, setIsLoggedIn ] = React.useState(true);
  const windowWidth = useWindowWidth();

  const location = useLocation();
  console.log(windowWidth);

  React.useEffect(() => {

    if (location.pathname === '/') setIsHomePage(true);
    if (location.pathname === '/signin' || location.pathname === '/signup') setIsAuthPage(true);
  }, [location.pathname]);

  return (
    <>
      <Header
        isHomePage={isHomePage}
        isAuthPage={isAuthPage}
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
