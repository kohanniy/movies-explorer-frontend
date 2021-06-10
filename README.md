# Фронтенд дипломного проекта [Movies Explorer](https://movies-explorer.kohanniy.nomoredomains.club)
Фронтенд-часть приложения, с помощью которого пользователи могут искать фильмы, сохранять их в своем аккаунте и переходить к трейлерам фильмов. Реализован функционал регистрации, авторизации, редактирования профиля, поиска и фильтрации фильмов по продолжительности, сохранения и удаления фильмов.

[Исходный макет приложения в Figma](https://www.figma.com/file/Gyj8tn99IbRQPwlJhvMmgg/Diploma-(Copy)?node-id=891%3A3857)

Ссылка на сайт: [https://movies-explorer.kohanniy.nomoredomains.club/](https://movies-explorer.kohanniy.nomoredomains.club)

Фронтенд взаимодействует с двумя API:
* Сторонним [https://api.nomoreparties.co/beatfilm-movies](https://api.nomoreparties.co/beatfilm-movies) - для получения фильмов
* Собственным, сделанным на NodeJS/ExpressJS - для сохранения и удаления фильмов, регистрации и редактирования профиля

## Детали
Фронтенд сделан на React с помощью функциональных компонентов. Используются:
* функции: Context, Redirect, Route, Switch
* хуки: useState, useEffect, useContext, useCallback, useHistory, useLocation, useRef
* пользовательские хуки для получения и валидации пользовательских данных, отслеживания ширины окна браузера и Debouncing'а

В основе компонентов лежат HTML5 и CSS3 (в том числе Flexbox, Grid, transitions). Классы именуются по методологии БЭМ. Верстка - адаптивная, рассчитана на разрешения экранов от 320 до 1280 и выше пикселей по ширине.

Для взаимодействия с API используются принципы REST(метод Fetch).
