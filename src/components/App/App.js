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
import {
  setToken,
  getToken,
  removeToken,
  setMovies,
  getMovies,
  removeMovies,
} from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getAllMovies } from '../../utils/MoviesApi';

const App = () => {
  const [ isHomePage, setIsHomePage ] = React.useState();
  const [ isAuthPage, setIsAuthPage ] = React.useState();
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ applicationLinks, setApplicationLinks ] = React.useState(moviesLinks);
  const [ navOpened, setNavOpened ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ serverErrorMsg, setServerErrorMsg ] = React.useState('');
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ searchMovies, setSearchMovies ] = React.useState();

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
    removeMovies();
    setSearchMovies(null);
    history.push('/');
  };

  const handleGoBackButtonClick = () => {
    history.goBack();
  };

  const handleSearchMovies = (values) => {
    const { 'search-query': searchQuery } = values;
    const regExpQuery = new RegExp(searchQuery, 'gi');
    setIsLoading(true);
    getAllMovies()
      .then((movies) => {
        // if (!movies) {
        //   setServerErrorMsg('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        // }
        const searchMoviesResult = movies.filter((movie) =>
          regExpQuery.test(movie.nameRU) || regExpQuery.test(movie.nameEN));
        setMovies(searchMoviesResult);
        setSearchMovies(searchMoviesResult);
        // setServerErrorMsg('');
      })
      .catch((err) => {
        console.log(err);
        // setServerErrorMsg('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  React.useEffect(() => {
    const movies = getMovies();
    setSearchMovies(JSON.parse(movies));
  }, []);

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
          onSubmit={handleSearchMovies}
          moviesData={searchMovies}
          isLoading={isLoading}
          serverErrorMsg={serverErrorMsg}
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

// {
//   "id": 1,
//   "nameRU": "«Роллинг Стоунз» в изгнании",
//   "nameEN": "Stones in Exile",
//   "director": "Стивен Кайак ",
//   "country": "США",
//   "year": "2010",
//   "duration": 61,
//   "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
//   "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
//   "created_at": "2020-11-23T14:12:21.376Z",
//   "updated_at": "2020-11-23T14:12:21.376Z",
//   "image": {
//     "id": 1,
//     "name": "stones-in-exile",
//     "alternativeText": "",
//     "caption": "",
//     "width": 512,
//     "height": 279,
//     "formats": {
//       "thumbnail": {
//         "hash": "thumbnail_stones_in_exile_b2f1b8f4b7",
//         "ext": ".jpeg",
//         "mime": "image/jpeg",
//         "width": 245,
//         "height": 134,
//         "size": 8.79,
//         "path": null,
//         "url": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg"
//       },
//       "small": {
//         "hash": "small_stones_in_exile_b2f1b8f4b7",
//         "ext": ".jpeg",
//         "mime": "image/jpeg",
//         "width": 500,
//         "height": 272,
//         "size": 25.68,
//         "path": null,
//         "url": "/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
//       }
//     },
//     "hash": "stones_in_exile_b2f1b8f4b7",
//     "ext": ".jpeg",
//     "mime": "image/jpeg",
//     "size": 25.53,
//     "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
//     "previewUrl": null,
//     "provider": "local",
//     "provider_metadata": null,
//     "created_at": "2020-11-23T14:11:57.313Z",
//     "updated_at": "2020-11-23T14:11:57.313Z"
//   }
// }
