import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Logo = ({ className }) => {
  return (
    <Link to='/'>
      <img src={logo} alt='логотип' className={className} />
    </Link>
  )
};

export default Logo;
