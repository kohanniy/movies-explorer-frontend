import './Footer.css';
import Container from '../Container/Container';
import { socialLinks, practicumLink } from '../../utils/constants';

const data = [practicumLink, ...socialLinks];

const Footer = () => {
  return (
    <footer className='footer page__footer'>
      <Container
        additionalClass='footer__container'
      >
        <p className='footer__description'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <p className='footer__date footer__text'>
          &copy; {new Date().getFullYear()}
        </p>
        <ul className='footer__list'>
          {
            data.map((item, index) => (
              <li className='footer__item' key={index}>
                <a className='footer__link footer__text' href={item.link} target='_blank' rel='noreferrer'>
                  {item.network}
                </a>
              </li>
            ))
          }
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;
