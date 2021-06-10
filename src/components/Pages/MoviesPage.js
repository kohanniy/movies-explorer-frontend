import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import InfoPopup from '../InfoPopup/InfoPopup';

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
    isPopupOpen,
    onClosePopup,
    result,
  } = props;

  return (
    <>
      <PageMainContent>
        <SearchForm
          onSubmit={onSubmit}
          isLoading={isLoading}
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
      <InfoPopup
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        result={result}
      />
    </>
  );
}

export default MoviesPage;
