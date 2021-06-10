import PageMainContent from '../PageMainContent/PageMainContent';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import InfoPopup from '../InfoPopup/InfoPopup';

const SavedMoviesPage = (props) => {
  const {
    resultMsg,
    moviesData,
    onButtonClick,
    isPopupOpen,
    onClosePopup,
    result,
    onSubmit,
  } = props;

  return (
    <>
      <PageMainContent>
        <SearchForm
          onSubmit={onSubmit}
        />
        <MoviesCardList
          savedMoviesPage={true}
          resultMsg={resultMsg}
          moviesData={moviesData}
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

export default SavedMoviesPage;
