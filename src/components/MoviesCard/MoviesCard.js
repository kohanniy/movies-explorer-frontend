import './MoviesCard.css';
import { getTimeFromMin } from '../../utils/utils';

const MoviesCard = ({ movieData, savedMoviesPage }) => {
  const URL = 'https://api.nomoreparties.co';
  let btnClasses = 'movie-card__button';
  let btnAriaLabel;

  if (savedMoviesPage) {
    btnClasses += ' movie-card__button_type_delete';
    btnAriaLabel = 'удалить фильм';
  } else {
    btnClasses += ' movie-card__button_type_save';
    btnAriaLabel = 'сохранить фильм';
  }

  console.log(movieData);

  return (
    <li className='movie-card'>
      <a
        href={movieData.trailerLink}
        target='_blank'
        className='movie-card__link'
        rel='noreferrer'
      >
        <figure className='movie-card__image-container'>
          {
            movieData.image !== null
              ? <img
                  className='movie-card__image'
                  src={`${URL}${movieData.image.url}`}
                  alt={movieData.name}
                />
              : <figcaption>У этого фильма нет заставки</figcaption>
          }

        </figure>
        <div className='movie-card__info'>
          <h3 className='movie-card__title'>
            {movieData.nameRU}
          </h3>
          <p className='movie-card__duration'>
            {getTimeFromMin(movieData.duration)}
          </p>
          <button type='button' className={btnClasses} aria-label={btnAriaLabel} />
        </div>
      </a>
    </li>
  )
}

export default MoviesCard;

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

