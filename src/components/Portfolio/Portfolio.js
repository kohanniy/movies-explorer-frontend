import './Portfolio.css';
import { portfolioData } from '../../utils/constants';
import Container from '../Container/Container';


const Portfolio = () => {
  return (
    <section className='portfolio'>
      <Container
        additionalClass='portfolio__container'
      >
        <h2 className='portfolio__title'>
          Портфолио
        </h2>
        <ul className='portfolio__list'>
          {
            portfolioData.map((item, index) => (
              <li className='portfolio__item' key={index}>
                <a href={item.link} target='_blank' rel='noreferrer' className='portfolio__link'>
                  {item.name}
                </a>
              </li>
            ))
          }
        </ul>
      </Container>
    </section>
  );
}

export default Portfolio;
