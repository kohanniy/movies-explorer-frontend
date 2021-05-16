import { NavLink } from 'react-router-dom';
import { authLinks, navLinks, profileLink } from '../../utils/constants';
import './Navigation.css';

const Navigation = ({ loggedIn, isMainPage }) => {
  let classes = 'main-nav header__main-nav';

  if (isMainPage) classes += ' main-nav_main-page';

  return (
    <nav className={classes}>
      {
        loggedIn
          ? <>
              {
                navLinks.map((navLink, index) =>
                  <NavLink
                    key={index}
                    exact to={navLink.link}
                    activeClassName='main-nav__link_active'
                    className='main-nav__link'
                  >
                    {navLink.text}
                  </NavLink>
                )
              }
              <NavLink
                to={profileLink.link}
                className='main-nav__profile'
              >
                <svg className='main-nav__profile-icon' xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4a2 2 0 11-4 0 2 2 0 014 0zm2 0a4 4 0 11-8 0 4 4 0 018 0zM4 9a4 4 0 00-4 4v1h2v-1a2 2 0 012-2h4a2 2 0 012 2v1h2v-1a4 4 0 00-4-4H4z"/>
                </svg>
                {profileLink.text}
              </NavLink>
            </>
          : <>
              {
                authLinks.map((authLink, index) =>
                  <NavLink key={index} to={authLink.link} className="main-nav__auth-link">
                    {authLink.text}
                  </NavLink>
                )
              }
            </>
      }
    </nav>
  );
}

export default Navigation;
