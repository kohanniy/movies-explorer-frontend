import movieImage from '../images/movie-img.jpg';

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

export const moviesCardData = [
  {
    name: '33 слова о дизайне sdgsdfgfgsdfgtsrgtyb regrgetetrttetgr',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне sgfdgsdfgdsfgdfsgbhbyt5 54tyb34t5vg345',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне',
    src: movieImage,
    duration: '1ч42мин'
  },
  {
    name: '33 слова о дизайне',
    src: movieImage,
    duration: '1ч42мин'
  },
];

export const inputsData = {
  editPrifileInputs: [
    {
      type: 'text',
      name: 'name',
      minLength: '2',
      maxLength: '30'
    }
  ]
};

export const editProfileInputsData = [
  {
    labelText: 'Имя',
    inputType: 'text',
    inputName: 'name',
    minLength: 2,
    maxLength: 30,
    defaultValue: 'Виталий'
  },
  {
    labelText: 'E-mail',
    inputType: 'email',
    inputName: 'email',
    minLength: null,
    maxLength: null,
    defaultValue: 'gsdgsfgfg@mail.ru'
  },
];

export const loginInputsData = [
  {
    labelText:'E-mail',
    inputType:'email',
    inputName:'email',
    minLength: null,
    maxLength: null,
    defaultValue: 'gsdgsfgfg@mail.ru'
  },
  {
    labelText:'Пароль',
    inputType:'password',
    inputName:'password',
    minLength: 8,
    maxLength: null,
    defaultValue: null
  },
];

export const additionalInputDataForRegistration = {
    labelText:'Имя',
    inputType:'text',
    inputName:'name',
    minLength: 2,
    maxLength: 30,
    defaultValue: 'Виталий'
}

export const loginSectionData = {
  buttonText: 'Войти',
  text: 'Ещё не зарегистрированы?',
  linkText: 'Регистрация',
  link: '/signup'
}

export const registerSectionData = {
  buttonText: 'Зарегистрироваться',
  text: 'Уже зарегистрированы?',
  linkText: 'Войти',
  link: '/signin'
}
