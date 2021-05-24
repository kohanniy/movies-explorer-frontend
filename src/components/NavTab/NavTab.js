import { HashLink } from 'react-router-hash-link';
import './NavTab.css';
import Container from '../Container/Container';
import { navTabData } from '../../utils/constants';

const NavTab = () => {
  return (
    <section className='nav-tab'>
      <Container
        additionalClass='nav-tab__container'
      >
        <ul className='nav-tab__list'>
        {
          navTabData.map((item, index) => (
            <li key={index} className='nav-tab__item'>
              <HashLink className='nav-tab__link' smooth to={`#${item.hash}`}>
                {item.text}
              </HashLink>
            </li>
          ))
        }
        </ul>
      </Container>
    </section>
  );
};

export default NavTab;
