import React from 'react';
import './SearchForm.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Container from '../Container/Container';

const SearchForm = ({ onSubmit }) => {
  const { values, handleChange, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <section className='search'>
      <Container
        additionalClass='search__container'
      >
        <form
          className='search__form'
          role='search'
          name='search'
          onSubmit={handleSubmit}
        >
          <input
            className='search__input'
            aria-label='поиск фильмов'
            type='search'
            autoComplete='on'
            placeholder='Фильм'
            name='search-query'
            onChange={handleChange}
            required
          />
          <label htmlFor='short-films' className='search__label'>
            <input
              type='checkbox'
              id='short-films'
              className='search__checkbox'
              name='short-films'
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
