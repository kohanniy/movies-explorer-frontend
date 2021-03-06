export const userLinks = [
  {
    text: 'Регистрация',
    link: '/signup'
  },
  {
    text: 'Войти',
    link: '/signin'
  }
];

export const moviesLinks = [
  {
    text: 'Фильмы',
    link: '/movies',
  },
  {
    text: 'Сохраненные фильмы',
    link: '/saved-movies',
  },
];

export const profileLink = {
  text: 'Аккаунт',
  link: '/profile',
}

export const homePageLink = {
  text: 'Главная',
  link: '/'
}

export const navTabData = [
  {
    text: 'О проекте',
    hash: 'about-project',
  },
  {
    text: 'Технологии',
    hash: 'techs',
  },
  {
    text: 'Студент',
    hash: 'student',
  },
];

export const aboutProjectDescription = [
  {
    title: `Дипломный проект включал 5 этапов`,
    description: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
  },
  {
    title: 'На выполнение диплома ушло 5 недель',
    description: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
  },
];

export const aboutProjectSchedule = [
  {
    duration: '1 неделя',
    name: 'Back-end',
    modifier: 'backend',
  },
  {
    duration: '4 недели',
    name: 'Front-end',
    modifier: 'frontend',
  },
];

export const techs = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB'
];

export const socialLinks = [
  {
    network: 'Telegram',
    link: 'https://t.me/kohanniy'
  },
  {
    network: 'Github',
    link: 'https://github.com/kohanniy'
  },
];

export const portfolioData = [
  {
    name: 'Статичный сайт',
    link: 'https://kohanniy.github.io/how-to-learn'
  },
  {
    name: 'Адаптивный сайт',
    link: 'https://kohanniy.github.io/russian-travel'
  },
  {
    name: 'Одностраничное приложение',
    link: 'https://mesto.kohanniy.nomoredomains.club/'
  },
];

export const practicumLink = {
  network: 'Яндекс.Практикум',
  link: 'https://praktikum.yandex.ru/web/'
}

export const editProfileInputsData = [
  {
    labelText: 'Имя',
    inputType: 'text',
    inputName: 'name',
    placeholder: 'Введите свое имя',
    minLength: 2,
    maxLength: 30,
  },
  {
    labelText: 'E-mail',
    inputType: 'email',
    inputName: 'email',
    placeholder: 'Введите новую почту',
    minLength: null,
    maxLength: null,
  },
];

export const loginInputsData = [
  {
    labelText:'E-mail',
    inputType:'email',
    inputName:'email',
    placeholder: 'Введите свой email-адрес',
    minLength: null,
    maxLength: null,
  },
  {
    labelText:'Пароль',
    inputType:'password',
    inputName:'password',
    placeholder: 'Введите пароль',
    minLength: 8,
    maxLength: null,
  },
];

export const additionalInputDataForRegistration = {
    labelText:'Имя',
    inputType:'text',
    inputName:'name',
    placeholder: 'Введите свое имя',
    minLength: 2,
    maxLength: 30,
}

export const loginSectionData = {
  title: 'Рады видеть!',
  buttonText: 'Войти',
  text: 'Ещё не зарегистрированы?',
  linkText: 'Регистрация',
  link: '/signup'
}

export const registerSectionData = {
  title: 'Добро пожаловать!',
  buttonText: 'Зарегистрироваться',
  text: 'Уже зарегистрированы?',
  linkText: 'Войти',
  link: '/signin'
};

export const formNames = {
  register: 'register',
  signin: 'signin',
  editProfile: 'edit-profile',
}

export const regExpForCheckInputName = '^[А-Яа-яa-zA-ZЁё\\-\\s]+$';

export const BEATFILM_URL = 'https://api.nomoreparties.co';

export const IMAGE_URL = 'https://images.unsplash.com/photo-1622495892577-2d07f607968e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80';
