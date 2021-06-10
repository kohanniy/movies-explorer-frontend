import React from 'react';
import './MoviesCard.css';
import { getTimeFromMin } from '../../utils/utils';
import { BEATFILM_URL } from '../../utils/constants';

const MoviesCard = (props) => {
  const {
    movieData,
    savedMoviesPage,
    isMovieSaved,
    onButtonClick,
  } = props;

  let isSaved;

  const handleButtonClick = () => {
    onButtonClick(movieData);
  };

  let btnClasses = 'movie-card__button';
  let btnAriaLabel;

  if (savedMoviesPage) {
    btnClasses += ' movie-card__button_type_delete';
    btnAriaLabel = 'удалить фильм';
    isSaved = null;
  } else {
    btnClasses += ' movie-card__button_type_save';
    btnAriaLabel = 'сохранить фильм';
    isSaved = isMovieSaved(movieData);
    if (isSaved) btnClasses += ' movie-card__button_type_save-active'
  }

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
                  src={savedMoviesPage ? `${movieData.image}` : `${BEATFILM_URL}${movieData.image.url}`}
                  alt={movieData.name}
                />
              : <figcaption>У этого фильма нет заставки</figcaption>
          }
        </figure>
      </a>
      <div className='movie-card__info'>
        <h3 className='movie-card__title'>
          {movieData.nameRU}
        </h3>
        <p className='movie-card__duration'>
          {getTimeFromMin(movieData.duration)}
        </p>
        <button
          onClick={handleButtonClick}
          type='button'
          className={btnClasses}
          aria-label={btnAriaLabel}
        />
      </div>
    </li>
  )
}

export default MoviesCard;
