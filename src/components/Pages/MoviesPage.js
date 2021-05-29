import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const MoviesPage = () => {
  return (
    <>
      <PageMainContent>
        <SearchForm/>
        <MoviesCardList
          savedMoviesPage={false}
        />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default MoviesPage;
