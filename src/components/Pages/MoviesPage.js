import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const MoviesPage = (props) => {
  const {
    onSubmit,
    moviesData,
    isLoading,
    searchResultMsg,
    handleMoreButtonClick,
    moreButtonShow,
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
          searchResultMsg={searchResultMsg}
          onMoreButtonClick={handleMoreButtonClick}
          moreButtonShow={moreButtonShow}
        />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default MoviesPage;
