import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMoviesPage = (props) => {
  const {
    resultMsg,
    moviesData,
    onButtonClick,
  } = props;

  return (
    <>
      <PageMainContent>
        <SearchForm/>
        <MoviesCardList
          savedMoviesPage={true}
          resultMsg={resultMsg}
          moviesData={moviesData}
          onButtonClick={onButtonClick}
        />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default SavedMoviesPage;
