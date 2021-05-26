import './SearchForm.css';
import Container from '../Container/Container';

const SearchForm = () => {
  return (
    <section className='search'>
      <Container
        additionalClass='search__container'
      >
        <form className='search__form' role='search'>
          <input
            className='search__input'
            aria-label='поиск фильмов'
            type='search'
            autoComplete='off'
            placeholder='Фильм'
          />
          <label htmlFor='short-films' className='search__label'>
            <input
              type='checkbox'
              id='short-films'
              className='search__checkbox'
              name='short-films'
              value='true'
              defaultChecked
            />
            <span className='search__pseudo-checkbox' />
            <span className='search__label-text'>Короткометражки</span>
          </label>
          <button type='submit' className='search__submit-btn'>Поиск</button>
        </form>
      </Container>
    </section>
  );
}

export default SearchForm;
