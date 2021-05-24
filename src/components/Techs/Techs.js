import './Techs.css';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { navTabData, techs } from '../../utils/constants';

const Techs = () => {
  return (
    <section id={navTabData[1].hash} className='techs'>
      <Container
        additionalClass='techs__container'
      >
        <SectionTitle>
          Технологии
        </SectionTitle>
        <h3 className='techs__heading'>
          7 технологий
        </h3>
        <p className='techs__description'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__list'>
          {
            techs.map((tech, index) => (
              <li key={index} className='techs__item'>
                {tech}
              </li>
            ))
          }
        </ul>
      </Container>
    </section>
  );
}

export default Techs;
