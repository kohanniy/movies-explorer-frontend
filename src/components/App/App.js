import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import LoginPage from '../Pages/LoginPage/LoginPage';
import MainPage from '../Pages/MainPage/MainPage';
import MoviesPage from '../Pages/MoviesPage/MoviesPage';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import SavedMoviesPage from '../Pages/SavedMoviesPage/SavedMoviesPage';

function App() {
  const [ isMainPage, setIsMainPage ] = React.useState(true);
  const [ loggedIn, setIsLoggedIn ] = React.useState(false);
  return (
    <>
      <Header
        isMainPage={isMainPage}
        loggedIn={loggedIn}
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
