import './MoviesCard.css';

const MoviesCard = ({ moviesCardData, savedMoviesPage }) => {
  let btnClasses = 'movie-card__button';
  let btnAriaLabel;

  if (savedMoviesPage) {
    btnClasses += ' movie-card__button_type_delete';
    btnAriaLabel = 'удалить фильм';
  } else {
    btnClasses += ' movie-card__button_type_save';
    btnAriaLabel = 'сохранить фильм';
  }

  return (
    <li className='movie-card'>
      <figure className='movie-card__image-container'>
        <img className='movie-card__image' src={moviesCardData.src} alt={moviesCardData.name} />
      </figure>
      <div className='movie-card__info'>
        <h3 className='movie-card__title'>
          {moviesCardData.name}
        </h3>
        <p className='movie-card__duration'>
          {moviesCardData.duration}
        </p>
        <button type='button' className={btnClasses} aria-label={btnAriaLabel} />
      </div>
    </li>
  )
}

export default MoviesCard;

