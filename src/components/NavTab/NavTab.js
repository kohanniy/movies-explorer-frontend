import { HashLink } from 'react-router-hash-link';
import './NavTab.css';
import Section from '../Section/Section';
import { navTabData } from '../../utils/constants';

const NavTab = () => {
  return (
    <section className='nav-tab'>
      <Section
        additionalClass='nav-tab__section'
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
      </Section>
    </section>
  );
};

export default NavTab;
