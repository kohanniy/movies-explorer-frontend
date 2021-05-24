import { NavLink } from 'react-router-dom';

const Menu = ({ links, classes, handleCloseNavButtonClick }) => {
  return (
    <ul className={classes.ul}>
      {
        links.map((item, index) =>
          (
            <li key={index} className={classes.li}>
              <NavLink
                onClick={handleCloseNavButtonClick}
                className={classes.link}
                activeClassName={classes.linkActive}
                exact to={item.link}
              >
                {item.text}
              </NavLink>
            </li>
          )
        )
      }
    </ul>
  );
};

export default Menu;
