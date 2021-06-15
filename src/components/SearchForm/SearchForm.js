import React from 'react';
import './SearchForm.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Container from '../Container/Container';

const SearchForm = (props) => {
  const {
    onSubmit,
    isLoading,
    onChangeCheckbox,
    savedMoviesPage,
  } = props;

  const { values, handleChange, resetForm } = useFormAndValidation();
  const [ error, setError ] = React.useState('');
  const [ checked, setChecked ] = React.useState(false);
  let inputClasses = 'search__input';

  if (error) inputClasses += ' search__input_error';

  let { 'search-query': query } = values;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      setError('Нужно ввести ключевое слово');
    } else {
      onSubmit({query, checked});
    }
  };

  function handleFocus() {
    setTimeout(() => {
      setError('');
    }, 500);
  };

  function handleBlur() {
    setError('');
  }

  function handleChecked(e) {
    setChecked(!checked);
    onChangeCheckbox(e, savedMoviesPage);
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
          noValidate
        >
          <input
            className={inputClasses}
            aria-label='поиск фильмов'
            type='search'
            autoComplete='on'
            placeholder={error ? error : 'Фильм'}
            name='search-query'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            disabled={isLoading}
          />
          <label htmlFor='short-films' className='search__label'>
            <input
              type='checkbox'
              id='short-films'
              className='search__checkbox'
              name='short-films'
              onChange={handleChecked}
              disabled={isLoading}
            />
            <span className='search__pseudo-checkbox' />
            <span className='search__label-text'>Короткометражки</span>
          </label>
          <button
            type='submit'
            className='search__submit-btn'
            disabled={isLoading}
          >
            Поиск
          </button>
        </form>
      </Container>
    </section>
  );
}

export default SearchForm;
