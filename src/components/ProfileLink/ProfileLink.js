import { NavLink } from 'react-router-dom';
import './ProfileLink.css';
import { profileLink } from '../../utils/constants';

const ProfileLink = ({ parrentClass, handleCloseNavButtonClick }) => {
  return (
    <NavLink
      onClick={handleCloseNavButtonClick}
      to={profileLink.link}
      activeClassName='profile-link_active'
      className={`profile-link ${parrentClass}`}
    >
      <i className='profile-link__icon' />
      {profileLink.text}
    </NavLink>
  );
}

export default ProfileLink;
