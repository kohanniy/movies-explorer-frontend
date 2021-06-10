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
  setUser,
  getUser,
  removeUser,
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
  const [ searchMovies, setSearchMovies ] = React.useState([]);
  const [ searchResultMsg, setSearchResultMsg ] = React.useState('');
  const [ searchSavedMoviesResultMsg, setSearchMoviesResultMsg ] = React.useState('');
  const [ numSearchMoviesDisplay, setNumSearchMoviesDisplay ] = React.useState();
  const [ numSearcMoviesAddedDisplay, setNumSearcMoviesAddedDisplay ] = React.useState();
  const [ moreButtonShow, setMoreButtonShow ] = React.useState();
  const [ savedMovies, setSavedMovies ] = React.useState([]);

  const windowWidth = useWindowWidth();
  const location = useLocation();
  const history = useHistory();

  // Сбросить сообщения об ошибках от сервера
  const resetServerErrorMsg = React.useCallback((newMsg = '') => {
    setServerErrorMsg(newMsg);
  }, [setServerErrorMsg]);

  // Определить, фильм сохранен или нет
  const isMovieSaved = (movie) => savedMovies.some(savedMovie => savedMovie.movieId === movie.id);

  // Сохранить фильм
  const saveMovie = (movieData) => {
    const token = getToken();
    console.log(movieData);
    mainApi.saveMovie(movieData, token)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => {
        switch(err.status) {
          case 400:
            setServerErrorMsg('В одном из полей переданы неверные данные');
            break;
          default:
            setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
            break;
        };
      })
  };

  // Удалить фильм
  const removeMovie = (movieData) => {
    const token = getToken();
    const removedMovieId = savedMovies.find(savedMovie => savedMovie.movieId === movieData.id)._id;
    mainApi.removeMovie(removedMovieId, token)
      .then((data) => {
        if (data) {
          const newSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== removedMovieId);
          setSavedMovies(newSavedMovies);
        }
      })
  };

  const handleSaveButtonClick = (movieData) => {
    const isSaved = isMovieSaved(movieData);
    isSaved ? removeMovie(movieData) : saveMovie(movieData)
  };

  // Удалить фильм со страницы сохраненных фильмов
  const handleRemoveButtonClick = (movieData) => {
    const token = getToken();
     mainApi.removeMovie(movieData._id, token)
      .then((data) => {
        if (data) {
          const newSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== movieData._id);
          setSavedMovies(newSavedMovies);
        }
      })
  }

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
          handleLoginFormSubmit(data);
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
    setLoggedIn(false);
    removeToken();
    removeMovies();
    removeUser();
    setSearchMovies(null);
    history.push('/');
  };

  const handleGoBackButtonClick = () => {
    history.goBack();
  };

  const handleSearchMovies = (values) => {
    const { query, checked } = values;
    const regExpQuery = new RegExp(query, 'gi');

    setIsLoading(true);
    getAllMovies()
      .then((movies) => {
        const searchMoviesResult = movies.filter((movie) =>
          regExpQuery.test(movie.nameRU) || regExpQuery.test(movie.nameEN));

        searchMoviesResult.length === 0
          ? setSearchResultMsg('Ничего не найдено')
          : setSearchResultMsg('')

        if (checked) {
          const searchShortMoviesResult = searchMoviesResult.filter((item) =>
            item.duration <= 40);

          searchShortMoviesResult.length === 0
          ? setSearchResultMsg('Ничего не найдено')
          : setSearchResultMsg('')

          searchShortMoviesResult.length <= numSearcMoviesAddedDisplay
            ? setMoreButtonShow(false)
            : setMoreButtonShow(true)

          setSearchMovies(searchShortMoviesResult.slice(0, numSearchMoviesDisplay));
          setMovies(searchShortMoviesResult);
        } else {
          searchMoviesResult.length <= numSearcMoviesAddedDisplay
            ? setMoreButtonShow(false)
            : setMoreButtonShow(true)

          setSearchMovies(searchMoviesResult.slice(0, numSearchMoviesDisplay));
          setMovies(searchMoviesResult);
        }
      })
      .catch(() => {
        setSearchResultMsg('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleMoreButtonClick = () => {
    const movies = getMovies();
    setSearchMovies(movies.slice(0, searchMovies.length + numSearcMoviesAddedDisplay));

    searchMovies.length >= movies.length - numSearcMoviesAddedDisplay
      ? setMoreButtonShow(false)
      : setMoreButtonShow(true)
  };

  // Отрисовка искомых фильмов из localStorage
  React.useEffect(() => {
    const movies = getMovies();
    if (movies) {
      movies.length <= numSearcMoviesAddedDisplay
        ? setMoreButtonShow(false)
        : setMoreButtonShow(true)
      setSearchMovies(movies.slice(0, numSearchMoviesDisplay));
    }
  }, [numSearcMoviesAddedDisplay, numSearchMoviesDisplay]);

  // Зависимость количества отображаемых и добавляемых фильмов от размера экрана
  React.useEffect(() => {
    if (windowWidth > 1024) {
      setNumSearchMoviesDisplay(12);
      setNumSearcMoviesAddedDisplay(4);
    }

    if (windowWidth <= 1024) {
      setNumSearchMoviesDisplay(12);
      setNumSearcMoviesAddedDisplay(3);
    }

    if (windowWidth <= 768) {
      setNumSearchMoviesDisplay(8);
      setNumSearcMoviesAddedDisplay(2);
    }

    if (windowWidth <= 575) {
      setNumSearchMoviesDisplay(5);
      setNumSearcMoviesAddedDisplay(2);
    }
    windowWidth <= 768
      ? setApplicationLinks([homePageLink, ...moviesLinks])
      : setApplicationLinks(moviesLinks)
  }, [windowWidth]);

  // Определение главной страницы и страниц авторизации
  React.useEffect(() => {
    location.pathname === '/'
      ? setIsHomePage(true)
      : setIsHomePage(false);

    location.pathname === '/signin' || location.pathname === '/signup'
      ? setIsAuthPage(true)
      : setIsAuthPage(false);
  }, [location.pathname]);

  // Проверка токена при заходе на сайт
  React.useEffect(() => {
    const token = getToken();
    const path = location.pathname;
    if (token) {
      mainApi.getUserInfo(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            path === '/signin' || path === '/signup'
              ? history.push('/movies')
              : history.push(path)
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          removeToken();
          removeUser();
          removeMovies();
          history.push('/signin');
          switch (err.status){
            case 404:
              setServerErrorMsg('Пользователь не найден. Войдите в приложение');
              break;
            default:
              setServerErrorMsg('Что-то пошло не так! Попробуйте войти в приложение заново');
              break;
          };
        })
    }
  }, []);

  // Получение данных о пользователе и сохраненных фильмах
  React.useEffect(() => {
    const dataForRendered = (token) => {
      mainApi.getDataForRendered(token)
        .then((results) => {
          results.forEach((result, index) => {
            if (index === 0 && result.status === 'fulfilled') {
              setCurrentUser(result.value);
              setUser(result.value);
            }

            if (index === 1 && result.status === 'fulfilled') {
              const movies = result.value;
              const user = getUser();
              const userMovies = movies.filter(movie => movie.owner === user._id);
              setSavedMovies(userMovies);
              userMovies === 0
                ? setSearchMoviesResultMsg('У вас еще нет сохраненных фильмов')
                : setSearchMoviesResultMsg('')
            }

            if (index === 0 && result.status === 'rejected') {
              switch (result.reason.status){
                case 404:
                  setServerErrorMsg('Пользователь не найден');
                  break;
                default:
                  setServerErrorMsg('Что-то пошло не так! Попробуйте еще раз');
                  break;
              };
            }

            if (index === 1 && result.status === 'rejected') {
              setSearchMoviesResultMsg('Что-то пошло не так! Попробуйте еще раз');
            }
          })
        })
    };

    if (loggedIn) {
      const token = getToken();
      dataForRendered(token);
    }
  }, [loggedIn]);

  // Сброс сообщения о результатах поиска
  React.useEffect(() => {
    setSearchResultMsg('');
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
          resultMsg={searchResultMsg}
          handleMoreButtonClick={handleMoreButtonClick}
          moreButtonShow={moreButtonShow}
          onButtonClick={handleSaveButtonClick}
          isMovieSaved={isMovieSaved}
        />
        <ProtectedRoute
          header={header}
          path='/saved-movies'
          component={SavedMoviesPage}
          loggedIn={loggedIn}
          resultMsg={searchSavedMoviesResultMsg}
          moviesData={savedMovies}
          onButtonClick={handleRemoveButtonClick}
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


// const [filterIsOn, setFilterIsOn] = useState(false);

//   // eslint-disable-next-line max-len
//   const filterShortFilm = (moviesToFilter) => moviesToFilter.filter((item) => item.duration < SHORT_MOVIE_DURATION_MIN);

//   const onFilterClick = () => {
//     setFilterIsOn(!filterIsOn);
//   };
