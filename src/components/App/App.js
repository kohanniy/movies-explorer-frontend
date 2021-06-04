import React from 'react';
import { Route, Switch, useLocation, Redirect, useHistory } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';

const App = () => {
  const [ isHomePage, setIsHomePage ] = React.useState();
  const [ isAuthPage, setIsAuthPage ] = React.useState();
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ applicationLinks, setApplicationLinks ] = React.useState(moviesLinks);
  const [ navOpened, setNavOpened ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ serverErrorMsg, setServerErrorMsg ] = React.useState('');

  const windowWidth = useWindowWidth();
  const location = useLocation();
  const history = useHistory();

  const handleOpenNavButtonClick = () => {
    setNavOpened(true);
  }

  const handleCloseNavButtonClick = () => {
    setNavOpened(false);
  }

  const handleRegisterFormSubmit = (values) => {
    const { email, password, name } = values;
    setIsLoading(!isLoading);
    mainApi.register(email, password, name)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        if (err.status === 400) {
          setServerErrorMsg('Неправильно заполнено одно из полей.');
        } else if (err.status === 409) {
          setServerErrorMsg('Пользователь с таким email уже зарегистрирован.');
        } else {
          setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
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
      <ProtectedRoute
        header={header}
        path='/movies'
        component={MoviesPage}
        loggedIn={loggedIn}
      />
      <ProtectedRoute
        header={header}
        path='/saved-movies'
        component={SavedMoviesPage}
        loggedIn={loggedIn}
      />
      <ProtectedRoute
        header={header}
        path='/profile'
        component={ProfilePage}
        loggedIn={loggedIn}
      />
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
          onRegisterFormSubmit={handleRegisterFormSubmit}
          isLoading={isLoading}
          serverErrorMsg={serverErrorMsg}
        />
      </Route>
      <Route component={NotFoundPage} />
      <Route exact path='/'>
        {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/signin' />}
      </Route>
    </Switch>
  );
}

export default App;
