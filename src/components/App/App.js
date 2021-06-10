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
  setStoredMovies,
  getStoredMovies,
  removeStoredMovies,
  setUser,
  getUser,
  removeUser,
} from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getAllMovies } from '../../utils/MoviesApi';

const App = () => {
  const [ isHomePage, setIsHomePage ] = React.useState(false);
  const [ isAuthPage, setIsAuthPage ] = React.useState(false);
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ applicationLinks, setApplicationLinks ] = React.useState(moviesLinks);
  const [ navOpened, setNavOpened ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ serverErrorMsg, setServerErrorMsg ] = React.useState('');
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ searchMovies, setSearchMovies ] = React.useState([]);
  const [ searchResultMsg, setSearchResultMsg ] = React.useState('');
  const [ searchSavedMoviesResultMsg, setSavedMoviesResultMsg ] = React.useState('');
  const [ numSearchMoviesDisplay, setNumSearchMoviesDisplay ] = React.useState(0);
  const [ numSearcMoviesAddedDisplay, setNumSearcMoviesAddedDisplay ] = React.useState(0);
  const [ moreButtonShow, setMoreButtonShow ] = React.useState(false);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ isInfoPopupOpen, setIsInfoPopupOpen ] = React.useState(false);
  const [ successfulUpdate, setSuccessfulUpdate ] = React.useState({});
  const [ failSavingOrDeletingMovie, setFailSavingOrDeletingMovie ] = React.useState({});

  const windowWidth = useWindowWidth();
  const location = useLocation();
  const history = useHistory();

  // Удалить все данные при выходе
  const exitAndDeleteData = () => {
    setLoggedIn(false);
    removeToken();
    removeMovies();
    removeUser();
    removeStoredMovies();
    setSearchMovies([]);
  }

  // Сбросить сообщения об ошибках от сервера
  const resetServerErrorMsg = React.useCallback((newMsg = '') => {
    setServerErrorMsg(newMsg);
  }, [setServerErrorMsg]);

  // Закрыть попап
  const closePopup = React.useCallback(() => {
    setIsInfoPopupOpen(false);
  }, [])

  // Определить, фильм сохранен или нет
  const isMovieSaved = (movie) => savedMovies.some(savedMovie => savedMovie.movieId === movie.id);

  // Сохранить фильм
  const saveMovie = (movieData) => {
    const token = getToken();
    mainApi.saveMovie(movieData, token)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        setStoredMovies([...savedMovies, movie]);
        setSavedMoviesResultMsg('');
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        switch(err.status) {
          case 400:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'К сожалению этот фильм сохранить не получится',
              success: false
            });
            break;
          default:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Что-то пошло не так! Попробуйте еще раз',
              success: false
            });
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
          setStoredMovies(newSavedMovies);
          if (getStoredMovies().length === 0) {
            setSavedMoviesResultMsg('У вас нет сохраненных фильмов');
          }
        }
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        switch(err.status) {
          case 403:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Вы не можете удалять фильмы, сохраненные другими пользователями',
              success: false
            });
            break;
          case 404:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Этот фильм уже удален из сохраненных',
              success: false
            });
            break;
          default:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Что-то пошло не так! Попробуйте еще раз',
              success: false
            });
            break;
        };
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
          setStoredMovies(newSavedMovies);
          if (getStoredMovies().length === 0) {
            setSavedMoviesResultMsg('У вас нет сохраненных фильмов');
          }
        }
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        switch(err.status) {
          case 403:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Вы не можете удалять фильмы, сохраненные другими пользователями',
              success: false
            });
            break;
          case 404:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Этот фильм уже удален из сохраненных',
              success: false
            });
            break;
          default:
            setFailSavingOrDeletingMovie({
              ...failSavingOrDeletingMovie,
              message: 'Что-то пошло не так! Попробуйте еще раз',
              success: false
            });
            break;
        };
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
          setServerErrorMsg('');
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
          setServerErrorMsg('');
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
        setSuccessfulUpdate({
          ...successfulUpdate,
          message: 'Данные успешно обновлены',
          success: true,
        })
        setIsInfoPopupOpen(true);
        setServerErrorMsg('');
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
    exitAndDeleteData();
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
        const result = movies.filter((movie) =>
          regExpQuery.test(movie.nameRU) || regExpQuery.test(movie.nameEN));

        setMovies(result);

        result.length === 0
          ? setSearchResultMsg('Ничего не найдено')
          : setSearchResultMsg('')

        if (checked) {
          const searchMovies = getMovies();
          const shortMoviesResult = searchMovies.filter((item) =>
            item.duration <= 40);

          shortMoviesResult.length === 0
            ? setSearchResultMsg('Ничего не найдено')
            : setSearchResultMsg('')

          shortMoviesResult.length <= numSearchMoviesDisplay
            ? setMoreButtonShow(false)
            : setMoreButtonShow(true)

          setSearchMovies(shortMoviesResult.slice(0, numSearchMoviesDisplay));
        } else {
          result.length <= numSearchMoviesDisplay
            ? setMoreButtonShow(false)
            : setMoreButtonShow(true)

          setSearchMovies(result.slice(0, numSearchMoviesDisplay));
        }
      })
      .catch(() => {
        setSearchResultMsg('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  function onChangeCheckbox(e, isSavedMoviesPage) {
    const movies = isSavedMoviesPage ? getStoredMovies() : getMovies();
    if (movies) {
      if (e.target.checked) {
        const shortMovies = movies.filter((item) => item.duration <= 40);
        isSavedMoviesPage
          ? setSavedMovies(shortMovies.slice(0, numSearchMoviesDisplay))
          : setSearchMovies(shortMovies.slice(0, numSearchMoviesDisplay))
        
        shortMovies.length <= numSearchMoviesDisplay
            ? setMoreButtonShow(false)
            : setMoreButtonShow(true)
      } else {
        isSavedMoviesPage
          ? setSavedMovies(movies.slice(0, numSearchMoviesDisplay))
          : setSearchMovies(movies.slice(0, numSearchMoviesDisplay))

        movies.length <= numSearchMoviesDisplay
            ? setMoreButtonShow(false)
            : setMoreButtonShow(true)
      }
    }
  }

  const handleSearchSavedMovies = (values) => {
    const { query, checked } = values;
    const regExpQuery = new RegExp(query, 'gi');
    const userSavedMovies = getStoredMovies();

    const searchMoviesResult = userSavedMovies.filter((movie) =>
          regExpQuery.test(movie.nameRU) || regExpQuery.test(movie.nameEN));

    searchMoviesResult.length === 0
      ? setSavedMoviesResultMsg('Ничего не найдено')
      : setSavedMoviesResultMsg('')

    if (checked) {
      const searchShortMoviesResult = searchMoviesResult.filter((item) =>
        item.duration <= 40);

      searchShortMoviesResult.length === 0
        ? setSavedMoviesResultMsg('Ничего не найдено')
        : setSavedMoviesResultMsg('')

      setSavedMovies(searchShortMoviesResult);
    } else {
        setSavedMovies(searchMoviesResult);
      }
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

      movies.length <= numSearchMoviesDisplay
        ? setMoreButtonShow(false)
        : setMoreButtonShow(true)
      setSearchMovies(movies.slice(0, numSearchMoviesDisplay));
    }
  }, [numSearchMoviesDisplay, location.pathname]);

  // Зависимость количества отображаемых и добавляемых фильмов от размера экрана
  React.useEffect(() => {
    if (windowWidth > 1024) {
      setNumSearchMoviesDisplay(16);
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
            setServerErrorMsg('');
            path === '/signin' || path === '/signup'
              ? history.push('/movies')
              : history.push(path)
          }
        })
        .catch((err) => {
          exitAndDeleteData();
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
              setServerErrorMsg('');
            }

            if (index === 1 && result.status === 'fulfilled') {
              const movies = result.value;
              const user = getUser();
              const userMovies = movies.filter(movie => movie.owner === user._id);
              setSavedMovies(userMovies);
              setStoredMovies(userMovies);
              userMovies.length === 0
                ? setSavedMoviesResultMsg('У вас нет сохраненных фильмов')
                : setSavedMoviesResultMsg('')
            }

            if (index === 0 && result.status === 'rejected') {
              exitAndDeleteData();
              history.push('/signin');
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
              setSavedMoviesResultMsg('Что-то пошло не так! Попробуйте еще раз');
            }
          })
        })
    };

    if (loggedIn) {
      const token = getToken();
      dataForRendered(token);
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    setSearchResultMsg('');
    const savedMovies = getStoredMovies();
    if (savedMovies) {
      if (savedMovies.length === 0) {
        setSavedMoviesResultMsg('У вас нет сохраненных фильмов');
      } else {
        setSavedMoviesResultMsg('');
        setSavedMovies(savedMovies);
      }
    }
  }, [location.pathname]);

  // Зкрытие попапа по Esc
  React.useEffect(() => {
    const handlePopupsEscClose = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    }

    document.addEventListener('keydown', handlePopupsEscClose);

    return () => document.removeEventListener('keydown', handlePopupsEscClose);
  }, [closePopup]);

  const header = (<Header
                    isHomePage={isHomePage}
                    isAuthPage={isAuthPage}
                    windowWidth={windowWidth}
                    loggedIn={loggedIn}
                    applicationLinks={applicationLinks}
                    handleOpenNavButtonClick={handleOpenNavButtonClick}
                    handleCloseNavButtonClick={handleCloseNavButtonClick}
                    navOpened={navOpened}
                  />
    );

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
          isPopupOpen={isInfoPopupOpen}
          onClosePopup={closePopup}
          result={failSavingOrDeletingMovie}
          onChangeCheckbox={onChangeCheckbox}
        />
        <ProtectedRoute
          header={header}
          path='/saved-movies'
          component={SavedMoviesPage}
          loggedIn={loggedIn}
          resultMsg={searchSavedMoviesResultMsg}
          moviesData={savedMovies}
          onButtonClick={handleRemoveButtonClick}
          isPopupOpen={isInfoPopupOpen}
          onClosePopup={closePopup}
          result={failSavingOrDeletingMovie}
          onSubmit={handleSearchSavedMovies}
          isLoading={isLoading}
          onChangeCheckbox={onChangeCheckbox}
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
          isPopupOpen={isInfoPopupOpen}
          onClosePopup={closePopup}
          result={successfulUpdate}
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
