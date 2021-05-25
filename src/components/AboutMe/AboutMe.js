import avatar from '../../images/avatar.jpg';
import './AboutMe.css';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { navTabData, socialLinks } from '../../utils/constants';

const AboutMe = () => {
  return (
    <section id={navTabData[2].hash} className='about-me'>
      <Container
        additionalClass='about-me__container'
      >
        <SectionTitle>
          Студент
        </SectionTitle>
        <div className='about-me__wrapper'>
          <h3 className='about-me__heading'>
            Вячеслав
          </h3>
          <p className='about-me__subheading'>
            Фронтенд-разработчик, 36 лет
          </p>
          <p className='about-me__description'>
            Я родился и живу в Ташкенте, закончил факультет автотранспорта на кафедре «Ремонт и эксплуатация траснпортных средств» ТАДИ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь футболом. Недавно начал кодить. С 2015 года работал редактором на фрилансе. После того, как прошёл курс по веб-разработке, ищу постоянную работу на должность фронтендера.
          </p>
          <ul className='about-me__links'>
            {
              socialLinks.map((item, index) => (
                <li key={index} className='about-me__link-wrap'>
                  <a className='about-me__link' target='_blank' href={item.link} rel='noreferrer'>
                    {item.network}
                  </a>
                </li>
              ))
            }
          </ul>
          <figure className='about-me__figure'>
            <img className='about-me__photo' alt='фото автора сервиса' src={avatar} />
          </figure>
        </div>
      </Container>
    </section>
  );
}

export default AboutMe;
