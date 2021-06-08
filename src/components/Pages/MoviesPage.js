import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const MoviesPage = (props) => {
  const {
    onSubmit,
    moviesData,
    isLoading,
    searchResultMsg
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
        />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default MoviesPage;
