import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Container from '../Container/Container';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ savedMoviesPage, moviesData, isLoading, searchResultMsg }) => {
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
                      searchResultMsg
                        ? <p className='cards__not-found'>
                            {searchResultMsg}
                          </p>
                        : null
                    }
                    {
                      moviesData.length === 0
                        ? null
                        : <>
                            <ul className='cards__list'>
                              {
                                moviesData.map((movie, index) =>
                                  (
                                    <MoviesCard
                                      key={index}
                                      movieData={movie}
                                      savedMoviesPage={savedMoviesPage}
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
