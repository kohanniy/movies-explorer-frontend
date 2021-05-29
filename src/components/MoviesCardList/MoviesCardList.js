import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Container from '../Container/Container';
import { moviesCardData } from '../../utils/constants';

const MoviesCardList = ({ savedMoviesPage }) => {
  return (
    <section className='cards'>
      <Container
        additionalClass='cards__container'
      >
        <ul className='cards__list'>
          {
            moviesCardData.map((item, index) =>
              (
                <MoviesCard
                  key={index}
                  moviesCardData={item}
                  savedMoviesPage={savedMoviesPage}
                />
              )
            )
          }
        </ul>
      </Container>
    </section>
  );
}

export default MoviesCardList;
