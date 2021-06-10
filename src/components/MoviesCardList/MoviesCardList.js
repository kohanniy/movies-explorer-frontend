import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Container from '../Container/Container';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = (props) => {
  const {
    savedMoviesPage,
    moviesData,
    isLoading,
    resultMsg,
    onMoreButtonClick,
    moreButtonShow,
    handleSaveMovieButtonClick,
    isMovieSaved,
    onButtonClick,
  } = props;

  return (
    <section className='cards'>
      <Container
        additionalClass='cards__container'
      >
        {
          moviesData === null
            ? null
            : isLoading
                ? <Preloader/>
                : <>
                    {
                      resultMsg
                        ? <p className='cards__not-found'>
                            {resultMsg}
                          </p>
                        : null
                    }
                    {
                      moviesData.length === 0
                        ? null
                        : <>
                            <ul className='cards__list'>
                              {
                                moviesData.map((movie) =>
                                  (
                                    <MoviesCard
                                      key={savedMoviesPage
                                            ? movie.movieId
                                            : movie.id
                                          }
                                      movieData={movie}
                                      savedMoviesPage={savedMoviesPage}
                                      onSaveButtonClick={handleSaveMovieButtonClick}
                                      isMovieSaved={isMovieSaved}
                                      onButtonClick={onButtonClick}
                                    />
                                  )
                                )
                              }
                            </ul>
                            {
                              savedMoviesPage
                                ? null
                                : <MoreButton
                                    additionalClass='cards__more-button'
                                    onMoreButtonClick={onMoreButtonClick}
                                    moreButtonShow={moreButtonShow}
                                  />
                            }
                          </>
                    }
                  </>
        }
      </Container>
    </section>
  );
}

export default MoviesCardList;
