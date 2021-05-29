import PageMainContent from '../../PageMainContent/PageMainContent';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

const SavedMoviesPage = () => {
  return (
    <>
      <PageMainContent>
        <SearchForm/>
        <MoviesCardList
          savedMoviesPage={true}
        />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default SavedMoviesPage;
