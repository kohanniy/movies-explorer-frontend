import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const MoviesPage = (props) => {
  const {
    onSubmit,
    moviesData,
    isLoading,
    resultMsg,
    handleMoreButtonClick,
    moreButtonShow,
    handleSaveMovieButtonClick,
    isMovieSaved,
    onButtonClick,
  } = props;

  return (
    <>
      <PageMainContent>
        <SearchForm
          onSubmit={onSubmit}
        />
        <MoviesCardList
          isLoading={isLoading}
          moviesData={moviesData}
          savedMoviesPage={false}
          resultMsg={resultMsg}
          onMoreButtonClick={handleMoreButtonClick}
          moreButtonShow={moreButtonShow}
          handleSaveMovieButtonClick={handleSaveMovieButtonClick}
          isMovieSaved={isMovieSaved}
          onButtonClick={onButtonClick}
        />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default MoviesPage;
