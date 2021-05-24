import './UserNavigation.css';
import Menu from '../Menu/Menu';
import { userLinks } from '../../utils/constants';

const UserNavigation = () => {
  const classes = {
    ul: 'user-nav__list',
    li: 'user-nav__item',
    link: 'user-nav__link'
  }
  return (
    <nav className='user-nav'>
      <Menu
        classes={classes}
        links={userLinks}
      />
    </nav>
  );
}

export default UserNavigation;
