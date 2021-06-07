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
import { setToken, getToken, removeToken } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const App = () => {
  const [ isHomePage, setIsHomePage ] = React.useState();
  const [ isAuthPage, setIsAuthPage ] = React.useState();
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ applicationLinks, setApplicationLinks ] = React.useState(moviesLinks);
  const [ navOpened, setNavOpened ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ serverErrorMsg, setServerErrorMsg ] = React.useState('');
  const [ currentUser, setCurrentUser ] = React.useState({});

  const windowWidth = useWindowWidth();
  const location = useLocation();
  const history = useHistory();

  const resetServerErrorMsg = React.useCallback((newMsg = '') => {
    setServerErrorMsg(newMsg);
  }, [setServerErrorMsg]);

  const handleOpenNavButtonClick = () => {
    setNavOpened(true);
  }

  const handleCloseNavButtonClick = () => {
    setNavOpened(false);
  };

  const handleLoginFormSubmit = ({ email, password }) => {
    setIsLoading(true);
    mainApi.login(email, password)
      .then((data) => {
        if (data) {
          setToken(data.token);
          setLoggedIn(true);
          history.push('/movies');

          mainApi.getUserInfo(data.token)
            .then((data) => {
              setCurrentUser(data);
            })
            .catch((err) => {
              history.push('/signin');
              removeToken();
              switch (err.status) {
                case 401:
                  setServerErrorMsg('Токен не передан или передан не в том формате. Заполните форму входа');
                  break;
                case 404:
                  setServerErrorMsg('Пользователь не найден. Заполните форму входа или зарегистрируйтесь');
                  break;
                default:
                  setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
                  break;
              };
            })
        }
      })
      .catch((err) => {
        switch(err.status) {
          case 401:
            setServerErrorMsg('Нет пользователя с таким email или паролем');
            break;
          case 404:
            setServerErrorMsg('Пользователь не найден');
            break;
          case 400:
            setServerErrorMsg('В одном из полей переданы неверные данные');
            break;
          case 429:
            setServerErrorMsg('Слишком много запросов с вашего устройства. Попробуйте позже');
            break;
          default:
            setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
            break;
        };
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleRegisterFormSubmit = ({ email, password, name }) => {
    setIsLoading(!isLoading);
    mainApi.register(email, password, name)
      .then((data) => {
        if (data) {
          handleLoginFormSubmit({ email, password });
        }
      })
      .catch((err) => {
        switch(err.status) {
          case 400:
            setServerErrorMsg('В одном из полей переданы неверные данные');
            break;
          case 409:
            setServerErrorMsg('Пользователь с таким email уже зарегистрирован.');
            break;
          case 429:
            setServerErrorMsg('Слишком много запросов с вашего устройства. Попробуйте позже');
            break;
          default:
            setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
            break;
        };
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleUpdateUser = ({name, email}) => {
    const token = getToken();
    setIsLoading(!isLoading);
    mainApi.updateUserInfo({name, email}, token)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((err) => {
        switch(err.status) {
          case 400:
            setServerErrorMsg('В одном из полей переданы неверные данные');
            break;
          case 404:
            setServerErrorMsg('Пользователь не найден. Попробуйте еще раз');
            break;
          case 409:
            setServerErrorMsg('Пользователь с таким email уже зарегистрирован.');
            break;
          case 429:
            setServerErrorMsg('Слишком много запросов с вашего устройства. Попробуйте позже');
            break;
          default:
            setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
            break;
        };
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleSignoutButtonClick = () => {
    removeToken();
    setLoggedIn(false);
    history.push('/');
  };

  const handleGoBackButtonClick = () => {
    history.goBack();
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

  React.useEffect(() => {
    const tokenCheck = () => {
      if (getToken()){
        const path = location.pathname;
        const token = getToken();
        mainApi.getUserInfo(token)
          .then((data) => {
            if (data) {
              setCurrentUser(data);
              setLoggedIn(true);
              history.push(path);
            }
          })
          .catch((err) => {
            history.push('/signin');
            removeToken();
            console.log(err);
            switch (err.status) {
              case 401:
                setServerErrorMsg('Токен не передан или передан не в том формате. Заполните форму входа');
                break;
              case 404:
                setServerErrorMsg('Пользователь не найден. Заполните форму входа или зарегистрируйтесь');
                break;
              default:
                setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
                break;
            };
          })
      }
    };
    tokenCheck();
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
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
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          serverErrorMsg={serverErrorMsg}
          resetServerErrorMsg={resetServerErrorMsg}
          onSignoutButtonClick={handleSignoutButtonClick}
        />
        <Route path='/signin'>
          {header}
          <LoginPage
            isAuthPage={isAuthPage}
            onLoginFormSubmit={handleLoginFormSubmit}
            isLoading={isLoading}
            serverErrorMsg={serverErrorMsg}
            resetServerErrorMsg={resetServerErrorMsg}
          />
        </Route>
        <Route path='/signup'>
          {header}
          <RegisterPage
            isAuthPage={isAuthPage}
            onRegisterFormSubmit={handleRegisterFormSubmit}
            isLoading={isLoading}
            serverErrorMsg={serverErrorMsg}
            resetServerErrorMsg={resetServerErrorMsg}
          />
        </Route>
        <Route>
          <NotFoundPage
            onButtonClick={handleGoBackButtonClick}
          />
        </Route>
        <Route exact path='/'>
          {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/signin' />}
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
