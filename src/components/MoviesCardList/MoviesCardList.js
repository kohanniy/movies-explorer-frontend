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
    searchResultMsg,
    onMoreButtonClick,
    moreButtonShow,
  } = props;

  // const [ defaultNumberOfCards, setDefaultNumberOfCards ] = React.useState();
  // const [ numberOfAddedCards, setNumberOfAddedCards ] = React.useState();
  // const [ cardsList, setCardsList ] = React.useState([]);

  // const [renderedMoviesList, setRenderedMoviesList] = React.useState([]);
  // const [isButtonActive, setIsButtonActive] = React.useState(false);
  // const [renderedCardsCount, setRenderedCardsCount] = React.useState(12);
  // const [addedCardsCount, setAddedCardsCount] = React.useState(0);

  // const location = useLocation().pathname;



  // React.useEffect(() => {
  //   if (savedMoviesPage) {
  //     setCardsList(moviesData);
  //   } else {
  //     setCardsList(moviesData.slice(0, defaultNumberOfCards));
  //   }
  // }, [defaultNumberOfCards, moviesData, savedMoviesPage]);

  // React.useState(() => {
  //   renderedCards();
  // }, [windowWidth]);



  // function cardsCount() {
  //   if (windowWidth >= 1100) {
  //     setRenderedCardsCount(12);
  //     setAddedCardsCount(3);
  //   } else if (windowWidth < 1100 && windowWidth > 600) {
  //     setRenderedCardsCount(8);
  //     setAddedCardsCount(2);
  //   } else {
  //     setRenderedCardsCount(5);
  //     setAddedCardsCount(2);
  //   }
  // }

  // function handleMoreClick() {
  //   setRenderedMoviesList(movies.slice(0, renderedMoviesList.length + addedCardsCount));
  //   if (renderedMoviesList.length >= movies.length - addedCardsCount) {
  //     setIsButtonActive(false);
  //   }
  // }



  // React.useEffect(() => {
  //   if (location === '/movies') {
  //     setRenderedMoviesList(movies.slice(0, renderedCardsCount));
  //     if (movies.length <= renderedCardsCount) {
  //       setIsButtonActive(false);
  //     } else {
  //       setIsButtonActive(true);
  //     }
  //   } else {
  //     setRenderedMoviesList(movies);
  //     setIsButtonActive(false);
  //   }
  // }, [movies]);



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
