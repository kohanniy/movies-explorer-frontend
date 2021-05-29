import './NotFound.css';
import Container from '../Container/Container';

const NotFound = () => {
  return (
    <section className='not-found'>
      <Container
        additionalClass='not-found__container'
      >
        <div className='not-found__header'>
          <h1 className='not-found__title'>
            404
          </h1>
          <p className='not-found__text'>
            Страница не найдена
          </p>
        </div>
        <a href='/' className='not-found__back-link'>
          Назад
        </a>
      </Container>
    </section>
  );
};

export default NotFound;
